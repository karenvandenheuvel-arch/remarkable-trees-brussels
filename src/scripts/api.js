'use strict';

const BASE_URL = 'https://opendata.brussels.be/api/explore/v2.1/catalog/datasets/bruxelles_arbres_remarquables/records';

export function fetchTrees() {
  return fetch(`${BASE_URL}?limit=20`)
    .then(response => response.json())
    .then(data => data.results)
    .catch(fout => {
      console.error("Er ging iets mis bij het ophalen van de bomen:", fout);
      return [];
    });
}