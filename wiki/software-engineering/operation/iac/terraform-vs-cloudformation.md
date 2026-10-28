# terraformとcloudformationの違いは？

TerraformとCloudFormationはどちらもインフラストラクチャをコード（IaC）として管理するツールですが、いくつかの重要な違いがあります。

## 1. 提供元

- Terraform：HashiCorp社が開発。オープンソース。
- CloudFormation：AWSが提供する公式ツール。AWS専用。

## 2. マルチクラウド対応

- Terraform：AWS、GCP、Azureなどマルチクラウドに対応。
- CloudFormation：AWS専用。

## 3. 言語・記述形式

- Terraform：独自のHCL（HashiCorp Configuration Language）。YAML風で読みやすい。
- CloudFormation：JSONまたはYAMLで記述。YAML推奨だが長くて冗長になりやすい。

## 4. 再利用性・モジュール化

- Terraform：モジュール化が非常に柔軟。再利用・共有が簡単（例：Terraform Registry）。
- CloudFormation：テンプレートのネストやマクロなどはあるが、Terraformに比べて柔軟性が低い。

## 5. 状態管理

- Terraform：状態ファイル（state）をローカルまたはリモートに保存して管理。
- CloudFormation：AWS側でスタック情報を管理。状態ファイルは不要。

## 6. コミュニティとエコシステム

- Terraform：活発なコミュニティと多くのProvider（拡張）。
- CloudFormation：AWS中心でエコシステムは限られる。

## まとめ（ざっくり）

| 特徴 | Terraform | CloudFormation |
| 提供元 | HashiCorp | AWS |
| 対応クラウド | マルチクラウド | AWSのみ |
| 言語 | HCL | YAML / JSON |
| モジュール化 | 柔軟・再利用性が高い | やや制限あり |
| 状態管理 | 手動 / リモート選択可 | AWSが自動管理 |
| 学習コスト | 中〜 | 低〜中 |

どちらを選ぶかは、AWS専用で完結したいか、マルチクラウドや再利用性を重視するかで分かれます。
