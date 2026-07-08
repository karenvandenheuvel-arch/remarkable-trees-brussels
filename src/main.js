'use strict';
import './styles/style.css';
import { fetchTrees } from './scripts/api.js';
import { renderTreeList, observeLazyImages } from './scripts/render.js';
import { filterTreesBySearch } from './scripts/filter.js';

let allTrees = [];
let currentSearch = '';

function initApp() {
fetchTrees().then(trees => {
  allTrees = trees;
  applyFilters();
});
const searchInput = document.querySelector('#search-input');
searchInput.addEventListener('input',handleSearchInput);
}

function handleSearchInput(event) {
  currentSearch = event.target.value;
  applyFilters();
}

function applyFilters() {
  let result = allTrees;
  if (currentSearch) {
    result = filterTreesBySearch(result, currentSearch);
  }
  // andere filters
  renderTreeList(result);
  observeLazyImages();
}

document.addEventListener('DOMContentLoaded', initApp);