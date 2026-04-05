function getMainTemplate(index) {
    const currentPokemon = pokemonData[index];
    return `<div>
        <div class="">Height: ${currentPokemon.height}</div>
        <div class="">Weight: ${currentPokemon.weight}</div>
        <div class="">Base Experience: ${currentPokemon.base_experience}</div>
    </div>`    
}