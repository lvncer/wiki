# Vercel 公開手順書

`lvncerpedia`(`.web/` の Next.js アプリ)を Vercel で公開するための手順。リポジトリ本体(`.scripts/`, `.github/`, `.obsidian/`, 9カテゴリフォルダ)は一切変更していないので、この手順だけで公開まで進められる。

---

## 0. 前提条件

- このリポジトリ(`lvncer/wiki` などの GitHub リポジトリ)が GitHub 上にプッシュ済みであること。
- [vercel.com](https://vercel.com) のアカウント(GitHub アカウントでサインアップ可)。
- `.web/` 配下で `npm install && npm run build` がローカルで成功することを確認済み(本実装時に確認済み)。

---

## 1. Vercel にプロジェクトを作成する

1. Vercel ダッシュボードで **Add New... → Project** を選択。
2. GitHub と連携し、このリポジトリ(`wiki`)を選択して **Import**。
3. インポート画面の **Root Directory** で `.web` を選択する(`Edit` を押してディレクトリを選ぶ。ドット始まりのフォルダだが一覧に表示される)。

   > **ここが最重要設定。** これを設定しないと、Vercel はリポジトリ直下に `package.json` が無いと判断してビルドに失敗する。

4. **Framework Preset** は `Next.js` が自動検出される(`.web/next.config.ts` を見つけて判定される)。
5. Build Command / Install Command / Output Directory は **変更せずデフォルトのままでよい**(`next build` が `output: 'export'` を見て `.web/out/` に静的ファイルを出力し、Vercel がそれを自動検出する)。

### 1-1. 「Root Directory 外のファイルを含める」設定(必須)

Root Directory を `.web` にしただけでは、ビルドコンテナが `.web` の中身しか見られない設定になっている場合がある。本サイトは `.web/next.config.ts` がビルド時にリポジトリ直下の9カテゴリフォルダ(`../software-engineering` 等)を読みにいくため、これを有効化しないとビルドが失敗する。

- プロジェクト作成画面、または作成後の **Settings → General → Root Directory** のすぐ下にある
  **「Include files outside of the Root Directory in the Build Step」** のチェックボックスを **ON** にする。

---

## 2. 初回デプロイ

1. 上記設定を確認したら **Deploy** を押す。
2. ビルドログで以下を確認する:
   - `Creating an optimized production build` の後に `Generating static pages (443/443)` 前後の件数が出ること(リポジトリのノート数と一致していれば正常)。
   - `Exporting` の後に成功していること。
3. デプロイ完了後に発行される `https://<project>.vercel.app` のURLを開き、以下を確認する:
   - トップページ(`/`)にカテゴリ一覧が表示される。
   - 任意の記事ページ(`/wiki/...`)が表示され、画像・表・コードブロックが崩れていない。
   - `/graph` でグラフが描画され、ノードをクリックすると該当ページに遷移する。
   - ヘッダーの検索ボックスで語句を入力すると候補が出る。
   - 日本語ファイル名のノート(例: `science/math/trigonometric-func/角度変換`)が文字化けせず開ける。

---

## 3. 「ノートを追記して push しても再デプロイされない」事故を防ぐ確認(重要)

Vercel は Root Directory 配下の変更だけを見て自動的にビルドをスキップすることがある。本サイトのコンテンツ本体(`.md` ファイル)は常に Root Directory(`.web`)の **外側** にあるため、これが働くと「Obsidian でノートを書いて push したのに、サイトが更新されない」という事故につながる。

### 確認手順

1. `.web` の外にある任意の `.md`(例えば好きなノートの1行)を編集してコミット・push する。
2. Vercel ダッシュボードの **Deployments** タブを見て、新しいデプロイが自動的に走るか確認する。

### 走らなかった場合の対処

**Settings → Git → Ignored Build Step** に以下のコマンドを設定し、常にビルドを実行させる:

```
exit 1
```

> Vercel の仕様上、Ignored Build Step に設定したコマンドが **0 で終了するとビルドをスキップ**、**0 以外(非ゼロ)で終了するとビルドを実行**する。`exit 1` を設定することで、どのファイルが変更されても必ずビルドが走るようになる(本サイトは変更検知を使うメリットがほぼ無いため、これで問題ない)。

---

## 4. 日常運用

- 通常の Obsidian での編集フロー(ノートを書く → `git add` → `git commit` → `git push`)をそのまま続けるだけでよい。`.scripts/gen_index.py` 等の既存ワークフローも今まで通り使える。
- push すると Vercel が自動でビルド・デプロイする(上記3で確認済みなら)。本番 URL は数十秒〜数分で更新される。
- `.web/` 側のコード(デザインや機能)を直すときは、`.web/` で `npm run dev` してローカル確認してから push すればよい。

---

## 5. (任意) カスタムドメイン

独自ドメインを使いたい場合のみ:

1. Vercel プロジェクトの **Settings → Domains** で取得済みドメインを追加。
2. 指示される CNAME / A レコードをドメインの DNS 管理画面に設定する。
3. 反映まで数分〜数時間待つ。

---

## 6. (任意) 公開範囲を絞りたくなったら

現状は認証なしの完全公開設定。後からアクセス制限をかけたい場合は、`.web/middleware.ts` を追加して Basic 認証をかける方法が最も簡単(Vercel Hobby プランでも動く)。必要になったタイミングで追加実装すればよい。
