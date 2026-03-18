# 项目研读与归档基线（research-project-architecture-style-tech-stack）

## 1) 证据源清单（任务 1.1）

本次基线研读采用“配置入口 + 分层目录 + 代表性模块”证据集合：

- 工程与依赖：
  - `package.json`
  - `tsconfig.json`
  - `next.config.ts`
  - `eslint.config.mjs`
  - `stylelint.config.mjs`
- 前端页面层：
  - `src/app/(pages)/blog/posts/[item]/page.tsx`
  - `src/app/api/[[...route]]/route.ts`
- API / 服务层：
  - `src/server/main.ts`
  - `src/server/common/app.ts`
  - `src/server/post/routes.ts`
  - `src/server/post/service.ts`
  - `src/server/common/error.ts`
  - `src/server/common/response.ts`
- 共享与基础设施层：
  - `src/libs/api.ts`
  - `src/api/post.ts`
  - `src/libs/db/client.ts`
  - `src/libs/db/utils.ts`
  - `src/config/app.ts`
- 数据层：
  - `src/database/client.ts`
  - `src/database/schema/schema.prisma`
  - `src/database/schema/models/post.prisma`
  - `src/database/schema/models/category.prisma`
  - `src/database/schema/models/tag.prisma`

## 2) 代表性样本提取（任务 1.2）

### 架构流样本
- API 入口：`src/app/api/[[...route]]/route.ts`
- API 装配：`src/server/main.ts`
- 路由定义：`src/server/post/routes.ts`
- 服务执行：`src/server/post/service.ts`
- 数据访问：`src/libs/db/client.ts` / `src/database/client.ts`

### 封装边界样本
- 客户端 API 封装：`src/libs/api.ts` + `src/api/post.ts`
- 服务层与校验/响应封装：`src/server/common/error.ts` + `src/server/common/response.ts`
- 数据工具封装：`src/libs/db/utils.ts`

### 风格样本
- TS/React 风格与规则：`eslint.config.mjs`
- CSS 风格与规则：`stylelint.config.mjs`
- TS 严格性：`tsconfig.json`

## 3) 未覆盖与范围外说明（任务 1.3）

未做深度覆盖（仅抽样）：
- `src/app/_components` 下的全部 UI 组件细节
- 所有 `src/server/*/schema.ts` 与 `type.ts` 的完整契约矩阵
- 各 migration 的历史演进对比（仅确认存在，不逐条审计）
- 运行时性能、压测与安全扫描（本次聚焦静态结构与规范）

范围边界：
- 本变更不改动业务行为，不重构目录，不升级依赖。

## 4) 架构基线（任务 2.1 / 2.2）

### 分层职责
- `src/app`: 页面渲染、路由页、组件组合。
- `src/server`: Hono API 路由、请求校验、服务编排、统一错误与响应。
- `src/libs` / `src/api`: 复用工具与 API 客户端适配层。
- `src/database`: Prisma 客户端、扩展能力与 schema/migration。

### 端到端请求流（示例：文章分页）
1. `src/api/post.ts` 通过 `postApi.paginate()` 发起请求。
2. `src/libs/api.ts` 基于 `hono/client` 绑定 `AppType`，执行请求。
3. `src/app/api/[[...route]]/route.ts` 将 HTTP 方法委托给 Hono `app`。
4. `src/server/main.ts` 将请求路由到 `postRoutes`。
5. `src/server/post/routes.ts` 进行参数校验并调用 `queryPostPaginate()`。
6. `src/server/post/service.ts` 调用 Prisma 扩展分页与分类树查询。
7. `src/libs/db/client.ts` / `src/database/client.ts` 通过 Prisma + PostgreSQL 适配器访问数据。

### 模块边界结论
- 路由层：负责协议与验证，业务逻辑薄（清晰）。
- 服务层：负责查询组装、关联关系处理（清晰）。
- 数据层：集中在 Prisma client 与扩展（清晰）。
- 客户端 API 层：`src/api/*` 与 `src/libs/api.ts` 有轻量封装（清晰）。

## 5) 架构约束与风险（任务 2.3）

- 约束：核心依赖 Next.js App Router + Hono + Prisma/PostgreSQL。
- 约束：数据库连接字符串与运行环境变量强绑定。
- 风险：服务层含较多“查询拼装 + 关系补全”逻辑，未来扩展时复杂度可能上升。
  - 缓解：按领域再拆服务函数，并补充查询场景测试。
- 风险：当前基础文档薄弱，新增成员对分层边界理解依赖口口相传。
  - 缓解：持续维护本归档并在 PR 模板中引用。

## 6) 代码风格基线（任务 3.1）

- TypeScript：`strict: true`，并启用 `noImplicitAny`、`noUnusedLocals` 等严格项（`tsconfig.json`）。
- ESLint：使用 `@antfu/eslint-config`，配合 `@next/next`、`perfectionist`、`unused-imports`（`eslint.config.mjs`）。
- 代码风格：整体偏函数化、显式类型、按职责文件组织；中英双语注释共存。
- CSS 风格：`stylelint-config-standard` + css-modules + recess-order + prettier（`stylelint.config.mjs`）。
- 依赖管理：`pnpm` + scripts 分层（开发、构建、lint、db 运维脚本）。

## 7) 封装质量审计（任务 3.2）

- clear（清晰）：
  - 路由/服务/数据访问分层明确（`src/server/post/routes.ts`、`src/server/post/service.ts`）。
  - 统一错误与响应辅助函数（`src/server/common/error.ts`、`src/server/common/response.ts`）。
- mixed（混合）：
  - `src/libs/db/client.ts` 与 `src/database/client.ts` 均承担 Prisma 客户端职责，存在并行入口。
- leaky（泄漏）：
  - 暂未发现明显跨层直接耦合（如 UI 直接操作数据库）；但服务层内部逻辑正增长，需要持续防止“胖服务”。

## 8) 优先级改进建议（任务 3.3）

- P1（高）：统一 Prisma 客户端入口，减少 `src/libs/db/client.ts` 与 `src/database/client.ts` 的认知分叉。
  - 影响：中；难度：中。
  - 下一步：新增 ADR 或小型 change，明确唯一入口与迁移策略。
- P1（高）：为服务层复杂查询补充契约测试（尤其分页 + 分类树组合场景）。
  - 影响：高；难度：中。
  - 下一步：围绕 `queryPostPaginate` 建立场景测试样例。
- P2（中）：补齐架构概览 README（层次图 + 请求流示意），降低 onboarding 成本。
  - 影响：中；难度：低。
  - 下一步：从本归档提炼一页文档放入仓库根文档区。
- P2（中）：沉淀代码注释规范（何处需要注释、注释语言建议）。
  - 影响：中；难度：低。
  - 下一步：在 lint/PR 规范中给出示例与边界。

## 9) 技术栈盘点（任务 4.1 / 4.2）

### Runtime（基础）
- 前端框架：`next` 15 + `react` 19
- API 框架：`hono` + `hono-openapi` + `@hono/swagger-ui`
- 数据访问：`@prisma/client` + `@prisma/adapter-pg` + `pg`
- 数据库：PostgreSQL（`schema.prisma` 指定 `provider = "postgresql"`）
- 表单与校验：`react-hook-form` + `zod`
- 状态与工具：`zustand`、`lodash`、`immer`、`dayjs`
- UI：`antd` + Radix 组件 + 自建 `shadcn` 风格组件

### Tooling（基础）
- 语言：TypeScript 5
- 包管理：pnpm
- 代码质量：ESLint + Stylelint + Prettier
- 数据库流程：Prisma migrate / seed / generate（scripts 已配置）

### Optional / Feature-specific（可选/场景化）
- MDX 生态：`next-mdx-remote-client`、`remark-*`、`rehype-*`
- 编辑器能力：`@uiw/react-md-editor`
- 图标与交互增强：`lucide-react`、`@ricons/*`、`sonner`

### 关键性标签
- foundational（关键基础）：Next/React、Hono、Prisma/PG、TypeScript、Lint 工具链
- optional（场景扩展）：MDX 与内容编辑相关依赖、部分 UI/交互依赖

## 10) 归档复用方式（任务 4.3）

- 本文档作为“现状基线快照”，用于：
  - 新需求立项时快速定位影响层级；
  - 代码评审时对照边界是否被破坏；
  - 新成员 onboarding 的第一参考材料。
- 推荐触发更新时机：
  - 主框架升级（Next/Hono/Prisma）；
  - 目录结构重构；
  - API 契约或数据库模型出现大改动。
