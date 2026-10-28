# シェルエイリアスの設定方法

ほとんどの場合、以下のファイルを編集することになります。

Bash の場合: ~/.bashrc または ~/.bash_profile
Zsh の場合: ~/.zshrc

## 1. シェル設定ファイルを開く

まず、お使いのシェルに対応する設定ファイルをテキストエディタで開きます。

例えば、Zshを使っている場合は、ターミナルで以下を実行します。

```Bash
# Zsh の場合
code ~/.zshrc # VS Code を使っている場合
# または
open ~/.zshrc # Mac の場合
# または
nano ~/.zshrc # シンプルなエディタ nano を使う場合
```

Bashの場合は~/.bashrcを開きます。

```Bash
# Bash の場合
code ~/.bashrc
```

## 2. エイリアスを追加する

ファイルの一番下など、任意の場所に以下の行を追加します。

```Bash
# Bun の dev コマンドを短縮するエイリアス
alias b="bun"
alias bdev="bun run dev" # または "bdev": "next dev"
```

解説:
alias b="bun": これにより、ターミナルでbunと入力する代わりにbと入力できるようになります。
alias bdev="bun run dev": これにより、bun run devと入力する代わりにbdevと入力できるようになります。
これで、b dev と入力して起動できるようにする方法です。

```Bash
# Bun の dev コマンドを 'b dev' で実行できるようにするエイリアス
# 'b' が 'bun' のエイリアスとなるので、結果的に 'bun dev' が実行されます。
alias b="bun"
```

この設定の場合、package.jsonのscriptsに"dev": "next dev"が定義されていれば、b devと入力するだけでbun dev（つまりnext dev）が実行されます。
package.jsonに"dev": "next dev"が既にある場合は、alias b="bun"だけで目的は達成できますね。

## 3. 設定を反映する

ファイルを保存したら、設定を現在のターミナルセッションに反映させるために、以下のコマンドを実行します。

```Bash
# Zsh の場合
source ~/.zshrc

# Bash の場合
source ~/.bashrc
```

または、ターミナルを一度閉じて再度開いても反映されます。
これでどうなったか？
設定が完了すると、ターミナルで次のように入力するだけで、Next.jsの開発サーバーが起動するようになります。

```Bash
b dev
```
