/* ============================================
   Make That Web — Minimal JS
   Progress bar + Image lightbox with zoom/pan
   ============================================ */

(function () {
  'use strict';

  /* --- Render Chapters from Data --- */
  const chevronSVG = `<svg class="chapter-chevron" viewBox="0 0 20 20" fill="currentColor">
    <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"/>
  </svg>`;

  function renderBlock(block) {
    switch (block.type) {
      case 'p':
        return `<p>${block.html || escapeHTML(block.text)}</p>`;
      case 'img':
        return `<img class="step-image" src="${escapeAttr(block.src)}" alt="${escapeAttr(block.alt || '')}"/>`;
      case 'tip':
        return `<div class="callout"><strong>Tip: </strong>${escapeHTML(block.text)}</div>`;
      case 'warning':
        return `<div class="callout callout-warn"><strong>Caution: </strong>${escapeHTML(block.text)}</div>`;
      default:
        return '';
    }
  }

  function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function escapeAttr(str) {
    return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function renderOverview() {
    const bar = document.querySelector('.overview-bar');
    if (!bar) return;
    bar.innerHTML = chapters.map(function (ch, i) {
      const n = i + 1;
      const pip = `<a class="overview-pip" href="#ch${n}">
        <span class="pip-dot"><span>${n}</span></span>
        <span class="pip-label">${escapeHTML(ch.navLabel)}</span>
      </a>`;
      return (i > 0 ? '<span class="overview-connector"></span>' : '') + pip;
    }).join('');
  }

  function renderChapters() {
    const container = document.querySelector('.chapters');
    if (!container) return;
    container.innerHTML = chapters.map(function (ch, i) {
      const n = i + 1;
      const isLast = i === chapters.length - 1;
      const subtitle = ch.subtitle
        ? `<div class="chapter-subtitle">${escapeHTML(ch.subtitle)}</div>`
        : '';
      const nextLink = !isLast
        ? `<a href="#ch${n + 1}" class="next-chapter"><span class="next-chapter-arrow">&#8595;</span> Next</a>`
        : '';
      const bodyHTML = ch.body.map(renderBlock).join('\n          ') + nextLink;

      return `<details class="chapter rpg-panel" id="ch${n}"${ch.open ? ' open' : ''}>
        <summary>
          <span class="chapter-number"><span>${n}</span></span>
          <div class="chapter-header-text">
            <div class="chapter-title">${escapeHTML(ch.title)}</div>
            ${subtitle}
          </div>
          ${chevronSVG}
        </summary>
        <div class="chapter-body">
          ${bodyHTML}
        </div>
      </details>`;
    }).join('\n');
  }

  renderOverview();
  renderChapters();

  /* --- Scroll Progress Bar --- */
  const progressFill = document.querySelector('.progress-fill');

  function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressFill.style.width = Math.min(progress, 100) + '%';
  }

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  /* --- Lightbox with Zoom & Pan --- */
  const overlay = document.querySelector('.lightbox-overlay');
  const lbImg = overlay.querySelector('img');
  const lbHint = overlay.querySelector('.lightbox-hint');
  const lbClose = overlay.querySelector('.lightbox-close');

  let scale = 1;
  let panX = 0;
  let panY = 0;
  let isDragging = false;
  let startX, startY, lastPanX, lastPanY;

  function openLightbox(src, alt) {
    lbImg.src = src;
    lbImg.alt = alt || '';
    scale = 1;
    panX = 0;
    panY = 0;
    applyTransform();
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  function applyTransform() {
    lbImg.style.transform = `scale(${scale}) translate(${panX}px, ${panY}px)`;
    if (lbHint) lbHint.style.opacity = scale > 1 ? '0' : '1';
  }

  // Open on image click
  document.addEventListener('click', function (e) {
    const img = e.target.closest('.step-image, .preview-img');
    if (img) {
      e.preventDefault();
      openLightbox(img.src, img.alt);
    }
  });

  // Close
  lbClose.addEventListener('click', closeLightbox);
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeLightbox();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('active')) closeLightbox();
  });

  // Zoom with scroll wheel
  overlay.addEventListener('wheel', function (e) {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.15 : 0.15;
    const newScale = Math.max(0.5, Math.min(scale + delta, 6));
    // If zooming back to ~1, reset pan
    if (newScale <= 1.05) {
      panX = 0;
      panY = 0;
    }
    scale = newScale;
    applyTransform();
  }, { passive: false });

  // Pan with drag
  const imgWrap = overlay.querySelector('.lightbox-img-wrap');

  imgWrap.addEventListener('mousedown', function (e) {
    if (scale <= 1) return;
    e.preventDefault();
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    lastPanX = panX;
    lastPanY = panY;
    imgWrap.classList.add('dragging');
  });

  window.addEventListener('mousemove', function (e) {
    if (!isDragging) return;
    panX = lastPanX + (e.clientX - startX) / scale;
    panY = lastPanY + (e.clientY - startY) / scale;
    applyTransform();
  });

  window.addEventListener('mouseup', function () {
    isDragging = false;
    imgWrap.classList.remove('dragging');
  });

  // Touch: pinch-zoom + pan
  let lastTouchDist = 0;
  let touchStartX, touchStartY, touchLastPanX, touchLastPanY;

  function getTouchDist(touches) {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.hypot(dx, dy);
  }

  imgWrap.addEventListener('touchstart', function (e) {
    if (e.touches.length === 2) {
      lastTouchDist = getTouchDist(e.touches);
    } else if (e.touches.length === 1 && scale > 1) {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      touchLastPanX = panX;
      touchLastPanY = panY;
    }
  }, { passive: true });

  imgWrap.addEventListener('touchmove', function (e) {
    if (e.touches.length === 2) {
      e.preventDefault();
      const dist = getTouchDist(e.touches);
      const delta = (dist - lastTouchDist) * 0.008;
      scale = Math.max(0.5, Math.min(scale + delta, 6));
      lastTouchDist = dist;
      if (scale <= 1.05) { panX = 0; panY = 0; }
      applyTransform();
    } else if (e.touches.length === 1 && scale > 1) {
      e.preventDefault();
      panX = touchLastPanX + (e.touches[0].clientX - touchStartX) / scale;
      panY = touchLastPanY + (e.touches[0].clientY - touchStartY) / scale;
      applyTransform();
    }
  }, { passive: false });

  /* --- Smooth open next chapter via "next" links --- */
  document.addEventListener('click', function (e) {
    const next = e.target.closest('.next-chapter');
    if (!next) return;
    e.preventDefault();
    const targetId = next.getAttribute('href');
    const target = document.querySelector(targetId);
    if (target) {
      target.open = true;
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
})();
