# React ROADMAP

Reactをまったく知らない人に「全体像」を教えるなら、地図みたいに構造で理解させるのが一番伝わる。
下の図は「Reactを中心に、何を覚えればアプリが作れるのか」を漏れなく整理した体系図だよ。

## React全体像マップ（完全版）

```
React
├─ 1. 基礎概念（絶対コア）
│  ├─ コンポーネント
│  │  ├─ 関数コンポーネント
│  │  └─ 再利用・分割
│  │
│  ├─ JSX
│  │  ├─ HTMLっぽい記法
│  │  └─ JSの中にUIを書く
│  │
│  ├─ Props
│  │  └─ 親 → 子へデータを渡す
│  │
│  ├─ State
│  │  └─ 画面の状態管理
│  │
│  └─ 再レンダリング
│     └─ stateが変わるとUIが更新
│
├─ 2. Hooks（Reactの中核機能）
│  ├─ 基本Hooks
│  │  ├─ useState        ← 状態管理
│  │  ├─ useEffect       ← 副作用（API・イベント）
│  │  ├─ useRef          ← DOM参照・値保持
│  │  ├─ useMemo         ← 計算結果のキャッシュ
│  │  └─ useCallback     ← 関数の再生成防止
│  │
│  ├─ 設計系Hooks
│  │  ├─ useContext      ← グローバル共有
│  │  └─ カスタムHook    ← ロジックの共通化
│  │
│  └─ 上級Hooks
│     ├─ useReducer      ← 複雑なstate管理
│     └─ useLayoutEffect ← 描画タイミング制御
│
├─ 3. データ管理（重要）
│  ├─ ローカル
│  │  └─ useState
│  │
│  ├─ 中規模共有
│  │  └─ Context API
│  │
│  └─ 大規模アプリ
│     ├─ Redux
│     ├─ Zustand
│     ├─ Recoil
│     └─ Jotai
│
├─ 4. ルーティング（ページ遷移）
│  ├─ SPAルーティング
│  │  └─ React Router
│  │
│  └─ フレームワーク型
│     ├─ Next.js
│     └─ Remix
│
├─ 5. サーバー通信
│  ├─ fetch
│  ├─ axios
│  └─ データ取得特化
│     ├─ React Query
│     └─ SWR
│
├─ 6. フォーム管理
│  ├─ 通常
│  │  └─ useState
│  │
│  └─ 本格
│     ├─ React Hook Form
│     └─ Formik
│
├─ 7. UI構築
│  ├─ CSS
│  │  ├─ CSS Modules
│  │  └─ Sass
│  │
│  ├─ CSS-in-JS
│  │  ├─ styled-components
│  │  └─ Emotion
│  │
│  └─ UIライブラリ
│     ├─ MUI
│     ├─ Chakra UI
│     └─ Ant Design
│
├─ 8. パフォーマンス最適化
│  ├─ React.memo
│  ├─ useMemo
│  ├─ useCallback
│  └─ Code Splitting
│
├─ 9. テスト
│  ├─ Jest
│  ├─ Testing Library
│  └─ Vitest
│
├─ 10. 開発基盤
│  ├─ TypeScript
│  ├─ ESLint
│  ├─ Prettier / Biome
│  └─ Vite / Webpack
│
└─ 11. Reactの拡張概念（中〜上級）
   ├─ Server Components
   ├─ Suspense
   ├─ Concurrent Rendering
   ├─ Hydration
   └─ Streaming SSR
```

## 教える順番（超重要）

初心者に説明するなら、この順が一番理解しやすい。

### フェーズ1：本体理解

ここがReactの本質

1. コンポーネント
2. JSX
3. Props
4. State
5. 再レンダリング

ここまでで「Reactって何者か」が分かる。

### フェーズ2：Hooks理解

ReactをReactたらしめてる部分

- useState
- useEffect
- useContext
- カスタムHooks

ここで「なぜ関数で書くのか」が腑に落ちる。

### フェーズ3：実践で必要な周辺

アプリ作成に必須

- ルーティング
- API通信
- フォーム
- UIライブラリ

### フェーズ4：規模が大きくなった時

- グローバルstate管理
- パフォーマンス最適化
- テスト

## Reactの思想（ここを理解させると強い）

Reactはライブラリというより：

「状態 → UIを自動生成する仕組み」

つまり：

state = データ
UI = stateの結果

だから：

- DOMを直接いじらない
- 画面更新を書かない
- 状態だけ管理する

## Hooksが生まれた理由

昔はこうだった：

- classコンポーネント
- lifecycleメソッド地獄
- ロジック再利用が難しい

Hooksでこうなった：

- 関数だけで書ける
- ロジックを分離できる
- 使い回し可能

ここがReact進化の最大ポイント。

Reactを一言で言うと

UI = f(state)

数学っぽい発想。

## さらに深い全体像（上級者向け）

Reactには2層ある：

1. 宣言的UI
2. 仮想DOMによる差分更新

この2つがあるから：

- コードがシンプル
- パフォーマンスが高い
- 大規模でも壊れにくい

## 教える時の最短カリキュラム

初心者に漏れなく教えるなら：

1. コンポーネント
2. JSX
3. useState
4. Props
5. useEffect
6. ルーティング
7. API通信
8. フォーム
9. Context
10. 状態管理ライブラリ

ここまでで実務レベル。
もし本気で理解させたいなら、次も入れると一気にレベル上がる：

- なぜ再レンダリングが起きるか
- 仮想DOMとは何か
- keyの意味
- メモ化の意味
