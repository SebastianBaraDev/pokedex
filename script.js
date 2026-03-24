let pokemon = [];
let pokemonData = [];

let START = 1;
let STOP = 20;

const BASE_URL = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20";

function init(){
    loadData();
    bulkLoadPokemon();
}

//Loading Pokemon Datas into my arrays//

async function loadData() {
    let response = await fetch(BASE_URL + ".json");
    let responseAsJson = await response.json();
    pokemon = responseAsJson.results; 
    console.log(pokemon);
}

async function loadPokemonData(id) {
    let url = `https://pokeapi.co/api/v2/pokemon/${id}/`;
    let response = await fetch(url);
    let responseAsJSON = await response.json();
    return responseAsJSON;
}

async function bulkLoadPokemon() {
    for (let id = 1; id <= 20; id++) {
        const currentPokemon = await loadPokemonData(id);
        pokemonData.push(currentPokemon);
        }
    renderPokemonCards();
}

//Load next 20 Pokemon --> Button//

async function bulkLoadNextPokemon() {
    for (let id = START; id < STOP; id++) {
        const currentPokemon = await loadPokemonInfo(id);
        pokemonInfos.push(currentPokemon);
        }
    START += 20;
    STOP  += 20;
}

//Render Pokemon Card into Content Container//

function renderPokemonCards() {
    let pokemonList = document.getElementById("content");
    pokemonList.innerHTML = "";
    for (let pkmDataIndex = 0; pkmDataIndex < pokemonData.length; pkmDataIndex++) {
        pokemonList.innerHTML += getPokemonTemplate(pkmDataIndex);
    }
}

//Loading Datas into Pokemon Template//

function getPokemonName(id) {
    return pokemon[id].name;
}

function getFrontPicture(id) {
    return pokemonData[id - 1].sprites.other.dream_world.front_default;
}