'use strict';
import './styles/style.css';
import { fetchTrees } from './scripts/api.js';
import { renderTreeList, observeLazyImages } from './scripts/render.js';
import { filterTreesBySearch, sortTrees, filterTreesByRarity, filterTreesBySpecies, getUniqueSpecies, filterTreesByFavorites, filterTreesByDistance} from './scripts/filter.js';
import { toggleFavorite, clearFavorites } from './scripts/favorites.js';
import {translations} from './scripts/translations.js';
import { initMap, refreshMapSize, renderMapMarkers } from './scripts/map.js';

let allTrees = [];
let currentSearch = '';
let currentSort = '';
let currentRarity ='';
let currentSpecies ='';
let showFavoritesOnly = false;
const storedLang = localStorage.getItem("language");
let currentLang = storedLang ? storedLang : "nl";
let currentView = 'list';
let userLocation = null;
let currentDistance = null;
let lastLocationError = null;

function initApp() {
setLanguage();
initMap();
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

const viewToggle = document.querySelector('.view-toggle');
viewToggle.addEventListener('click', handleViewToggle);

const distanceSlider = document.querySelector('#distance-slider');
distanceSlider.addEventListener('input', handleDistanceChange);

const locateBtn = document.querySelector('#locate-btn');
locateBtn.addEventListener('click', handleLocateClick);

const resetFiltersBtn = document.querySelector('#reset-filters-btn');
resetFiltersBtn.addEventListener('click', handleResetFilters);

const filterToggle = document.querySelector('#toggle-filters-btn');
filterToggle.addEventListener('click', handleFiltersToggle);

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

function handleViewToggle(event) {
  const button = event.target.closest('.view-btn');
  if (!button) return;

  currentView = button.dataset.view;

  document.querySelectorAll('.view-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.view === currentView);
  });

  const mapContainer = document.querySelector('#map');
  const listContainer = document.querySelector('#app');

  if (currentView === 'map') {
    listContainer.classList.add('hidden');
    mapContainer.classList.add('visible');
    refreshMapSize();
  } else {
    listContainer.classList.remove('hidden');
    mapContainer.classList.remove('visible');
  }
}

function handleLanguageToggle(event) {
  const button = event.target.closest('.lang-btn');
  if (!button) return;
  currentLang = button.dataset.lang;
  setLanguage();
}

function handleFiltersToggle() {
  const filterWrapper = document.querySelector('#filter-wrapper');
  filterWrapper.classList.toggle('open');
    const filterToggle = document.querySelector('#toggle-filters-btn');
  filterToggle.classList.toggle('open');

}

function handleDistanceChange(event) {
  const value = Number(event.target.value);
  currentDistance = value > 0 ? value : null;

  const t= translations[currentLang];
  const distanceValueLabel = document.querySelector('#distance-value');
  distanceValueLabel.textContent = currentDistance? `${value} m` : t.sliderHint;

  applyFilters();
}

function handleLocateClick() {
  lastLocationError = null;
  updateLocationErrorMessage();

  navigator.geolocation.getCurrentPosition(
    position => {
      userLocation = {
        lat: position.coords.latitude,
        lon: position.coords.longitude
      };

      const distanceSlider = document.querySelector('#distance-slider');
      distanceSlider.disabled = false;

      const t = translations[currentLang];
      const distanceValueLabel = document.querySelector('#distance-value');
      distanceValueLabel.textContent = t.sliderHint;
    },
    error => {
      if (error.code === error.PERMISSION_DENIED) {
        lastLocationError = 'denied';
      } else if (error.code === error.POSITION_UNAVAILABLE) {
        lastLocationError = 'unavailable';
      } else if (error.code === error.TIMEOUT) {
        lastLocationError = 'timeout';
      } else {
        lastLocationError = 'generic';
      }

      updateLocationErrorMessage();
    }
  );
}

function updateLocationErrorMessage() {
  const t = translations[currentLang];
  const errorLabel = document.querySelector('#location-error');

  if (lastLocationError === 'denied') {
    errorLabel.textContent = t.locationDenied;
  } else if (lastLocationError === 'unavailable') {
    errorLabel.textContent = t.locationUnavailable;
  } else if (lastLocationError === 'timeout') {
    errorLabel.textContent = t.locationTimeout;
  } else if (lastLocationError === 'generic') {
    errorLabel.textContent = t.locationError;
  } else {
    errorLabel.textContent = '';
  }
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

const btn = document.querySelector('#locate-btn');

btn.textContent = t.locateBtn;

document.querySelector('#max-distance-label').textContent = t.maxDistanceLabel;

const distanceValueLabel = document.querySelector('#distance-value');
if (userLocation) {
  distanceValueLabel.textContent = currentDistance ? `${currentDistance} m` : t.sliderHint;
}

const errorLabel = document.querySelector('#location-error');
updateLocationErrorMessage();
  
document.querySelector('#reset-filters-btn').textContent = t.resetFilters;
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
    if (userLocation && currentDistance) {
    result = filterTreesByDistance(result, userLocation, currentDistance);
  }

    if(currentSort) {
    result = sortTrees(result, currentSort);
  }

  const t = translations[currentLang];
  document.querySelector('#tree-count-inline').textContent = `(${result.length})`;
  renderTreeList(result, currentLang);
  observeLazyImages();
  renderMapMarkers(result, currentLang);
}

function handleResetFilters() {
  currentSearch = '';
  currentSort = '';
  currentRarity = '';
  currentSpecies = '';
  showFavoritesOnly = false;
  currentDistance = null;

  document.querySelector('#search-input').value = '';
  document.querySelector('#sort-select').value = '';
  document.querySelector('#rarity-select').value = '';
  document.querySelector('#species-select').value = '';
  document.querySelector('#favorites-only-checkbox').checked = false;
  document.querySelector('#distance-slider').value = 0;

  const t = translations[currentLang];
  const distanceValueLabel = document.querySelector('#distance-value');
  distanceValueLabel.textContent = userLocation ? t.sliderHint : '';

  applyFilters();
}

document.addEventListener('DOMContentLoaded', initApp);