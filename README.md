
<div align="center">
  <img width="800" alt="University Schedule Banner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# University Schedule

> 一个响应式、移动优先的大学课程表应用，支持从 JSON 数据解析并可视化展示课程安排。

---

## 功能特性

- 📅 **周/日视图切换**：支持按周或按天查看课程安排。
- 🏫 **课程信息可视化**：课程时间、地点、教师、周次等信息一目了然。
- 🎨 **多彩课程块**：不同课程自动分配颜色，便于区分。
- 📱 **移动优先设计**：适配手机、平板和桌面端。
- ⚡ **本地数据解析**：无需后端，直接解析本地 JSON 课表数据。
- 🧩 **组件化开发**：易于扩展和维护。

## 技术栈

- [React 19](https://react.dev/)  —— 现代前端 UI 框架
- [Vite](https://vitejs.dev/) —— 极速开发与构建工具
- [TypeScript](https://www.typescriptlang.org/) —— 类型安全
- [Tailwind CSS](https://tailwindcss.com/) —— 原子化 CSS
- [lucide-react](https://lucide.dev/) —— 图标库

## 目录结构

```text
├── App.tsx                # 应用主入口，控制视图切换与状态
├── constants.ts           # 课程时间、周次、颜色、原始课表数据等常量
├── index.html             # HTML 模板，含 PWA 配置
├── index.tsx              # React 挂载入口
├── manifest.json          # PWA 清单
├── metadata.json          # 应用元信息
├── package.json           # 项目依赖与脚本
├── tsconfig.json          # TypeScript 配置
├── types.ts               # 课表相关类型定义
├── utils.ts               # 课表数据处理工具函数
├── vite.config.ts         # Vite 配置
└── components/            # 主要 UI 组件
    ├── DaySelector.tsx    # 日选择器（切换星期）
    ├── DayView.tsx        # 单日课程视图
    ├── WeekSelector.tsx   # 周选择器与视图切换
    └── WeekView.tsx       # 全周课程表视图
```

## 主要组件说明

- **WeekSelector**：顶部导航栏，支持切换周次与视图模式（周/日）。
- **DaySelector**：在日视图下显示，快速切换星期。
- **WeekView**：以表格形式展示一周所有课程，横轴为星期，纵轴为节次。
- **DayView**：以卡片形式展示某天的所有课程，包含时间、地点、教师等详细信息。

## 安装与运行

### 环境要求
- Node.js 18+（建议使用 [nvm](https://github.com/nvm-sh/nvm) 管理）

### 本地启动

1. 安装依赖：
   ```bash
   npm install
   # 或 pnpm install
   ```
2. （可选）如需集成 Gemini API，需在 `.env.local` 设置 `GEMINI_API_KEY`
3. 启动开发服务器：
   ```bash
   npm run dev
   # 或 pnpm dev
   ```
4. 访问 [http://localhost:3000](http://localhost:3000)

### 构建生产包

```bash
npm run build
# 或 pnpm build
```
构建产物位于 `dist/` 目录。

### 预览生产包

```bash
npm run preview
# 或 pnpm preview
```

## 数据格式说明

课表数据存储于 `constants.ts` 的 `RAW_SCHEDULE_DATA` 变量，结构参考 `types.ts` 中的类型定义。

## 许可协议

MIT License
