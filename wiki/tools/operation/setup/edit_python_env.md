# Python 環境変数変更

```text
macに元から入ってるpythonがあるでしょ。あれはバージョンが3.9で古い。
homebrewで3.13を入れたんだけど、デフォルトのpython3コマンドが3.9を参照してるから、それを変えたい
```

結論から言うと **macOS標準の `/usr/bin/python3`（3.9）は置き換えられない** から、**PATHの順番で Homebrew の python を優先させる**のが正解だよ。

## まず現状確認

```bash
which python3
python3 --version
```

たぶん今は
`/usr/bin/python3`
`Python 3.9.x`
になってるはず。

## Homebrew の python 3.13 がどこにあるか確認

```bash
brew --prefix python
```

```
/opt/homebrew/bin/python3
```

## PATH を Homebrew 優先にする（ここが本命）

zsh使ってる前提で書くね（macのデフォルト）

### `~/.zshrc` を開く

```bash
vim ~/.zshrc
# もしくは
nano ~/.zshrc
```

### 先頭付近にこれを追加

```bash
export PATH="/opt/homebrew/bin:$PATH"
```

⚠ **`$PATH` の前に置くのが超重要**

## 反映

```bash
source ~/.zshrc
```

## 確認

```bash
which python3
python3 --version
```

ここで👇になれば勝ち🎉

```
/opt/homebrew/bin/python3
Python 3.13.x
```

## 補足（知ってると強い）

* `/usr/bin/python3` は SIP（System Integrity Protection）で守られてるから消したり差し替えは不可
* `brew link --overwrite python@3.13` は **macでは基本おすすめしない**
* pyenv使うほどじゃないなら、今回の PATH 調整が一番シンプルで安全

もし
「venv作るときも3.13にしたい」とか
「nodeみたいにバージョン切り替えたい」
ってなったら、そのときは pyenv の話もしよっか。
