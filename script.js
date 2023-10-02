let currentPokemon;

async function loadPokemon() {
    for (let i = 1; i <= 151; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        currentPokemon = await response.json();
        console.log("Loaded Pokemon", currentPokemon);
        await renderOverview(i);
    }
}


async function renderOverview(i) {
    document.getElementById('overview').innerHTML += `
    <div class="pokemonCard">

        <section class="${currentPokemon['types']['0']['type']['name']}" id="pokedex">
            <img class="back-arrow" src="img/arrow-left.png" alt="arrow-left">
            <div class="dp">
                <div>
                    <h1 class="pokemonName">${currentPokemon['name']}</h1>
                    <div class="name-type" id="name-type${i}">
                    
                    </div>
                </div>
                <div class="pokemon-id">
                    <p>${formatPokemonId(currentPokemon['id'])}</p>
                </div>
            </div>
        </section>

        <section id="infoContainer">
        <img class="pokemonImage" src="${currentPokemon['sprites']['other']['official-artwork']['front_default']}">
            <ul class="nav nav-underline justify-content-around">
                <li class="nav-item">
                  <a id='about${i}' class="nav-link active" onclick="displayAbout(${i})">About</a>
                </li>
                <li class="nav-item">
                  <a id='baseStats${i}' class="nav-link" onclick="displayBaseStats(${i})">Base Stats</a>
                </li>
              </ul>
    
              <div class="pokemonInformation-About" id='pokemonInformation-About${i}'>
                <ul class="list-group list-group-horizontal">
                    <li class="list-group-item disabled">Species</li>
                    <li class="list-group-item" id="pokemonSpecies">${currentPokemon['types']['0']['type']['name']}</li>
                  </ul>
                  <ul class="list-group list-group-horizontal">
                    <li class="list-group-item disabled">Height</li>
                    <li class="list-group-item" id="pokemonHeight">${JSON.parse(currentPokemon['height']) + '"'}</li>
                  </ul>
                  <ul class="list-group list-group-horizontal">
                    <li class="list-group-item disabled">Weight</li>
                    <li class="list-group-item" id="pokemonWeight">${JSON.parse(currentPokemon['weight']) + ' lbs'}</li>
                  </ul>
                  <ul class="list-group list-group-horizontal">
                    <li class="list-group-item disabled">Abilities</li>
                    <li class="list-group-item" id="pokemonAbilities${i}">${currentPokemon['abilities'][0]['ability']['name']}</li>
                  </ul>
              </div>
    
              <div class="pokemonInformation-Basestats d-none" id='pokemonInformation-Basestats${i}'>
                <ul class="list-group list-group-horizontal">
                    <li class="list-group-item disabled">HP</li>
                    <li class="list-group-item" id="pokemonHP">${JSON.parse(currentPokemon['stats']['0']['base_stat'])}</li>
                  </ul>
                  <ul class="list-group list-group-horizontal">
                    <li class="list-group-item disabled">Attack</li>
                    <li class="list-group-item" id="pokemonAttack">${JSON.parse(currentPokemon['stats']['1']['base_stat'])}</li>
                  </ul>
                  <ul class="list-group list-group-horizontal">
                    <li class="list-group-item disabled">Defense</li>
                    <li class="list-group-item" id="pokemonDefense">${JSON.parse(currentPokemon['stats']['2']['base_stat'])}</li>
                  </ul>
                  <ul class="list-group list-group-horizontal">
                    <li class="list-group-item disabled">Sp. Atk</li>
                    <li class="list-group-item" id="pokemonSpAtk">${JSON.parse(currentPokemon['stats']['3']['base_stat'])}</li>
                  </ul>
                  <ul class="list-group list-group-horizontal">
                    <li class="list-group-item disabled">Sp. Def</li>
                    <li class="list-group-item" id="pokemonSpDef">${JSON.parse(currentPokemon['stats']['4']['base_stat'])}</li>
                  </ul>
                  <ul class="list-group list-group-horizontal">
                    <li class="list-group-item disabled">Speed</li>
                    <li class="list-group-item" id="pokemonSpeed">${JSON.parse(currentPokemon['stats']['5']['base_stat'])}</li>
                  </ul>
                  <ul class="list-group list-group-horizontal">
                    <li class="list-group-item disabled">Total</li>
                    <li class="list-group-item" id="pokemonTotal">${JSON.parse(calculateTotalStats())}</li>
                  </ul>
              </div>
        </section>
    </div>
    `;
    renderTypes(i);
    formatAbilities(i);
}


function formatAbilities(i) {
    const abilitiesElement = document.getElementById(`pokemonAbilities${i}`);
    let abilitiesString = '';

    for (let j = 0; j < currentPokemon['abilities'].length; j++) {
        abilitiesString += currentPokemon['abilities'][j]['ability']['name'] + ', ';
    }

    abilitiesString = abilitiesString.replace(/,\s*$/, ''); // Remove the trailing comma and any whitespace

    abilitiesElement.innerHTML = abilitiesString;
}

function renderTypes(i) {
    const typesDiv = document.getElementById(`name-type${i}`);
    typesDiv.innerHTML = '';

    for (let j = 0; j < currentPokemon['types'].length; j++) {
        const typeName = currentPokemon['types'][j]['type']['name'];
        const typeElementP = document.createElement('p');
        typeElementP.textContent = typeName;
        typeElementP.classList.add('pokemonType'); // Füge die Klasse 'pokemonType' hinzu
        typesDiv.appendChild(typeElementP);
    }
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

function displayAbout(i) {
    document.getElementById(`pokemonInformation-Basestats${i}`).classList.add('d-none');
    document.getElementById(`pokemonInformation-About${i}`).classList.remove('d-none');
    document.getElementById(`about${i}`).classList.add('active');
    document.getElementById(`about${i}`).classList.remove('inactive');
    document.getElementById(`baseStats${i}`).classList.remove('active');
}

function displayBaseStats(i) {
    document.getElementById(`pokemonInformation-Basestats${i}`).classList.remove('d-none');
    document.getElementById(`pokemonInformation-About${i}`).classList.add('d-none');
    document.getElementById(`baseStats${i}`).classList.add('active');
    document.getElementById(`baseStats${i}`).classList.remove('inactive');
    document.getElementById(`about${i}`).classList.remove('active');
}