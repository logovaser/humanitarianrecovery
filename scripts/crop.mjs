import sharp from "sharp";
import path from "path";
import fs from "fs";

const dir = "C:\\Users\\Artem\\.cursor\\projects\\d-W-test-humanitarianrecovery\\assets";
const map = JSON.parse(fs.readFileSync("scripts/slide-map.json", "utf8"));
const out = "public/images";
fs.mkdirSync(out, { recursive: true });

// crop in 1024x576 reference coords
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

await crop("s2", "about.png", 518, 170, 482, 322);
await crop("s4", "areas.png", 28, 74, 308, 440);
await crop("s5", "mva.png", 27, 90, 338, 426);
await crop("s9", "ops.png", 52, 148, 226, 288);
await crop("s1", "hero-left.png", 0, 0, 340, 576);
await crop("s1", "hero-right.png", 700, 0, 324, 576);
await crop("s6", "geo.png", 370, 110, 654, 400);
await crop("s12", "logo-crop.png", 40, 222, 360, 258);
