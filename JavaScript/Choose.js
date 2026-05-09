// ==========================================
// QuestMind 选择学习内容模块
// ==========================================
import { getSavedTopic, saveTopic } from './Storage.js';

// ---------- 1. 学习内容数据 ----------
const studyTopics = [
  { id: "javascript", title: "JavaScript 基础", description: "变量、作用域、闭包、Promise 等核心概念", icon: "🟨", color: "#f7df1e" },
  { id: "html-css",    title: "HTML & CSS",       description: "布局、Flexbox、Grid、响应式设计",      icon: "🎨", color: "#e34c26" },
  { id: "react",       title: "React 框架",        description: "组件、Hooks、状态管理、JSX",           icon: "⚛️", color: "#61dafb" },
  { id: "python",      title: "Python 编程",       description: "数据类型、函数、OOP、标准库",           icon: "🐍", color: "#3776ab" },
  { id: "algorithms",  title: "算法与数据结构",     description: "排序、搜索、链表、树、动态规划",        icon: "🔢", color: "#6b5b95" },
  { id: "git",         title: "Git 版本控制",      description: "分支、合并、协作工作流",                 icon: "🔀", color: "#f05032" },
];

// ---------- 2. 导出初始化函数 ----------
export function initChoosePage() {
  const chooseGrid = document.getElementById('chooseGrid');
  const selectedInfo = document.getElementById('selectedInfo');
  const selectedLabel = document.getElementById('selectedLabel');
  const startQuizBtn = document.getElementById('startQuizBtn');
  if (!chooseGrid) return;

  // 清空并重新渲染卡片
  chooseGrid.innerHTML = '';
  studyTopics.forEach((topic) => {
    const card = document.createElement('div');
    card.className = 'topic-card';
    card.dataset.id = topic.id;
    card.innerHTML = `
      <div class="topic-icon">${topic.icon}</div>
      <div class="topic-title">${topic.title}</div>
      <div class="topic-desc">${topic.description}</div>
    `;

    // 如果已保存，自动高亮
    const saved = getSavedTopic();
    if (saved && saved.id === topic.id) {
      card.classList.add('topic-selected');
      updateSelectedInfo(topic);
    }

    card.addEventListener('click', () => {
      document.querySelectorAll('.topic-card').forEach(el => el.classList.remove('topic-selected'));
      card.classList.add('topic-selected');
      saveTopic(topic);
      updateSelectedInfo(topic);
    });

    chooseGrid.appendChild(card);
  });

  // 如果已有保存的选择，显示开始按钮
  const saved = getSavedTopic();
  if (saved) {
    updateSelectedInfo(saved);
  }

  // 开始答题按钮
  startQuizBtn.addEventListener('click', () => {
    if (!getSavedTopic()) {
      alert('请先选择一个学习内容！');
      return;
    }
    // 触发全局路由
    if (typeof window.goToEngine === 'function') {
      window.goToEngine();
    }
  });

  // ---------- 辅助函数 ----------
  function updateSelectedInfo(topic) {
    if (selectedLabel && selectedInfo) {
      selectedLabel.textContent = `已选择：${topic.icon} ${topic.title}`;
      selectedInfo.style.display = 'flex';
    }
  }
}