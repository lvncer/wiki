# Investigation - ChromeDevTools MCP

# Chrome DevTools MCP のディレクトリ構造

このリポジトリは、Chrome DevTools を Model Context Protocol (MCP)サーバーとして公開するためのプロジェクトです。 [1](#0-0)

## ツリー構造

```
chrome-devtools-mcp/
├── .github/                    # GitHub設定ファイル
├── docs/                       # ドキュメント
│   ├── tool-reference.md      # ツールリファレンス
│   └── troubleshooting.md     # トラブルシューティングガイド
├── scripts/                    # ビルド・ユーティリティスクリプト
│   ├── eslint_rules/          # カスタムESLintルール
│   │   ├── check-license-rule.js
│   │   └── local-plugin.js
│   ├── generate-docs.ts       # ドキュメント自動生成
│   ├── post-build.ts          # ビルド後処理
│   ├── prepare.ts             # 準備スクリプト
│   ├── sed.ts                 # テキスト置換ユーティリティ
│   └── verify-server-json-version.ts
├── src/                        # ソースコード（メインディレクトリ）
│   ├── formatters/            # データフォーマッター
│   │   ├── consoleFormatter.ts    # コンソールメッセージのフォーマット
│   │   ├── networkFormatter.ts    # ネットワークリクエストのフォーマット
│   │   └── snapshotFormatter.ts   # スナップショットのフォーマット
│   ├── third_party/           # サードパーティライブラリ
│   │   └── index.ts           # MCP SDKなどの再エクスポート
│   ├── tools/                 # MCPツール定義（カテゴリ別）
│   │   ├── ToolDefinition.ts  # ツール定義の型
│   │   ├── categories.ts      # ツールカテゴリ定義
│   │   ├── console.ts         # コンソール関連ツール
│   │   ├── emulation.ts       # エミュレーション関連ツール
│   │   ├── input.ts           # 入力自動化ツール
│   │   ├── network.ts         # ネットワーク関連ツール
│   │   ├── pages.ts           # ページナビゲーションツール
│   │   ├── performance.ts     # パフォーマンス分析ツール
│   │   ├── screenshot.ts      # スクリーンショットツール
│   │   ├── script.ts          # スクリプト実行ツール
│   │   └── snapshot.ts        # スナップショットツール
│   ├── trace-processing/      # トレース処理
│   │   └── parse.ts           # Chrome DevToolsトレースのパース
│   ├── utils/                 # ユーティリティ
│   │   ├── keyboard.ts        # キーボード入力ヘルパー
│   │   ├── pagination.ts      # ページネーション処理
│   │   └── types.ts           # 共通型定義
│   ├── DevToolsConnectionAdapter.ts  # DevTools接続アダプター
│   ├── DevtoolsUtils.ts       # DevToolsユーティリティ関数
│   ├── McpContext.ts          # MCPコンテキスト管理
│   ├── McpResponse.ts         # MCP応答処理
│   ├── Mutex.ts               # 同期制御（Mutex実装）
│   ├── PageCollector.ts       # ページ情報収集
│   ├── WaitForHelper.ts       # 待機処理ヘルパー
│   ├── browser.ts             # ブラウザ起動・接続管理
│   ├── cli.ts                 # コマンドライン引数パース
│   ├── devtools.d.ts          # DevTools型定義
│   ├── index.ts               # エントリーポイント（Node.jsバージョンチェック）
│   ├── logger.ts              # ログ機能
│   ├── main.ts                # MCPサーバーメインロジック
│   └── polyfill.ts            # ポリフィル
├── tests/                      # テストファイル
│   ├── formatters/            # フォーマッターのテスト
│   │   ├── consoleFormatter.test.js.snapshot
│   │   ├── consoleFormatter.test.ts
│   │   ├── networkFormatter.test.ts
│   │   └── snapshotFormatter.test.ts
│   ├── tools/                 # ツールのテスト
│   │   ├── console.test.ts
│   │   ├── emulation.test.ts
│   │   ├── input.test.ts
│   │   ├── network.test.js.snapshot
│   │   ├── network.test.ts
│   │   ├── pages.test.ts
│   │   ├── performance.test.js.snapshot
│   │   ├── performance.test.ts
│   │   ├── screenshot.test.ts
│   │   ├── script.test.ts
│   │   └── snapshot.test.ts
│   ├── trace-processing/      # トレース処理のテスト
│   │   ├── fixtures/          # テスト用フィクスチャ
│   │   ├── parse.test.js.snapshot
│   │   └── parse.test.ts
│   ├── DevtoolsUtils.test.ts
│   ├── McpContext.test.ts
│   ├── McpResponse.test.js.snapshot
│   ├── McpResponse.test.ts
│   ├── PageCollector.test.ts
│   ├── browser.test.ts
│   ├── cli.test.ts
│   ├── index.test.ts
│   ├── server.ts              # テストサーバー
│   ├── setup.ts               # テストセットアップ
│   ├── snapshot.ts            # スナップショットテストユーティリティ
│   └── utils.ts               # テストユーティリティ
├── CHANGELOG.md               # 変更履歴
├── CONTRIBUTING.md            # 貢献ガイドライン
├── LICENSE                    # ライセンス（Apache 2.0）
├── README.md                  # プロジェクト説明・使い方
├── eslint.config.mjs          # ESLint設定
├── package.json               # npm パッケージ設定
├── release-please-config.json # リリース設定
├── rollup.config.mjs          # Rollupバンドル設定
└── tsconfig.json              # TypeScript設定
```

## 主要なファイルの説明

### エントリーポイント

**`src/index.ts`** - プログラムのエントリーポイント。Node.js のバージョンチェックを実行します。 [2](#0-1) [3](#0-2)

**`src/main.ts`** - MCP サーバーのメインロジック。すべてのツールを登録し、サーバーを起動します。 [4](#0-3)

### コア機能

**`src/browser.ts`** - Chrome ブラウザの起動と接続管理を担当します。

**`src/McpContext.ts`** - MCP サーバーのコンテキストを管理し、ブラウザインスタンスやページへのアクセスを提供します。

**`src/McpResponse.ts`** - MCP ツールからの応答をフォーマットし、クライアントに返却します。

**`src/cli.ts`** - コマンドライン引数をパースし、サーバー設定を処理します。

### ツール定義（`src/tools/`）

このディレクトリには、MCP クライアントが使用できる様々なツールが定義されています。

- **`console.ts`** - コンソールメッセージの取得
- **`emulation.ts`** - CPU/ネットワークエミュレーション
- **`input.ts`** - クリック、入力、ドラッグなどの自動化
- **`network.ts`** - ネットワークリクエストの監視
- **`pages.ts`** - ページのナビゲーション、作成、選択
- **`performance.ts`** - パフォーマンストレースの記録と分析
- **`screenshot.ts`** - スクリーンショットの取得
- **`script.ts`** - JavaScript の実行
- **`snapshot.ts`** - DOM スナップショットの取得

### 設定ファイル

**`package.json`** - プロジェクトのメタデータ、依存関係、スクリプトを定義します。 [5](#0-4)

主な依存関係には、Puppeteer（ブラウザ自動化）と MCP SDK、Chrome DevTools Frontend が含まれます。 [6](#0-5)

## Notes

- このプロジェクトは TypeScript で書かれており、ビルド後のファイルは`build/`ディレクトリに出力されます
- MCP サーバーとして動作し、様々な AI コーディングアシスタント（Claude、Cursor、Copilot など）と統合できます
- テストには Node.js の組み込みテストランナーを使用しています
- Chrome DevTools Protocol（CDP）を利用してブラウザを制御しています

### Citations

**File:** README.md (L5-8)

```markdown
`chrome-devtools-mcp` lets your coding agent (such as Gemini, Claude, Cursor or Copilot)
control and inspect a live Chrome browser. It acts as a Model-Context-Protocol
(MCP) server, giving your AI coding assistant access to the full power of
Chrome DevTools for reliable automation, in-depth debugging, and performance analysis.
```

**File:** package.json (L1-7)

```json
{
  "name": "chrome-devtools-mcp",
  "version": "0.9.0",
  "description": "MCP server for Chrome DevTools",
  "type": "module",
  "bin": "./build/src/index.js",
  "main": "index.js",
```

**File:** package.json (L42-70)

```json
    "@eslint/js": "^9.35.0",
    "@modelcontextprotocol/sdk": "1.20.2",
    "@rollup/plugin-commonjs": "^28.0.8",
    "@rollup/plugin-json": "^6.1.0",
    "@rollup/plugin-node-resolve": "^16.0.3",
    "@stylistic/eslint-plugin": "^5.4.0",
    "@types/debug": "^4.1.12",
    "@types/filesystem": "^0.0.36",
    "@types/node": "^24.3.3",
    "@types/sinon": "^17.0.4",
    "@types/yargs": "^17.0.33",
    "@typescript-eslint/eslint-plugin": "^8.43.0",
    "@typescript-eslint/parser": "^8.43.0",
    "chrome-devtools-frontend": "1.0.1536371",
    "core-js": "3.46.0",
    "debug": "4.4.3",
    "eslint": "^9.35.0",
    "eslint-import-resolver-typescript": "^4.4.4",
    "eslint-plugin-import": "^2.32.0",
    "globals": "^16.4.0",
    "prettier": "^3.6.2",
    "puppeteer": "24.27.0",
    "rollup": "4.52.5",
    "rollup-plugin-cleanup": "^3.2.1",
    "rollup-plugin-license": "^3.6.0",
    "sinon": "^21.0.0",
    "typescript": "^5.9.2",
    "typescript-eslint": "^8.43.0",
    "yargs": "18.0.0"
```

**File:** src/index.ts (L1-18)

```typescript
#!/usr/bin/env node

/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { version } from "node:process";

const [major, minor] = version.substring(1).split(".").map(Number);

if (major === 20 && minor < 19) {
  console.error(
    `ERROR: \`chrome-devtools-mcp\` does not support Node ${process.version}. Please upgrade to Node 20.19.0 LTS or a newer LTS.`
  );
  process.exit(1);
}
```

**File:** src/main.ts (L7-30)

```typescript
import "./polyfill.js";

import type { Channel } from "./browser.js";
import { ensureBrowserConnected, ensureBrowserLaunched } from "./browser.js";
import { parseArguments } from "./cli.js";
import { logger, saveLogsToFile } from "./logger.js";
import { McpContext } from "./McpContext.js";
import { McpResponse } from "./McpResponse.js";
import { Mutex } from "./Mutex.js";
import {
  McpServer,
  StdioServerTransport,
  type CallToolResult,
  SetLevelRequestSchema,
} from "./third_party/index.js";
import { ToolCategory } from "./tools/categories.js";
import * as consoleTools from "./tools/console.js";
import * as emulationTools from "./tools/emulation.js";
import * as inputTools from "./tools/input.js";
import * as networkTools from "./tools/network.js";
import * as pagesTools from "./tools/pages.js";
import * as performanceTools from "./tools/performance.js";
import * as screenshotTools from "./tools/screenshot.js";
import * as scriptTools from "./tools/script.js";
```
