'use strict';
import './styles/style.css';
import { fetchTrees } from './scripts/api.js';
import { renderTreeList, observeLazyImages } from './scripts/render.js';
import { filterTreesBySearch, sortTrees } from './scripts/filter.js';

let allTrees = [];
let currentSearch = '';
let currentSort = '';

function initApp() {
fetchTrees().then(trees => {
  allTrees = trees;
  applyFilters();
});
const searchInput = document.querySelector('#search-input');
searchInput.addEventListener('input',handleSearchInput);

  const sortSelect = document.querySelector('#sort-select');
  sortSelect.addEventListener('change', handleSortChange);
}

function handleSearchInput(event) {
  currentSearch = event.target.value;
  applyFilters();
}

function handleSortChange(event) {
  currentSort = event.target.value;
  applyFilters();
}

function applyFilters() {
  let result = allTrees;
  if (currentSearch) {
    result = filterTreesBySearch(result, currentSearch);
  }
  // andere filters
  if(currentSort) {
    result = sortTrees(result, currentSort);
  }
  renderTreeList(result);
  observeLazyImages();
}

document.addEventListener('DOMContentLoaded', initApp);