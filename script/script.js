let currentPokemonId = null;

const getPokemon = (pokemon) => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then(res => res.json())
        .then(({ id, name, sprites }) => {
            currentPokemonId = id;

            document.getElementById('pokemon-image').src = sprites.versions["generation-v"]["black-white"].animated.front_default || sprites.front_default;
            document.getElementById('pokemon-name').textContent = `  ${name}`;
            document.getElementById('pokemon-id').textContent = ` ${id}- `;

            playPokemonSound(id);
        })
        .catch(() => resetPokemonDisplay());
};

const resetPokemonDisplay = () => {
    document.getElementById('pokemon-image').src = '';
    document.getElementById('pokemon-name').textContent = '';
    document.getElementById('pokemon-id').textContent = '';
};

document.getElementById('pokemonInput').addEventListener('keypress', (e) => e.key === 'Enter' && getPokemon(e.target.value.toLowerCase()));

document.getElementById('nextButton').addEventListener('click', () => currentPokemonId && getPokemon(++currentPokemonId));
document.getElementById('prevButton').addEventListener('click', () => currentPokemonId > 1 && getPokemon(--currentPokemonId));

const playPokemonSound = (id) => {
    const audio = document.getElementById('pokemon-sound');
    audio.src = `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${id}.ogg`;
    audio.play().catch(console.error);
};
