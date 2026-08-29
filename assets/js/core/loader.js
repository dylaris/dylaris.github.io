/**
 * Loader module - fetches and renders page/post content
 */

const MAIN_EL = document.querySelector('.container-main');

const PAGES_DIR = '/pages';
const POSTS_DIR = '/posts';

/**
 * Load a page HTML fragment
 * @param {string} pageName - e.g., 'home', 'about', 'posts'
 */
export function loadPage(pageName) {
  fetch(`${PAGES_DIR}/${pageName}.html`)
    .then((response) => {
      if (!response.ok) throw new Error(`Page not found: ${pageName}`);
      return response.text();
    })
    .then((html) => {
      MAIN_EL.innerHTML = html;
      // Dispatch event for page-specific initialization
      const event = new CustomEvent('page:loaded', { detail: { page: pageName } });
      document.dispatchEvent(event);
    })
    .catch(() => {
      load404();
    });
}

/**
 * Load a post HTML
 * @param {string} postSlug - e.g., 'how-to-implement-a-simple-http-server'
 */
export function loadPost(postSlug) {
  fetch(`${POSTS_DIR}/${postSlug}.html`)
    .then((response) => {
      if (!response.ok) throw new Error(`Post not found: ${postSlug}`);
      return response.text();
    })
    .then((html) => {
      MAIN_EL.innerHTML = html;
      const event = new CustomEvent('post:loaded', { detail: { slug: postSlug } });
      document.dispatchEvent(event);
    })
    .catch(() => {
      load404();
    });
}

/**
 * Load 404 page
 */
function load404() {
  fetch(`${PAGES_DIR}/404.html`)
    .then((res) => res.text())
    .then((html) => {
      MAIN_EL.innerHTML = html;
    })
    .catch(() => {
      MAIN_EL.innerHTML = '<h1>404 - Page not found</h1>';
    });
}
