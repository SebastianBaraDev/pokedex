function getPokemonTemplate(currentPokemon, index) {
    return `
    <div class="PokemonWidget" onclick="openDialog(${index})">
        <div class="cardHeadline">
            <h1>#${currentPokemon.id}  ${currentPokemon.name}</h1>
        </div>
        <div class="bg_${currentPokemon.types[0].type.name} center">
            <img src = "${getFrontPicture(currentPokemon)}" class="pkm_img">
        </div>
        <div id="type" class="type_container">
        ${getTypesTemplate(index)}
        </div>
    </div>`
}