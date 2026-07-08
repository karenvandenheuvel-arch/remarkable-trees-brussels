'use strict';
import './styles/style.css';
import { fetchTrees } from './scripts/api.js';
import { renderTreeList, observeLazyImages } from './scripts/render.js';

function initApp() {
fetchTrees().then(trees => {
  renderTreeList(trees);
  observeLazyImages();

});
}

document.addEventListener('DOMContentLoaded', initApp);