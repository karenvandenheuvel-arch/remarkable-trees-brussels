# Remarkable Trees of Brussels

## 1. Projectbeschrijving

**Opmerkelijke Bomen in Brussel** is een interactieve single-page webapplicatie waarmee gebruikers de opmerkelijke bomen van het Brussels Hoofdstedelijk Gewest kunnen verkennen. De app toont zowel de kenmerken van elke boom (lijstweergave) als de locatie ervan (kaartweergave via Leaflet). Via zoek-, sorteer- en filteropties kunnen gebruikers snel navigeren doorheen de 582 bomen uit de dataset. Favoriete bomen kunnen worden opgeslagen, en de interface is beschikbaar in het Nederlands en het Frans.

De data wordt opgehaald via de Open Data Brussels API en de applicatie is gebouwd met Vite en vanilla JavaScript.

## 2. Functionele vereisten

**Dataverzameling & -weergave**

* Data van 582 bomen opgehaald via de Open Data Brussels API, via een while-lus die doorloopt op basis van total_count uit de API-respons — niet een vast aantal calls, zodat de app blijft werken als de dataset groeit
* Lijstweergave met kaarten per boom: foto, naam, Latijnse naam, omtrek, kroondiameter, zeldzaamheidsbadge, link naar meer info
* Kaartweergave (Leaflet) met klikbare markers; popup per boom toont een compactere selectie — foto, naam, Latijnse naam en link naar meer info — bewust beperkt gehouden zodat de popup overzichtelijk blijft op een kleine kaartweergave

**Interactiviteit**

* Zoekfunctie op naam, werkt in beide talen (NL/FR)
* Sorteermogelijkheden: naam, omtrek, kroondiameter — telkens oplopend/aflopend
* Filters: zeldzaamheid (Common/Notable/Rare), soort, afstand tot de gebruiker
* De soort-filter is gebaseerd op de Latijnse naam (nom_la) in plaats van de gewone naam. De Latijnse naam is taalonafhankelijk — een boom heeft steeds dezelfde Latijnse naam, ongeacht of de interface in NL of FR staat — waardoor geen aparte, te synchroniseren dropdown-lijsten per taal nodig zijn
* Zoeken, sorteren en filters zijn combineerbaar: ze werken samen op dezelfde onderliggende lijst
* Afstandsfilter vereist eerst toestemming voor locatiegebruik (Geolocation API); na toestemming kan de gebruiker via een slider de straal instellen. De afstand zelf wordt berekend via een vereenvoudigde benadering (zie sectie 3 voor de verantwoording van deze keuze)

**Personalisatie**

* Favorieten opslaan via LocalStorage (enkel boom-ID's, niet de volledige objecten)
* Taalkeuze NL/FR via een centraal vertalingenobject, bewaard tussen sessies via LocalStorage
* Gekozen weergave (lijst/kaart) wordt eveneens bewaard in LocalStorage

**Gebruikerservaring**

* Responsive design, mobile-first opgebouwd over drie breakpoints (375px, 640px, 1024px)
  - Op mobiel en tablet is de filtersectie inklapbaar, bewust gekozen om het scherm overzichtelijk en "clean" te houden — op desktop is er voldoende ruimte om ze standaard open te tonen
* Toggle tussen lijst- en kaartweergave
* "Reset filters"-knop en "Reset favorieten"-knop
* Live telling van het aantal getoonde bomen, en vertaalde foutmeldingen bij geolocatie-problemen

## 3. Technische vereisten

### 3.1 DOM manipulatie

#### Elementen selecteren

| Bestand | Lijnnummer | Uitleg |
|---|---|---|
| main.js | TODO | `initApp()` haalt bij opstart alle benodigde DOM-elementen op via `querySelector()`, vóór de event listeners gekoppeld worden. |
| render.js | TODO | `renderTreeList()` en `observeLazyImages()` selecteren respectievelijk de containerelementen en de te lazy-loaden afbeeldingen. |

#### Elementen manipuleren

| Bestand | Lijnnummer | Uitleg |
|---|---|---|
| render.js | TODO | `renderTreeList()` injecteert de HTML voor elke boomkaart via `innerHTML`, opgebouwd uit de boomdata. |
| main.js | TODO | `createSpeciesDropdown()` bouwt de soort-dropdown dynamisch op met `createElement()` en `appendChild()`. |
| main.js | TODO | `setLanguage()` en `applyViewState()` werken bestaande elementen bij via `textContent` en `classList.toggle()`/`add()`/`remove()`. |

#### Events koppelen

| Bestand | Lijnnummer | Uitleg |
|---|---|---|
| main.js | TODO | `initApp()` koppelt alle event listeners (`input`, `change`, `click`) aan de betrokken DOM-elementen. |
| main.js | TODO | `handleFavoriteClick()` demonstreert event delegation: één listener op de container-element, met `event.target.closest()` om te bepalen welke favorieten-knop werd aangeklikt. |


### 3.2 Modern JavaScript

#### Constanten

| Bestand | Lijnnummer | Uitleg |
|---|---|---|
| api.js | TODO | `BASE_URL` en `limit` in `fetchTrees()` — vaste waarden die niet wijzigen tijdens de uitvoering. |
| render.js | TODO | `TREE_ICON_SVG` — herbruikbare SVG-string, als module-constante gedefinieerd zodat ze niet telkens opnieuw wordt aangemaakt. |
| main.js | TODO | `initApp()` — alle opgehaalde DOM-referenties (`searchInput`, `sortSelect`, `raritySelect`, `speciesSelect`, `favoritesCheckbox`, `appContainer`, `languageToggle`, `viewToggle`, `distanceSlider`, `locateBtn`, `resetFiltersBtn`, `filterToggle`) worden als `const` gedeclareerd. |
| main.js | TODO | `storedLang` en `storedView` (module-niveau) — opgehaalde LocalStorage-waarden die niet herschreven worden. |
| filter.js | TODO | `getDistanceInMeters()` — `metersPerDegreeLat`, `metersPerDegreeLon`, `deltaLat`, `deltaLon` als tussentijdse constanten in de afstandsberekening. |

#### Template literals

| Bestand | Lijnnummer | Uitleg |
|---|---|---|
| api.js | TODO | `fetchTrees()` — de fetch-URL wordt opgebouwd met `` `${BASE_URL}?limit=${limit}&offset=${offset}` ``. |
| render.js | TODO | `renderTreeList()` en `getFavoriteButtonHtml()` — opbouw van de volledige boomkaart- en favorieten-knop-HTML met geïnterpoleerde boomdata. |
| main.js | TODO | `setLanguage()` en `handleDistanceChange()` — weergave van de afstandswaarde als `` `${value} m` ``. |

#### Iteratie over arrays

| Bestand | Lijnnummer | Uitleg |
|---|---|---|
| main.js | TODO | `applyViewState()` — `.forEach()` op `document.querySelectorAll('.view-btn')` om de actieve view-knop te markeren. |
| main.js | TODO | `setLanguage()` — `.forEach()` op `document.querySelectorAll('.lang-btn')` om de actieve taalknop te markeren. |
| main.js | TODO | `createSpeciesDropdown()` — `.forEach()` over de unieke soorten om per soort een `<option>` toe te voegen. |
| render.js | TODO | `observeLazyImages()` — `.forEach()` over de lazy-afbeeldingen om elk aan de IntersectionObserver te koppelen. |

#### Array methodes

| Bestand | Lijnnummer | Uitleg |
|---|---|---|
| filter.js | TODO | `filterTreesBySearch()`, `filterTreesByRarity()`, `filterTreesBySpecies()`, `filterTreesByFavorites()`, `filterTreesByDistance()` — gebruiken elk `.filter()` om een nieuwe, gefilterde array terug te geven zonder de originele te muteren. |
| filter.js | TODO | `filterTreesBySearch()` gebruikt daarnaast `.includes()` (string-methode) om te checken of de zoekterm in de naam voorkomt. |
| filter.js | TODO | `getUniqueSpecies()` — `.map()` om alle Latijnse namen te verzamelen, gevolgd door `.sort()` met `localeCompare()` voor alfabetische volgorde. |
| filter.js | TODO | `sortTrees()` — `.map()` om een kopie van de array te maken (voorkomt mutatie van `allTrees`), gevolgd door `.sort()` met een compare-functie per sorteeroptie. |
| render.js | TODO | `renderTreeList()` — `.map()` om elke boom naar zijn kaart-HTML om te zetten, gevolgd door `.join('')` om de HTML-strings samen te voegen. |

#### Arrow functions

| Bestand | Lijnnummer | Uitleg |
|---|---|---|
| filter.js | TODO | Alle `.filter()`-, `.map()`- en `.sort()`-aanroepen gebruiken arrow functions als callback, bv. `tree => rarity === tree.rarete` en `(a, b) => a.nom_nl?.localeCompare(b.nom_nl)`. |
| render.js | TODO | `renderTreeList()` — de `.map()`-callback (`tree => {...}`) die per boom de kaart-HTML opbouwt. |
| main.js | TODO | `applyViewState()`, `setLanguage()`, `createSpeciesDropdown()` — de `.forEach()`-callbacks gebruiken arrow functions, bv. `btn => {...}` en `name => {...}`. |

#### Ternary operator

| Bestand | Lijnnummer | Uitleg |
|---|---|---|
| filter.js | TODO | `filterTreesBySearch()` en `getTreeDisplayData()` — `lang === 'fr' ? tree.nom_fr : tree.nom_nl` (en analoog voor `infoUrl`) om de juiste taalversie van een veld te kiezen. |
| render.js | TODO | `renderTreeList()` — `data.photoUrl ? imageHtml : TREE_ICON_SVG` als fallback wanneer een boom geen foto heeft. |
| render.js | TODO | `getFavoriteButtonHtml()` — `isFavorite(treeId) ? 'active' : ''` om de favoriet-status van de knop te bepalen. |
| main.js | TODO | `handleDistanceChange()` — `value > 0 ? value : null`, en de bijhorende labeltekst `currentDistance ? ... : t.sliderHint`. |
| main.js | TODO | Initialisatie van `currentLang` en `currentView` (module-niveau) — `storedLang ? storedLang : "nl"` en `storedView ? storedView : 'list'` als fallback naar een standaardwaarde. |

#### Callback functions

| Bestand | Lijnnummer | Uitleg |
|---|---|---|
| filter.js | TODO | Compare-functies doorgegeven aan `.sort()` in `sortTrees()` en `getUniqueSpecies()` — `.sort()` bepaalt zelf wanneer de callback wordt uitgevoerd. |
| filter.js | TODO | Callbacks doorgegeven aan `.filter()` (bv. in `filterTreesBySearch()`, `filterTreesByRarity()`, `filterTreesBySpecies()`, `filterTreesByFavorites()`, `filterTreesByDistance()`) en aan `.map()` in `getUniqueSpecies()` en `sortTrees()`. |
| render.js | TODO | `.map()`-callback in `renderTreeList()`; `.forEach()`-callback in `observeLazyImages()`. |
| main.js | TODO | Alle `.addEventListener()`-aanroepen in `initApp()` geven een handler-functie mee die pas wordt uitgevoerd bij het triggeren van het event (bv. `handleSearchInput`, `handleSortChange`, `handleFavoriteClick`). |
| main.js | TODO | `handleLocateClick()` — `navigator.geolocation.getCurrentPosition()` krijgt twee callbacks mee, één voor succes en één voor een fout — een callback-voorbeeld buiten de context van array-methodes of events. |
| render.js | TODO | `observeLazyImages()` — de callback die aan `new IntersectionObserver(callback, options)` wordt meegegeven en telkens wordt uitgevoerd wanneer de observer een wijziging detecteert. |

#### Promises / async-await

| Bestand | Lijnnummer | Uitleg |
|---|---|---|
| api.js | TODO | `fetchTrees()` is een `async function`; gebruikt `await fetch(...)` en `await response.json()` om telkens op de Promise te wachten vóór verdergegaan wordt, binnen een `try/catch`-blok voor foutafhandeling. |
| main.js | TODO | `initApp()` — `fetchTrees().then(trees => {...})`: de Promise die `fetchTrees()` teruggeeft, wordt hier afgehandeld met `.then()` in plaats van `await`, omdat `initApp()` zelf geen `async function` is. |

#### Observer API

| Bestand | Lijnnummer | Uitleg |
|---|---|---|
| render.js | TODO | `observeLazyImages()` — een `IntersectionObserver` wordt aangemaakt en toegepast op elke `img.lazy`; zodra een afbeelding het scherm nadert (`rootMargin: '100px'`), wordt de echte `src` ingesteld en stopt de observer met dat element te observeren via `unobserve()`. |

### 3.3 Data & API

#### Fetch om data op te halen

| Bestand | Lijnnummer | Uitleg |
|---|---|---|
| api.js | TODO | `fetchTrees()` — `fetch()`-aanroep binnen een `while`-lus die doorloopt op basis van `total_count`, tot alle 582 bomen (gepagineerd, 100 per call) opgehaald zijn. |

#### JSON manipuleren en weergeven

| Bestand | Lijnnummer | Uitleg |
|---|---|---|
| api.js | TODO | `fetchTrees()` — `await response.json()` zet de ruwe JSON-respons van de API om naar een bruikbaar JS-object, waaruit `data.results` en `data.total_count` gehaald worden. |
| filter.js | TODO | `getTreeDisplayData()` — herstructureert een ruw boom-object uit de API naar een taalafhankelijk weergave-object (naam, Latijnse naam, infolink, zeldzaamheidslabel, foto). |
| filter.js | TODO | `getUniqueSpecies()` — manipuleert de opgehaalde JSON-array om er de unieke, alfabetisch gesorteerde soortnamen uit te halen. |

### 3.4 Opslag & validatie

#### Formuliervalidatie

| Bestand | Lijnnummer | Uitleg |
|---|---|---|
| main.js | TODO | `handleDistanceChange()` — `value > 0 ? value : null` valideert de sliderwaarde vóór gebruik: enkel een positieve waarde wordt als geldige afstand geaccepteerd, anders wordt de afstandsfilter uitgeschakeld (`null`). |

*Opmerking: Naast pure formuliervalidatie bevat de code op meerdere plekken checks tegen ontbrekende of foutieve data:
  - De geolocation-foutafhandeling (handleLocateClick/updateLocationErrorMessage)
  - De geo_point_2d-guards (filterTreesByDistance, renderMapMarkers)
  - De getUniqueSpecies-bescherming tegen lege soortnamen


#### LocalStorage

| Bestand | Lijnnummer | Uitleg |
|---|---|---|
| favorites.js | TODO | `getFavorites()`, `toggleFavorite()`, `clearFavorites()` — favorieten worden bewaard als array van boom-ID's onder de key `favoriteTrees`, met `localStorage.getItem()`/`setItem()`/`removeItem()` en `JSON.stringify()`/`JSON.parse()` om de array om te zetten naar en van een opslagbare string. |
| main.js | TODO | Taalkeuze: `setLanguage()` slaat `currentLang` op via `localStorage.setItem("language", currentLang)`; bij opstart wordt deze uitgelezen via `localStorage.getItem("language")` om de voorkeur te herstellen. |
| main.js | TODO | Weergavekeuze (lijst/kaart): `handleViewToggle()` slaat `currentView` op via `localStorage.setItem('view', currentView)`; bij opstart uitgelezen via `localStorage.getItem('view')`. |


### 3.5 Styling & layout

#### Basis HTML-layout (Flexbox / CSS Grid)

| Bestand | Lijnnummer | Uitleg |
|---|---|---|
| style.css | TODO | `header` — CSS Grid met named template areas (`"view lang" "title title"`); bij 1024px+ herschikt naar `"view title lang"` zonder de HTML te moeten aanpassen, enkel door de area-namen te herverdelen. |
| style.css | TODO | `#app` — kaarten-grid, mobile-first `1fr` (één kolom), vanaf 640px `repeat(auto-fill, minmax(220px, 1fr))`: bepaalt automatisch hoeveel kolommen passen op basis van beschikbare breedte, zonder vaste breakpoints per kolomaantal. |
| style.css | TODO | `body` en `main` — flex column-opbouw van de hoofdstructuur (header, main content); `main { flex: 1 }` laat de inhoud de resterende ruimte innemen. |
| style.css | TODO | `.tree-card` — flexbox column-opbouw per kaart (foto, tekst, footer-link) met `gap` voor consistente afstand tussen elementen. |
| style.css | TODO | `#controls` — flex column op mobiel, herschikt naar flex row met `flex-wrap` vanaf 1024px voor een compactere, horizontale controlebalk op grotere schermen. |

#### Basis CSS

| Bestand | Lijnnummer | Uitleg |
|---|---|---|
| style.css | TODO | `:root { --text-muted: ... }` — CSS custom property voor consistente, herbruikbare kleurwaarden doorheen het stylesheet. |
| style.css | TODO | Globale reset (`* { box-sizing: border-box; }`) en typografie-basis (`font-family`, kleuren, `border-radius`) toegepast op body, kaarten en knoppen. |
| style.css | TODO | Hover- en transition-states, bv. `.reset-btn:hover`, en `#toggle-filters-btn::after` met `transition: transform 0.2s ease` voor het roterende pijltje. |

#### Gebruiksvriendelijke elementen

| Bestand | Lijnnummer | Uitleg |
|---|---|---|
| style.css | TODO | `.favorite-icon` — cirkelvormige knop met SVG-boomicoon, visuele toggle-status via de `.active`-class (kleurverandering van het icoon). |
| style.css | TODO | `.reset-btn` — onderstreepte tekstknop voor "Reset filters" en "Reset favorieten", herkenbaar als secundaire actie t.o.v. de primaire controls. |
| style.css | TODO | `#toggle-filters-btn` — knop met roterend pijltje-icoon (`▾` via `::after`, geroteerd bij `.open`) om het filterpaneel op mobiel/tablet in/uit te klappen. |
| style.css | TODO | `.rarity-badge` — pil-vormig badge-element (`border-radius: 999px`) dat de zeldzaamheid van een boom visueel onderscheidt van de rest van de kaarttekst. |

#### Responsive design — breakpoints

| Breakpoint | Lijnnummer | Wat wijzigt |
|---|---|---|
| `min-width: 640px` | TODO | Kaarten-grid wordt `repeat(auto-fill, minmax(220px, 1fr))`; zoek/sorteer-rij wordt horizontaal i.p.v. verticaal; meer padding op kaarten en `#app`. |
| `min-width: 1024px` | TODO | Header herschikt naar `"view title lang"`; `#controls` wordt horizontaal; filterpaneel altijd zichtbaar (`display: contents`, toggle-knop verborgen); telling verschuift van inline (`#tree-count-inline`) naar een aparte regel (`#tree-count`). |

### 3.6 Tooling & structuur

#### Vite

Project opgezet met Vite via 'npm create vite@latest' en dependencies geïnstalleerd met 'npm install'. Vervolgens kon een lokale server gemakkelijk gestart worden (http://localhost:5173) via 'npm run dev'.

#### Folderstructuur

Het project volgt een gescheiden structuur, met HTML, CSS en JS elk in hun eigen locatie, en de JavaScript verder opgesplitst per verantwoordelijkheid:

```
remarkable-trees-brussels/
├── index.html
├── package.json
├── public/
└── src/
    ├── main.js              # orchestrator: state, event listeners, applyFilters()
    ├── assets/
    │   └── vite.svg
    ├── scripts/
    │   ├── api.js           # fetch/paginatie
    │   ├── filter.js        # pure functies: filteren, sorteren, weergavedata
    │   ├── render.js        # HTML-output, lazy loading, SVG-icoon
    │   ├── favorites.js     # LocalStorage-logica favorieten
    │   ├── translations.js  # NL/FR-teksten
    │   └── map.js            # Leaflet-logica
    └── styles/
        └── style.css
```

`main.js` staat bewust los in `src/` (niet in `scripts/`), aangezien het de orchestrator is die alle andere modules samenbrengt — een functioneel andere rol dan de losse, herbruikbare modules in `scripts/`.

### 3.7 Concepten buiten de cursusstof

Deze concepten zijn niet expliciet behandeld in de cursusslides, maar zijn een bewuste, verantwoorde toevoeging aan het project.

| Concept | Bestand | Lijnnummer | Uitleg |
|---|---|---|---|
| Spread operator (`[...array]`) | filter.js | TODO | `getUniqueSpecies()` — `[...new Set(...)]` zet een `Set` terug om naar een array; hiervoor bestaat geen in de cursus behandeld alternatief. |
| `.includes()` | favorites.js | TODO | `isFavorite()` — array-methode om te checken of een boom-ID al in de favorieten-array zit. |
| Event delegation | main.js | TODO | `handleFavoriteClick()` — één listener op de containerelement (`#app`), met `event.target.closest('.favorite-icon')` en een early-return guard om te bepalen of en welke favorieten-knop werd aangeklikt. Voorkomt dat elke individuele, dynamisch gerenderde kaart een eigen listener nodig heeft. |
| Leaflet.js | map.js | TODO | Externe library voor de kaartweergave: initialisatie van de kaart, markers, popups per boom, en `invalidateSize()` (via `refreshMapSize()`) om weergaveproblemen bij het wisselen tussen lijst/kaart te vermijden. |
| `classList.toggle(class, boolean)` | main.js | TODO | `applyViewState()` — `btn.classList.toggle('active', btn.dataset.view === currentView)`: de tweede parameter bepaalt declaratief of de class aan- of afwezig moet zijn, in plaats van een `if/else` met `.add()`/`.remove()`. |
| `display: contents` | style.css | TODO | Bij `min-width: 1024px` toegepast op `.search-sort-row` en `#filter-wrapper`: haalt deze wrapper-elementen uit de visuele hiërarchie zodat hun kind-elementen rechtstreeks deelnemen aan de flex-layout van `#controls`. Caveat: kan "cascade leaks" veroorzaken (bv. een `flex: 1` uit een lager breakpoint dat blijft doorwerken), en vereist daarom expliciete overrides op het hogere breakpoint. |
| `aspect-ratio` | style.css | TODO | `.tree-photo`, `.tree-icon` — reserveert een vaste verhouding (`260 / 180`) vóór de foto geladen is, wat layoutverschuiving door lazy loading voorkomt. |
| `minmax()` / `auto-fill` | style.css | TODO | `#app` — `grid-template-columns: repeat(auto-fill, minmax(220px, 1fr))` laat het aantal kolommen automatisch berekenen op basis van beschikbare breedte, zonder een vast aantal kolommen per breakpoint te moeten opgeven. |

## 4. API

## 5. Installatiehandleiding

## 6. Screenshots

## 7. Bronnen

### 7.1 AI chatlog

### 7.2 Overige bronnen