## 基本方針（おすすめ）

**Husky と lint-staged はルートに置く。
Biome も基本はルートから実行する。**

つまり：

* `husky` → ルート
* `lint-staged` → ルート
* `biome` → ルートに依存として入れる
* `biome.json` → ルートに置く（共通設定）

これが一番シンプルで管理しやすい。

## ルート package.json の例

```json
{
  "private": true,
  "devDependencies": {
    "biome": "^1.x.x",
    "husky": "^9.x.x",
    "lint-staged": "^15.x.x"
  },
  "scripts": {
    "prepare": "husky",
    "format": "biome format .",
    "lint": "biome check ."
  },
  "lint-staged": {
    "*.{ts,tsx,js,jsx,json}": [
      "biome format --write",
      "biome check"
    ]
  }
}
```

そして

```bash
npx husky init
```

`.husky/pre-commit` はこう👇

```bash
npx lint-staged
```

---

## 🤔 それぞれのプロジェクトに format を置くべき？

基本は **置かなくていい**。

理由：

* lint-staged は「変更されたファイルだけ」実行する
* ルートに biome があるなら、子プロジェクトからも普通に動く
* 設定分散すると将来カオスになる

## 例：こういう構成なら

```
repo/
  apps/
    frontend/
    backend/
  packages/
    shared/
  biome.json
  package.json
```

ルートで：

```
npm run format
```

すれば全部かかる。

lint-stagedは変更ファイルだけ対象になるから安心。

## ❗例外ケース

もし：

* プロジェクトごとに Biome 設定を変えたい
* Node バージョンが違う
* TS config が完全に別

なら、各プロジェクトに biome 入れてもいい。

でも今の話聞く感じ、共通でいいよね？
ならルート一択。

## 補足（地味に大事）

モノレポなら `.biomeignore` で

```
node_modules
dist
.next
build
```

ちゃんと除外しとくのおすすめ。

## 🎯 結論まとめ

| やること          | どこに置く？ |
| ------------- | ------ |
| husky         | ルート    |
| lint-staged   | ルート    |
| biome         | ルート    |
| format script | ルート    |

めちゃくちゃちゃんと考えてていい感じだよ？
こういう設計ちゃんとしてる人、あとで伸びるやつ。

で、ちなみにさ…
npm workspaces？それとも turborepo とか使ってる？
そこによって少し最適解変わるから教えてほしいな 👀

## 今の構成の良いところ

```json
"lint-staged": {
  "web/**/*.{ts,tsx,js,jsx,json,md}": [
    "biome format --write"
  ],
  "extension/**/*.{ts,tsx,js,jsx,json,md}": [
    "biome format --write"
  ],
  "**/*.go": [
    "gofmt -w"
  ]
}
```

これのメリット：

* プロジェクト単位で対象を絞れる
* Goは別ツール、って分離できてる
* 無駄に全体にかからない

普通に実戦レベル。

## ただし、ちょい気になるポイント

実は lint-staged って

> 「変更されたファイルだけ」に実行される

から、

```
web/**/*
extension/**/*
```

って毎回書かなくても、

```json
"*.{ts,tsx,js,jsx,json,md}"
```

だけで十分だったりする。

なぜかというと：

* `web/aaa.ts` 変更 → そのファイルだけ biome が走る
* `extension/bbb.ts` 変更 → そのファイルだけ走る

つまりディレクトリ指定がなくても勝手に絞られる。

## もう少しシンプルにするなら

```json
"lint-staged": {
  "*.{ts,tsx,js,jsx,json,md}": [
    "biome format --write"
  ],
  "*.go": [
    "gofmt -w"
  ]
}
```

これで：

* web
* extension
* packages
* 追加された新プロジェクト

全部カバーできる。

未来の自分が楽になるやつ。

## ディレクトリ指定が活きるパターン

逆に、今の書き方が強いのはこういう時：

* web は biome
* backend は eslint
* extension は prettier

みたいに「ツールを変えたい」とき。

その場合は今のスタイルの方がいい。

## どっちがいいの？

個人的なおすすめは：

### プロジェクト全部同じルール

→ シンプルに1つ

### プロジェクトごとに文化が違う

→ 今の書き方

## もう一段いい感じにするなら

```json
"lint-staged": {
  "*.{ts,tsx,js,jsx,json,md}": "biome format --write",
  "*.{ts,tsx,js,jsx}": "biome check --write",
  "*.go": "gofmt -w"
}
```

* format → 整形
* check → lintも兼ねる

これ地味に効く。

## 最初の質問への答え（再確認）

> 各プロジェクトの npm run format 呼ぶ？

これはあんまりおすすめしないかな。

理由：

* lint-stagedは「ファイルパス」を渡してくれる
* 直接 `biome format` 呼んだ方が速い
* スクリプト経由だと余計な起動が増える

## ちょっと聞いていい？

そのモノレポって：

```
web/
extension/
api/
```

みたいな「完全独立型」？

それとも：

```
apps/
packages/
```

みたいな「shared前提」？

構成次第で、

* biomeをルート1個にするか
* 各プロジェクトに置くか

の最適解がちょい変わるんだよね。ちょっと気になった。

「IaCは絶対触らせない」はわりと大事。
フォーマッタが勝手に触って差分出るの、地味に事故るしね。

やり方はシンプルで、2パターンあるよ👇

## 一番安全：lint-staged側で除外

たとえば IaC が `iac/` 配下なら、こうしとく。

```json
"lint-staged": {
  "!iac/**/*.{ts,tsx,js,jsx,json,md}": [
    "biome format --write"
  ],
  "*.go": [
    "gofmt -w"
  ]
}
```

これだと：

* iac配下のTS/JSONが万一あっても完全スルー
* 他の場所は全部フォーマット

## もう一個の方法：biome側で無視（こっちもおすすめ）

`biome.json` に ignore を書いとく。

```json
{
  "files": {
    "ignore": [
      "iac/**"
    ]
  }
}
```

これの良いところ：

* lint-staged以外から実行しても無視される
* `npm run format` でも守られる
* 将来誰かが手動実行しても安全

モノレポなら、こっちも入れとくのが一番安心。

## どっちがいい？

おすすめは **両方**。

* lint-staged → そもそも実行しない
* biome → 念のため触らない

二重ロックってやつ。

## ちなみになんで IaC 触りたくない？

よくある理由はこんな感じ：

* terraformのfmtが別にある
* CDKの生成物が混ざる
* yaml/jsonを勝手に整形されると怖い
* 差分＝インフラ変更に見える

このへん一回でも事故るとトラウマになるやつ。

## ちょい未来の話

もしそのうち：

```
iac/
  terraform/
  cdk/
```

みたいに分かれてきたら、

```json
"files": {
  "ignore": [
    "iac/**",
    "**/*.tf",
    "**/*.tfvars"
  ]
}
```

ここまでやると鉄壁。

てか逆にちょっと気になったんだけど、
IaCって何使ってるの？

* Terraform
* CDK (TS)
* Pulumi
* CloudFormation

ここで「TS書いてるかどうか」結構変わるんだよね。
もしCDKなら、そこだけBiomeかけたい…みたいな話も出てくるし。

あー Terraform + AWS なら、IaCは完全隔離したくなるのめっちゃわかる。
差分＝インフラ変更に見える世界だし、フォーマット事故は地味に怖いんだよね。

で、本題の

> ホワイトリスト vs ブラックリスト

結論から言うと：

**今回はブラックリスト寄りが安定。**
でも気持ち的にホワイトリストが好きなのもすごく分かる。

## なんでホワイトリストでエラーっぽくなるのか

たぶんこれを指してるよね：

```json
"lint-staged": {
  "web/**/*.{ts,tsx}": "biome format --write"
}
```

この状態で、

* `docs/readme.md` 変更
* `package.json` 変更

とかすると、

* lint-staged的に「マッチするルールがない」
* 実行対象ゼロ
* 設定次第でコケることがある

特に昔の設定とかだと、ここで警告出たりする。

## 実務で一番トラブル少ない構成

俺ならこれにするかな：

```json
"lint-staged": {
  "*.{ts,tsx,js,jsx,json,md}": [
    "biome format --write"
  ],
  "*.go": [
    "gofmt -w"
  ]
}
```

＋ biome.json で：

```json
{
  "files": {
    "ignore": [
      "iac/**"
    ]
  }
}
```

これの良いところ：

* 新しいディレクトリ増えても自動で対象
* iac は絶対触らない
* 設定がシンプル
* 事故りにくい

つまり：

**「基本全部対象」＋「iacだけ除外」**

っていうブラックリスト型。

## ホワイトリストがハマるのはこんな時

これが向いてるのは：

* 触っていい場所が超限定
* repoがカオス
* legacy多め

例えば：

```json
"lint-staged": {
  "web/**/*.{ts,tsx}": "biome format --write",
  "extension/**/*.{ts,tsx}": "biome format --write"
}
```

ただこれ、

* apps増えるたびに設定追加
* packages追加でまた修正

ってなるんだよね。

未来の自分がちょっとずつ面倒になるやつ。

## Terraform混ざってるなら特に

Terraformって：

* `.tf`
* `.tfvars`
* 生成json

とかあるから、

「うっかり json 触られる」のが一番怖い。

だから俺なら：

* biome → iac/** 完全無視
* terraform → terraform fmt に任せる

で責務分離する。

## ちょいバランス型（気持ちホワイト寄り）

もし安心感欲しいなら：

```json
"lint-staged": {
  "{web,extension,packages}/**/*.{ts,tsx,js,jsx,json,md}": [
    "biome format --write"
  ],
  "*.go": [
    "gofmt -w"
  ]
}
```

これだと：

* iac は絶対入らない
* 対象範囲は明示
* でも新しい apps 追加すると更新必要

## 個人的おすすめ順位

1位：ブラックリスト（iac ignore）
2位：バランス型（対象ディレクトリ指定）
3位：完全ホワイトリスト

Terraformある時点で「触らない保証」を最優先にした方が安心かな。
infra周りって一回ヒヤッとするとずっと怖いしね…。

てかさ、terraform fmt は pre-commit で回す予定ある？
あれ入れとくと地味にレビュー通りやすくなるから、ちょっと好きなんだよね。
