'use strict';
import './styles/style.css';
import { fetchTrees } from './scripts/api.js';
import { renderTreeList, observeLazyImages } from './scripts/render.js';
import { filterTreesBySearch, sortTrees, filterTreesByRarity, filterTreesBySpecies, getUniqueSpecies, filterTreesByFavorites} from './scripts/filter.js';
import { toggleFavorite, clearFavorites } from './scripts/favorites.js';
import {translations} from './scripts/translations.js';

let allTrees = [];
let currentSearch = '';
let currentSort = '';
let currentRarity ='';
let currentSpecies ='';
let showFavoritesOnly = false;
const storedLang = localStorage.getItem("language");
let currentLang = storedLang ? storedLang : "nl";

function initApp() {
setLanguage();
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

const favoritesCheckbox = document.querySelector('#favorites-only-checkbox');
favoritesCheckbox.addEventListener('change',handleFavoritesOnlyChange );

const resetFavoritesBtn = document.querySelector('#reset-favorites-btn');
resetFavoritesBtn.addEventListener('click', handleResetFavorites);

const appContainer = document.querySelector('#app');
appContainer.addEventListener('click', handleFavoriteClick);

const languageToggle = document.querySelector('.language-toggle');
languageToggle.addEventListener('click', handleLanguageToggle);

}

function handleFavoriteClick(event) {
  const button = event.target.closest('.favorite-icon');
  if (!button) return;
  const treeId = button.dataset.treeId;
  toggleFavorite(treeId);
  applyFilters();
}

function handleFavoritesOnlyChange(event) {
  showFavoritesOnly = event.target.checked;
  applyFilters();
}

function handleResetFavorites() {
  clearFavorites();
  applyFilters();
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

function handleLanguageToggle(event) {
  const button = event.target.closest('.lang-btn');
  if (!button) return;
  currentLang = button.dataset.lang;
  setLanguage();
}

function setLanguage() {
  const t = translations[currentLang];
  document.documentElement.lang = currentLang;
    document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === currentLang);
  });
  document.querySelector('h1').textContent = t.title;
  document.querySelector('#search-input').placeholder = t.searchPlaceholder;

  document.querySelector('#sort-select').options[0].textContent = t.sortDefault;
  document.querySelector('#sort-select').options[1].textContent = t.sortNameAsc;
  document.querySelector('#sort-select').options[2].textContent = t.sortNameDesc;
  document.querySelector('#sort-select').options[3].textContent = t.sortGirthDesc;
  document.querySelector('#sort-select').options[4].textContent = t.sortGirthAsc;
  document.querySelector('#sort-select').options[5].textContent = t.sortCrownDesc;
  document.querySelector('#sort-select').options[6].textContent = t.sortCrownAsc;

  document.querySelector('#rarity-select').options[0].textContent = t.rarityAll;
  document.querySelector('#rarity-select').options[1].textContent = t.rarityCommon;
  document.querySelector('#rarity-select').options[2].textContent = t.rarityNotable;
  document.querySelector('#rarity-select').options[3].textContent = t.rarityRare;

  document.querySelector('#species-select').options[0].textContent = t.speciesAll;
  document.querySelector('#favorites-only-label').textContent = t.favoritesOnly;
  document.querySelector('#reset-favorites-btn').textContent = t.resetFavorites;
  localStorage.setItem("language",currentLang);
  if (allTrees.length >0) {
    applyFilters();
  }
  
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

    if(showFavoritesOnly) {
    result = filterTreesByFavorites(result);
  }

    if(currentSort) {
    result = sortTrees(result, currentSort);
  }
  renderTreeList(result, currentLang);
  observeLazyImages();
}

document.addEventListener('DOMContentLoaded', initApp);