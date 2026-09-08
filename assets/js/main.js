/**
 * Main entry point - SPA application
 */

import { route } from './core/router.js';
import { initHome } from './pages/home.js';
import { initAbout } from './pages/about.js';
import { initPostlist } from './pages/postlist.js';
import { initPost } from './pages/post.js';
import { initTodolist } from './pages/todolist.js';

/**
 * Page initialization map
 */
const PAGE_INIT_MAP = {
  home: initHome,
  about: initAbout,
  postlist: initPostlist,
  todolist: initTodolist,
};

/**
 * Initialize the appropriate page when loaded
 */
function handlePageLoaded(event) {
  const pageName = event.detail.page;
  const initFn = PAGE_INIT_MAP[pageName];
  if (initFn) {
    initFn();
  }
}

/**
 * Initialize the post page when loaded
 */
function handlePostLoaded() {
  initPost();
}

// Register event listeners
document.addEventListener('page:loaded', handlePageLoaded);
document.addEventListener('post:loaded', handlePostLoaded);

// Route on hash change and initial load
window.addEventListener('hashchange', route);
window.addEventListener('DOMContentLoaded', route);
