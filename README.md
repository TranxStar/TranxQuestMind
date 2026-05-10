# 🧠 QuestMind

> 开源 AI 刷题平台 — 选择你的学习主题，开启智能答题之旅

QuestMind 是一个轻量级、开源的刷题 SPA（单页应用），旨在帮助开发者通过交互式答题巩固编程知识。无需后端服务，纯前端实现，开箱即用。

---

## ✨ 功能特性

| 特性 | 说明 |
|------|------|
| 📚 **多主题学习** | 支持 JavaScript、HTML & CSS、React、Python、算法与数据结构、Git 等编程主题 |
| 🎯 **交互式答题** | 选择题作答、提交、即时反馈与解析查看 |
| ⏱ **实时计时** | 答题全程计时，掌握练习节奏 |
| 📊 **成绩结算** | 答题完成后展示得分、用时与详细成绩报告 |
| 📝 **错题本** | 自动记录错题，支持本地持久化存储 |
| 💾 **本地持久化** | 学习主题偏好与错题记录通过 `localStorage` 保存，关闭页面不丢失 |
| 🔄 **无刷新导航** | 基于原生 JavaScript 的 SPA 路由，页面切换流畅 |

---

## 🗂️ 项目结构

```
TranxQuestMind/
├── index.html                 # 入口文件
├── style.css                  # 全局样式
├── README.md                  # 项目文档（你在这里）
├── LICENSE                    # 开源许可证
│
├── HTML/                      # HTML 页面片段
│   ├── Choose.html            # 学习内容选择页
│   ├── Engine.html            # 答题引擎页
│   └── Settlement.html        # 成绩结算页
│
└── JavaScript/                # JavaScript 模块
    ├── Main.js                # 主入口 — 页面路由与加载
    ├── Choose.js              # 学习内容选择模块
    ├── Engine.js              # 答题引擎模块
    └── Storage.js             # 本地存储工具模块
```

---

## 🚀 快速开始

由于 QuestMind 是纯前端应用，无需安装依赖或配置服务器，**直接在浏览器中打开即可使用**。

### 方式一：直接打开

```bash
# 在项目根目录下打开 index.html
open index.html        # macOS
start index.html       # Windows
xdg-open index.html    # Linux
```

### 方式二：使用本地服务器（推荐）

```bash
# 使用 Python 内置服务器（Python 3）
python -m http.server 8080

# 或使用 Node.js 的 live-server（需全局安装）
npx live-server
```

然后访问 `http://localhost:8080` 即可开始使用。

---

## 🎮 使用指南

### 1️⃣ 选择学习内容
- 在首页从 6 个编程主题中选择一个
- 点击 `开始答题 🚀` 进入答题模式

### 2️⃣ 开始答题
- **选择答案**：点击选项按钮进行选择
- **提交答案**：点击「提交」按钮确认作答
- **查看解析**：提交后立即显示正确答案与详细解析
- **切换题目**：使用「上一题 / 下一题」按钮导航
- **全部完成后**：自动跳转到成绩结算页

### 3️⃣ 查看成绩
- 展示 **答对题数**、**得分百分比** 与 **总用时**
- **错题回顾**：列出所有答错的题目、你的答案与正确答案

---

## 🛠️ 技术栈

| 技术 | 用途 |
|------|------|
| **HTML5** | 页面结构与语义化片段 |
| **CSS3** | 样式、布局（Grid/Flexbox）、响应式设计 |
| **JavaScript (ES6+)** | 模块化开发、SPA 路由、DOM 操作 |
| **localStorage** | 客户端持久化存储 |

- 无第三方依赖，零外部库
- 原生 ES Module 实现模块化加载
- `fetch` 异步加载 HTML 片段实现页面切换

---

## 🤝 如何贡献

欢迎任何形式的贡献！你可以通过以下方式参与：

1. **Fork 本仓库** — 点击右上角的 Fork 按钮
2. **创建功能分支** — `git checkout -b feature/your-feature`
3. **提交更改** — `git commit -m '添加了某某功能'`
4. **推送到分支** — `git push origin feature/your-feature`
5. **提交 Pull Request**

建议先提交 Issue 讨论重大变更。

### 可以通过这些方式贡献
- 🐛 报告 Bug
- 💡 提出新功能建议（如：新的题库分类、随机出题模式等）
- 📖 完善或翻译文档
- 🔧 提交代码改进

---

## 📄 许可证

本项目基于 [MIT 许可证](LICENSE) 开源，你可以自由使用、修改和分发。

---

## 📬 联系方式

如有问题或建议，欢迎提交 [Issue](https://github.com/your-username/TranxQuestMind/issues) 或 Pull Request。

---

> **QuestMind** — 让每一次答题都成为进步的阶梯 🧠✨