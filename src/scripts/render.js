'use strict';

const TREE_ICON_SVG = `          
 <svg viewBox="-3 -3 86 101" class="tree-icon">
            <path d="M40 0 L60 25 H48 L67 50 H55 L75 75 H5 L25 50 H13 L32 25 H20 Z"
                    fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/>
            <rect x="32" y="75" width="16" height="18" rx="2" fill="none" stroke="currentColor" stroke-width="3"/>
            </svg>
            `  ;

function getRarityLabel(rarete) {
    if (rarete === '1') return 'Zeldzaam';
    if (rarete === '0.5') return 'Bijzonder';
    return 'Gewoon'
}

export function renderTreeList(trees) {
    const container = document.querySelector('#app');

    container.innerHTML = trees.map(tree => {
        const imageHtml = tree.firstimage
            ? `<img src="${tree.firstimage}" alt="${tree.nom_nl}" class="tree-photo">`
            : TREE_ICON_SVG;
    

        return `
    <div class="tree-card">
      ${imageHtml}
      <span class="rarity-badge">${getRarityLabel(tree.rarete)}</span>
      <h3>${tree.nom_nl}</h3>
      <p class="latin-name">${tree.nom_la}</p>
      <p>Omtrek: ${tree.circonference} m</p>
      <p>Kruindiameter: ${tree.diametre_cime} m</p>
      <a href="${tree.url_nl}" target="_blank">Meer info</a>
    </div>
    `;
    }).join('');
}