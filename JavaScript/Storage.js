// ==========================================
// QuestMind 存储工具模块
// ==========================================

const TOPIC_KEY = 'questmind_topic';
const WRONG_KEY = 'questcraft_wrong';

/**
 * 获取已保存的学习主题
 */
export function getSavedTopic() {
  try {
    const saved = localStorage.getItem(TOPIC_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

/**
 * 保存学习主题
 */
export function saveTopic(topic) {
  localStorage.setItem(TOPIC_KEY, JSON.stringify(topic));
}

/**
 * 清除学习主题缓存
 */
export function clearTopic() {
  localStorage.removeItem(TOPIC_KEY);
}

/**
 * 添加错题 ID
 */
export function addWrongQuestion(questionId) {
  let wrongIds = JSON.parse(localStorage.getItem(WRONG_KEY) || '[]');
  if (!wrongIds.includes(questionId)) {
    wrongIds.push(questionId);
    localStorage.setItem(WRONG_KEY, JSON.stringify(wrongIds));
  }
}

/**
 * 获取所有错题 ID
 */
export function getWrongQuestions() {
  return JSON.parse(localStorage.getItem(WRONG_KEY) || '[]');
}