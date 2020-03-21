const userName = "Ash";

const maxPartySize = 6;

const defaultPageSize = 12;

const defaultCacheAge = 2592000; // 30 Days

const pokemonGeneration = 1;

const localGenerationEndpoint = "/api/generation";
const localPokemonEndpoint = "/api/pokemon";
const localImageEndpoint = "/api/sharp";

const externalGenerationEndpoint = `https://pokeapi.co/api/v2/generation/${pokemonGeneration}`;
const externalPokemonEndpoint = "https://pokeapi.co/api/v2/pokemon/";
const externalSpriteEndpoint =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

export {
  userName,
  maxPartySize,
  defaultPageSize,
  defaultCacheAge,
  localGenerationEndpoint,
  localPokemonEndpoint,
  localImageEndpoint,
  externalGenerationEndpoint,
  externalPokemonEndpoint,
  externalSpriteEndpoint
};
