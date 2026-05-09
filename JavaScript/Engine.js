// ==========================================
// QuestMind 答题引擎模块
// ==========================================
import { addWrongQuestion } from './Storage.js';

// ---------- 1. 题库数据 ----------
const questionBank = [
  {
    id: 1,
    text: "JavaScript 中声明一个不可变变量用哪个关键字？",
    options: ["var", "let", "const", "int"],
    answer: 2,
    explanation: "const 声明的变量不可重新赋值，但对象属性仍可改。"
  },
  {
    id: 2,
    text: "以下哪个方法可以选取页面中 id 为 'title' 的元素？",
    options: [
      "document.querySelector('#title')",
      "document.getElementById('title')",
      "以上两者皆可",
      "以上两者皆不可"
    ],
    answer: 2,
    explanation: "querySelector 接收 CSS 选择器，#title 即为 id 选择器，且 getElementById 专门用于选取 id。"
  },
  {
    id: 3,
    text: "Promise 的主要用途是什么？",
    options: ["实现同步阻塞", "处理异步操作", "生成随机数", "操作 DOM"],
    answer: 1,
    explanation: "Promise 是 JavaScript 处理异步编程的解决方案，表示一个未来才完成的操作。"
  }
];

// ---------- 2. 状态 ----------
let currentIndex = 0;
let userAnswers = [];
let submitted = [];
let startTime = Date.now();
let timerInterval = null;

// ---------- 3. 导出初始化函数 ----------
export function initEnginePage() {
  // 获取 DOM 引用
  const quizPage = document.getElementById('quizPage');
  const questionTextEl = document.getElementById('questionText');
  const optionsContainer = document.getElementById('optionsContainer');
  const submitBtn = document.getElementById('submitBtn');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const feedbackEl = document.getElementById('feedback');
  const progressEl = document.getElementById('progress');
  const timerEl = document.getElementById('timer');
  const quizCard = document.getElementById('quizCard');
  const scoreboardEl = document.getElementById('scoreboard');
  const resultSummary = document.getElementById('resultSummary');
  const totalTimeEl = document.getElementById('totalTime');
  const wrongListEl = document.getElementById('wrongList');
  const restartBtn = document.getElementById('restartBtn');
  const navBtns = document.querySelector('.nav-buttons');

  if (!questionTextEl) return;

  // ---- 确保页面可见 ----
  if (quizPage) quizPage.style.display = 'block';

  // ---- 重置状态 ----
  currentIndex = 0;
  userAnswers = new Array(questionBank.length).fill(null);
  submitted = new Array(questionBank.length).fill(false);
  startTime = Date.now();

  // ---- 显示答题卡片，隐藏结算页 ----
  if (quizCard) quizCard.style.display = 'block';
  if (navBtns) navBtns.style.display = 'flex';
  if (scoreboardEl) scoreboardEl.style.display = 'none';
  if (feedbackEl) feedbackEl.innerHTML = '';

  // ---- 渲染第一题 ----
  renderQuestion(questionTextEl, optionsContainer, submitBtn, prevBtn, nextBtn, feedbackEl, progressEl);

  // ---- 计时器 ----
  if (timerInterval) clearInterval(timerInterval);
  startTimer(timerEl);

  // ---- 绑定事件（用 onclick 避免重复绑定） ----
  submitBtn.onclick = () => submitCurrent(questionTextEl, optionsContainer, submitBtn, prevBtn, nextBtn, feedbackEl, progressEl, quizCard, navBtns, scoreboardEl, resultSummary, totalTimeEl, wrongListEl, timerEl);
  prevBtn.onclick = () => goToPrev(questionTextEl, optionsContainer, submitBtn, prevBtn, nextBtn, feedbackEl, progressEl);
  nextBtn.onclick = () => goToNext(questionTextEl, optionsContainer, submitBtn, prevBtn, nextBtn, feedbackEl, progressEl);
  restartBtn.onclick = () => initEnginePage();
}

// ---------- 4. 渲染 ----------
function renderQuestion(questionTextEl, optionsContainer, submitBtn, prevBtn, nextBtn, feedbackEl, progressEl) {
  const q = questionBank[currentIndex];
  if (!q) return;

  questionTextEl.textContent = q.text;

  // 渲染选项按钮
  optionsContainer.innerHTML = '';
  q.options.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = opt;

    if (submitted[currentIndex]) {
      btn.disabled = true;
      if (idx === q.answer) btn.classList.add('correct-answer');
      if (userAnswers[currentIndex] === idx && idx !== q.answer) btn.classList.add('wrong-answer');
    } else {
      btn.addEventListener('click', () => {
        if (submitted[currentIndex]) return;
        userAnswers[currentIndex] = idx;
        renderQuestion(questionTextEl, optionsContainer, submitBtn, prevBtn, nextBtn, feedbackEl, progressEl);
      });
    }

    if (userAnswers[currentIndex] === idx && !submitted[currentIndex]) {
      btn.classList.add('selected');
    }

    optionsContainer.appendChild(btn);
  });

  // 提交按钮状态
  submitBtn.disabled = submitted[currentIndex] || userAnswers[currentIndex] === null;

  // 反馈信息
  if (submitted[currentIndex]) {
    const correct = userAnswers[currentIndex] === q.answer;
    feedbackEl.innerHTML = correct
      ? '<span class="correct">✓ 回答正确</span>'
      : `<span class="wrong">✗ 回答错误</span> — 正确答案: ${q.options[q.answer]}`;
    feedbackEl.innerHTML += `<div style="margin-top:0.5rem;">💡 ${q.explanation}</div>`;
  } else {
    feedbackEl.innerHTML = '';
  }

  // 导航按钮状态
  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex === questionBank.length - 1;

  // 进度
  progressEl.textContent = `第 ${currentIndex + 1} / ${questionBank.length} 题`;
}

// ---------- 5. 提交与导航 ----------
function submitCurrent(questionTextEl, optionsContainer, submitBtn, prevBtn, nextBtn, feedbackEl, progressEl, quizCard, navBtns, scoreboardEl, resultSummary, totalTimeEl, wrongListEl, timerEl) {
  if (submitted[currentIndex]) return;
  if (userAnswers[currentIndex] === null) {
    alert('请先选择一个答案');
    return;
  }

  submitted[currentIndex] = true;

  const q = questionBank[currentIndex];
  if (userAnswers[currentIndex] !== q.answer) {
    addWrongQuestion(q.id);
  }

  // 检查是否全部完成
  if (submitted.every(s => s === true)) {
    clearInterval(timerInterval);
    showScoreboard(quizCard, navBtns, scoreboardEl, resultSummary, totalTimeEl, wrongListEl);
  }

  renderQuestion(questionTextEl, optionsContainer, submitBtn, prevBtn, nextBtn, feedbackEl, progressEl);
}

function goToPrev(questionTextEl, optionsContainer, submitBtn, prevBtn, nextBtn, feedbackEl, progressEl) {
  if (currentIndex > 0) {
    currentIndex--;
    renderQuestion(questionTextEl, optionsContainer, submitBtn, prevBtn, nextBtn, feedbackEl, progressEl);
  }
}

function goToNext(questionTextEl, optionsContainer, submitBtn, prevBtn, nextBtn, feedbackEl, progressEl) {
  if (currentIndex < questionBank.length - 1) {
    currentIndex++;
    renderQuestion(questionTextEl, optionsContainer, submitBtn, prevBtn, nextBtn, feedbackEl, progressEl);
  }
}

// ---------- 6. 计时器 ----------
function startTimer(timerEl) {
  timerInterval = setInterval(() => {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const mins = String(Math.floor(elapsed / 60)).padStart(2, '0');
    const secs = String(elapsed % 60).padStart(2, '0');
    timerEl.textContent = `⏱ ${mins}:${secs}`;
  }, 200);
}

// ---------- 7. 成绩与错题本 ----------
function showScoreboard(quizCard, navBtns, scoreboardEl, resultSummary, totalTimeEl, wrongListEl) {
  // 隐藏答题卡片，显示结算页
  quizCard.style.display = 'none';
  navBtns.style.display = 'none';
  scoreboardEl.style.display = 'block';

  const total = questionBank.length;
  const correctCount = submitted.reduce((acc, sub, idx) =>
    sub && userAnswers[idx] === questionBank[idx].answer ? acc + 1 : acc, 0);
  const score = Math.round((correctCount / total) * 100);

  resultSummary.textContent = `你答对了 ${correctCount} / ${total} 题，得分 ${score}%。`;

  const elapsed = Math.floor((Date.now() - startTime) / 1000);
  const mins = String(Math.floor(elapsed / 60)).padStart(2, '0');
  const secs = String(elapsed % 60).padStart(2, '0');
  totalTimeEl.textContent = `${mins}:${secs}`;

  // 错题列表
  wrongListEl.innerHTML = '';
  questionBank.forEach((q, idx) => {
    if (submitted[idx] && userAnswers[idx] !== q.answer) {
      const li = document.createElement('li');
      li.textContent = `第 ${idx + 1} 题: ${q.text} → 你答: ${q.options[userAnswers[idx]]}，正确: ${q.options[q.answer]}`;
      wrongListEl.appendChild(li);
    }
  });
}