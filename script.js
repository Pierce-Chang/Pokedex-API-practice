let currentPokemon;

async function loadPokemon() {
    let url = 'https://pokeapi.co/api/v2/pokemon/charmander';
    let response = await fetch(url);
    currentPokemon = await response.json();
    console.log('Loaded Pokemon', currentPokemon)

    renderPokemonInfo();
}

function renderPokemonInfo() {
    document.getElementById('pokemonName').innerHTML = currentPokemon['name'];
    document.getElementById('pokemonType').innerHTML = currentPokemon['types']['0']['type']['name'];
    document.getElementById('pokemonId').innerHTML = formatPokemonId(currentPokemon['id']);;
    document.getElementById('pokemonImage').src = currentPokemon['sprites']['other']['official-artwork']['front_default'];
    document.getElementById('pokemonSpecies').innerHTML = currentPokemon['types']['0']['type']['name'];
    document.getElementById('pokemonHeight').innerHTML = JSON.parse(currentPokemon['height']) + '"';
    document.getElementById('pokemonWeight').innerHTML = JSON.parse(currentPokemon['weight']) + ' lbs';
    document.getElementById('pokemonHP').innerHTML = JSON.parse(currentPokemon['stats']['0']['base_stat']);
    document.getElementById('pokemonAttack').innerHTML = JSON.parse(currentPokemon['stats']['1']['base_stat']);
    document.getElementById('pokemonDefense').innerHTML = JSON.parse(currentPokemon['stats']['2']['base_stat']);
    document.getElementById('pokemonSpAtk').innerHTML = JSON.parse(currentPokemon['stats']['3']['base_stat']);
    document.getElementById('pokemonSpDef').innerHTML = JSON.parse(currentPokemon['stats']['4']['base_stat']);
    document.getElementById('pokemonSpeed').innerHTML = JSON.parse(currentPokemon['stats']['5']['base_stat']);
    document.getElementById('pokemonTotal').innerHTML = JSON.parse(calculateTotalStats());

    document.getElementById('pokemonAbilities').innerHTML = '';
    for (let i = 0; i < currentPokemon['abilities'].length; i++) {
        document.getElementById('pokemonAbilities').innerHTML += currentPokemon['abilities'][i]['ability']['name'] + ', ';
    }
    let abilitiesComma = document.getElementById('pokemonAbilities');
    abilitiesComma.innerHTML = abilitiesComma.innerHTML.replace(/,\s*$/, '');
}

function formatPokemonId(id) {
    return '#' + ('000' + currentPokemon['id']).slice(-3);
}

function calculateTotalStats() {
    let stat0 = currentPokemon['stats']['0']['base_stat'];
    let stat1 = currentPokemon['stats']['1']['base_stat'];
    let stat2 = currentPokemon['stats']['2']['base_stat'];
    let stat3 = currentPokemon['stats']['3']['base_stat'];
    let stat4 = currentPokemon['stats']['4']['base_stat'];
    let stat5 = currentPokemon['stats']['5']['base_stat'];

    let totalStat = stat0 + stat1 + stat2 + stat3 + stat4 + stat5;
    return (totalStat);
}

function displayAbout() {
    document.getElementById('pokemonInformation-Basestats').classList.add('d-none');
    document.getElementById('pokemonInformation-About').classList.remove('d-none');
    document.getElementById('about').classList.add('active');
    document.getElementById('about').classList.remove('inactive');
    document.getElementById('baseStats').classList.remove('active');
}

function displayBaseStats() {
    document.getElementById('pokemonInformation-Basestats').classList.remove('d-none');
    document.getElementById('pokemonInformation-About').classList.add('d-none');
    document.getElementById('baseStats').classList.add('active');
    document.getElementById('baseStats').classList.remove('inactive');
    document.getElementById('about').classList.remove('active');
}