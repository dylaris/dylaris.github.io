/**
 * todolist.js - Simple todo list
 */

// ===== Data =====
const todos = [
  {
    id: 1,
    title: '写一个调试器',
    note: '',
    time: '2026-09-8',
    references: [],
    done: false,
  },
  {
    id: 2,
    title: '写一个操作系统',
    note: '',
    time: '2026-09-8',
    references: [],
    done: false,
  },
  {
    id: 3,
    title: '写一本小说',
    note: '',
    time: '2026-09-08',
    references: [],
    done: false,
  },
  {
    id: 4,
    title: '掌握日语，能够进行日常对话',
    note: '',
    time: '2026-09-08',
    references: [],
    done: false,
  },
];

// ===== Render =====
function renderTodos() {
  const list = document.getElementById('todoList');
  if (!list) return;

  if (todos.length === 0) {
    list.innerHTML = `<li class="todo-empty">✨ No todos</li>`;
    return;
  }

  list.innerHTML = todos.map((todo) => `
    <li class="todo-item ${todo.done ? 'done' : ''}" data-id="${todo.id}">
      <div class="todo-header">
        <span class="todo-status ${todo.done ? 'done' : ''}"></span>
        <span class="todo-title ${todo.done ? 'done' : ''}">${escapeHtml(todo.title)}</span>
        <span class="todo-toggle">▾</span>
      </div>
      <div class="todo-body">
        <div class="todo-detail note">
          <span class="label">Note</span>
          <span class="value">${escapeHtml(todo.note || '—')}</span>
        </div>
        <div class="todo-detail time">
          <span class="label">Time</span>
          <span class="value">${escapeHtml(todo.time || '—')}</span>
        </div>
        <div class="todo-detail ref">
          <span class="label">Ref</span>
          <span class="value">${renderReferences(todo.references)}</span>
        </div>
      </div>
    </li>
  `).join('');

  // Bind events
  document.querySelectorAll('.todo-item').forEach((item) => {
    item.addEventListener('click', (e) => {
      if (e.target.closest('.todo-status')) return;
      item.classList.toggle('expanded');
    });

    const statusEl = item.querySelector('.todo-status');
    if (statusEl) {
      statusEl.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = parseInt(item.dataset.id);
        toggleTodo(id);
      });
    }
  });
}

// ===== Render References =====
function renderReferences(refs) {
  if (!refs || refs.length === 0) return '—';
  return refs.map((ref) => `<span class="ref-tag">${escapeHtml(ref)}</span>`).join(' ');
}

// ===== Helpers =====
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// ===== Actions =====
function toggleTodo(id) {
  const todo = todos.find((t) => t.id === id);
  if (todo) {
    todo.done = !todo.done;
    renderTodos();
  }
}

// ===== Init =====
export function initTodolist() {
  renderTodos();
  console.log('TodoList page initialized');
}
