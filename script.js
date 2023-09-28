let currentPokemon;

async function loadPokemon() {
    let url = 'https://pokeapi.co/api/v2/pokemon/charmander';
    let response = await fetch(url);
    currentPokemon = await response.json();
    console.log('Loaded Pokemon', currentPokemon)

    renderPokemonInfo();
}

function renderPokemonInfo() {
    let correctedName = capitalizeFirstLetter(currentPokemon['name']);
    document.getElementById('pokemonName').innerHTML = correctedName;
    document.getElementById('pokemonType').innerHTML = currentPokemon['types']['0']['type']['name'];
    document.getElementById('pokemonImage').src = currentPokemon['sprites']['other']['official-artwork']['front_default'];
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}