## Why

当前项目缺少一份可持续维护的工程基线文档，团队成员难以快速统一理解代码风格、封装边界、整体架构与技术栈。现在建立标准化研读与归档流程，可以降低后续功能开发、重构和 onboarding 的认知成本。

## What Changes

- 新增面向本仓库的结构化研读流程，覆盖代码风格、封装逻辑、系统分层与技术栈清单。
- 定义统一的归档产物格式，输出可复用、可追踪的项目基线文档。
- 为后续变更评审提供“当前状态基线”，支持对架构和编码规范的增量演进。
- 约束研读范围优先覆盖 `src/app`、`src/server`、`src/libs`、`src/database` 与核心配置文件。

## Capabilities

### New Capabilities
- `codebase-architecture-baseline`: 形成项目分层、模块职责、数据流与 API 边界的基线描述。
- `code-style-and-encapsulation-audit`: 形成代码风格与封装模式的观察结果、约定总结与风险点清单。
- `tech-stack-inventory-and-archive`: 形成依赖、框架、中间件与工程工具链的盘点与归档输出。

### Modified Capabilities
- （无）

## Impact

- 影响目录：`openspec/changes/research-project-architecture-style-tech-stack/` 下的 `proposal.md`、`design.md`、`specs/`、`tasks.md`。
- 影响协作流程：后续需求评审与实现前，可引用该归档作为项目基线。
- 对运行时代码无直接行为变更；主要新增规范与文档资产。
