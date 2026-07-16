'use strict';
import { isFavorite } from './favorites.js';
import { translations } from './translations.js';

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

export function getRarityLabel(rarete, lang) {
  const t = translations[lang];
 if (rarete === '1') return t.rarityRare;
  if (rarete === '0.5') return t.rarityNotable;
  return t.rarityCommon;
}

export function getTreeDisplayData(tree, lang) {
  const t = translations[lang];

  return {
    name: lang === 'fr' ? tree.nom_fr : tree.nom_nl,
    latinName: tree.nom_la,
    infoUrl: lang === 'fr' ? tree.url_fr : tree.url_nl,
    infoLabel: t.moreInfo,
    rarityLabel: getRarityLabel(tree.rarete, lang),
    photoUrl: tree.firstimage
  };
}

export function getDistanceInMeters(lat1, lon1, lat2, lon2) {
  const metersPerDegreeLat = 111320;
  const metersPerDegreeLon = 111320 * Math.cos(lat1 * (Math.PI / 180));

  const deltaLat = (lat2 - lat1) * metersPerDegreeLat;
  const deltaLon = (lon2 - lon1) * metersPerDegreeLon;

  return Math.sqrt(deltaLat * deltaLat + deltaLon * deltaLon);
}


export function filterTreesByDistance(trees, userLocation, maxDistance) {
  return trees.filter(tree => {
    if (!tree.geo_point_2d) return false;

    const distance = getDistanceInMeters(
      userLocation.lat,
      userLocation.lon,
      tree.geo_point_2d.lat,
      tree.geo_point_2d.lon
    );

    return distance <= maxDistance;
  });
}


