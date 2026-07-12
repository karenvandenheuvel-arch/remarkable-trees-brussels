'use strict';

const STORAGE_KEY = "favoriteTrees";

export function getFavorites() {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
}

export function isFavorite(treeId) {
    const favorites = getFavorites();
    return favorites.includes(treeId); // melden dat we dit gebruikt hebben, stond niet in cursus
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
        const favorites_copy = [...favorites, treeId]
        setFavorites(favorites_copy);
    }
    }

    export function clearFavorites() {
        localStorage.removeItem(STORAGE_KEY);
    }