# カスタム装飾タグ

Wiki本文の Markdown 内で使える、独自の装飾用インラインタグの対応表。
`lib/content/markdown.ts` の変換パイプラインは `rehype-raw` + `remark-rehype({ allowDangerousHtml: true })` により
生 HTML タグをそのまま通すため、下記タグは **CSS を追加するだけ** で有効化できる(パイプライン改造は不要)。

## 対応表

| タグ | 効果 | CSS 実装 |
|---|---|---|
| `<underline>テキスト</underline>` | 下線を引く | `text-decoration: underline;` |
| `<red>テキスト</red>` | 文字色を赤にする | `color: #dc2626;` |
| `<marker>テキスト</marker>` | 背景にマーカー(ハイライト)を引く | `background: #fef08a;` |

## 組み合わせ(入れ子)

タグは HTML として入れ子にできるため、そのまま組み合わせ可能。

```markdown
<red><marker>重要</marker></red>
<underline><red>警告</red></underline>
```

## 実装ステータス

実装済み。CSS は `app/globals.css` に定義。
