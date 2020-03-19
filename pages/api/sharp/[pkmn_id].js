import fetch from "isomorphic-unfetch";
import sharp from "sharp";

const spriteEndpoint =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

export default async (req, res) => {
  // TODO: error handling
  const params = req.query;
  const supportsWebp = req.headers.accept.indexOf("image/webp") >= 0;
  const url = `${spriteEndpoint}${params.pkmn_id}.png`;
  const imgData = Buffer.from(await fetch(url).then(r => r.arrayBuffer()));

  res.statusCode = 200;

  let data;

  if (supportsWebp) {
    data = await sharp(imgData).webp({
      quality: 60,
      nearLossless: true,
      alphaQuality: 10
    });
  } else {
    data = await sharp(imgData).png({
      quality: 60,
      palette: true
    });
  }
  //
  // const data = await sharp(imgData).toFormat(supportsWebp && 'webp' || 'png')

  // 30 Day cache lifetime
  res.setHeader(
    "Cache-Control",
    "public, max-age=2592000, s-max-age=2592000, stale-while-revalidate"
  );

  res.setHeader("Content-Type", (supportsWebp && "image/webp") || "image/png");

  res.end(await data.toBuffer());
};
