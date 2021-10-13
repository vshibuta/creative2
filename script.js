const pokedex = document.getElementById('pokedex');

let pocketmons = [];
let new_array = pocketmons.filter(function(name) {
    return name == document.getElementById("textbox").value; });


const fetchPokemon = () => {
    const promises = [];
    for (let i = 1; i <= 898; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((res) => res.json()));
    }
    Promise.all(promises).then((results) => {
        const pokemon = results.map((result) => ({
            name: result.name,
            image: result.sprites['front_default'],
            hp: result.stats[0].base_stat,
            Atk: result.stats[1].base_stat,
            Def: result.stats[2].base_stat,
            SpAtk: result.stats[3].base_stat,
            SpDef: result.stats[4].base_stat,
            Speed: result.stats[5].base_stat,
            id: result.id,
            weight: result.weight,
            height: result.height,
            type: result.types.map((type) => type.type.name).join(', '),
            ability: result.abilities.map((ability) => ability.ability.name).join(', ')


            
        }));
        displayPokemon(pokemon);
    });
};

const displayPokemon = (pokemon) => {
    console.log(pokemon);
    const pokemonHTMLString = pokemon
        .map(
            (poke) => `
        <div class="card">
            <h2 class="card-title">${poke.id}. ${poke.name}</h2>
            <img src="${poke.image}"/>
            <div class = pokeinfo>
            <p> Weight: ${poke.weight} </p>
            <p> Height: ${poke.height} </p>
            <p> Type: ${poke.type}</p>
            <p> Ability: ${poke.ability} </p>
            </br>
            <p class = "hp"> HP: ${poke.hp} </p>
            <p class = "atk"> Atk: ${poke.Atk} </p>
            <p class = "def"> Def: ${poke.Def} </p>
            <p class = "spatk"> SpAtk: ${poke.SpAtk} </p>
            <p class = "spdef"> SpDef: ${poke.SpDef} </p>
            <p class = "speed"> Speed: ${poke.Speed} </p>
            </div>
            

        </div>`

        )
        .join('');
    pokedex.innerHTML = pokemonHTMLString;
};

fetchPokemon();
