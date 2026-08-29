/**
 * Router module - handles URL hash routing
 */

import { loadPage, loadPost } from './loader.js';

const ROUTE_TYPES = {
  POST: 'post',
  PAGE: 'page',
};

/**
 * Parse the current hash and determine route type
 * @returns {{ type: string, id: string }}
 */
export function parseRoute() {
  const hash = window.location.hash.slice(1) || 'page-home';
  const parts = hash.split('-');
  const type = parts[0];
  const id = parts.slice(1).join('-');

  return { type, id };
}

/**
 * Navigate to a page by name
 * @param {string} pageName - e.g., 'home', 'about', 'postlist'
 */
export function navigateToPage(pageName) {
  window.location.hash = `page-${pageName}`;
}

/**
 * Navigate to a post by slug
 * @param {string} postSlug - e.g., 'how-to-implement-a-simple-http-server'
 */
export function navigateToPost(postSlug) {
  window.location.hash = `post-${postSlug}`;
}

/**
 * Main router - handles hash changes
 */
export function route() {
  const { type, id } = parseRoute();

  if (type === ROUTE_TYPES.POST) {
    loadPost(id);
  } else if (type === ROUTE_TYPES.PAGE) {
    loadPage(id);
  } else {
    // Fallback: treat as page
    loadPage(id);
  }
}
