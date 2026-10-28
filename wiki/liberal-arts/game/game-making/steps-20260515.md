# game-making first steps ver20260515

最初の一本は [itch.io](https://itch.io/?utm_source=chatgpt.com) がかなり合ってると思う。

特に君みたいに：

* アイデア寄り
* 小さく試したい
* コード主体
* weird系向いてそう

なタイプは相性いい。
じゃあ、

「Godot → itch.io 公開」

までの実戦フローを、かなりリアル寄りに書くね。

## 全体像

1. Godot導入
2. Git管理
3. プロトタイプ
4. 最低限完成
5. Export
6. itch.ioページ作成
7. アップロード
8. SNS投稿

## 1. Godotインストール

まず：

[Godot公式](https://godotengine.org/download/)

### バージョン

Godot 4.x 系。
.NET版じゃなく普通版でいい。
最初は `Standard Version`` 推奨。

## 2. プロジェクト作成

Godot起動。
`New Project`

### Renderer

最初は `Mobile` おすすめ。
軽い。

## 3. Git管理

プロジェクト作ったら即。

```sh
git init
git remote add origin ...
```

ここ普通のWeb開発。

## 4. 最初に作るもの

重要。
「ゲーム本編」じゃない

まず：

* 起動
* タイトル
* START
* 終了

だけ。

### 最小完成形

```txt
起動
↓
タイトル
↓
遊べる
↓
終わる
```

これ。

## 5. Prototype作る

ここ超大事。

### 例えば

#### UI監視ゲームなら

* ボタン
* カメラ切替
* 異変表示

だけ。

#### ホラーなら

* 歩く
* 音
* 暗い
* 終了

### この段階では

* アート
* 演出
* メニュー

いらない。

## 6. 仮素材を入れる

おすすめ：

### 無料アセット

* Kenney
* itch.io free assets

### AI画像でもOK

最初は `とにかく動く` が正義。

## 7. 音を入れる

ゲーム、
音で急にゲームになる。

### 最低限

* ボタン音
* 足音
* ambient

だけでも変わる。

## 8. itch.io 向けに Export

Godot：

```txt
Project
↓
Export
```

### Export Template

初回だけDL。

## 9. Windowsビルド

追加。
`Windows Desktop`

### Export

`builds/game.exe` 生成。

## 10. zip化

itch.io は `game.zip` で上げる。

## 11. itch.ioアカウント

作成：

[itch.io Signup](https://itch.io/register?utm_source=chatgpt.com)

## 12. Create new project

`txt
Dashboard
↓
Create new project
```

## 13. ページ設定

ここかなり大事。

### 必須

* タイトル
* サムネ
* 説明
* スクショ

### 君向けに重要なの

#### “雰囲気”

Steamよりさらに：

* weird
* 不穏
* 独特

が強い。

## 14. Upload files

```txt
Upload files
↓
game.zip
```

## 15. ブラウザ対応も可能

Godot：

```txt
Web Export
```

できる。

### 強み

DL不要。
クリック即プレイ。
かなり強い。

## 16. 公開

```txt
Visibility:
Public
```

で公開。

## 17. SNS投稿

超重要。

### 何を投稿する？

ゲーム説明じゃなく：

* weirdな瞬間
* 不気味な瞬間
* バグっぽい挙動
* 面白いUI

をGIF化。

## 18. devlog

itch には `devlog` 機能ある。

### 強い

* 制作途中見せられる
* ファンできる
* モチベ維持

## 君におすすめの戦略

かなり向いてそう。

## 最初の作品

### 「10分で終わる」

これ。

## さらに

### “1ルールだけ”

にする。

例えば：

* 監視する
* 嘘を見抜く
* ルールを書き換える
* 音だけ聞く

とか。

## 技術的おすすめ

| 項目        | おすすめ     |
| --------- | -------- |
| Engine    | Godot    |
| 言語        | GDScript |
| Version管理 | GitHub   |
| 配布        | itch.io  |
| アセット      | 無料 + AI  |
| 画面        | 低解像度     |

## 個人的にかなり大事だと思うこと

最初は：

> 「面白いゲームを作る」

じゃなく、

> 「最後まで出す」

を優先した方がいい。

ゲーム開発って、完成経験の有無でマジで別世界になる。
