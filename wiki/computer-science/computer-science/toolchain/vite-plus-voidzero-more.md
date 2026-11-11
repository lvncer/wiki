## VoidZero とは

VoidZeroはEvan You（Vue.jsの作者）が2024年9月に創業したアメリカの会社で、本社はカリフォルニア州パロアルトにある。
JavaScriptエコシステムの次世代ツールチェーンを作ることに特化してるんだ。

OpenAI、Shopify、Stripe、Cloudflare、Hugging Face、Mercedes-Benzとかの大企業がすでにVoidZeroのOSSツールを使ってる。
めちゃくちゃ大きいね！

## Vite一族（VoidZeroが管理するプロジェクト群）

VoidZeroって実は複数の有名ツールの生みの親・管理者なんだよ。これが「Vite一族」って感じ：

| ツール | 役割 |
|--------|------|
| **Vite** | 爆速な開発サーバー＆ビルドツール |
| **Vitest** | Vite連携のテストフレームワーク |
| **Rolldown** | Rollupの後継となる高速バンドラー（Rust製） |
| **Oxc** | Rust製のJS/TSパーサー・リンター・フォーマッター群 |
| **Oxlint** | Oxcに含まれるリンター |
| **Oxfmt** | Oxcに含まれるフォーマッター（Prettier互換） |
| **tsdown** | ライブラリ向けバンドラー |

2025年にかけてViteエコシステム全体をRolldownとOxcで動かすように移行する計画がある。

## Vite+ とは

Vite+は2025年10月12日に発表された、JavaScript/TypeScript向けのオープンソース統合ツールチェーン。
CLIは`vp`一本で、Vite（Rolldown搭載）、Vitest、Oxlint、Oxfmt、tsdownなどをまとめて使えるようにしたもので、「JavaScriptのCargo」を目指してる。

ViteConf 2025（アムステルダム）で発表されて、webpack・Babel・ESLint・Prettier・Jestなどを置き換える単一CLIとして位置づけられてる。
Framer、Linear、Atlassian、Shopifyなどですでに本番稼働中。

## ESLint vs Oxlint

これ、どっちも**リンター**（≠フォーマッター）ね。

**ESLint**
- JavaScriptの業界標準リンター、2013年から存在
- プラグインエコシステムが超充実
- ただしNode.js製なので遅い

**Oxlint**
- Rust製でVoidZeroチームが管理するOxcの一部。ESLintの**50〜100倍速い**、Biomeの約**2倍速い**。
- ESLintからの移行サポートも強く、CI環境での高速lintに特化してる。

## 🤔 「toolchain」と呼べる？

- **ESLint単体** → ❌ toolchainとは言わない。あくまで「linter（リンター）」
- **Oxlint単体** → ❌ 同様にlinterのみ
- **Oxc全体** → ⭕ パーサー・リンター・フォーマッターを含むので「toolchain」に近い
- **Vite+** → ✅ ビルド・テスト・lint・format・バンドルまでをCLI一本でカバーする、まさに統合ツールチェーン

## 🌿 Biome に入ってるのはどっち？

BiomeはRome Toolsのコミュニティフォークとして2023年に誕生。
Rust製で、lintとformattingを**1ツール**でカバーする。

つまり…

- BiomeのリンターはESLintとも**Oxlintとも別物**（独自実装）
- Biome = lint + format、Oxlint = lintのみ（formatはしない）

BiomeはESLint・Prettierをまとめて置き換えようとしてるツールで、Oxlintとは**コンセプトが違う競合**って感じ！

まとめると：**Vite+ ⊃ Oxlint（一族の一員）**、**Biome は別の流派**って覚えるといいかも😄 わかりにくいとこあったら聞いてね！

<img width="1472" height="1480" alt="image" src="https://github.com/user-attachments/assets/a5bfcad7-5a41-403e-a86d-44eb8b1ffbbc" />

ちょっと図にするね！ポイントをざっくり補足するね！

**構造の読み方**
- 一番外の枠が **VoidZero社** 全体
- その中の水色枠が **Vite+**（CLIは `vp` 一本）
- 紫の枠が **Oxc**（Vite+に内包されてる）
- Oxcの中に **Oxlint**（リンター）と **Oxfmt**（フォーマッター）がいる

**「toolchain」問題**
- ESLint単体・Oxlint単体 → ❌ ただの「リンター」
- Biome → lint+formatをまとめた「ツール」だけど厳密には一族じゃない独立派
- **Vite+** → ✅ build/test/lint/format/bundleを全部カバーする本物のtoolchain

**Biomeに入ってるのは？**
- BiomeはOxlintでもESLintでもなく**独自実装のlinter**が入ってる
- Rome Toolsのフォーク由来で、VoidZero一族とは完全に別血筋

ノードをタップするともっと詳しく聞けるよ〜！気になるとこあったら聞いて！

ちょっと調べるね！答えは**ノー**！

BunにはDenoと違って組み込みのlinterもformatterも内蔵されてない。なので使うときはESLintとかOxlint・Biomeを別途入れる必要があるよ。

ちなみに比較するとこんな感じ：

| ランタイム | Linter内蔵 | Formatter内蔵 |
|---|---|---|
| **Deno** | ✅ (`deno lint`) | ✅ (`deno fmt`) |
| **Node.js** | ❌ | ❌ |
| **Bun** | ❌ | ❌ |

Denoは組み込みのlinterとformatterを持っていて、完全な開発環境をすぐに使えるのが強み。Node.jsとBunはそういった機能がなくて外部ツールに頼る形になってる。

あとちょっと面白い話として、Bunは2025年12月にAnthropicに買収されてて、Claude Codeのサポートに使われてるんだって。なんか身近な感じがするね笑

Bunでlintしたいなら今のところ **Oxlint** か **Biome** がおすすめって感じかな！

調べるね！わかった！まとめるね。

**Next.jsのデフォルトはESLint**だよ。

Next.jsは`eslint-config-next`というESLint設定パッケージを提供していて、これに`@next/eslint-plugin-next`・`eslint-plugin-react`・`eslint-plugin-react-hooks`のおすすめルールセットが含まれてる。

設定のバリエーションはこんな感じ：

| 設定 | 内容 |
|---|---|
| `eslint-config-next` | ベース。Next.js・React・React Hooksのルール |
| `eslint-config-next/core-web-vitals` | ベース＋Core Web Vitals関連をwarning→errorに格上げ。**ほとんどのプロジェクトにおすすめ** |
| `eslint-config-next/typescript` | TypeScript専用ルールを追加（上2つと併用） |

ただ、Next.js 16から`next lint`コマンドが削除されて、`next.config`の`eslint`オプションも不要になった。ちょっと変化してるところに注意ね。

OxlintやBiomeに乗り換えたい場合は、Next.js専用のeslint-plugin-nextがOxlintで使えるかどうかがまだ課題で、プラグインエコシステムのギャップがあるから、今のところESLintと併用する形が現実的かな。

要するに「Next.js ≈ ESLint前提」の設計はまだ続いてる感じ！
