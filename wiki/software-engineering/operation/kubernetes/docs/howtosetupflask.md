# 実際のコードベースにどう導入するか

もちろん、それはとても良いやり方です！Kubernetes（k8s）を学ぶとき、「実際のコードベースにどう導入するか？」という視点は非常に実践的で、理解が深まりやすいです。

以下のようなステップで進めるのがおすすめです：

## ステップ 1: 既存のリポジトリを選ぶ

自分の作った Web アプリや、GitHub 上のシンプルな Node.js/Django/Flask アプリなどを対象に選ぶ。

最初はモノリス構成の小さめなアプリがベスト。

## ステップ 2: Docker 化する

Kubernetes では基本的にすべてのアプリがコンテナとして動くので、まずは Dockerfile を書く。

### 例: Python Flask アプリの Dockerfile

```dockerfile
FROM python:3.10

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

CMD ["python", "app.py"]
```

## ステップ 3: Kubernetes マニフェストを用意する

Deployment や Service を書いて、Kubernetes 上でアプリを動かす準備をする。

`deployment.yaml`

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
name: flask-app
spec:
replicas: 1
selector:
matchLabels:
app: flask-app
template:
metadata:
labels:
app: flask-app
spec:
containers: - name: flask-app
image: your-dockerhub-username/flask-app:latest
ports: - containerPort: 5000
```

`service.yaml`

```yaml
apiVersion: v1
kind: Service
metadata:
name: flask-app-service
spec:
selector:
app: flask-app
ports: - protocol: TCP
port: 80
targetPort: 5000
type: LoadBalancer
```

## ステップ 4: Minikube や kind でローカルにクラスターを立てて動作確認

```sh
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml
kubectl get pods
kubectl get svc
```

## ステップ 5: 演習を通して理解を深める

スケーリングしてみる（replicas の数を変える）

Pod が落ちたときに自動復旧する様子を見る

ConfigMap や Secret を使って環境変数を渡してみる

必要であれば、簡単な演習用テンプレートのリポジトリも紹介できるよ。
やってみたいアプリのジャンルとかある？（例：ToDo アプリ、チャットアプリ、API サーバーなど）
