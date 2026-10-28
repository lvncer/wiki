# k8s 重要用語

Kubernetes では、さまざまなリソース（オブジェクト）を使ってコンテナを管理します。重要な用語を解説します。

## 1. Pod（ポッド）

Pod は Kubernetes の基本的なデプロイメント単位で、1 つ以上のコンテナをまとめて管理します。
コンテナ単体ではなく、Pod としてデプロイするのが Kubernetes の特徴です。

### 特徴

- 1 つの Pod に 1 つ以上のコンテナを含めることができる（通常は 1 つ）。
- 同じ Pod 内のコンテナは同じネットワーク（localhost）を共有する。
- Pod は短命（使い捨て）で、削除されることを前提に設計されている。

### Pod の例

Nginx を 1 つの Pod としてデプロイするマニフェスト:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: my-nginx
spec:
  containers:
    - name: nginx-container
      image: nginx:latest
      ports:
        - containerPort: 80
```

適用コマンド：

```sh
kubectl apply -f pod.yaml
```

## 2. Node（ノード）

Kubernetes クラスタを構成するサーバー（物理 or 仮想）です。

- Kubernetes は複数のノード（Worker Node）で構成される。
- 各 Node の上で Pod が動作する。
- Master Node（コントロールプレーン）はクラスター全体を管理する役割を持つ。

### 構成例

```text
+--------------------------------------------------+
| Master Node                                      |
|    API Server                                    |
|    Scheduler                                     |
|    Controller Manager                            |
+--------------------------------------------------+
| (管理)
+----------------------------------+ +----------------------------------+
| Worker Node 1                    | | Worker Node 2                    |
|    kubelet                       | |    kubelet                       |
|    Pod (nginx)                   | |    Pod (app)                     |
|    Pod (database)                | |    Pod (backend)                 |
+----------------------------------+ +----------------------------------+
```

## 3. Service（サービス）

Pod のネットワークアクセスを管理するリソースです。
Pod は動的に作成・削除されるため、IP アドレスが変わる。

Service を使うと、Pod の変更に関係なく固定のエンドポイントを提供できる。

### Service の例

Nginx の Pod に対して、外部からアクセスできるようにする

```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-nginx-service
spec:
  selector:
    app: my-nginx
  ports:
    - protocol: TCP
      port: 80 # Serviceが公開するポート
      targetPort: 80 # Pod内のポート
  type: LoadBalancer # 外部アクセスを可能にする
```

適用後のアクセス方法:

```sh
kubectl get services
```

これで、my-nginx-service に固定 IP が割り当てられる。

> **注意**: `type: LoadBalancer` はクラウド環境（AWS、GCP、Azure など）で利用可能です。ローカル環境（minikube など）では `type: NodePort` を使用するか、ポートフォワーディングを使用します。

## 4. Deployment（デプロイメント）

Pod の管理（スケーリング・ローリングアップデート）を行うリソース。
手動で Pod を作成する代わりに、Deployment を使うと自動管理できる。

- レプリカ数（replicas）を指定して Pod を複製できる。
- 古いバージョンの Pod を新しいバージョンに置き換える（ローリングアップデート）。

### Deployment の例

Nginx の Pod を 3 つ作成し、管理する Deployment:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  replicas: 3 # Podを3つ作成
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
        - name: nginx-container
          image: nginx:latest
          ports:
            - containerPort: 80
```

適用コマンド：

```sh
kubectl apply -f deployment.yaml
```

これにより、Nginx の Pod が 3 つ作成され、自動的に管理される。

## 5. ConfigMap & Secret（設定管理）

### ConfigMap

環境変数や設定ファイルを管理するオブジェクト。
コンテナ内に設定を埋め込まず、外部から設定できる。

例（ConfigMap 作成）：

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: my-config
data:
  APP_ENV: "production"
  LOG_LEVEL: "debug"
```

### Secret

パスワードや API キーなどの機密情報を管理するオブジェクト。
Base64 エンコードされたデータを保存できる。

例（Secret 作成）：

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: my-secret
type: Opaque
data:
  password: c2VjcmV0UGFzc3dvcmQ= # "secretPassword" をBase64エンコード
```

## まとめ

| 用語       | 説明                                           |
| ---------- | ---------------------------------------------- |
| Pod        | コンテナをまとめて管理する最小単位             |
| Node       | Pod を実行するサーバー（物理・仮想）           |
| Service    | Pod に固定 IP を割り当て、外部と通信可能にする |
| Deployment | Pod の作成・更新・スケーリングを管理する       |
| ConfigMap  | 設定情報を外部管理する                         |
| Secret     | 機密情報（パスワード、API キー）を管理する     |

これらを組み合わせて、Kubernetes は柔軟なコンテナ管理を実現します！
