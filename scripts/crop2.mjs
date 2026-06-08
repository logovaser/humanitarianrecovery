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

// re-crop photos to exclude CSS-recreated banners
await crop("s4", "areas.png", 30, 152, 300, 360);
await crop("s5", "mva.png", 30, 150, 335, 362);
await crop("s6", "geo.png", 445, 150, 560, 365);

// full hero composition (field + logo + tagline) — used as aspect-ratio bg
fs.copyFileSync(path.join(dir, map.s1), path.join(out, "hero.png"));
console.log("copied hero.png");

// ---- logo extraction (white-on-green -> transparent) ----
async function makeLogo() {
  const src = path.join(out, "logo-crop.png");
  const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const white = Buffer.alloc(width * height * 4);
  const green = Buffer.alloc(width * height * 4);
  // brand green for light-bg logo variant
  const G = [46, 125, 79];
  for (let p = 0; p < width * height; p++) {
    const i = p * channels;
    const r = data[i],
      g = data[i + 1],
      b = data[i + 2];
    const bright = (r + g + b) / 3;
    // white logo pixels are near-white; green background is darker
    const a = bright > 165 ? 255 : bright < 120 ? 0 : Math.round(((bright - 120) / 45) * 255);
    const o = p * 4;
    white[o] = 255;
    white[o + 1] = 255;
    white[o + 2] = 255;
    white[o + 3] = a;
    green[o] = G[0];
    green[o + 1] = G[1];
    green[o + 2] = G[2];
    green[o + 3] = a;
  }
  await sharp(white, { raw: { width, height, channels: 4 } })
    .png()
    .trim()
    .toFile(path.join(out, "logo-white.png"));
  await sharp(green, { raw: { width, height, channels: 4 } })
    .png()
    .trim()
    .toFile(path.join(out, "logo-green.png"));
  console.log("wrote logo-white.png + logo-green.png");
}
await makeLogo();
