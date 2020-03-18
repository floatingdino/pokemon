const generationEndpoint = "https://pokeapi.co/api/v2/generation/1";
const pokemonEndpoint = "https://pokeapi.co/api/v2/pokemon/";

export async function getGeneration() {
  const rr = await fetch(generationEndpoint, { cache: "force-cache" });
  const generation = await rr.json();

  const idRegex = /\/(\d{1,3})\//;

  const allPokemon = generation.pokemon_species.map(mon => {
    mon.id = idRegex.exec(mon.url)[1];
    // Surely nothing can go wrong by expecting the species ID to match the Pokemon ID
    mon.baseUrl = `${pokemonEndpoint}${mon.id}`;
    return mon;
  });

  allPokemon.sort((a, b) => a.id - b.id);

  return allPokemon;
}

export default async (req, res) => {
  const allPokemon = await getGeneration();

  // TODO: error handling
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");

  // 30 Day cache lifetime
  res.setHeader("Cache-Control", "public, max-age=2592000, s-max-age=2592000");

  res.end(JSON.stringify(allPokemon));
};
