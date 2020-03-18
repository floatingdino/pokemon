import fetch from "isomorphic-unfetch";
import { getGeneration } from "./generation";

const defaultPageSize = 12;

const titleCase = term => {
  const words = term
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.substring(1));
  return words.join(" ");
};

// We don't need all the pokemon data, so just send the attributes we want
const stripPokemonData = mon => {
  return {
    id: mon.id,
    // There doesn't seem to be a way to grab the correct name, so I'm just manually updating the ones that come out wrong
    name: titleCase(mon.name)
      .replace("Nidoran-m", "Nidoran♂")
      .replace("Nidoran-f", "Nidoran♀")
      .replace("Mr-mime", "Mr. Mime"),
    types: mon.types.sort((a, b) => a.slot - b.slot).map(({ type }) => {
      return {
        name: titleCase(type.name),
        url: type.url
      };
    }),
    image: mon.sprites?.front_default
  };
};

export { defaultPageSize };
export async function getPokemon(page = 1, pageSize = defaultPageSize) {
  const allPokemon = await getGeneration();

  const startIndex = (page - 1) * pageSize || 0;
  const endIndex = startIndex + pageSize;

  const pokemon = await Promise.all(
    allPokemon.slice(startIndex, endIndex).map(mon =>
      fetch(mon.baseUrl)
        .then(r => r.json())
        .then(mon => stripPokemonData(mon))
    )
  );

  return { pokemon, allPokemon };
}

export default async (req, res) => {
  // TODO: error handling
  const params = req.query;

  // I'm leveraging the Now function CDN cache to make this really fast
  // even though I'm doing a bunch of concurrent fetches
  const { pokemon, allPokemon } = await getPokemon(
    params.page,
    params.page_size
  );

  res.setHeader("X-Max-Pokemon", allPokemon.length);
  res.setHeader(
    "X-Max-Pages",
    Math.ceil(allPokemon.length / (params.page_size || defaultPageSize))
  );

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");

  // 30 Day cache lifetime
  res.setHeader(
    "Cache-Control",
    "public, max-age=2592000, s-max-age=2592000, stale-while-revalidate"
  );

  res.end(JSON.stringify(pokemon));
};
