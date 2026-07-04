'use strict';
import './styles/style.css';
import { fetchTrees } from './scripts/api.js';

function initApp() {
fetchTrees().then(trees => {
    console.log(trees);
  });
}

document.addEventListener('DOMContentLoaded', initApp);