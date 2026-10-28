# Colima

結論から言うと **colima運用、全然アリ**。むしろエンジニア的にはかなり“わかってる選択”だと思うよ。

ちょっと整理するね👇

## Colima × brew Docker の正直な評価

### 良いところ

* **Docker Desktop不要**

  * ライセンス気にしなくていいのデカいよね

* **軽い・静か**

  * 常駐しててもファン回らないの最高

* **CLIだけで完結**

  * `docker`, `docker compose` 普通に動く

* **k8sも一応いける**

  * `colima start --kubernetes` とか

### 気になるところ（正直ポイント）

* **GUIない**

  * コンテナ可視化したいときは
    → `lazydocker` とか入れると幸せ

* **たまに詰まる**

  * ネットワークとかVolume周りで
    「ん？」ってなることはDesktopより多い

* **初心者向けではない**

## 自動起動してる件について

これも **全然OK**
むしろ実務だとアリ寄り。

おすすめ設定はこんな感じ👇

```bash
colima start --cpu 4 --memory 8 --disk 60
```

あと起動確認はこれで一瞬👇

```bash
docker info | grep -i colima
```

mac起動時に立ち上げてるなら、

* 毎回 `docker compose up` で悩まない
* 開発環境が即使える

って意味では **正解ムーブ**✨

## Desktopと比べた結論

| 観点      | Docker Desktop | Colima |
| ------- | -------------- | ------ |
| 手軽さ     | ◎              | △      |
| 軽さ      | △              | ◎      |
| ライセンス   | ✕              | ◎      |
| エンジニア好み | △              | ◎      |

## ぶっちゃけ私の意見

* **個人開発 / スタートアップ / エンジニア用途**
  → **Colimaで十分すぎる**
* **チームで初心者多い**
  → Desktopの方が平和

今の構成で困ってないなら、
「変える理由がない」ってやつだね

もし

* volume遅い
* composeで詰まってる
* Colimaのおすすめオプション知りたい

## Trouble Shooting

```
brew services list
Name   Status  User  File
colima started  ~/Library/LaunchAgents/homebrew.mxcl.colima.plist
mysql  started  ~/Library/LaunchAgents/homebrew.mxcl.mysql.plist
docker-compose -f compose.yml -f compose.override-dev.yml up --build
unable to get image '': Cannot connect to the Docker daemon at unix:///Users/.colima/default/docker.sock. Is the docker daemon running?
```

`brew services list` だと colima が started になってるのに、docker がその sock に繋がらないやつ。

だいたい原因はどっちかだよ👇

## 1. docker CLI が colima の context じゃない

今どの context 使ってるかチェック：

```
docker context ls
```

`colima` が `*` になってなかったら切り替える：

```
docker context use colima
```

## 2. colima の docker engine が死んでる

colima running でも daemon 止まってる時あるんよね（まじ紛らわしい…😇）

```
colima stop
colima start
```

一旦再起動で治ること多い

## 3. compose が desktop 側参照してる

`docker-compose` 古いほうだと context 無視して mac の desktop 見に行くことある
新しい方 (`docker compose`) のほうが相性いい

試しに：

```
docker compose up --build
```

（compose と compose.yml は勝手に拾う）

## 4. sock の場所ずれ

エラーメッセージ見るに colima の sock は：

```
/Users/kihhi/.colima/default/docker.sock
```

環境変数合ってるか確認：

```
echo $DOCKER_HOST
```

もしなんか別の値だったら：

```
unset DOCKER_HOST
```

## 補足で一応…

colima の docker が動いてるか：

```
colima status
```

## 個人的予想

これは context か compose で desktop 側参照してる説濃厚。
colima 初回導入はいいんだけど、compose + Desktop 併用歴あると結構競合するｗ

もし良かったら：

* `docker context ls`
* `colima status`
* compose のバージョン (`docker compose version`)
* docker のバージョン (`docker version`)
