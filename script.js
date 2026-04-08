let pokemon = [];
let pokemonData = [];
let currentIndex = 0;
let START = 21;
let LIMIT = 20;

const BASE_URL = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20";

async function init(){
    await loadData();
    await bulkLoadPokemon();
}

//Loading Pokemon Datas into my arrays//

async function loadData() {
    let response = await fetch(BASE_URL);
    let responseAsJson = await response.json();
    pokemon = responseAsJson.results; 
}

async function loadPokemonData(id) {
    let url = `https://pokeapi.co/api/v2/pokemon/${id}/`;
    let response = await fetch(url);
    let responseAsJSON = await response.json();
    return responseAsJSON;
}

async function bulkLoadPokemon() {
    for (let id = 1; id <= 20; id++) {
        try {
            const currentPokemon = await loadPokemonData(id);
            if (currentPokemon) {
                pokemonData.push(currentPokemon);
            }
        } catch (error) {
            console.error(`Fehler bei Pokemon ${id}`, error);
        }
    }
    renderPokemonCards();
}

//Load next 20 Pokemon --> Button//

async function bulkLoadNextPokemon() {
    let end = START + LIMIT - 1;
    for (let id = START; id <= end; id++) {
        const currentPokemon = await loadPokemonData(id);
        pokemonData.push(currentPokemon);
        }
    START += LIMIT;
    renderPokemonCards();
}

//Render Pokemon Cards into Content Container//

function renderPokemonCards() {
    let pokemonList = document.getElementById("content");
    pokemonList.innerHTML = "";
    for (let i = 0; i < pokemonData.length; i++) {
    const currentPokemon = pokemonData[i];
    pokemonList.innerHTML += getPokemonTemplate(currentPokemon, i);
}
}

//Loading Datas into Pokemon Template//

function getFrontPicture(currentPokemon) {
    const sprites = currentPokemon.sprites;

    return sprites.other.home.front_default;
}

function getTypesTemplate(index) {
    const types = pokemonData[index].types;
    let html = "";

    for (let i = 0; i < types.length; i++) {
        const typeName = types[i].type.name;

        html += `
            <img src="assets/icons/${typeName}.ico"
                 alt="${typeName}"
                 class="type_icon">
        `;
    }
    return html;
}

//Dialog Functions//
function openDialog(index) {
    currentIndex = index;
    let dialogRef = document.getElementById("pokemon_card");
    dialogRef.showModal();

    const bodyOverflow = document.getElementById("hide_scrollbar");
    bodyOverflow.classList.add("HideScrollbar");

    updateDialog();
    renderPkmCardInfos('main');
}

function closeDialog() {
    let dialogRef = document.getElementById("pokemon_card");
    dialogRef.close();
    
    const bodyOverflow = document.getElementById("hide_scrollbar");
    bodyOverflow.classList.remove("HideScrollbar");
}

function updateDialog() {
    pushDialogHeadline(currentIndex);
    pushDialogImage(currentIndex);
}

function pushDialogHeadline(index) {
    const HEADLINE_CONTAINER = document.getElementById("dialog_title");
    HEADLINE_CONTAINER.innerHTML = `#${pokemonData[index].id} ${pokemonData[index].name.toUpperCase()}`;
} 

function pushDialogImage(index) {
     const IMAGE_CONTAINER = document.getElementById("pkm_picture");
    IMAGE_CONTAINER.innerHTML = getTypeImages(index);
}

function navForward() {
    currentIndex++;
        if(currentIndex >= pokemonData.length) {
            currentIndex = 0;
        }
    updateDialog();
    renderPkmCardInfos('main');
    }
 
function navBackward() {
    currentIndex--;
        if(currentIndex < 0) {
            currentIndex = pokemonData.length - 1;
        }
    updateDialog();
    renderPkmCardInfos('main');
}

function renderPkmCardInfos(id) {
        let contentRef = document.getElementById("card_content");
        let content = "";
        switch (id) {
            case "main":
                content = getMainTemplate(currentIndex);
                break;
            case "stats":
                content = getStatsTemplate(currentIndex);
                break;
            case "evo":
                content = getEvoChainTemplate(currentIndex);
                break;
        }
        contentRef.innerHTML = content;
}

//Event Bubbling on Dialog
const dialog = document.getElementById("pokemon_card");
const background = document.getElementById('dialog_background');

dialog.onclick = function () {
    closeDialog();
}

background.onclick = function (event) {
    event.stopPropagation();
}

//Search Function
function getSearchValue() {
    return document.getElementById("search_input").value.toLowerCase().trim();
}

function resetView() {
    renderPokemonCards();
    toggleLoadMore(true);
}

function toggleLoadMore(show) {
    const btn = document.getElementById("loadMoreBtn");
    btn.style.display = show ? "block" : "none";
}

function filterPokemon(value) {
    return pokemonData.filter(pokemon =>
        pokemon.name.toLowerCase().includes(value)
    );
}

function renderSearchResults(results) {
    const contentRef = document.getElementById("content");
    contentRef.innerHTML = "";

    results.forEach(pokemon => {
        let index = pokemonData.indexOf(pokemon);
        contentRef.innerHTML += getPokemonTemplate(pokemon, index);
    });
}

function searchPkm() {
    const value = getSearchValue();

    if (value.length === 0) return resetView();
    if (value.length < 3) return;

    const results = filterPokemon(value);

    toggleLoadMore(false);
    renderSearchResults(results);
}


//getFrontPicture --> async function?!