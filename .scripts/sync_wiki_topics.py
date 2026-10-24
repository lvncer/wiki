import os
import sys
from pathlib import Path

from ruamel.yaml import YAML
from ruamel.yaml.comments import CommentedMap

ROOT_DIR = Path(__file__).resolve().parent.parent
REPOS_YAML = ROOT_DIR / "repos.yaml"

UNCATEGORIZED = "未分類"
META_GROUP = "管理"
DEFAULT_CONTENT_REPO = "wiki"
DEFAULT_ORG_REPOS = {"portal", "wiki"}

yaml = YAML()
yaml.preserve_quotes = True
yaml.indent(mapping=2, sequence=4, offset=2)


def load_config():
    return yaml.load(REPOS_YAML.read_text(encoding="utf-8"))


def content_repo(config):
    return config.get("content_repo", DEFAULT_CONTENT_REPO)


def content_branch(config):
    return config.get("content_branch", "main")


def org_repos(config):
    configured = config.get("org_repos")
    if configured:
        return {str(name).lower() for name in configured}
    return {name.lower() for name in DEFAULT_ORG_REPOS}


def iter_categories(config):
    for group in config["groups"]:
        for category in group["categories"]:
            yield category


def listed_names(config):
    names = set()
    for category in iter_categories(config):
        for repo in category["repos"] or []:
            names.add(str(repo["name"]).lower())
    return names


def wiki_dir(config):
    return ROOT_DIR.parent / content_repo(config)


def discover_wiki_topics(root):
    topics = []
    for child in sorted(root.iterdir(), key=lambda p: p.name):
        if child.is_dir() and not child.name.startswith("."):
            _collect_topics(child, topics)
    return sorted(set(topics))


CONTAINER_MARK = "<!-- container -->"


def _is_container_readme(path):
    """gen_index.py --containers が親フォルダに作る README（印つき）。トピックの根拠にしない。"""
    if path.name != "README.md":
        return False
    try:
        return CONTAINER_MARK in path.read_text(encoding="utf-8")
    except (OSError, UnicodeDecodeError):
        return False


def _collect_topics(path, topics):
    entries = list(path.iterdir())
    dirs = [e for e in entries if e.is_dir() and not e.name.startswith(".")]
    has_file = any(
        e.is_file() and not e.name.startswith(".") and not _is_container_readme(e)
        for e in entries
    )
    if has_file:
        topics.append(path.name)
        return
    for d in sorted(dirs, key=lambda p: p.name):
        _collect_topics(d, topics)


def ensure_repos_list(category):
    if category.get("repos") is None:
        category["repos"] = []


def uncategorized_category(config):
    for category in iter_categories(config):
        if category.get("name") == UNCATEGORIZED:
            ensure_repos_list(category)
            return category

    meta_group = None
    for group in config["groups"]:
        if group["name"] == META_GROUP:
            meta_group = group
            break
    if meta_group is None:
        meta_group = CommentedMap()
        meta_group["name"] = META_GROUP
        meta_group["categories"] = []
        config["groups"].append(meta_group)

    category = CommentedMap()
    category["name"] = UNCATEGORIZED
    category["repos"] = []
    meta_group["categories"].append(category)
    return category


def add_topic(category, name):
    ensure_repos_list(category)
    entry = CommentedMap()
    entry["name"] = name
    entry["memo"] = ""
    entry.fa.set_flow_style()
    category["repos"].append(entry)


def sync_with_wiki(config, wiki_topics):
    listed = listed_names(config)
    new_topics = sorted(name for name in wiki_topics if name.lower() not in listed)

    if new_topics:
        category = uncategorized_category(config)
        for name in new_topics:
            add_topic(category, name)
        print(f"Added {len(new_topics)} new topic(s) to {UNCATEGORIZED}: {', '.join(new_topics)}")

    wiki_lower = {name.lower() for name in wiki_topics}
    reserved = org_repos(config)
    for category in iter_categories(config):
        for repo in category["repos"] or []:
            name = str(repo["name"])
            if name.lower() in reserved:
                continue
            if name.lower() not in wiki_lower:
                print(f"WARNING: '{name}' is listed but not found in {content_repo(config)}")

    return new_topics


def topic_url(org, config, name):
    if name.lower() in org_repos(config):
        return f"https://github.com/{org}/{name}"
    repo = content_repo(config)
    branch = content_branch(config)
    return f"https://github.com/{org}/{repo}/tree/{branch}/{name}"


def dump_yaml(config):
    from io import StringIO

    stream = StringIO()
    yaml.dump(config, stream)
    return stream.getvalue()


def format_new_topics_for_pr(new_topics, org, config):
    return "\n".join(
        f"- [`{name}`]({topic_url(org, config, name)})" for name in new_topics
    )


def format_pr_title_suffix(new_topics):
    if len(new_topics) <= 3:
        return ", ".join(new_topics)
    return f"{new_topics[0]} +{len(new_topics) - 1} more"


def uncategorized_topic_names(config):
    for category in iter_categories(config):
        if category.get("name") == UNCATEGORIZED:
            return [str(repo["name"]) for repo in category["repos"] or []]
    return []


def write_github_output(new_topics_added, new_topics, org, config, uncategorized_empty):
    output_path = os.getenv("GITHUB_OUTPUT")
    if not output_path:
        return
    with open(output_path, "a", encoding="utf-8") as handle:
        handle.write(f"new_repos_added={'true' if new_topics_added else 'false'}\n")
        handle.write(f"uncategorized_empty={'true' if uncategorized_empty else 'false'}\n")
        if new_topics:
            handle.write(f"pr_title_suffix={format_pr_title_suffix(new_topics)}\n")
            handle.write("new_repos_body<<EOF\n")
            handle.write(format_new_topics_for_pr(new_topics, org, config))
            handle.write("\nEOF\n")


def main():
    check_only = "--check" in sys.argv

    config = load_config()
    org = config.get("org", "lvncerpedia")
    new_topics = []

    wiki_root = wiki_dir(config)
    if wiki_root.is_dir():
        wiki_topics = discover_wiki_topics(wiki_root)
        print(f"Found {len(wiki_topics)} topics in '{wiki_root}'")
        new_topics = sync_with_wiki(config, wiki_topics)
    else:
        print(f"No local wiki checkout at '{wiki_root}': skipping wiki sync")

    new_topics_added = bool(new_topics)
    uncategorized_empty = not uncategorized_topic_names(config)

    if check_only:
        if new_topics_added:
            print("CHECK FAILED: repos.yaml is missing topic(s) found in wiki. Run the sync.")
            write_github_output(new_topics_added, new_topics, org, config, uncategorized_empty)
            sys.exit(1)
        print("CHECK OK: repos.yaml is up to date with wiki")
        write_github_output(False, [], org, config, uncategorized_empty)
        return

    if not new_topics_added:
        print("No changes")
        write_github_output(False, [], org, config, uncategorized_empty)
        return

    REPOS_YAML.write_text(dump_yaml(config), encoding="utf-8")
    write_github_output(new_topics_added, new_topics, org, config, uncategorized_empty)
    print("Updated repos.yaml")


if __name__ == "__main__":
    main()
