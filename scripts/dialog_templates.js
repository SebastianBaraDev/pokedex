function getTypeImages(index) {
    return `
        <div class="bg_${pokemonData[index].types[0].type.name} center">
        <img src="${pokemonData[index].sprites.other.home.front_default}" class="dialog_img">
        </div>

        <div class="type_container">
            ${getTypesTemplate(index)}
        </div>
    `;
}

function getMainTemplate(index) {
    const currentPokemon = pokemonData[index];
    let html = "";
        html = `<div>
        <div class="dialog_main"><p>Height:</p> <p>${currentPokemon.height}</p></div>
        <div class="dialog_main"><p>Weight:</p> <p>${currentPokemon.weight}</p></div>
        <div class="dialog_main"><p>Base Experience:</p> <p>${currentPokemon.base_experience}</p></div>
    </div>`
    return html;   
    
    
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

function getEvoChainTemplate(evoList) {
    let html = "";
    for (let i = 0; i < evoList.length; i++) {
        html += `<div class="evo-item">
                    <img src="${evoList[i].image}" alt="${evoList[i].name}">
                    <span>${evoList[i].name}</span>
                 </div>`;

        if (i < evoList.length - 1) {
            html += `<img src="./assets/icons/arrow.png" alt="Arrow" class="arrow">`;
        }
    }
    return `<div class="evo-chain">${html}</div>`;
}