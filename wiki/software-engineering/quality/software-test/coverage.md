# カバレッジテスト

## ざっくり方針

1. ユニット（単体）＋コンポーネントテスト：ロジックや React コンポーネントの振る舞いを検証。主に Jest/Vitest + Testing Library。
2. 統合（integration）テスト：ページ単位や複数コンポーネントの相互作用を検証。Next のルーティングや API 呼び出しを含める。
3. E2E（エンドツーエンド）：ユーザーのフロー（ログイン → 投稿など）を Playwright/Cypress で確認。
4. カバレッジ：ユニット／統合の実行で得られる「行・分岐・関数」カバレッジを重視。E2E からもカバレッジを取れるけど設定が追加で必要。
   目標設定：総合 80〜90% が現実的。重要なロジックは branch coverage を高めにする（例えば branches ≥ 80%）。

## どの指標を見るべき？

1. lines / statements（行）：基本。
2. branches（分岐）：if/switch などの網羅性。バグ検出力高いから重要。
3. functions（関数）：ユニットでの網羅感。
4. （必要なら）path / condition：超厳密。普通はやらないことが多い。

優先度：branches ≈ lines > functions > statements（プロジェクト次第）

## ツールとセットアップ（Next.js 向けの定番）

### ユニット/コンポーネント

Jest（next/jest で Next 特有の設定を扱いやすく）＋ @testing-library/react。
あるいは Vitest（高速、Vite ベース。最近人気）

### E2E

Playwright（おすすめ） or Cypress

### カバレッジ計測

- Jest の --coverage（内部で Istanbul を使う）
- Vitest の --coverage（c8/istanbul 出力）
- E2E からカバレッジを取る場合：nyc + Cypress/Playwright の coverage plugin（ブラウザで実行される JS をフックして収集）

### 追加

型付き（TypeScript）の場合 ts-jest or vitest で ts 対応

babel-jest / next/jest を使うと Next のモジュール解決が楽

よくある設定例（テンプレ）
（コピーして使える簡単な例を置いとくよ）
Jest（next/jest）向けのカバレッジ設定例

```js
// jest.config.js
const nextJest = require("next/jest");
const createJestConfig = nextJest({ dir: "./" });

const customJestConfig = {
  testEnvironment: "jsdom",
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{js,ts,tsx}",
    "!src/**/__tests__/**",
    "!src/**/?(*.)+(spec|test).{js,ts,tsx}",
    "!src/pages/_app.{js,ts,tsx}",
    "!src/pages/_document.{js,ts,tsx}",
    "!src/**/types/**",
    "!src/**/mocks/**",
  ],
  coverageDirectory: "coverage",
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 85,
      lines: 85,
      statements: 85,
    },
  },
};

module.exports = createJestConfig(customJestConfig);
```

Vitest（vite）向けの例（vite.config.ts に設定）

```js
// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    coverage: {
      provider: "istanbul",
      reporter: ["text", "lcov"],
      reportsDirectory: "coverage",
    },
    globals: true,
  },
});
```

### Next.js 特有の注意点

next/image や next/link、next/router のモックを用意するとテストがラク。next/jest 使うとある程度助けてくれる。

サーバーコンポーネント（Next 13+ の app ディレクトリ）：クライアント側で実行できないロジックはユニットで直接関数を呼ぶか、統合テストで API 風に扱う。レンダリング検証は少し工夫が必要（SSR レンダリングの差分など）。

pages/api（API Route） はユニットで req/res をモックしてテスト可能。supertest と組み合わせても良い。

ビルド生成ファイル（.next）や types・定数ファイル は coverage 対象から外すのが普通。

### E2E でカバレッジを取りたいとき

E2E（Cypress/Playwright）単体だとブラウザ実行の JS を計測する仕組みが必要。一般的には:

istanbul（または nyc）のエージェントをブラウザバンドルに組み込む

テスト実行中に coverage 情報をサーバーに送ってマージする

設定はやや面倒だけど、ユーザーフローでの未テストコードを把握できるから価値あり。

## 現場での実践 Tips

1. まずは重要なロジックの branch coverage を上げる（分岐ミスがバグになること多い）
2. 100% を目指さない：外部ライブラリラッパー、型定義ファイル、自動生成ファイルは除外してコスパ良く。
3. CI に coverage 閾値を入れる：coverageThreshold で PR 却下ラインを自動化。だだし低めの値から始めて徐々に上げる。
4. Mutation testing（Stryker） を導入するとテストの有効性が見えるけどコスト高め。興味があれば導入もアリ。
5. Storybook と連携して UI のスナップショット/視覚的テストを補強するのもおすすめ。
