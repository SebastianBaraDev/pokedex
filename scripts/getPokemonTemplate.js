function getPokemonTemplate(pkmDataIndex) {
    return `
    <div class="PokemonWidget">
        <div class="cardHeadline">
            <h1>#${pokemonData[pkmDataIndex].id}  ${pokemonData[pkmDataIndex].name}</h1>
        </div>
        <div class="bg_${pokemonData[pkmDataIndex].type}">
            <img onload= "getFrontPicture(pokemonDataIndex.id)">
        </div>
    </div>`
}