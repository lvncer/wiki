---
title: "基本構成" # gen_index
---

# 基本構成

- Namespace で環境を分離して
- ConfigMap で設定を管理して
- PostgreSQL をデータベースとして動かして
- Nginx を 3 つのレプリカで動かす

## ディレクトリ構成

```sh
k8s-practice/
├── namespace.yaml
├── configmap.yaml
├── postgres-deployment.yaml
├── postgres-service.yaml
├── web-deployment.yaml
├── web-service.yaml
└── README.md
```

## First Step

```bash
kubectl get pods -n practice -w
```
