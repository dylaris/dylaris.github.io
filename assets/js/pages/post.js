/**
 * Single post page specific logic
 */

export function initPost() {
  addCopyButtons();
  console.log('Post page initialized');
}

/**
 * Add copy buttons to all <pre><code> blocks
 */
function addCopyButtons() {
  const codeBlocks = document.querySelectorAll('pre');

  codeBlocks.forEach((pre) => {
    // Skip if already has a copy button
    if (pre.querySelector('.copy-btn')) return;

    // Create copy button
    const btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.textContent = 'Copy';
    btn.setAttribute('aria-label', 'Copy code to clipboard');

    // Position the button inside pre
    pre.style.position = 'relative';
    pre.appendChild(btn);

    // Click handler
    btn.addEventListener('click', async () => {
      const code = pre.querySelector('code');
      if (!code) return;

      const text = code.textContent;

      try {
        await navigator.clipboard.writeText(text);
        btn.textContent = 'Copied!';
        btn.classList.add('copied');

        setTimeout(() => {
          btn.textContent = 'Copy';
          btn.classList.remove('copied');
        }, 2000);
      } catch (err) {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        btn.textContent = 'Copied!';
        setTimeout(() => {
          btn.textContent = 'Copy';
        }, 2000);
      }
    });
  });
}
