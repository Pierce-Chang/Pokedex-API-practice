let currentPokemon;

async function loadPokemon() {
    let url = 'https://pokeapi.co/api/v2/pokemon/charmander';
    let response = await fetch(url);
    currentPokemon = await response.json();
    console.log('Loaded Pokemon', currentPokemon)

    renderPokemonInfo();
}

function renderPokemonInfo() {
    let formattedName = capitalizeFirstLetter(currentPokemon['name']);
    let formattedType = capitalizeFirstLetter(currentPokemon['types']['0']['type']['name']);
    let formattedId = formatPokemonId(currentPokemon['id']);
    document.getElementById('pokemonName').innerHTML = formattedName;
    document.getElementById('pokemonType').innerHTML = formattedType;
    document.getElementById('pokemonId').innerHTML = formattedId;
    document.getElementById('pokemonImage').src = currentPokemon['sprites']['other']['official-artwork']['front_default'];
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function formatPokemonId(id) {
    return '#' + ('000' + currentPokemon['id']).slice(-3);
}