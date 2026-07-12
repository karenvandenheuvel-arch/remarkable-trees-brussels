'use strict';
import { isFavorite } from './favorites.js';

export function filterTreesBySearch(trees, searchTerm) {
  const term = searchTerm.toLowerCase();

  return trees.filter(tree =>
    tree.nom_nl?.toLowerCase().includes(term)
  );
}

export function filterTreesByRarity(trees, rarity) {
return trees.filter(tree => rarity === tree.rarete );
}

export function filterTreesBySpecies(trees, species) {
  console.log('zoek naar:', JSON.stringify(species));
  console.log('bestaande waarden:', trees.slice(0, 5).map(t => JSON.stringify(t.nom_la)));
return trees.filter(tree => species === tree.nom_la );
}

export function getUniqueSpecies(trees) {
const uniqueSpecies = [...new Set(trees.map(tree => tree.nom_la))];
return uniqueSpecies.sort((a,b) => a.localeCompare(b));
}

export function filterTreesByFavorites(trees) {
  return trees.filter(tree => isFavorite(tree.id_arbres_cms));
}

export function sortTrees(trees, sortOption) { 
  const sorted = trees.map(function(tree) {  // kopie van trees
    return tree;
  });

  if (sortOption === 'name-asc') {
    sorted.sort((a, b) => a.nom_nl?.localeCompare(b.nom_nl));
    } else if (sortOption === 'name-desc') {
    sorted.sort((a, b) => b.nom_nl?.localeCompare(a.nom_nl));
    } else if (sortOption === 'girth-desc') {
    sorted.sort((a, b) => b.circonference - a.circonference); 
     } else if (sortOption === 'girth-asc') {
    sorted.sort((a, b) => a.circonference - b.circonference); 
     } else if (sortOption === 'crown-desc') {
    sorted.sort((a, b) => b.diametre_cime - a.diametre_cime); 
     } else if (sortOption === 'crown-asc') {
    sorted.sort((a, b) => a.diametre_cime - b.diametre_cime); 
  }

  return sorted;

}