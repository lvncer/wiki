# プラットフォームをカテゴリ別に整理

## カテゴリ別マップ

```txt
┌──────────────────────────────────────────────┐
│          デプロイプラットフォーム全体像         │
│                                              │
│  フロントエンド特化          フルスタック       │
│  ┌──────────┐           ┌──────────┐         │
│  │  Vercel  │           │ Railway  │         │
│  │ Netlify  │           │  Render  │         │
│  │ CF Pages │           │  Fly.io  │         │
│  └──────────┘           │  Heroku  │         │
│                         └──────────┘         │
│  エッジ特化               静的サイト           │
│  ┌──────────────┐       ┌──────────┐         │
│  │ CF Workers   │       │  GitHub  │         │
│  │ Deno Deploy  │       │  Pages   │         │
│  └──────────────┘       └──────────┘         │
└──────────────────────────────────────────────┘
```

## 主要プラットフォーム比較

### フロントエンド特化系

| プラットフォーム     | 対応言語・ランタイム                  | 特徴                                                          | 無料枠  |
| -------------------- | ------------------------------------- | ------------------------------------------------------------- | ------- |
| **Vercel**           | JS/TS, Python, Go, Ruby, Edge Runtime | Next.js 開発元。SSR/SSG/ISR が神。サーバーレス Functions あり | ✅ あり |
| **Netlify**          | JS/TS (Node), Go, 静的サイト全般      | CI/CD が簡単。Forms・Auth 機能内蔵。Edge Functions は Deno    | ✅ あり |
| **Cloudflare Pages** | JS/TS, Wasm, 静的サイト全般           | CDN が爆速。Functions は Workers ベース                       | ✅ あり |

### フルスタック / バックエンド系

| プラットフォーム | 対応言語・ランタイム                             | 特徴                                                           | 無料枠         |
| ---------------- | ------------------------------------------------ | -------------------------------------------------------------- | -------------- |
| **Railway**      | Node, Python, Ruby, Go, Java, PHP, Docker 何でも | DB (Postgres/MySQL/Redis) も一緒に管理できる。爆速セットアップ | ⚠️ 少なめ      |
| **Render**       | Node, Python, Ruby, Go, Rust, Elixir, Docker     | Heroku の後継的ポジション。PostgreSQL 無料あり                 | ✅ あり (遅い) |
| **Fly.io**       | Docker ベースで言語不問                          | コンテナをエッジで動かせる。グローバル分散が得意               | ✅ あり        |
| **Heroku**       | Node, Python, Ruby, Java, PHP, Go, Scala         | 老舗。安定してるけど無料枠が廃止されて高くなった               | ❌ なし        |

### エッジ特化系

| プラットフォーム       | 対応言語・ランタイム            | 特徴                                                     | 無料枠  |
| ---------------------- | ------------------------------- | -------------------------------------------------------- | ------- |
| **Cloudflare Workers** | JS/TS, WebAssembly (Rust/C/C++) | V8 isolate で超低レイテンシ。KV・D1・R2 などストレージも | ✅ あり |
| **Deno Deploy**        | JS/TS (Deno ランタイム)         | Deno 公式。ESM ネイティブ。シンプルさが売り              | ✅ あり |

---

## 選び方チートシート

```txt
何を作る？
│
├─ Next.js / Nuxt などフロント重視
│   └─→ Vercel 一択に近い
│
├─ バックエンド API / フルスタックアプリ
│   ├─ DB も一緒に管理したい → Railway
│   └─ Docker で動かしたい → Fly.io or Render
│
├─ とにかく爆速 CDN + エッジ処理
│   └─→ Cloudflare Workers / Pages
│
└─ 静的サイト（ブログとか）
    └─→ Netlify or GitHub Pages
```

ざっくり言うと、**Next.js → Vercel**、**Rails や FastAPI → Railway か Render**、**とにかく速くしたい → Cloudflare** って感じで住み分けてるよ！
