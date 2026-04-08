function getTypeImages(index) {
    return `
        <img src="${pokemonData[index].sprites.other.home.front_default}" class="dialog_img">
        
        <div class="type_container">
            ${getTypesTemplate(index)}
        </div>
    `;
}

function getMainTemplate(index) {
    const currentPokemon = pokemonData[index];
    return `<div>
        <div class="">Height: ${currentPokemon.height}</div>
        <div class="">Weight: ${currentPokemon.weight}</div>
        <div class="">Base Experience: ${currentPokemon.base_experience}</div>
    </div>`    
}

function getStatsTemplate(index) {
    const currentPokemon = pokemonData[index];
    let html = "";
    for (let i = 0; i < currentPokemon.stats.length; i++) {
        const statName = currentPokemon.stats[i].stat.name;
        const statValue = currentPokemon.stats[i].base_stat;
        html += `<div class="dialog_stat">${statName}: <div>${statValue}</div></div>`;
    }
    return html;
}

function getEvoChainTemplate(index) {
    const currentPokemon = pokemonData[index];
    let html = "";
    if (currentPokemon.evolution_chain) {
        const evoChain = currentPokemon.evolution_chain.chain;
        html += `<div class="">${evoChain.species.name}</div>`;
        if (evoChain.evolves_to.length > 0) {
            const firstEvo = evoChain.evolves_to[0];
            html += `<div class="">${firstEvo.species.name}</div>`;
            if (firstEvo.evolves_to.length > 0) {
                const secondEvo = firstEvo.evolves_to[0];
                html += `<div class="">${secondEvo.species.name}</div>`;
            }
        }
    } else {
        html = "<div class=''>No evolution chain available.</div>";
    }
    return html;
}