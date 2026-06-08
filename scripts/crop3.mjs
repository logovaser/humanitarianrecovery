import sharp from "sharp";
import path from "path";
import fs from "fs";

const dir = "C:\\Users\\Artem\\.cursor\\projects\\d-W-test-humanitarianrecovery\\assets";
const map = JSON.parse(fs.readFileSync("scripts/slide-map.json", "utf8"));
const out = "public/images";

async function crop(slide, name, x, y, w, h) {
  const f = path.join(dir, map[slide]);
  const m = await sharp(f).metadata();
  const sx = m.width / 1024,
    sy = m.height / 576;
  await sharp(f)
    .extract({
      left: Math.round(x * sx),
      top: Math.round(y * sy),
      width: Math.round(w * sx),
      height: Math.round(h * sy),
    })
    .png()
    .toFile(path.join(out, name));
  console.log("wrote", name);
}

await crop("s6", "geo.png", 514, 152, 510, 366);
