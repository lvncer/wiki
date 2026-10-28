# Next.jsでGraphQLを使う場面は「外部APIを叩く」か「自分でサーバーを立てる」の2パターン！

## 全体像

```
┌─────────────────────────────────────┐
│           Next.js App               │
│                                     │
│  [Server Component]                 │
│   └─ fetch()で直接GraphQL叩ける      │
│                                     │
│  [Client Component]                 │
│   └─ Apollo Client / urql           │
│       └─ useQuery() フック使う       │
│                                     │
│  [Route Handler]  ← オプション       │
│   └─ GraphQLサーバーを自分で立てる   │
└─────────────────────────────────────┘
         ↕
   外部GraphQL API
   (GitHub, Shopify, etc.)
   or 自前のDB
```

---

## ライブラリ選択肢

| ライブラリ | 特徴 | 向いてるケース |
|---|---|---|
| **Apollo Client** | 高機能・キャッシュ強力 | 大規模・複雑なデータ |
| **urql** | 軽量・シンプル | 中規模 |
| **graphql-request** | 超軽量 | TanStack Queryと組み合わせ |

今のNext.js（App Router）だと **graphql-request + TanStack Query** が一番素直！

---

## 実際のコード感

### ① Server Componentで叩く（一番シンプル）
```ts
// app/users/page.tsx
const QUERY = `
  query {
    users {
      id
      name
    }
  }
`

export default async function Page() {
  const res = await fetch("https://api.example.com/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: QUERY }),
  })
  const { data } = await res.json()

  return <ul>{data.users.map(u => <li>{u.name}</li>)}</ul>
}
```
fetchだけでOK、ライブラリ不要！

---

### ② Client Componentで使う（TanStack Query + graphql-request）
```ts
// lib/graphql.ts
import { GraphQLClient } from "graphql-request"
export const client = new GraphQLClient("https://api.example.com/graphql")

// hooks/useUsers.ts
const QUERY = gql`
  query GetUsers {
    users { id name }
  }
`
export const useUsers = () =>
  useQuery({
    queryKey: ["users"],
    queryFn: () => client.request(QUERY),
  })

// components/UserList.tsx
export function UserList() {
  const { data, isLoading } = useUsers()
  if (isLoading) return <p>Loading...</p>
  return <ul>{data.users.map(u => <li>{u.name}</li>)}</ul>
}
```

---

### ③ 自前GraphQLサーバーを立てる（Route Handler）
```ts
// app/api/graphql/route.ts
import { createYoga } from "graphql-yoga"
import { schema } from "@/graphql/schema"

const yoga = createYoga({ schema, graphqlEndpoint: "/api/graphql" })

export const GET = yoga
export const POST = yoga
```

---

## どれを選ぶか

```
外部API叩くだけ
  └─ Server Component → fetch()で十分
  └─ Client Component → graphql-request + TanStack Query

自前でGraphQLサーバー立てたい
  └─ GraphQL Yoga + Route Handler
  └─ スキーマ定義に Pothos (型安全) がおすすめ
```

最初は **Server Componentでfetch直叩き** から始めるのが一番楽だよ。
慣れてきたらTanStack Queryと組み合わせる感じ！
