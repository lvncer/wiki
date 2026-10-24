# Biome Commands

## ✦ **format**

> **コードを自動で綺麗に整形するやつ**

例：

* インデント直す
* 余計なスペース消す
* `"` を `'` に統一
* 改行とか揃える

**意識ポイント**

* **自動で修正できる系**
* eslintでいう prettier 役

## ✦ **lint**

> **コードの書き方やベストプラクティスをチェック＆直せる範囲は直す**

例：

* 未使用変数
* 不要な import
* 危ない構文
* style の一部

**修正できるものは autofix もある**
例：`unused var` 削除とか import 並べ替えとか

**eslint** の “ルールチェック＋一部fix” に近い

## ✦ **check**

> **format + lint + その他解析をまとめて走らせる総合診断**

例：

* フォーマット
* リント
* 依存関係のチェック
* JSONやCSSとか複数言語一気に見る

実際 `check` が最終的にCIでもよく使われる感じ
（ただfixしないようにもできる）

# ✦ 分かりやすく一言で言うと

```
format = 見た目キレイにする
lint    = ダメな書き方注意する
check   = まとめて健康診断
```

## ✦ よくある運用

本番前CI：

```
biome check
```

ローカル保存時：

```
biome format --write
```

VSCode保存hook：

```
format + autofix
```

## ✦ 例えるなら…

format → 髪セット
lint → 身だしなみチェック
check → 健康診断（髪も見る）
