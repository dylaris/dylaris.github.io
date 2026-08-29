/**
 * Posts list page specific logic
 */

const POSTS_INDEX_URL = '/posts/index.json';

/**
 * Fetch all posts metadata
 * @returns {Promise<Array>} Array of post objects
 */
function fetchPosts() {
  return fetch(POSTS_INDEX_URL)
    .then((res) => {
      if (!res.ok) throw new Error('Failed to fetch posts index');
      return res.json();
    })
    .catch((error) => {
      console.error('API Error:', error);
      return [];
    });
}

/**
 * Fetch a single post by slug
 * @param {string} slug
 * @returns {Promise<string>} HTML content
 */
function fetchPostContent(slug) {
  return fetch(`/posts/${slug}.html`)
    .then((res) => {
      if (!res.ok) throw new Error(`Post not found: ${slug}`);
      return res.text();
    });
}

/**
 * Render the posts list
 */
export function initPostlist() {
  const listEl = document.getElementById('postlist');
  if (!listEl) return;

  fetchPosts().then((posts) => {
    listEl.innerHTML = '';
    if (posts.length === 0) {
      listEl.innerHTML = '<li>No posts found</li>';
      return;
    }

    posts.forEach((post) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = `/posts/${post.file}`;
      a.textContent = post.title;

      // Use hash-based navigation
      a.addEventListener('click', (e) => {
        e.preventDefault();
        const slug = post.file.replace('.html', '');
        window.location.hash = `post-${slug}`;
      });

      li.appendChild(a);
      listEl.appendChild(li);
    });
  });

  console.log('PostList page initialized');
}
