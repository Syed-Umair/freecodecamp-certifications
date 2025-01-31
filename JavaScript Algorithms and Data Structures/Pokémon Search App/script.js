const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const pokemonInfo = document.querySelector('.pokemon-info');

function setupEventListeners() {
    searchButton.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });
}

async function fetchPokemonData(query) {
    try {
        const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`
        );
        if (!response.ok) throw new Error('Pokémon not found');
        return await response.json();
    } catch (error) {
        alert('Pokémon not found');
        return null;
    }
}

function updateTypes(types) {
    const typesContainer = document.getElementById('types');
    typesContainer.innerHTML = '';
    types.forEach(type => {
        const typeElement = document.createElement('span');
        typeElement.textContent = type.type.name.toUpperCase();
        typeElement.classList.add('type', type.type.name.toUpperCase());
        typesContainer.appendChild(typeElement);
    });
}

function updatePokemonInfo(data) {
    document.getElementById('pokemon-name').textContent = data.name.toUpperCase();
    document.getElementById('pokemon-id').textContent = `#${data.id}`;
    document.getElementById('weight').textContent = data.weight;
    document.getElementById('height').textContent = data.height;
    
    const stats = {
        hp: 'hp',
        attack: 'attack',
        defense: 'defense',
        'special-attack': 'special-attack',
        'special-defense': 'special-defense',
        speed: 'speed'
    };

    data.stats.forEach(stat => {
        const elementId = stats[stat.stat.name];
        if (elementId) {
            document.getElementById(elementId).textContent = stat.base_stat;
        }
    });

    const sprite = document.getElementById('sprite');
    sprite.src = data.sprites.front_default;
    sprite.alt = data.name;

    updateTypes(data.types);
    pokemonInfo.classList.remove('hidden');
}

async function handleSearch() {
    const query = searchInput.value.trim();
    if (!query) return;

    const data = await fetchPokemonData(query);
    if (data) {
        updatePokemonInfo(data);
    }
}

setupEventListeners();