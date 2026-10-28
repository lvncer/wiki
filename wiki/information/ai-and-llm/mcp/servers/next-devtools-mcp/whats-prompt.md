# プロンプトシステムについて

このコードベースにおける「プロンプト」は、AI エージェントに対して構造化されたガイダンスを提供する MCP (Model Context Protocol) の機能です<cite/>。

## プロンプトの機能

プロンプトは、複雑なワークフローを段階的に実行するための**事前設定された指示テンプレート**です [1](#0-0) 。現在、2 つのプロンプトが実装されています:

1. **`upgrade-nextjs-16`** - Next.js 16 へのアップグレードガイド [2](#0-1)
2. **`enable-cache-components`** - Cache Components のセットアップガイド [3](#0-2)

プロンプトは、プロジェクトの状態を分析し、カスタマイズされたマークダウン形式の指示を生成します [4](#0-3) 。

## ツールとの違い

### ツール (Tools)

- **直接的なアクション**を実行します [5](#0-4)
- 例: `nextjs_runtime`はランタイムエラーを取得、`browser_eval`はブラウザ自動化を実行 [6](#0-5)
- 即座に結果を返します<cite/>

### プロンプト (Prompts)

- **ワークフローの指示**を生成します [4](#0-3)
- AI エージェントが実行すべき手順を提供 [7](#0-6)
- 他のツール(`browser_eval`、`nextjs_runtime`など)を参照・使用する指示を含む [8](#0-7)

## 実装の違い

**ツール**は`CallToolRequestSchema`で処理され、結果を直接返します [5](#0-4) :

```typescript
const result = await tool.handler(parsedArgs);
return { content: [{ type: "text", text: result }] };
```

**プロンプト**は`GetPromptRequestSchema`で処理され、`role`付きのメッセージとして返します [1](#0-0) :

```typescript
const content = await prompt.handler(parsedArgs);
return {
  messages: [
    {
      role: prompt.metadata.role || "user",
      content: { type: "text", text: content },
    },
  ],
};
```

## Notes

プロンプトは「ワークフローオーケストレーションツール」として機能し、複数のフェーズにわたる複雑なタスク(アップグレード、セットアップなど)を自動化します<cite/>。ツールは単一の具体的なアクションを実行するのに対し、プロンプトは複数のツールを組み合わせた包括的なガイダンスを提供します<cite/>。

Wiki pages you might want to explore:

- [nextjs_runtime Tool (vercel/next-devtools-mcp)](/wiki/vercel/next-devtools-mcp#4.3)
- [upgrade_nextjs_16 Tool (vercel/next-devtools-mcp)](/wiki/vercel/next-devtools-mcp#4.5)

### Citations

**File:** src/index.ts (L110-132)

```typescript
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  const tool = tools.find((t) => t.metadata.name === name);
  if (!tool) {
    throw new Error(`Tool not found: ${name}`);
  }

  // Validate arguments with Zod schema
  const parsedArgs = parseToolArgs(tool.inputSchema, args || {});

  // Call the tool handler
  const result = await tool.handler(parsedArgs as never);

  return {
    content: [
      {
        type: "text",
        text: result,
      },
    ],
  };
});
```

**File:** src/index.ts (L144-171)

```typescript
server.setRequestHandler(GetPromptRequestSchema, async (request) => {
  const { name, arguments: args } = request.params

  const prompt = prompts.find((p) => p.metadata.name === name)
  if (!prompt) {
    throw new Error(`Prompt not found: ${name}`)
  }

  // Validate arguments if schema exists
  let parsedArgs: Record<string, unknown> = args || {}
  if (prompt.inputSchema) {
    parsedArgs = parseToolArgs(prompt.inputSchema, args || {})
  }

  // Get the prompt content
  const content = await prompt.handler(parsedArgs as never)

  return {
    messages: [
      {
        role: prompt.metadata.role || "user",
        content: {
          type: "text",
          text: content,
        },
      },
    ],
  }
```

**File:** src/prompts/upgrade-nextjs-16.ts (L20-26)

```typescript
export const metadata = {
  name: "upgrade-nextjs-16",
  title: "upgrade-nextjs-16",
  description:
    "Guide through upgrading Next.js to version 16. CRITICAL: Runs the official codemod FIRST (requires clean git state) for automatic upgrades and fixes, then handles remaining issues manually. The codemod upgrades Next.js, React, and React DOM automatically. Covers async API changes, config moves, image defaults, parallel routes, and deprecations.",
  role: "user",
};
```

**File:** src/prompts/upgrade-nextjs-16.ts (L40-61)

```typescript
export function handler(args: UpgradeNextjs16PromptArgs): string {
  const projectPath = args.project_path || process.cwd();

  const { version } = checkNextjs16Availability();
  const upgradeChannel = "latest";
  const codemodCommandNote = `**Note**: Next.js 16 stable (version ${version}) is now available.`;

  // Detect if project is on beta/canary
  const { isBeta } = detectProjectChannel(projectPath);

  let promptTemplate = readResourceFile("prompts/upgrade-nextjs-16-prompt.md");

  // Replace basic template variables
  promptTemplate = promptTemplate.replace(/{{PROJECT_PATH}}/g, projectPath);
  promptTemplate = promptTemplate.replace(
    /{{UPGRADE_CHANNEL}}/g,
    upgradeChannel
  );
  promptTemplate = promptTemplate.replace(
    /{{CODEMOD_COMMAND}}/g,
    codemodCommandNote
  );

  // Process conditional blocks based on project channel
  promptTemplate = processConditionalBlocks(promptTemplate, isBeta);

  return promptTemplate;
}
```

**File:** README.md (L321-332)

```markdown
## MCP Prompts

Pre-configured prompts to help with common Next.js development tasks:

<details>
<summary>💡 Available Prompts (click to expand)</summary>

- **`init`** - Initialize context for Next.js development with MCP tools and documentation requirements
- **`upgrade-nextjs-16`** - Guide for upgrading to Next.js 16
- **`enable-cache-components`** - Enable caching for React components

</details>
```

**File:** README.md (L334-489)

````markdown
## MCP Tools

<details>
<summary><code>init</code></summary>

Initialize Next.js DevTools MCP context and establish documentation requirements.

**Capabilities:**

- Sets up proper context for AI assistants working with Next.js
- Establishes requirement to use `nextjs_docs` for ALL Next.js-related queries
- Documents all available MCP tools and their use cases
- Provides best practices for Next.js development with MCP
- Includes example workflows and quick start checklist

**When to use:**

- At the beginning of a Next.js development session
- To understand available tools and establish proper context
- To ensure documentation-first approach for Next.js development

**Input:**

- `project_path` (optional) - Path to Next.js project (defaults to current directory)

**Output:**

- Comprehensive initialization context and guidance for Next.js development with MCP tools

</details>

<details>
<summary><code>nextjs_docs</code></summary>

Search and retrieve Next.js official documentation and knowledge base.

**Capabilities:**

- Two-step process: 1) Search for docs by keyword to get paths, 2) Fetch full markdown content by path
- Uses official Next.js documentation search API
- Provides access to comprehensive Next.js guides, API references, and best practices
- Supports filtering by router type (App Router, Pages Router, or both)

**Input:**

- `action` (required) - Action to perform: `search` to find docs, `get` to fetch full content
- `query` (optional) - Required for `search`. Keyword search query (e.g., 'metadata', 'generateStaticParams', 'middleware')
- `path` (optional) - Required for `get`. Doc path from search results (e.g., '/docs/app/api-reference/functions/refresh')
- `anchor` (optional) - Optional for `get`. Anchor/section from search results (e.g., 'usage')
- `routerType` (optional) - For `search` only. Filter by: `app`, `pages`, or `all` (default: `all`)

**Output:**

- Search results with doc titles, paths, content snippets, sections, and anchors
- Full markdown content for specific documentation pages

</details>

<details>
<summary><code>browser_eval</code></summary>

Automate and test web applications using Playwright browser automation.

**When to use:**

- Verifying pages in Next.js projects (especially during upgrades or testing)
- Testing user interactions and flows
- Taking screenshots for visual verification
- Detecting runtime errors, hydration issues, and client-side problems
- Capturing browser console errors and warnings

**Important:** For Next.js projects, prioritize using the `nextjs_runtime` tool instead of browser console log forwarding. Only use browser_eval's `console_messages` action as a fallback when `nextjs_runtime` tools are not available.

**Available actions:**

- `start` - Start browser automation (automatically installs if needed)
- `navigate` - Navigate to a URL
- `click` - Click on an element
- `type` - Type text into an element
- `fill_form` - Fill multiple form fields at once
- `evaluate` - Execute JavaScript in browser context
- `screenshot` - Take a screenshot of the page
- `console_messages` - Get browser console messages
- `close` - Close the browser
- `drag` - Perform drag and drop
- `upload_file` - Upload files
- `list_tools` - List all available browser automation tools from the server

**Input:**

- `action` (required) - The action to perform
- `browser` (optional) - Browser to use: `chrome`, `firefox`, `webkit`, `msedge` (default: `chrome`)
- `headless` (optional) - Run browser in headless mode (default: `true`)
- Action-specific parameters (see tool description for details)

**Output:**

- JSON with action result, screenshots (base64), console messages, or error information

</details>

<details>
<summary><code>nextjs_runtime</code></summary>

Connect to your running Next.js dev server's built-in MCP endpoint to access live application state, runtime diagnostics, and internal information.

**What this tool does:**

This tool acts as a bridge between your coding agent and Next.js 16's built-in MCP endpoint at `/_next/mcp`. It provides three key actions:

1. **`discover_servers`**: Find all running Next.js dev servers on your machine
2. **`list_tools`**: See what runtime diagnostic tools are available from Next.js
3. **`call_tool`**: Execute a specific Next.js runtime tool (e.g., get errors, query routes, fetch logs)

**Available Next.js Runtime Tools** (accessed via `call_tool`):

Once connected to a Next.js 16+ dev server, you can access these built-in tools:

- `get_errors` - Get current build, runtime, and type errors
- `get_logs` - Get path to development log file (browser console + server output)
- `get_page_metadata` - Query application routes, pages, and component metadata
- `get_project_metadata` - Get project structure, config, and dev server URL
- `get_server_action_by_id` - Look up Server Actions by ID to find source files

**Requirements:**

- Next.js 16+ (MCP enabled by default)
- Running dev server (`npm run dev`)

**Typical workflow:**

```javascript
// Step 1: Discover running servers (optional - auto-discovery works in most cases)
{
  "action": "discover_servers"
}

// Step 2: List available runtime tools
{
  "action": "list_tools",
  "port": 3000  // optional if only one server is running
}

// Step 3: Call a specific tool
{
  "action": "call_tool",
  "port": 3000,
  "toolName": "get_errors"
  // args is optional and only needed if the tool requires parameters
}
```
````

**Input Parameters:**

- `action` (required) - `discover_servers`, `list_tools`, or `call_tool`
- `port` (optional) - Dev server port (auto-discovers if not provided)
- `toolName` (required for `call_tool`) - Name of the Next.js tool to invoke
- `args` (optional) - Arguments object for the tool (only if required by that tool)
- `includeUnverified` (optional) - For `discover_servers`: include servers even if MCP verification fails

**Output:**

- JSON with discovered servers, available tools list, or tool execution results

**Example prompts that use this tool:**

- "Next Devtools, what errors are in my Next.js app?"
- "Next Devtools, show me my application routes"
- "Next Devtools, what's in the dev server logs?"
- "Next Devtools, find the Server Action with ID xyz"

</details>
```

**File:** src/prompts/upgrade-nextjs-16-prompt.md (L571-618)

```markdown
[ ] E. Lint commands to update (ESLint flat config default noted)
[ ] F. next.config.js: turbopackPersistentCachingForDev → turbopackFileSystemCacheForDev (Babel auto-enabled noted)
[ ] G. Remove --turbopack flags from scripts
[ ] H. next.config.js: Remove eslint config object
[ ] I. next.config.js: Move serverComponentsExternalPackages out of experimental
{{IF_BETA_CHANNEL}}[ ] J. next.config.js: Move cacheLife out of experimental (required when stable is released)
{{/IF_BETA_CHANNEL}}[ ] K. Edge cases in async APIs
[ ] L. ViewTransition API renamed (unstable_ViewTransition → ViewTransition, remove experimental.viewTransition flag)
[ ] M. revalidateTag API changes
[ ] N. Middleware to Proxy migration (rename middleware.ts → proxy.ts and config properties)
[ ] O. Build and dev improvements reviewed (informational)
[ ] P. unstable_noStore removal (if using Cache Components)
[ ] Q. Deprecated features to update

## Files Requiring Manual Changes

- path/to/file1.ts (reason - not handled by codemod)
- path/to/file2.tsx (reason - not handled by codemod)
  ...

## Phase 4: Manual Changes Applied

- [List of manual fixes made]
- [ ] **Final build verification: `<pkg-manager> run build` (must succeed)**
- [ ] **Final browser verification with browser_eval:**
  - [ ] All key routes load successfully in browser
  - [ ] No console errors or warnings
  - [ ] Client-side hydration works correctly

## Completion Status

- [ ] Upgrade complete - build succeeds without errors
- [ ] Browser verification passed (using browser_eval, not curl)
- [ ] All manual fixes applied (if any were needed)

## Next Steps

- [What to do next, e.g., commit changes, test in staging, etc.]
```

# START HERE

Begin migration:

1. **FIRST: Check if this is a monorepo** - If yes, navigate to each Next.js app directory and run the workflow there (NOT at monorepo root)
2. Start with Phase 1 pre-flight checks (ensure clean git state)
3. Run the codemod in Phase 2 (this handles most changes automatically)
4. **Verify with build** - If `<pkg-manager> run build` succeeds, continue to browser verification
5. **Verify with browser_eval** - Use the browser_eval MCP tool to load pages in a real browser (NOT curl). This catches client-side errors that build verification misses
6. Only if build or browser verification fails, proceed to Phase 3 and Phase 4 to fix remaining issues

**⚠️ CRITICAL: Always use browser_eval for page verification, never curl or simple HTTP requests. browser_eval actually renders the page and detects runtime errors, hydration issues, and JavaScript problems that curl cannot catch.**

````

**File:** src/prompts/enable-cache-components-prompt.md (L1-150)
```markdown
You are a Next.js Cache Components setup assistant. Help enable and verify Cache Components in this Next.js 16 project.

PROJECT: {{PROJECT_PATH}}

# BASE KNOWLEDGE: Cache Components Technical Reference

**✅ RESOURCES AVAILABLE ON-DEMAND - Load only what you need**

**Available Resources (Load as Needed):**

The following resources are available from the Next.js MCP server. Load them on-demand to reduce token usage:

- `cache-components://overview` - Critical errors AI agents make, quick reference (START HERE)
- `cache-components://core-mechanics` - Fundamental paradigm shift, cacheComponents
- `cache-components://public-caches` - Public cache mechanics using 'use cache'
- `cache-components://private-caches` - Private cache mechanics using 'use cache: private'
- `cache-components://runtime-prefetching` - Prefetch configuration and stale time rules
- `cache-components://request-apis` - Async params, searchParams, cookies(), headers()
- `cache-components://cache-invalidation` - updateTag(), revalidateTag() patterns
- `cache-components://advanced-patterns` - cacheLife(), cacheTag(), draft mode
- `cache-components://build-behavior` - What gets prerendered, static shells
- `cache-components://error-patterns` - Common errors and solutions
- `cache-components://test-patterns` - Real test-driven patterns from 125+ fixtures
- `cache-components://reference` - Mental models, API reference, checklists

**How to Access Resources (MANDATORY - ALWAYS LOAD):**

Resources use the URI scheme `cache-components://...` and are served by this MCP server.

**CRITICAL: You MUST load resources at each phase phase - this is not optional.**

To load a resource, use the ReadMcpResourceTool with:
- server: `"next-devtools"` (or whatever your server is configured as)
- uri: `"cache-components://[resource-name]"` from the list above

**MANDATORY Resource Loading Schedule:**

You MUST load these resources at the specified phases:

- **BEFORE Phase 1-2:** ALWAYS load `cache-components://overview` first
  - Provides critical context and error patterns AI agents make
  - Must be loaded before any configuration changes

- **During Phase 5 (Error Fixing):** ALWAYS load error-specific resources as needed
  - When fixing blocking route errors → Load `cache-components://error-patterns`
  - When configuring caching → Load `cache-components://advanced-patterns`
  - When using dynamic params → Load `cache-components://core-mechanics`
  - Do NOT guess or use generic patterns - load the specific resource

- **During Phase 6 (Verification):** ALWAYS load `cache-components://build-behavior`
  - Provides build verification strategies and troubleshooting

**Why This Matters:**

- Resources contain proven solutions from 125+ test fixtures
- Generic patterns may not work with Cache Components specifics
- Loading ensures you follow exact API semantics and error patterns
- Token savings only work if resources are loaded when needed
- Without loading, you may apply incorrect fixes

**Token Efficiency:**

This mandatory loading strategy keeps tokens low while being complete:
- ✅ Loads ~5-15K tokens per phase (not 60K upfront)
- ✅ Each resource addresses specific problem sets
- ✅ No guessing or hallucination about patterns
- ✅ Supports multiple phases in one session
- ✅ Stays within conversation budget

---

# ENABLE WORKFLOW: Complete Cache Components Setup & Verification Guide

The section below contains the comprehensive step-by-step enablement workflow. This guide includes ALL steps needed to enable Cache Components: configuration updates, flag changes, boundary setup, error detection, and automated fixing. Load the knowledge base resources above for detailed technical behavior, API semantics, and best practices.

## What Are Cache Components?

Cache Components are a new set of features designed to make caching in Next.js both **more explicit and more flexible**. They fundamentally change how Next.js handles rendering:

**The Paradigm Shift:**
- **Before (implicit caching):** Routes were static by default, you opted into dynamic rendering
- **After (Cache Components):** Routes are dynamic by default, you opt into caching with `"use cache"`
- **Goal:** Better align with developer expectations while preserving static pre-rendering capabilities

**What Cache Components Achieve:**

1. **Explicit Opt-In Caching:**
   - All dynamic code executes at request time by default
   - Use `"use cache"` directive to cache pages, components, or functions
   - Compiler automatically generates cache keys

2. **Complete PPR (Partial Prerendering) Story:**
   - Instead of using Suspense to opt-in to dynamic (old PPR)
   - Now use `"use cache"` to opt-in to static (new paradigm)
   - Mix cached and dynamic content in the same route

3. **Flexible Caching Levels:**
   - `"use cache"` - Public cache for build-time prerendering
   - `"use cache: private"` - Private cache for runtime prefetching (can access cookies/params)
   - `"use cache: remote"` - Persistent cache for serverless environments

4. **Runtime Prefetching:**
   - Prefetch routes with actual runtime values (cookies, params, searchParams)
   - Instant client navigations without loading states
   - Cache snapshots of components in static shells

**The Core Concept: Push Down Dynamic Boundaries**

The key strategy with Cache Components is to **push dynamic boundaries as far down the component tree as possible**, making as much of your UI static as you can:

````

Static Shell (instant load)
├─ Cached Header ("use cache")
├─ Cached Sidebar ("use cache")
└─ <Suspense>
└─ Dynamic Content (per-request)

```

This gives you:
- ✅ Fast initial page load (static shell)
- ✅ Reduced server load (cached components)
- ✅ Fresh data where needed (dynamic content)

## Overview: What This Process Covers

This prompt automates the complete Cache Components enablement workflow:

**Configuration & Flags (Phase 1-2):**
- ✅ Detect package manager (npm/pnpm/yarn/bun)
- ✅ Verify Next.js version (16.0.0 stable or canary only - beta NOT supported)
- ✅ Enable cacheComponents (experimental in 16.0.0, stable in canary)
- ✅ Migrate from `experimental.dynamicIO` or `experimental.ppr` if needed
- ✅ Document existing Route Segment Config for migration

**Dev Server & MCP Setup (Phase 3):**
- ✅ Start dev server (MCP is enabled by default in Next.js 16+)
- ✅ Verify MCP server is active and responding
- ✅ Capture base URL and MCP endpoint for error detection

**Error Detection (Phase 4 - Optional):**
- ✅ Start browser and load every route using browser_eval tool
- ✅ Collect errors from browser session using Next.js MCP `get_errors` tool
- ✅ Categorize all Cache Components errors by type
- ✅ Build comprehensive error list before fixing
- ℹ️  Phase 4 can be skipped if proceeding directly to Phase 5 build-first approach

**Automated Fixing (Phase 5 - Build-First Strategy):**
- ✅ Run `<pkg-manager> run build` to identify all failing routes at once
- ✅ Get explicit error messages for every issue in build output
- ✅ Fix errors directly based on clear error messages from build
```

# リソースとの違い

リソース (Resources) は、プロンプトやツールとは異なる第 3 の MCP コンポーネントタイプで、**ナレッジベースコンテンツを提供する読み取り専用の情報源**です [1](#1-0) 。

## リソースの機能

リソースは、Markdown ファイルとして保存された**ドキュメントや技術リファレンス**を提供します [2](#1-1) 。現在 16 個のリソースが実装されており、主に Cache Components と Next.js 16 の知識ベースで構成されています [3](#1-2) 。

### URI ベースのアドレッシング

リソースは`cache-components://overview`のような URI 形式でアクセスされます [4](#1-3) 。これにより、ファイルシステム構造から独立した論理的な整理が可能になります<cite />。

## 3 つのコンポーネントの比較

| 特性           | ツール                  | プロンプト               | リソース                    |
| -------------- | ----------------------- | ------------------------ | --------------------------- | --------- |
| **目的**       | 操作の実行              | ワークフロー指示         | 知識提供                    |
| **状態変更**   | 可能                    | なし                     | なし                        |
| **戻り値**     | テキスト結果            | 構造化メッセージ         | Markdown コンテンツ         |
| **リクエスト** | `CallToolRequestSchema` | `GetPromptRequestSchema` | `ReadResourceRequestSchema` |
| **登録数**     | 6 個                    | 2 個                     | 16 個                       | [5](#1-4) |

## 実装の違い

**リソース**は`ReadResourceRequestSchema`で処理され、URI でコンテンツを取得します [6](#1-5) :

```typescript
const resource = resources.find((r) => r.metadata.uri === uri);
const content = await resource.handler();
return {
  contents: [
    {
      uri,
      mimeType: resource.metadata.mimeType || "text/markdown",
      text: content,
    },
  ],
};
```

### エクスポート契約

リソースモジュールは以下をエクスポートします [2](#1-1) :

- `metadata`: URI、名前、説明、MIME タイプ
- `handler`: コンテンツを返す関数（引数なし）

## ビルドプロセスでの扱い

リソースの Markdown ファイルは`src/resources/`から`dist/resources/`にコピーされます [7](#1-6) 。これにより、コンパイルされた TypeScript コードとは独立して編集可能です [8](#1-7) 。

## プロンプトとリソースの連携

プロンプトは、実行中に**リソースを参照・読み込むよう指示**します [9](#1-8) 。例えば、`enable-cache-components`プロンプトは、各フェーズで特定のリソース（`cache-components://overview`など）を読み込むよう明示的に指示します [10](#1-9) 。

## Notes

リソースは「オンデマンドで読み込まれる参照ドキュメント」として機能し、トークン効率を保ちながら詳細な技術情報を提供します<cite />。ツールが「実行」、プロンプトが「オーケストレーション」を担当するのに対し、リソースは「知識提供」に特化しています<cite />。3 つのコンポーネントは相互補完的に設計されており、AI エージェントが効果的に Next.js 開発を支援できるようになっています<cite />。

Wiki pages you might want to explore:

- [Core Concepts (vercel/next-devtools-mcp)](/wiki/vercel/next-devtools-mcp#3)

### Citations

**File:** CLAUDE.md (L52-54)

```markdown
- **Tools** (`src/tools/`): Callable functions for automation - each exports `inputSchema`, `metadata`, and `handler`
- **Prompts** (`src/prompts/`): Pre-configured prompts for common tasks - each exports `inputSchema`, `metadata`, and `handler`
- **Resources** (`src/resources/`): Knowledge base articles and documentation - each exports `metadata` and `handler`
```

**File:** CLAUDE.md (L78-82)

```markdown
**Resources Architecture**:

- Knowledge base split into focused sections (12 sections for Cache Components, 2 for Next.js 16, 1 for fundamentals)
- Each resource exports: `metadata` (uri, name, description, mimeType) and `handler` (function returning content)
- Resources use URI-based addressing (e.g., `cache-components://overview`)
- Markdown files in `src/resources/` are copied to `dist/resources/` during build via `scripts/copy-resources.js`
```

**File:** CLAUDE.md (L92-96)

```markdown
## Build Process

1. TypeScript compilation: `tsc` compiles all TypeScript files from `src/` to `dist/`
2. Resource copying: `scripts/copy-resources.js` copies markdown files from `src/resources/` and `src/prompts/` to `dist/resources/`
```

**File:** src/index.ts (L50-67)

```typescript
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
];
```

**File:** src/index.ts (L94-206)

```typescript
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: tools.map((tool) => ({
      name: tool.metadata.name,
      description: tool.metadata.description,
      inputSchema: {
        type: "object",
        properties: Object.entries(tool.inputSchema).reduce(
          (acc, [key, zodSchema]) => {
            acc[key] = zodSchemaToJsonSchema(zodSchema);
            return acc;
          },
          {} as Record<string, JSONSchema>
        ),
      },
    })),
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  const tool = tools.find((t) => t.metadata.name === name);
  if (!tool) {
    throw new Error(`Tool not found: ${name}`);
  }

  // Validate arguments with Zod schema
  const parsedArgs = parseToolArgs(tool.inputSchema, args || {});

  // Call the tool handler
  const result = await tool.handler(parsedArgs as never);

  return {
    content: [
      {
        type: "text",
        text: result,
      },
    ],
  };
});

// Register prompt handlers
server.setRequestHandler(ListPromptsRequestSchema, async () => {
  return {
    prompts: prompts.map((prompt) => ({
      name: prompt.metadata.name,
      description: prompt.metadata.description,
    })),
  };
});

server.setRequestHandler(GetPromptRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  const prompt = prompts.find((p) => p.metadata.name === name);
  if (!prompt) {
    throw new Error(`Prompt not found: ${name}`);
  }

  // Validate arguments if schema exists
  let parsedArgs: Record<string, unknown> = args || {};
  if (prompt.inputSchema) {
    parsedArgs = parseToolArgs(prompt.inputSchema, args || {});
  }

  // Get the prompt content
  const content = await prompt.handler(parsedArgs as never);

  return {
    messages: [
      {
        role: prompt.metadata.role || "user",
        content: {
          type: "text",
          text: content,
        },
      },
    ],
  };
});

// Register resource handlers
server.setRequestHandler(ListResourcesRequestSchema, async () => {
  return {
    resources: resources.map((resource) => ({
      uri: resource.metadata.uri,
      name: resource.metadata.name,
      description: resource.metadata.description,
      mimeType: resource.metadata.mimeType || "text/markdown",
    })),
  };
});

server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const { uri } = request.params;

  const resource = resources.find((r) => r.metadata.uri === uri);
  if (!resource) {
    throw new Error(`Resource not found: ${uri}`);
  }

  // Get the resource content
  const content = await resource.handler();

  return {
    contents: [
      {
        uri,
        mimeType: resource.metadata.mimeType || "text/markdown",
        text: content,
      },
    ],
  };
});
```

**File:** scripts/copy-resources.js (L13-15)

```javascript
const SRC_RESOURCES_DIR = "src/resources";
const SRC_PROMPTS_DIR = "src/prompts";
const DEST_DIR = "dist/resources";
```

**File:** src/prompts/enable-cache-components-prompt.md (L26-35)

```markdown
**How to Access Resources (MANDATORY - ALWAYS LOAD):**

Resources use the URI scheme `cache-components://...` and are served by this MCP server.

**CRITICAL: You MUST load resources at each phase phase - this is not optional.**

To load a resource, use the ReadMcpResourceTool with:

- server: `"next-devtools"` (or whatever your server is configured as)
- uri: `"cache-components://[resource-name]"` from the list above
```

**File:** src/prompts/enable-cache-components-prompt.md (L36-59)

```markdown
**MANDATORY Resource Loading Schedule:**

You MUST load these resources at the specified phases:

- **BEFORE Phase 1-2:** ALWAYS load `cache-components://overview` first

  - Provides critical context and error patterns AI agents make
  - Must be loaded before any configuration changes

- **During Phase 5 (Error Fixing):** ALWAYS load error-specific resources as needed

  - When fixing blocking route errors → Load `cache-components://error-patterns`
  - When configuring caching → Load `cache-components://advanced-patterns`
  - When using dynamic params → Load `cache-components://core-mechanics`
  - Do NOT guess or use generic patterns - load the specific resource

- **During Phase 6 (Verification):** ALWAYS load `cache-components://build-behavior`
  - Provides build verification strategies and troubleshooting

**Why This Matters:**

- Resources contain proven solutions from 125+ test fixtures
- Generic patterns may not work with Cache Components specifics
- Loading ensures you follow exact API semantics and error patterns
- Token savings only work if resources are loaded when needed
- Without loading, you may apply incorrect fixes
```

# プロンプトが`role`を返す理由

プロンプトが`role`を返すのは、**MCP プロトコルの`messages`形式に準拠するため**です [1](#2-0) 。

## MCP プロトコルの要件

`GetPromptRequestSchema`ハンドラーは、プロンプトの内容を`messages`配列として返す必要があります [2](#2-1) 。各メッセージオブジェクトには以下が必要です:

- `role`: メッセージの送信者を示す（`"user"`または`"assistant"`）
- `content`: メッセージの実際のテキスト内容

## 実装の詳細

````typescript
return {
  messages: [
    {
      role: prompt.metadata.role || "user",
      content: {
        type: "text",
        text: content
      }
    }
  ]
}
``` [1](#2-0)

`role`は`prompt.metadata.role`から取得され、指定がない場合はデフォルトで`"user"`になります [3](#2-2) 。

## 実際の使用例

現在実装されている2つのプロンプトは、どちらも`role: "user"`を明示的に設定しています:

- `upgrade-nextjs-16`: `role: "user"` [4](#2-3)
- `enable-cache-components`: `role: "user"` [5](#2-4)

## ツールとの違い

**ツール**は単純なテキスト結果を返します:
```typescript
return {
  content: [{ type: "text", text: result }]
}
``` [6](#2-5)

**プロンプト**は構造化されたメッセージとして返します:
```typescript
return {
  messages: [{
    role: "user",
    content: { type: "text", text: content }
  }]
}
``` [1](#2-0)

## Notes

`role`フィールドは、AIクライアントがプロンプトの内容を**会話のコンテキストとして適切に処理する**ために必要です<cite />。`"user"`ロールは、プロンプトの内容がユーザーからの指示として扱われることを意味し、AIエージェントはそれに応答する形でタスクを実行します<cite />。これにより、プロンプトは単なるテキストではなく、会話フローの一部として機能します<cite />。

Wiki pages you might want to explore:
- [Core Concepts (vercel/next-devtools-mcp)](/wiki/vercel/next-devtools-mcp#3)

### Citations

**File:** src/index.ts (L124-131)
```typescript
  return {
    content: [
      {
        type: "text",
        text: result,
      },
    ],
  }
````

**File:** src/index.ts (L144-172)

```typescript
server.setRequestHandler(GetPromptRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  const prompt = prompts.find((p) => p.metadata.name === name);
  if (!prompt) {
    throw new Error(`Prompt not found: ${name}`);
  }

  // Validate arguments if schema exists
  let parsedArgs: Record<string, unknown> = args || {};
  if (prompt.inputSchema) {
    parsedArgs = parseToolArgs(prompt.inputSchema, args || {});
  }

  // Get the prompt content
  const content = await prompt.handler(parsedArgs as never);

  return {
    messages: [
      {
        role: prompt.metadata.role || "user",
        content: {
          type: "text",
          text: content,
        },
      },
    ],
  };
});
```

**File:** src/prompts/upgrade-nextjs-16.ts (L20-26)

```typescript
export const metadata = {
  name: "upgrade-nextjs-16",
  title: "upgrade-nextjs-16",
  description:
    "Guide through upgrading Next.js to version 16. CRITICAL: Runs the official codemod FIRST (requires clean git state) for automatic upgrades and fixes, then handles remaining issues manually. The codemod upgrades Next.js, React, and React DOM automatically. Covers async API changes, config moves, image defaults, parallel routes, and deprecations.",
  role: "user",
};
```

**File:** src/prompts/enable-cache-components.ts (L15-21)

```typescript
export const metadata = {
  name: "enable-cache-components",
  title: "enable-cache-components",
  description:
    "Complete Cache Components setup for Next.js 16. Handles ALL steps: updates experimental.cacheComponents flag, removes incompatible flags, migrates Route Segment Config, starts dev server with MCP, detects all errors via chrome_devtools + get_errors, automatically fixes all issues by adding Suspense boundaries, 'use cache' directives, generateStaticParams, cacheLife profiles, cache tags, and validates everything with zero errors.",
  role: "user",
};
```
