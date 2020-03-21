import fetch from "isomorphic-unfetch";
import sharp from "sharp";

import {
  externalSpriteEndpoint as spriteEndpoint,
  defaultCacheAge
} from "../../../constants";

export async function getSprite(id, format = "png") {
  const url = `${spriteEndpoint}${id}.png`;
  const imgData = Buffer.from(await fetch(url).then(r => r.arrayBuffer()));

  let data;

  if (format === "webp") {
    data = await sharp(imgData).webp({
      nearLossless: true
    });
  } else {
    data = await sharp(imgData).png({
      quality: 60,
      palette: true
    });
  }

  return data.toBuffer();
}

export default async (req, res) => {
  // TODO: error handling
  const params = req.query;
  // Couldn't use headers to determine support as the CDN cached the response regardless of request headers
  // PNG and WEBP are now kinda different endpoints
  // const supportsWebp = req.headers.accept.indexOf("image/webp") >= 0;
  const [id] = /(\d)+/.exec(params.pkmn_id);
  const format = params.pkmn_id.replace(id, "").replace(".", "");

  const imageData = await getSprite(id, format);

  res.statusCode = 200;

  // 30 Day cache lifetime
  res.setHeader(
    "Cache-Control",
    `public, max-age=${defaultCacheAge}, s-max-age=${defaultCacheAge}, stale-while-revalidate`
  );

  res.setHeader(
    "Content-Type",
    (format === "webp" && "image/webp") || "image/png"
  );

  res.end(imageData);
};
