'use strict';
import './styles/style.css';
import { fetchTrees } from './scripts/api.js';
import { renderTreeList } from './scripts/render.js';

function initApp() {
fetchTrees().then(trees => {
  renderTreeList(trees);
  console.log(trees);
});
}

document.addEventListener('DOMContentLoaded', initApp);