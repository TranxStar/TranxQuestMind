// ==========================================
// QuestMind 主入口 - 页面路由与加载
// ==========================================
import { initChoosePage } from './Choose.js';
import { initEnginePage } from './Engine.js';

// ---------- 1. 页面注册表 ----------
const PAGES = {
  choose: {
    html: 'HTML/Choose.html',
    init: initChoosePage,
  },
  engine: {
    html: ['HTML/Engine.html', 'HTML/Settlement.html'], // 需要两个片段
    init: initEnginePage,
  },
};

// ---------- 2. 加载并切换页面 ----------
const app = document.getElementById('app');

/**
 * 加载一个或多个 HTML 片段
 */
async function loadFragment(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.text();
}

/**
 * 导航到指定页面
 */
async function navigate(pageName) {
  const page = PAGES[pageName];
  if (!page) {
    console.error(`未知页面: ${pageName}`);
    return;
  }

  try {
    const urls = Array.isArray(page.html) ? page.html : [page.html];

    // 并行加载所有 HTML 片段
    const fragments = await Promise.all(urls.map(url => loadFragment(url)));
    app.innerHTML = fragments.join('');

    // 执行页面初始化
    if (typeof page.init === 'function') {
      page.init();
    }
  } catch (err) {
    console.error(`加载页面 ${pageName} 失败:`, err);
    app.innerHTML = `<p style="color:red; text-align:center; margin-top:2rem;">
      ❌ 页面加载失败，请检查网络或文件路径。
    </p>`;
  }
}

// ---------- 3. 暴露路由给其他模块 ----------
// Choose.js 调用 goToEngine
window.goToEngine = function () {
  navigate('engine');
};

// 返回选择页
window.goToChoose = function () {
  navigate('choose');
};

// ---------- 4. 启动 ----------
navigate('choose');