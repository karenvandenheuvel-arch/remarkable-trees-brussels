'use strict';

export function filterTreesBySearch(trees, searchTerm) {
  const term = searchTerm.toLowerCase();

  return trees.filter(tree =>
    tree.nom_nl?.toLowerCase().includes(term)
  );
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