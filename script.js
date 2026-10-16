/* ============================================
   Make That Web — renders chapters from tutorial.js
   ============================================ */

(function () {
  'use strict';

  function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function escapeAttr(str) {
    return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function renderBlock(block) {
    switch (block.type) {
      case 'p':
        return `<p>${block.html || escapeHTML(block.text)}</p>`;
      case 'img':
        // Link to the full-size picture so it opens bigger in a new tab
        return `<a class="figure" href="${escapeAttr(block.src)}" target="_blank"><img src="${escapeAttr(block.src)}" alt="${escapeAttr(block.alt || '')}" loading="lazy"/></a>`;
      case 'tip':
        return `<p class="note"><strong>Tip:</strong> ${escapeHTML(block.text)}</p>`;
      case 'warning':
        return `<p class="note note-warn"><strong>Caution:</strong> ${escapeHTML(block.text)}</p>`;
      default:
        return '';
    }
  }

  const toc = document.querySelector('.toc');
  toc.innerHTML = '<ol>' + chapters.map(function (ch, i) {
    return `<li><a href="#ch${i + 1}">${escapeHTML(ch.title)}</a></li>`;
  }).join('') + '</ol>';

  const container = document.querySelector('.chapters');
  container.innerHTML = chapters.map(function (ch, i) {
    const n = i + 1;
    const subtitle = ch.subtitle ? `<p class="meta">${escapeHTML(ch.subtitle)}</p>` : '';
    return `<section id="ch${n}">
      <h2>${n}. ${escapeHTML(ch.title)}</h2>
      ${subtitle}
      ${ch.body.map(renderBlock).join('\n      ')}
    </section>`;
  }).join('\n');
})();
