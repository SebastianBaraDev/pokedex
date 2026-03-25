let pokemon = [];
let pokemonData = [];

let START = 1;
let STOP = 20;

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
    for (let id = START; id < STOP; id++) {
        const currentPokemon = await loadPokemonData(id);
        pokemonData.push(currentPokemon);
        }
    START += 20;
    STOP  += 20;
}

//Render Pokemon Cards into Content Container//

function renderPokemonCards() {
    let pokemonList = document.getElementById("content");
    pokemonList.innerHTML = "";
    for (let pkmDataIndex = 0; pkmDataIndex < pokemonData.length; pkmDataIndex++) {
        pokemonList.innerHTML += getPokemonTemplate(pkmDataIndex);
    }
}

//Loading Datas into Pokemon Template//

function getFrontPicture(pkmDataIndex) {
    const sprites = pkmDataIndex.sprites;

    return sprites.other.home.front_default;
}

console.log(pokemonData)


////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

//Dialog öffnen
function openDialog() {
    document.getElementById("pokemon_card").showModal(); 
}
//Dialog schließen
function closeDialog() {
    document.getElementById("pokemon_card").close(); 
}
//Event Bubbling on Dialog
//Vorwärts durch Dialog navigieren
function navigateDialogForward() {
    //
}
//Rückwärts durch Dialog navigieren
function navigateDialogBackward() {
    //
}
//Load Main Content Dialog
function renderMain() {
        let main = document.getElementById("main");
        main.innerHTML = "";
    for (let i = 0; i < pokemonData.length; i++) {
        main.innerHTML += getDialogMainTemplate(i);
    }
}
//Load Stats Content Dialog
function renderStats() {
        let stats = document.getElementById("stats");
        stats.innerHTML = "";
    for (let i = 0; i < pokemonData.length; i++) {
        stats.innerHTML += getDialogStatsTemplate(i);
    }
}
//Load evo-chain Content Dialog
function renderEvoChain() {
        let evoChain = document.getElementById("evo_chain");
        evoChain.innerHTML = "";
    for (let i = 0; i < pokemonData.length; i++) {
        evoChain.innerHTML += getDialogEvoChainTemplate(i);
    }
}
//Search Function
//Load type icons into Pkm Card

//Fix "Load more Pkm" Function - doesn't work well yet
//getFrontPicture --> async function?!