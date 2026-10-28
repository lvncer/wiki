# Dockerfile vs Dockerfile.dev

Dockerfile.dev は、開発用に特化した Docker イメージを作成するための カスタム Dockerfile で、通常の Dockerfile（本番用）とは目的が異なります。

## Dockerfile とは？

Dockerfile は、Docker イメージを作成するための 設定ファイル です。
アプリケーションを動かすために必要な OS、ライブラリ、実行ファイルなどを定義します。

## Dockerfile.dev とは？

Dockerfile.dev は、開発環境用にカスタマイズされた Dockerfile です。

例えば以下のような違いがあります：

| 項目           | Dockerfile（本番）                 | Dockerfile.dev（開発）                 |
| -------------- | ---------------------------------- | -------------------------------------- |
| 不要なツール   | 含めない（軽量化）                 | 含める（デバッグやホットリロードなど） |
| コード         | COPY で静的に配置                  | volumes でローカルと同期して編集反映   |
| パフォーマンス | 最適化されている                   | 開発優先で遅くても OK                  |
| 例             | `npm run build` でビルド済みを使う | `npm run dev` でホットリロード         |

## 使い分け例

### Dockerfile（本番用）

本番用 Dockerfile

```dockerfile
FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

RUN npm run build

CMD ["npm", "start"]
```

### Dockerfile.dev（開発用）

開発用 Dockerfile

```dockerfile
FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# 開発用サーバー（例: Next.js, Vite）

CMD ["npm", "run", "dev"]
```

## 起動コマンド例

### 本番用イメージ作成と実行

```sh
docker build -t myapp-prod -f Dockerfile .
docker run -d myapp-prod
```

### 開発用イメージ作成と実行

```sh
docker build -t myapp-dev -f Dockerfile.dev .
docker run -v $(pwd):/app -p 3000:3000 myapp-dev
```

必要に応じて docker-compose.dev.yml などと併用することもあります。
もっと詳しく知りたい点があれば、教えてください！

## 本番用と開発用の docker-compose.yml の例

アプリは Node.js（例: Next.js や Express）を使っている前提です。

### 本番用 docker-compose.yml

```yaml
version: "3.8"

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile # 本番用の Dockerfile を指定
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    restart: always
```

### 開発用 docker-compose.dev.yml

```yaml
version: "3.8"

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile.dev # 開発用の Dockerfile を指定
    ports:
      - "3000:3000"
    volumes:
      - .:/app # ローカルのコードをコンテナにマウントしてホットリロード
      - /app/node_modules # node_modules はコンテナ内のものを使用
    environment:
      - NODE_ENV=development
    command: npm run dev # 開発用のコマンド
```

## 起動方法

### 本番用

```sh
docker-compose -f docker-compose.yml up --build
```

### 開発用

```sh
docker-compose -f docker-compose.dev.yml up --build
```

必要に応じて docker-compose.override.yml を使って開発と本番の設定を共存させる方法もあります。
他にも DB や Redis なども含めた複数サービスの例が見たい場合は、それも出せますよ！
