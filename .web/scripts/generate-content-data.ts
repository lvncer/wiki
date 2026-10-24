#!/usr/bin/env -S npx tsx
// next.config.ts が dev/build の度に自動で呼ぶため通常は不要だが、
// 生成物だけを単独で再生成して確認したい時に使う: npx tsx scripts/generate-content-data.ts
import { buildContentData } from "../lib/content/build";

const { notes } = buildContentData();
console.log(`生成完了: ${notes.length} ノート`);
