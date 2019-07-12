/* Add html elements to JS variables */
var pokeball = document.querySelector(".pokeball");
var pokemonFound = document.querySelector(".pokemon-found");
var closePokemonFound = document.querySelector(".close");
var pokemonImg = document.querySelector(".pokemon");
var pokemonName = document.querySelector(".name");
var amount = document.querySelector(".amount-pokemon");
var listPokemon = document.querySelector(".list-pokemon");
var backpack = document.querySelector(".backpack");
var backpackIcon = document.querySelector(".backpack-icon");
var backpackClose = document.querySelector(".close-backpack");

/* Variable to save de pokémons in the local storage */
var pokemonSave = [];

/* Pokeball audio */
var pokeballAudio = new Audio("sfx/pokeball.mp3");
pokeballAudio.volume = 0.1;

pokeball.addEventListener("click", function() {
  pokeballAudio.play();
  pokeball.classList.add("animated", "shake");

  /* Vibrate when using mobile */
  window.navigator.vibrate([50, 50, 50]);

  /* Generate random number between 1 and 151 */
  var randomPokemon = Math.floor(Math.random() * 151) + 1;

  /* Change Image SRC to the random generated number */
  pokemonImg.src = `img/pokemons/${randomPokemon}.png`;

  /* Find pokémon name from Array(allPokemonsWithNames) by number */
  var pokemonNameByNumber = allPokemonsWithNames.find(function(pokemon) {
    return pokemon.number == randomPokemon;
  });

  /* Set pokémon name found to html */
  pokemonName.textContent = pokemonNameByNumber.name;
  
  /* Add pokémon in the array */
  pokemonSave.push(pokemonNameByNumber);

   /* Save the pokémon in the localStorage */
   localStorage.setItem('pokemons', JSON.stringify(pokemonSave));

  /* 
    Wait 500ms to show (fadeIn) `.pokemon-found` div,
    while `.pokeball` is running a (shake) animation.
  */
  setTimeout(function() {
    pokemonFound.style.display = "block";

    pokemonFound.classList.add("animated", "fadeIn");
    pokeball.classList.remove("animated", "shake");
  }, 500);
});

/*
  (fadeIn) removed from `.pokemon-found` to add (fadeOut) animation.
  Wait 500ms to complete (fadeOut) effect.
*/
closePokemonFound.addEventListener("click", function() {
  pokeballAudio.pause();
  pokeballAudio.currentTime = 0;

  pokemonFound.classList.remove("animated", "fadeIn");
  pokemonFound.classList.add("animated", "fadeOut");

  setTimeout(function() {
    pokemonFound.style.display = "none";
    pokemonFound.classList.remove("animated", "fadeOut");
  }, 500);
});

backpackIcon.addEventListener("click", function() {
  backpackIcon.classList.remove("infinite");
  
   /* Vibrate when using mobile */
   window.navigator.vibrate([50, 50, 50]);

   var pokemonList = JSON.parse(localStorage.getItem('pokemons'));

   setTimeout(function() {
    backpack.style.display = "block";

    backpack.classList.add("animated", "fadeIn");
  }, 500);
});

backpackClose.addEventListener("click", function() {
  pokeballAudio.pause();
  pokeballAudio.currentTime = 0;

  setTimeout(function() {
    backpack.style.display = "none";
    backpackIcon.classList.add("infinite");
  }, 500);
});