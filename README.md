# Remarkable Trees of Brussels

## 1. Projectbeschrijving

**Opmerkelijke Bomen in Brussel** is een interactieve single-page webapplicatie waarmee gebruikers de opmerkelijke bomen van het Brussels Hoofdstedelijk Gewest kunnen verkennen. De app toont zowel de kenmerken van elke boom (lijstweergave) als de locatie ervan (kaartweergave via Leaflet). Via zoek-, sorteer- en filteropties kunnen gebruikers snel navigeren doorheen de 582 bomen uit de dataset. Favoriete bomen kunnen worden opgeslagen, en de interface is beschikbaar in het Nederlands en het Frans.

De data wordt opgehaald via de Open Data Brussels API en de applicatie is gebouwd met Vite en vanilla JavaScript.

## 2. Functionele vereisten

Dataverzameling & -weergave

-Data van 582 bomen opgehaald via de Open Data Brussels API, via een while-lus die doorloopt op basis van total_count uit de API-respons — niet een vast aantal calls, zodat de app blijft werken als de dataset groeit
-Lijstweergave met kaarten per boom: foto, naam, Latijnse naam, omtrek, kroondiameter, zeldzaamheidsbadge, link naar meer info
-Kaartweergave (Leaflet) met klikbare markers; popup per boom toont een compactere selectie — foto, naam, Latijnse naam en link naar meer info — bewust beperkt gehouden zodat de popup overzichtelijk blijft op een kleine kaartweergave

Interactiviteit

-Zoekfunctie op naam, werkt in beide talen (NL/FR)
-Sorteermogelijkheden: naam, omtrek, kroondiameter — telkens oplopend/aflopend
-Filters: zeldzaamheid (Common/Notable/Rare), soort, afstand tot de gebruiker
-De soort-filter is gebaseerd op de Latijnse naam (nom_la) in plaats van de gewone naam. De Latijnse naam is taalonafhankelijk — een boom heeft steeds dezelfde Latijnse naam, ongeacht of de interface in NL of FR staat — waardoor geen aparte, te synchroniseren dropdown-lijsten per taal nodig zijn
-Zoeken, sorteren en filters zijn combineerbaar: ze werken samen op dezelfde onderliggende lijst
-Afstandsfilter vereist eerst toestemming voor locatiegebruik (Geolocation API); na toestemming kan de gebruiker via een slider de straal instellen. De afstand zelf wordt berekend via een vereenvoudigde benadering (zie sectie 3 voor de verantwoording van deze keuze)

Personalisatie

-Favorieten opslaan via LocalStorage (enkel boom-ID's, niet de volledige objecten)
-Taalkeuze NL/FR via een centraal vertalingenobject, bewaard tussen sessies via LocalStorage
-Gekozen weergave (lijst/kaart) wordt eveneens bewaard in LocalStorage

Gebruikerservaring

-Responsive design, mobile-first opgebouwd over drie breakpoints (375px, 640px, 1024px)
-Toggle tussen lijst- en kaartweergave
-"Reset filters"-knop en "Reset favorieten"-knop
-Live telling van het aantal getoonde bomen, en vertaalde foutmeldingen bij geolocatie-problemen

## 3. Technische vereisten

### 3.1 DOM manipulatie

### 3.2 Modern JavaScript

### 3.3 Data & API

### 3.4 Opslag & validatie

### 3.5 Styling & layout

### 3.6 Tooling & structuur

### 3.7 Concepten buiten de cursusstof

## 4. API

## 5. Installatiehandleiding

## 6. Screenshots

## 7. Bronnen

### 7.1 AI chatlog

### 7.2 Overige bronnen