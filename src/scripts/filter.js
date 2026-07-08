'use strict';

export function filterTreesBySearch(trees, searchTerm) {
  const term = searchTerm.toLowerCase();

  return trees.filter(tree =>
    tree.nom_nl?.toLowerCase().includes(term)
  );
}