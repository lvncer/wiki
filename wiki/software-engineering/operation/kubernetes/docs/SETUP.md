# k8s SETUP

Kubernetes（K8s）を実行する方法はいくつかあります。
ローカル環境で試す方法と、本番環境向けのクラウド上で動かす方法があります。

## 1. ローカル環境で Kubernetes を実行する

ローカル PC で K8s を動かす場合、以下の方法が一般的です。

### (1) Minikube（初心者向け）

Minikube は、Kubernetes のシングルノードクラスタをローカル PC で実行するためのツールです。

#### インストール

Minikube をインストール（OS に応じて選択）。
[公式サイト](https://minikube.sigs.k8s.io/docs/)を参照。

Mac なら

```sh
brew install minikube
```

Windows なら

```cmd
choco install minikube
```

Linux なら

```sh
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64 && sudo install minikube-linux-amd64 /usr/local/bin/minikube
```

#### Minikube を起動

```sh
minikube start
```

これでローカルに Kubernetes クラスタが作成される。

#### クラスタの状態確認

```sh
kubectl get nodes
```

minikube というノードが表示されれば成功！

#### Pod のデプロイ（例: Nginx）

```
kubectl create deployment my-nginx --image=nginx
```

#### Service を作成して公開

```sh
kubectl expose deployment my-nginx --type=NodePort --port=80
minikube service my-nginx
```

これでローカルの Kubernetes クラスタで Nginx が起動し、ブラウザでアクセスできる。

### (2) Kind（Docker ベースで K8s を動かす）

Kind（Kubernetes IN Docker）は、Docker コンテナの中で K8s を動かすツールです。

#### インストール

Kind をインストール

Mac なら

```sh
brew install kind
```

Linux なら

```sh
GO111MODULE="on" go get sigs.k8s.io/kind@v0.17.0
```

#### クラスタ作成

```sh
kind create cluster --name my-cluster
```

これで Docker コンテナの中に Kubernetes クラスタが作成される。

#### ノード確認

```sh
kubectl get nodes
```

### (3) Docker Desktop（手軽に試したい場合）

Docker Desktop にも Kubernetes の機能が内蔵されており、設定を有効化するだけで動かせる。
手順

#### Docker Desktop をインストール

[Docker 公式サイト](https://www.docker.com/products/docker-desktop/)からダウンロード

#### Kubernetes を有効化

Docker Desktop の設定 → "Enable Kubernetes" にチェックを入れる

#### 起動確認

```sh
kubectl get nodes
```

## 2. クラウド環境で Kubernetes を実行する

本番環境では、クラウド上で K8s を運用するのが一般的。
各クラウドベンダーが Kubernetes を簡単に使えるサービスを提供している。

| クラウド | サービス名                     | コマンド例                         |
| -------- | ------------------------------ | ---------------------------------- |
| AWS      | Amazon EKS                     | `eksctl create cluster`            |
| GCP      | Google Kubernetes Engine (GKE) | `gcloud container clusters create` |
| Azure    | Azure Kubernetes Service (AKS) | `az aks create`                    |

例えば、GKE を使う場合：

```sh
gcloud container clusters create my-cluster --num-nodes=3
```

このコマンドで、GCP 上に Kubernetes クラスタが立ち上がる。

## 3. Kubernetes クラスタの管理

K8s を動かしたら、基本的な操作を覚えておくと便利。

### クラスタの情報を確認

```sh
kubectl cluster-info
```

### ノード一覧を取得

```sh
kubectl get nodes
```

### デプロイメントを作成

```sh
kubectl create deployment my-app --image=nginx
```

### Pod の一覧を取得

```sh
kubectl get pods
```

### Pod のログを確認

```sh
kubectl logs <POD 名>
```

### Pod にアクセス（デバッグ用）

```sh
kubectl exec -it <POD 名> -- /bin/sh
```

## まとめ

ローカル環境で試すなら

- Minikube（初心者向け、簡単）
- Kind（Docker を活用）
- Docker Desktop（簡単に K8s を試したい場合）

クラウドで運用するなら

- AWS EKS
- GCP GKE
- Azure AKS

まずは Minikube や Docker Desktop でローカル環境を作って試し、慣れてきたらクラウドで本番運用するのがおすすめ！
