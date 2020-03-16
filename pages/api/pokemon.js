const pageSize = 12;
const generationEndpoint = `${process.env.root}api/generation`;

const titleCase = term => {
  const words = term
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.substring(1));
  return words.join(" ");
};

const stripPokemonData = mon => {
  return {
    id: mon.id,
    name: titleCase(mon.name),
    types: mon.types.sort((a, b) => a.slot - b.slot).map(({ type }) => {
      return {
        name: titleCase(type.name),
        url: type.url
      };
    }),
    image: mon.sprites?.front_default
  };
};

export default async (req, res) => {
  // TODO: error handling
  const params = req.query;

  const allPokemon = await fetch(generationEndpoint, {
    cache: "force-cache"
  }).then(r => r.json());

  const startIndex =
    (params.page && (params.page - 1) * (params.page_size || pageSize)) || 0;
  const endIndex = startIndex + (params.page_size || pageSize);

  const pokemon = await Promise.all(
    allPokemon.slice(startIndex, endIndex).map(mon =>
      fetch(mon.baseUrl, { cache: "force-cache" })
        .then(r => r.json())
        .then(mon => stripPokemonData(mon))
    )
  );

  res.setHeader("X-Max-Pokemon", allPokemon.length);
  res.setHeader(
    "X-Max-Pages",
    Math.ceil(allPokemon.length / (params.page_size || pageSize))
  );

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");

  // 1 Day cache lifetime
  res.setHeader("Cache-Control", "public, max-age=86400");

  res.end(JSON.stringify(pokemon));
};
