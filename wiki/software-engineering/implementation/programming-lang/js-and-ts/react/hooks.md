# React 全 Hooks

![](./images/hooks-all.png)

## 基本Hooks（まず覚えるやつ）

### useState

コンポーネント内の状態を持つ

```tsx
const [count, setCount] = useState(0)
```

例
ボタン押したらカウント増えるとか。

### useEffect

副作用を実行する（API呼び出し、イベント登録など）

```tsx
useEffect(() => {
  console.log("mounted")
}, [])
```

用途

- API fetch
- イベント登録
- タイマー

### useRef

値を保持 or DOM参照

```tsx
const ref = useRef<HTMLInputElement>(null)
```

用途

- DOMアクセス
- 再レンダリングしない変数

### useContext

Contextから値を取得

```tsx
const theme = useContext(ThemeContext)
```

用途

- テーマ
- グローバル設定

## パフォーマンス系Hooks

### useMemo

計算結果をキャッシュ

```tsx
const result = useMemo(() => heavyCalc(data), [data])
```

用途

- 重い計算の最適化

### useCallback

関数をメモ化

```tsx
const handleClick = useCallback(() => {
  console.log("click")
}, [])
```

用途

- 子コンポーネントの再レンダリング防止

## 状態管理系

### useReducer

複雑なstate管理

```tsx
const [state, dispatch] = useReducer(reducer, initialState)
```

用途

- Reduxみたいなstate管理

## DOM / Layout系

### useLayoutEffect

DOM更新直後に同期実行

```tsx
useLayoutEffect(() => {
  console.log("layout updated")
})
```

用途

- DOMサイズ計算
- スクロール制御

### useImperativeHandle

refで公開するAPIをカスタム

```tsx
useImperativeHandle(ref, () => ({
  focus: () => inputRef.current.focus()
}))
```

用途

- 親 → 子の命令

## ID / 同期

### useId

ユニークID生成

```tsx
const id = useId()
```

用途

- label / input紐付け

## 外部データ同期

### useSyncExternalStore

外部ストアと同期

```tsx
const state = useSyncExternalStore(subscribe, getSnapshot)
```

用途

- Redux
- Zustand
- custom store

## React 18+

### useTransition

低優先度更新

```tsx
const [isPending, startTransition] = useTransition()
```

用途

- UIのカクつき防止

### useDeferredValue

値更新を遅らせる

```tsx
const deferred = useDeferredValue(value)
```

用途

- 検索UI
- 重いレンダリング

## React 19（新しい）

### use

Promise / Context を直接読む

```tsx
const data = use(fetchData())
```

用途

- Server Components
- Suspense

## まとめ（使用頻度）

めちゃくちゃ使う

- useState
- useEffect
- useRef
- useContext

そこそこ使う

- useMemo
- useCallback
- useReducer


特殊用途

- useLayoutEffect
- useImperativeHandle
- useSyncExternalStore

React18以降

- useTransition
- useDeferredValue
- useId
- use
