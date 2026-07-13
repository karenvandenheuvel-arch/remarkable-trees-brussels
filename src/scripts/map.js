'use strict';

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

let map;

export function initMap() {
    map = L.map('map').setView([50.8503, 4.3517], 12);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap'
  }).addTo(map);
}

export function refreshMapSize() {
  if (map) {
    map.invalidateSize();
  }
}