'use strict';

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { TREE_ICON_SVG } from './render.js';
import { getTreeDisplayData } from './filter.js';

let map;
let markersGroup;

const treeMarkerIcon = L.divIcon({
  html: TREE_ICON_SVG,
  className: 'tree-marker-icon',
  iconSize: [24, 28],
  iconAnchor: [12, 14]
});

export function initMap() {
    map = L.map('map').setView([50.8503, 4.3517], 12);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap'
  }).addTo(map);

  markersGroup = L.layerGroup().addTo(map);
}

export function refreshMapSize() {
  if (map) {
    map.invalidateSize();
  }
}

export function renderMapMarkers(trees, lang) {
  markersGroup.clearLayers();

  trees.forEach(tree => {
    if (!tree.geo_point_2d) return;

    const marker = L.marker([tree.geo_point_2d.lat, tree.geo_point_2d.lon], {
      icon: treeMarkerIcon
    });
    markersGroup.addLayer(marker);
    marker.bindPopup(getPopupHtml(tree, lang), { maxWidth: 220 });
  });
}

export function getPopupHtml(tree, lang) {
  const data = getTreeDisplayData(tree, lang);

  const imageHtml = data.photoUrl
    ? `<img src="${data.photoUrl}" alt="${data.name}" class="tree-photo">`
    : TREE_ICON_SVG;

  return `
    ${imageHtml}
    <span class="rarity-badge">${data.rarityLabel}</span>
    <h3>${data.name}</h3>
    <p class="latin-name">${data.latinName}</p>
    <a href="${data.infoUrl}" target="_blank">${data.infoLabel}</a>
  `;
}