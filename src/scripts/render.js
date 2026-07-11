'use strict';

import { isFavorite } from './favorites.js';

const TREE_ICON_SVG = `          
 <svg viewBox="-3 -3 86 101" class="tree-icon">
            <path d="M40 0 L60 25 H48 L67 50 H55 L75 75 H5 L25 50 H13 L32 25 H20 Z"
                    fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/>
            <rect x="32" y="75" width="16" height="18" rx="2" fill="none" stroke="currentColor" stroke-width="3"/>
            </svg>
            `  ;

function getFavoriteButtonHtml(treeId) {
  const activeClass = isFavorite(treeId) ? 'active' : '';
  return `
  <button type="button" class="favorite-icon ${activeClass}" data-tree-id="${treeId}" aria-label="Toggle favorite">
  ${TREE_ICON_SVG}
  </button>
  `;
}

function getRarityLabel(rarete) {
    if (rarete === '1') return 'Zeldzaam';
    if (rarete === '0.5') return 'Bijzonder';
    return 'Gewoon'
}

export function renderTreeList(trees) {
    const container = document.querySelector('#app');

      if (trees.length === 0) {
    container.innerHTML = `<p class="no-results">Geen bomen gevonden voor deze combinatie van filters.</p>`;
    return;
  }
    container.innerHTML = trees.map(tree => {
        const imageHtml = tree.firstimage
            ? `<img data-src="${tree.firstimage}" alt="${tree.nom_nl}" class="tree-photo lazy">`
            : TREE_ICON_SVG;
    

        return `
    <div class="tree-card">
<div class="photo-wrapper">
      ${imageHtml}
      ${getFavoriteButtonHtml(tree.id_arbres_cms)}
    </div>
      <span class="rarity-badge">${getRarityLabel(tree.rarete)}</span>
      <div class="card-text">
      <h3>${tree.nom_nl}</h3>
    
      <p class="latin-name">${tree.nom_la}</p>
      <p>Omtrek: ${tree.circonference} m</p>
      <p>Kruindiameter: ${tree.diametre_cime} m</p>
      <a href="${tree.url_nl}" target="_blank">Meer info</a>
      </div>
    </div>
    `;
    }).join('');
}

export function observeLazyImages() {
  const lazyImages = document.querySelectorAll('img.lazy');

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        observer.unobserve(img);
      }
    });
}, {
    rootMargin: '100px 0px',
    threshold: 0.1
  });

  lazyImages.forEach(img => imageObserver.observe(img));
}