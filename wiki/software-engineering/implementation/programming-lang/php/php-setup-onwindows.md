# PHP環境構築

## 想定環境

- Windows 11
- PHP 8.2
- Powershell

## 手順

[PHPのインストール](https://windows.php.net/downloads/releases/php-8.2.28-Win32-vs16-x64.zip)

ディレクトリの移動

`C:\php\php-8.2` を作成する

そこに先ほどダウンロードしたPHPを解凍して配置する

環境変数のパスを通す

windowsならシステムのプロパティから環境変数を選択

上のユーザー環境変数からPathを選択して編集

新規を押して `C:\php\php-8.2` を追加する

環境変数が通ったか確認する

powershellを開き

```cmd
php -v
```

と入力する

```cmd
PHP 8.2.x (cli) (built: xxxx-xx-xx) ( ZTS Visual C++ 2019 x64 )
```

こんな感じの文章が出てくればOK

HelloWorldをやってみる

`C:/php/php-8.2/helloworld/src/index.php` を作成し以下のコードを貼る

```php
<?php
echo "Hello World!";
>
```

サーバーを立ち上げる

powershellで `C:/php/php-8.2` に移動し、

```cmd
php -S localhost:8000
```

と入力

```cmd
PHP 8.2.28 Development Server (http://localhost:8080) started
```

こんな感じの文章が表示されればOK

Webで確認する

`http://localhost:8000/helloworld/src` で検索し、 `Hello World` と表示されればOK
