
//loadData function, um Daten aus der API zu laden
//init function für onlad auf body

//pokedex widget template
//Array für bereits geladene Pokemon

function init(){
    loadData();
}

async function loadData() {
    let response = await fetch(BASIC_URL + ".json");
    let responseAsJson = await response.json();
    console.log(responseAsJson);    
}