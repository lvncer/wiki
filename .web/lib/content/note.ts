import fs from "node:fs";
import path from "node:path";
import { buildContentData, type NoteRecord } from "./build";

export type { NoteRecord };

const CACHE_FILE = path.resolve(process.cwd(), ".content-cache", "notes.json");

let cache: Map<string, NoteRecord> | null = null;

function load(): Map<string, NoteRecord> {
  if (cache) return cache;
  const notes: NoteRecord[] = fs.existsSync(CACHE_FILE)
    ? JSON.parse(fs.readFileSync(CACHE_FILE, "utf-8"))
    : buildContentData().notes;
  cache = new Map(notes.map((n) => [n.slug, n]));
  return cache;
}

export function getAllNotes(): NoteRecord[] {
  return [...load().values()];
}

export function getNoteBySlug(slug: string): NoteRecord | undefined {
  return load().get(slug);
}

/** トップレベルカテゴリ(9〜10個)の README 一覧。サイドバー表示用。 */
export function getTopCategories(): { slug: string; title: string }[] {
  return getAllNotes()
    .filter((n) => n.slug !== "" && !n.slug.includes("/"))
    .map((n) => ({ slug: n.slug, title: n.title }))
    .sort((a, b) => a.slug.localeCompare(b.slug));
}
