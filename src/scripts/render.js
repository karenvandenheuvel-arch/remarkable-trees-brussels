'use strict';

export function renderTreeList(trees) {
    const container = document.querySelector('#app');

    container.innerHTML = trees.map(tree => `
        <div class="tree-card">
            <h3>${tree.nom_nl}</h3>
            <p>Latin: ${tree.nom_la}</p>
            <p>Omtrel: ${tree.circonference} m</p>
        </div>
    `).join('');
}