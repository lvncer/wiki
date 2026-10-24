# lvncerpedia Web

`../` 以下の Markdown Wiki(Obsidian Vault)を読み取り専用で表示する Next.js アプリ。

- リポジトリ本体(`.scripts/`, `.github/`, `.obsidian/`, 9カテゴリフォルダ)には一切変更を加えていない。このフォルダはドット始まり(`.web/`)なので `.scripts/gen_index.py` と `.scripts/sync_wiki_topics.py` から自動的に無視される。
- コンテンツは `.md` ファイルをそのまま参照する(コピーや同期はしない)。画像・PDF等の添付ファイルのみ `public/wiki-assets/` にビルド時コピーする。
- グラフ(`/graph`)は `.obsidian/graph.json` のカテゴリ配色を再現している。それ以外のページはモノクロの Wikipedia 風レイアウト。

## 開発

```bash
cd .web
npm install
npm run dev     # http://localhost:3000
npm run build   # 静的エクスポート → .web/out/
```

生成物(`public/generated/`, `public/wiki-assets/`, `.content-cache/`, `out/`)はすべて `.gitignore` 対象で、ビルドの度に再生成される。

## デプロイ

Vercel への公開手順は [DEPLOYMENT.md](./DEPLOYMENT.md) を参照。
