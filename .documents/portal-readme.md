# portal

lvncerpedia のカテゴリ索引。

## 構成

| ファイル | 役割 |
| --- | --- |
| `repos.yaml` | カテゴリ定義（人が編集） |
| `CATEGORY.md` | 索引（人が編集） |
| `.scripts/sync_wiki_topics.py` | `wiki` の新規トピックを `repos.yaml` の `未分類` に追加する同期スクリプト |

## ローカル

```bash
cd portal/.scripts
uv sync
uv run sync_wiki_topics.py
uv run sync_wiki_topics.py --check
```

`wiki` リポジトリが `portal` と同階層（`../wiki`）にある前提でローカルのディレクトリ構造を読む。

## CI

`.github/workflows/sync-wiki-topics.yml`

- 定期実行で `wiki` をチェックアウトし、新トピックがあれば `repos.yaml` の `未分類` へ追加して PR 作成
- `CATEGORY.md` は自動生成されないため、カテゴリ変更時は手動で編集する

GitHub リポジトリ `portal` の Settings → Secrets に **`REPO_WRITE_TOKEN`** が必要。

## モノレポ前提

- 知識本体: [`wiki`](https://github.com/lvncerpedia/wiki)
- トピックリンク: `https://github.com/lvncerpedia/wiki/tree/main/{topic}`
