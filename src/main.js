'use strict';
import './styles/style.css';
import { fetchTrees } from './scripts/api.js';
import { renderTreeList, observeLazyImages } from './scripts/render.js';
import { filterTreesBySearch, sortTrees, filterTreesByRarity, filterTreesBySpecies, getUniqueSpecies} from './scripts/filter.js';

let allTrees = [];
let currentSearch = '';
let currentSort = '';
let currentRarity ='';
let currentSpecies ='';

function initApp() {
fetchTrees().then(trees => {
  allTrees = trees;
  createSpeciesDropdown(allTrees);
  applyFilters();
});

const searchInput = document.querySelector('#search-input');
searchInput.addEventListener('input',handleSearchInput);

const sortSelect = document.querySelector('#sort-select');
sortSelect.addEventListener('change', handleSortChange);

const raritySelect = document.querySelector('#rarity-select');
raritySelect.addEventListener('change', handleRarityChange);

const speciesSelect = document.querySelector('#species-select');
speciesSelect.addEventListener('change', handleSpeciesChange);
}

function handleSearchInput(event) {
  currentSearch = event.target.value;
  applyFilters();
}

function handleSortChange(event) {
  currentSort = event.target.value;
  applyFilters();
}

function handleRarityChange(event) {
  currentRarity = event.target.value;
  applyFilters();
}

function handleSpeciesChange(event) {
  currentSpecies = event.target.value;
  applyFilters();
}

function createSpeciesDropdown(trees) {
  const speciesSelect = document.querySelector('#species-select');
  const species = getUniqueSpecies(trees);

  species.forEach(name => {
    const option = document.createElement('option');
    option.value = name;
    option.textContent = name;
    speciesSelect.appendChild(option);
  });
}

function applyFilters() {
  let result = allTrees;
  if (currentSearch) {
    result = filterTreesBySearch(result, currentSearch);
  }
  // andere filters

   if(currentRarity) {
    result = filterTreesByRarity(result, currentRarity);
  }
    if(currentSpecies) {
    result = filterTreesBySpecies(result, currentSpecies);
  }

    if(currentSort) {
    result = sortTrees(result, currentSort);
  }
  renderTreeList(result);
  observeLazyImages();
}

document.addEventListener('DOMContentLoaded', initApp);