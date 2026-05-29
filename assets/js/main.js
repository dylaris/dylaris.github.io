/* global */
const app = document.querySelector('.container-main');

/* init */

function initPage(page) {
  switch(page) {
    case 'posts':
      fetch('/posts/index.json')
        .then(res => res.json())
        .then(posts => {
          const list = document.getElementById('post-list');
          if (!list) return;
          list.innerHTML = '';
          posts.forEach(post => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = `/posts/${post.file}`;
            a.textContent = post.title;
            a.addEventListener('click', (e) => {
              e.preventDefault();
              window.location.hash = `post-${post.file.replace('.html', '')}`;
            });
            li.appendChild(a);
            list.appendChild(li);
          });
        });
      break;
    case 'home':
      break;
    case 'about':
      break;
    case '404':
      break;
  }
}

/* load */

function loadPage(page) {
  fetch(`/pages/${page}.html`)
    .then(response => {
      if (!response.ok) throw new Error('Page not found');
      return response.text();
    })
    .then(html => {
      app.innerHTML = html;
      initPage(page);
    })
    .catch(() => {
      fetch('/pages/404.html')
        .then(res => res.text())
        .then(html => app.innerHTML = html)
        .catch(() => app.innerHTML = '<p>404 - Page not found</p>');
    });
}

function loadPost(post) {
  fetch(`/posts/${post}.html`)
    .then(response => {
      if (!response.ok) throw new Error('Post not found');
      return response.text();
    })
    .then(html => {
      app.innerHTML = html;
    })
    .catch(() => {
      loadPage('404');
    });
}

/* router */

function router() {
  const path = window.location.hash.slice(1) || 'page-home';
  const parts = path.split('-');
  const type = parts[0];
  const id = parts.slice(1).join('-');

  if (type === 'post') {
    loadPost(id);
  } else if (type === 'page') {
    loadPage(id);
  } else {
    loadPage(path);
  }
}

document.getElementById('nav-home').addEventListener('click', (e) => {
  e.preventDefault();
  window.location.hash = 'page-home';
});
document.getElementById('nav-about').addEventListener('click', (e) => {
  e.preventDefault();
  window.location.hash = 'page-about';
});
document.getElementById('nav-posts').addEventListener('click', (e) => {
  e.preventDefault();
  window.location.hash = 'page-posts';
});
window.addEventListener('hashchange', router);
window.addEventListener('DOMContentLoaded', router);
