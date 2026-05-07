# TranxQuestMind
一款纯前端、完全开源、即开即用的 AI 智能刷题应用。
100% 开源 & 免费
所有代码遵循 MIT 协议，从题库加载到评分逻辑均可在浏览器中直接审核。除了可选的外部题库与 AI API 外，零成本零依赖。
纯前端，即开即用
- **HTML5 / CSS3 / 原生 JavaScript (ES Modules)**  
- 极轻量响应式 UI，无任何前端框架，利用 Web Components 或原生 DOM 操作保持极致轻量  
- 本地存储 (`localStorage`) 实现错题本与用户设置  
- **Pico.css** (可选，10KB) 提供美观的默认样式  
- 通过 `fetch` 对接第三方题库与 AI API  
- 可选 Cloudflare Workers 免费代理解决跨域与密钥安全  

项目整体为一个高内聚、低耦合的模块化结构，核心引擎很容易复用或嵌入到其他产品。
