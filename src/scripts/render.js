'use strict';

function getRarityLabel(rarete) {
    if (rarete === '1') return 'Zeldzaam';
    if (rarete === '0.5') return 'Bijzonder';
    return 'Gewoon'
}

export function renderTreeList(trees) {
    const container = document.querySelector('#app');

    container.innerHTML = trees.map(tree => `
    <div class="tree-card">
      <img src="${tree.firstimage}" alt="${tree.nom_nl}" class="tree-photo">
      <span class="rarity-badge">${getRarityLabel(tree.rarete)}</span>
      <h3>${tree.nom_nl}</h3>
      <p class="latin-name">${tree.nom_la}</p>
      <p>Omtrek: ${tree.circonference} m</p>
      <p>Kruindiameter: ${tree.diametre_cime} m</p>
      <a href="${tree.url_nl}" target="_blank">Meer info</a>
    </div>
    `).join('');
}