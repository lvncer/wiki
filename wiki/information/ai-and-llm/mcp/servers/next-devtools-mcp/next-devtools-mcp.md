# next-devtools-mcp のディレクトリ構造

## ツリー構造

```text
next-devtools-mcp/
├── .github/                    # GitHub設定（空）
├── scripts/                    # ビルドスクリプト
│   └── copy-resources.js      # リソースファイルのコピースクリプト
├── src/                        # ソースコード
│   ├── _internal/             # 内部モジュール
│   │   ├── browser-eval-manager.ts
│   │   ├── find-process-import.ts
│   │   ├── global-state.ts    # グローバル状態管理
│   │   ├── mcp-client.ts
│   │   ├── nextjs-channel-detector.ts
│   │   ├── nextjs-runtime-manager.ts
│   │   └── resource-loader.ts
│   │   └── resource-path.ts
│   ├── prompts/               # MCPプロンプト定義
│   │   ├── enable-cache-components-prompt.md
│   │   ├── enable-cache-components.ts
│   │   ├── upgrade-nextjs-16-prompt.md
│   │   └── upgrade-nextjs-16.ts
│   ├── resources/             # ナレッジベースリソース
│   │   ├── (cache-components)/     # Cache Components関連ドキュメント
│   │   │   ├── 00-overview.md から 12-reference.md (全12ファイル)
│   │   │   └── 各.tsファイル（対応するリソースローダー）
│   │   ├── (nextjs-fundamentals)/  # Next.js基礎
│   │   │   ├── 01-use-client.md
│   │   │   └── use-client.ts
│   │   └── (nextjs16)/            # Next.js 16マイグレーション
│   │       └── migration/
│   │           ├── beta-to-stable.ts
│   │           ├── examples.ts
│   │           ├── nextjs-16-beta-to-stable.md
│   │           └── nextjs-16-migration-examples.md
│   ├── tools/                 # MCPツール実装
│   │   ├── browser-eval.ts    # Playwrightブラウザ自動化
│   │   ├── enable-cache-components.ts
│   │   ├── init.ts           # 初期化ツール
│   │   ├── nextjs-docs.ts    # Next.jsドキュメント検索
│   │   ├── nextjs-runtime.ts # Next.jsランタイム診断
│   │   └── upgrade-nextjs-16.ts
│   └── index.ts              # メインエントリーポイント
├── test/                      # テストファイル
│   ├── e2e/                  # E2Eテスト
│   │   ├── mcp-registration.test.ts
│   │   └── upgrade.test.ts
│   ├── fixtures/             # テスト用フィクスチャ
│   │   ├── nextjs14-minimal/
│   │   └── nextjs16-minimal/
│   ├── prompts/              # プロンプトテスト
│   └── unit/                 # ユニットテスト
│       ├── nextjs-channel-detector.test.ts
│       └── nextjs-runtime-discovery.test.ts
├── .prettierignore
├── CLAUDE.md
├── README.md                  # プロジェクトドキュメント
├── package.json              # パッケージ設定
└── vitest.config.ts          # テスト設定
```

## 主要なファイルの詳細

### ルートレベルの設定ファイル

**`package.json`** [1](#0-0) 

Next.js開発ツールのMCPサーバーのパッケージ設定で、`dist/index.js`をバイナリとして定義しています。TypeScriptでビルドされ、stdio通信を使用します。

**`vitest.config.ts`** [2](#0-1) 

テスト設定ファイルで、ユニットテストとE2Eテストの実行を制御します。

### メインエントリーポイント

**`src/index.ts`** [3](#0-2) 

MCPサーバーのメインファイルで、以下を行います：
- Model Context Protocol SDKを使用したサーバー初期化
- 6つのツール（browser_eval、enable_cache_components、init、nextjs_docs、nextjs_runtime、upgrade_nextjs_16）の登録
- 2つのプロンプト（upgrade-nextjs-16、enable-cache-components）の登録
- 15個のリソース（Cache Components関連12個、Next.js基礎1個、Next.js 16マイグレーション2個）の登録 [4](#0-3) 

### ツール（src/tools/）

**`init.ts`** [5](#0-4) 

Next.jsセッション開始時に**必ず最初に呼ぶべき**初期化ツールです。nextjs.orgから最新のLLMドキュメントを取得し、AIアシスタントに対してドキュメント優先のアプローチを確立します。

**`nextjs-runtime.ts`** [6](#0-5) 

Next.js 16以降の実行中のdev serverに接続し、リアルタイムのランタイム診断を行うツールです。3つのアクション（discover_servers、list_tools、call_tool）をサポートします。

### 内部モジュール（src/_internal/）

**`global-state.ts`** [7](#0-6) 

MCPサーバーのグローバル状態を管理し、init関数が呼ばれたかどうかを追跡します。

### スクリプト（scripts/）

**`copy-resources.js`** [8](#0-7) 

ビルド時に`src/resources/`と`src/prompts/`のMarkdownファイルを`dist/resources/`にコピーするスクリプトです。ディレクトリ構造を保持したままコピーを行います。

## Notes

このプロジェクトは、Next.js開発用のModel Context Protocol（MCP）サーバーで、以下の3つの主要機能を提供します：

1. **ランタイム診断**（Next.js 16以降）：実行中のdev serverに接続してリアルタイムでエラー、ルート、ログを取得
2. **開発自動化**：Next.js 16へのアップグレード、Cache Componentsのセットアップ、Playwrightによるブラウザテスト
3. **ナレッジベース**：Next.js 16の包括的なドキュメントと公式ドキュメントへのアクセス [9](#0-8) 

ビルドプロセスは`npm run build`で実行され、TypeScriptのコンパイルとリソースファイルのコピーを行います。 [10](#0-9)

### Citations

**File:** package.json (L1-13)
```json
{
  "name": "next-devtools-mcp",
  "version": "0.3.1",
  "type": "module",
  "description": "Next.js development tools MCP server with stdio transport",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/vercel/next-devtools-mcp.git"
  },
  "bin": {
    "next-devtools-mcp": "./dist/index.js"
  },
```

**File:** package.json (L23-28)
```json
  "scripts": {
    "dev": "tsc --watch",
    "copy-resources": "node scripts/copy-resources.js",
    "build": "tsc && npm run copy-resources",
    "prepublishOnly": "pnpm run clean && pnpm run build",
    "clean": "rm -rf dist",
```

**File:** vitest.config.ts (L1-24)
```typescript
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // Unit tests: 30s timeout (default is 5s)
    // E2E tests: Override in test file with vi.setConfig()
    testTimeout: 30000,
    hookTimeout: 10000,

    // Only run test files that match these patterns
    include: ['test/**/*.test.ts'],

    // Exclude e2e from default test runs (use npm run test:e2e)
    exclude: [
      'node_modules',
      'dist',
      '.idea',
      '.git',
      '.cache',
      'test/fixtures/**/node_modules/**',
      '**/node_modules/**',
    ],
  },
})
```

**File:** src/index.ts (L1-13)
```typescript
#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListPromptsRequestSchema,
  GetPromptRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
} from "@modelcontextprotocol/sdk/types.js"
import { z } from "zod"
import pkg from "../package.json" with { type: "json" }
```

**File:** src/index.ts (L44-67)
```typescript
// Tool registry
const tools = [browserEval, enableCacheComponents, init, nextjsDocs, nextjsRuntime, upgradeNextjs16]

// Prompt registry
const prompts = [upgradeNextjs16Prompt, enableCacheComponentsPrompt]

// Resource registry
const resources = [
  cacheComponentsOverview,
  cacheComponentsCoreMechanics,
  cacheComponentsPublicCaches,
  cacheComponentsPrivateCaches,
  cacheComponentsRuntimePrefetching,
  cacheComponentsRequestApis,
  cacheComponentsCacheInvalidation,
  cacheComponentsAdvancedPatterns,
  cacheComponentsBuildBehavior,
  cacheComponentsErrorPatterns,
  cacheComponentsTestPatterns,
  cacheComponentsReference,
  nextjsFundamentalsUseClient,
  nextjs16BetaToStable,
  nextjs16Examples,
]
```

**File:** src/tools/init.ts (L11-29)
```typescript
export const metadata = {
  name: "init",
  description: `⚠️ CALL THIS FIRST - Initialize Next.js DevTools MCP context and establish MANDATORY documentation requirements.

**IMPORTANT: This tool MUST be called at the START of every Next.js development session.**

This tool fetches the latest Next.js documentation and establishes ABSOLUTE requirements for using the nextjs_docs tool for ALL Next.js-related queries.

Key Points:
- Fetches latest Next.js LLM documentation from nextjs.org
- Establishes MANDATORY requirement to use nextjs_docs for ALL Next.js concepts
- Instructs AI to forget any prior Next.js knowledge and always query docs
- Documents all available MCP tools (nextjs_docs, nextjs_runtime, browser_eval, upgrade_nextjs_16, enable_cache_components)

Use this tool at the beginning of a Next.js session to:
- Reset AI's Next.js knowledge baseline
- Ensure 100% documentation-first approach with no exceptions
- Understand available tools and their use cases
- Follow best practices for Next.js development`,
```

**File:** src/tools/nextjs-runtime.ts (L1-50)
```typescript
import { z } from "zod"
import {
  discoverNextJsServer,
  listNextJsTools,
  callNextJsTool,
  getAllAvailableServers,
} from "../_internal/nextjs-runtime-manager.js"

export const inputSchema = {
  action: z
    .enum(["discover_servers", "list_tools", "call_tool"])
    .describe(
      "Action to perform:\n" +
        "- 'discover_servers': Find and list all running Next.js dev servers (use for queries about 'how many', 'show all', 'list', 'running servers')\n" +
        "- 'list_tools': Show available MCP tools/functions from a specific Next.js server (use after discovering servers)\n" +
        "- 'call_tool': Execute a specific Next.js runtime tool (use to interact with Next.js internals)"
    ),

  port: z
    .union([z.string(), z.number()])
    .transform((val) => (typeof val === "string" ? parseInt(val, 10) : val))
    .optional()
    .describe(
      "Port number of the Next.js dev server. If not provided, will attempt to auto-discover. Required for 'list_tools' and 'call_tool' actions."
    ),

  toolName: z
    .string()
    .optional()
    .describe(
      "Name of the Next.js MCP tool to call. Required for 'call_tool' action. Use 'list_tools' first to discover available tool names."
    ),

  args: z
    .record(z.string(), z.unknown())
    .optional()
    .describe(
      "Arguments object to pass to the Next.js MCP tool. MUST be an object (e.g., {param: 'value'}), NOT a string. Only provide this parameter if the tool requires arguments - omit it entirely for tools that take no arguments. Use 'list_tools' to see the inputSchema for each tool."
    ),

  includeUnverified: z
    .union([z.boolean(), z.string().transform((val) => val === "true")])
    .optional()
    .describe(
      "For 'discover_servers' action: Include Next.js servers even if MCP endpoint verification fails. Defaults to false (only show verified MCP-enabled servers)."
    ),
}

export const metadata = {
  name: "nextjs_runtime",
```

**File:** src/_internal/global-state.ts (L1-14)
```typescript
/**
 * Global state for the MCP server
 * Tracks initialization status and other server-wide state
 */

interface GlobalState {
  initCalled: boolean
  initTimestamp: number | null
}

const globalState: GlobalState = {
  initCalled: false,
  initTimestamp: null,
}
```

**File:** scripts/copy-resources.js (L1-16)
```javascript
#!/usr/bin/env node
/**
 * Copy resources script
 * Preserves directory structure from src/resources/ to dist/resources/
 * Copies .md files from src/prompts/ to dist/resources/prompts/
 *
 * Usage: node scripts/copy-resources.js
 */

import fs from 'fs'
import path from 'path'

const SRC_RESOURCES_DIR = 'src/resources'
const SRC_PROMPTS_DIR = 'src/prompts'
const DEST_DIR = 'dist/resources'

```

**File:** README.md (L1-29)
```markdown
# Next.js DevTools MCP

[![npm next-devtools-mcp package](https://img.shields.io/npm/v/next-devtools-mcp.svg)](https://npmjs.org/package/next-devtools-mcp)

`next-devtools-mcp` is a Model Context Protocol (MCP) server that provides Next.js development tools and utilities for coding agents like Claude and Cursor.

## Features

This MCP server provides coding agents with comprehensive Next.js development capabilities through three primary mechanisms:

### **1. Runtime Diagnostics & Live State Access** (Next.js 16+)
Connect directly to your running Next.js dev server's built-in MCP endpoint to query:
- Real-time build and runtime errors
- Application routes, pages, and component metadata
- Development server logs and diagnostics
- Server Actions and component hierarchies

### **2. Development Automation**
Tools for common Next.js workflows:
- **Automated Next.js 16 upgrades** with official codemods
- **Cache Components setup** with error detection and automated fixes
- **Browser testing integration** via Playwright for visual verification

### **3. Knowledge Base & Documentation**
- Curated Next.js 16 knowledge base (12 focused resources on Cache Components, async APIs, etc.)
- Direct access to official Next.js documentation via search API
- Pre-configured prompts for upgrade guidance and Cache Components enablement

> **Learn more:** See the [Next.js MCP documentation](https://nextjs.org/docs/app/guides/mcp) for details on how MCP servers work with Next.js and coding agents.
```
