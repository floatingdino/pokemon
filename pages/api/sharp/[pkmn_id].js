import fetch from "isomorphic-unfetch";
import sharp from "sharp";

const spriteEndpoint =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

export default async (req, res) => {
  // TODO: error handling
  const params = req.query;
  // Couldn't use headers to determin support as the CDN didn't cache the response
  // PNG and WEBP are now kinda different endpoints
  // const supportsWebp = req.headers.accept.indexOf("image/webp") >= 0;
  const [id] = /(\d)+/.exec(params.pkmn_id);
  const format = params.pkmn_id.replace(id, "").replace(".", "");
  const url = `${spriteEndpoint}${id}.png`;
  const imgData = Buffer.from(await fetch(url).then(r => r.arrayBuffer()));
  res.statusCode = 200;

  let data;

  if (format === "webp") {
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

  // 30 Day cache lifetime
  res.setHeader("Cache-Control", "public, max-age=2592000, s-max-age=2592000");

  res.setHeader(
    "Content-Type",
    (format === "webp" && "image/webp") || "image/png"
  );

  res.end(await data.toBuffer());
};
