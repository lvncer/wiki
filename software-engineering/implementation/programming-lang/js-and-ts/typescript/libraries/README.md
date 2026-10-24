# Javascript Libraries

# React / Next.js 業界標準ライブラリ一覧

## 🔷 React（フロント共通）

| カテゴリ | 1番手（推奨） | 2番手 | 一言 |
|---|---|---|---|
| **データ取得** | TanStack Query | SWR | さっき紹介したやつね |
| **状態管理** | Zustand | Jotai | Reduxはもう重すぎて時代遅れ気味 |
| **フォーム** | React Hook Form | - | Formikはもう死に体 |
| **バリデーション** | Zod | Yup | RHFと一緒に使うのが鉄板 |
| **UIコンポーネント** | shadcn/ui | MUI / Radix UI | shadcnはコピペ型で柔軟 |
| **アニメーション** | Framer Motion | - | これ一強 |
| **テスト** | Vitest + Testing Library | Jest | VitestはJestより速い |

## 🔷 Next.js（サーバー含む）

| カテゴリ | 1番手（推奨） | 2番手 | 一言 |
|---|---|---|---|
| **認証** | Auth.js（旧NextAuth） | Clerk | Clerkは有料だけど楽すぎる |
| **ORM** | Prisma | Drizzle ORM | DrizzleはPrismaより軽量・型安全 |
| **型安全API** | tRPC | - | フルスタックTS勢の神ライブラリ |
| **スタイリング** | Tailwind CSS | - | これ以外ほぼ見ない |
| **メール送信** | Resend | Nodemailer | ResendはDX良すぎ |
| **DB（クラウド）** | Supabase / PlanetScale | Neon | VercelとNeonの相性◎ |
