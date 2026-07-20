'use strict';

const STORAGE_KEY = 'favoriteTrees';

export function getFavorites() {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
}

export function isFavorite(treeId) {
    const favorites = getFavorites();
    // .includes() op een array van ID's
    return favorites.includes(treeId);
}

function setFavorites(favorites) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
}

export function toggleFavorite(treeId) {
    const favorites = getFavorites();
    if (isFavorite(treeId)) {
        const updated = favorites.filter(id => id !== treeId);
        setFavorites(updated);
    } else {
        // Spread operator, nieuwe array opbouwen ipv bestaande muteren
        const favoritesCopy = [...favorites, treeId];
        setFavorites(favoritesCopy);
    }
}

export function clearFavorites() {
    localStorage.removeItem(STORAGE_KEY);
}