# JS Promise まとめ

**結論から：Promiseは「非同期処理の結果を包むオブジェクト」で、3つの状態を持ち、Reactでは主に`useEffect`内のデータ取得で使う。**

## 🔷 Promise の状態遷移

```
          resolve(値)
pending ──────────────► fulfilled (値が取れた)
  │
  └── reject(エラー)──► rejected  (失敗した)

※ pending から fulfilled/rejected への遷移は一方通行
```

## 🔷 基本構文

```js
// 作る側
const p = new Promise((resolve, reject) => {
  if (成功) resolve("データ");
  else      reject(new Error("失敗"));
});

// 使う側（チェーン）
p.then(data => console.log(data))
 .catch(err => console.error(err))
 .finally(() => console.log("必ず実行"));
```

## 🔷 async/await（Promiseの糖衣構文）

```js
// これは↑の.then()チェーンと完全に等価
async function fetchData() {
  try {
    const data = await p;   // Promise が resolve するまで待つ
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}
```

## 🔷 React での使い方（useEffect + fetch）

```jsx
import { useState, useEffect } from "react";

function UserCard({ userId }) {
  const [user, setUser]     = useState(null);
  const [error, setError]   = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ⚠️ useEffect のコールバック自体は async にできない
    // → 内側に async 関数を定義して即呼び出す
    const fetchUser = async () => {
      try {
        const res  = await fetch(`/api/users/${userId}`);
        if (!res.ok) throw new Error("取得失敗");
        const data = await res.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]); // userId が変わるたびに再実行

  if (loading) return <p>Loading...</p>;
  if (error)   return <p>Error: {error}</p>;
  return <p>{user.name}</p>;
}
```

## 🔷 よくあるハマりポイント：クリーンアップ

`userId`が変わった瞬間に古いリクエストの結果が上書きしてしまう問題（Race Condition）。

```jsx
useEffect(() => {
  let cancelled = false; // ← フラグで解決

  const fetchUser = async () => {
    const res  = await fetch(`/api/users/${userId}`);
    const data = await res.json();
    if (!cancelled) setUser(data); // アンマウント後は無視
  };

  fetchUser();

  return () => { cancelled = true; }; // クリーンアップ
}, [userId]);
```

## 🔷 知っておくべき Promise の並列・競合メソッド

| メソッド | 挙動 | ユースケース |
|---|---|---|
| `Promise.all([a, b])` | 全部成功→OK、1つでも失敗→即reject | 複数APIを並列で全部必要な時 |
| `Promise.allSettled([a, b])` | 全部の結果を必ず返す（成否問わず） | 一部失敗してもまとめて処理したい時 |
| `Promise.race([a, b])` | 最初に解決/拒否したものを返す | タイムアウト実装 |
| `Promise.any([a, b])` | 最初に**成功**したものを返す | フォールバック付きリクエスト |

```js
// 並列取得の例（Promise.all）
const [users, posts] = await Promise.all([
  fetch("/api/users").then(r => r.json()),
  fetch("/api/posts").then(r => r.json()),
]);
// 逐次より速い！
```

## 🔷 React で本気でやるなら TanStack Query

正直、`useEffect`でのフェッチ管理はつらくなってくる。  
キャッシュ・リトライ・Race Condition 対策・ローディング状態管理を全部やってくれる **TanStack Query（旧React Query）** が業界標準になってるから、知っておくと絶対損しない。

```jsx
import { useQuery } from "@tanstack/react-query";

function UserCard({ userId }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetch(`/api/users/${userId}`).then(r => r.json()),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error)     return <p>Error!</p>;
  return <p>{data.name}</p>;
}
// さっきの useEffect 版と同じ動作をこれだけで実現できる
```

## まとめ

```
Promise
  ├── 基本: resolve/reject/then/catch
  ├── async/await: Promiseの書きやすいラッパー
  ├── React: useEffect内でasync関数を即呼び出し
  ├── 並列: Promise.all / allSettled / race / any
  └── 本番: TanStack Query 使うと楽になる
```
