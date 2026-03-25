function getPokemonTemplate(pkmDataIndex) {
    return `
    <div class="PokemonWidget" onclick="openDialog()">
        <div class="cardHeadline">
            <h1>#${pokemonData[pkmDataIndex].id}  ${pokemonData[pkmDataIndex].name}</h1>
        </div>
        <div class="bg_${pokemonData[pkmDataIndex].types[0].type.name} center">
            <img src = "${getFrontPicture(pokemonData[pkmDataIndex])}" class="pkm_img">
        </div>
        <div id="type">
        </div>
    </div>`
}