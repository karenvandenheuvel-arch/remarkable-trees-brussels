'use strict';

const BASE_URL = 'https://opendata.brussels.be/api/explore/v2.1/catalog/datasets/bruxelles_arbres_remarquables/records';

export async function fetchTrees() {
  const limit = 100; // max toegestaan per call bij Opendatasoft v2.1
  let offset = 0;
  let allTrees = [];
  let totalCount = Infinity;

  try {
    while (offset < totalCount) {
      const response = await fetch(`${BASE_URL}?limit=${limit}&offset=${offset}`);
      const data = await response.json();

      allTrees = [...allTrees, ...data.results];
      totalCount = data.total_count;
      offset += limit;
    }

    return allTrees;
  } catch (error) {
    console.error('Er ging iets mis bij het ophalen van de bomen:', error);
    return allTrees; // geef terug wat we al hadden opgehaald, in plaats van niets
  }
}