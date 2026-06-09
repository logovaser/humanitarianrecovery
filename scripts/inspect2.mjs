import sharp from "sharp";
import path from "path";
import fs from "fs";

const dir = "C:\\Users\\Artem\\.cursor\\projects\\d-W-test-humanitarianrecovery\\assets";
const map = JSON.parse(fs.readFileSync("scripts/slide-map.json", "utf8"));
const W = 1024,
  H = 576;

async function sampleScaled(slide, points) {
  const f = path.join(dir, map[slide]);
  const m = await sharp(f).metadata();
  const sx = m.width / W,
    sy = m.height / H;
  const { data, info } = await sharp(f).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const w = info.width,
    ch = info.channels;
  const out = [];
  for (const [name, x0, y0] of points) {
    const x = Math.round(x0 * sx),
      y = Math.round(y0 * sy);
    const i = (y * w + x) * ch;
    const hex =
      "#" +
      [data[i], data[i + 1], data[i + 2]].map((v) => v.toString(16).padStart(2, "0")).join("");
    out.push(`${name}=${hex}`);
  }
  console.log(slide, out.join("  "));
}

await sampleScaled("s3", [
  ["mission-band", 120, 50],
  ["mission-band2", 400, 250],
  ["vision-band", 900, 50],
  ["vision-band2", 650, 250],
  ["icon-circle", 256, 230],
  ["vision-icon", 768, 215],
]);
await sampleScaled("s2", [
  ["eore-pill", 70, 267],
  ["focus-banner", 70, 196],
  ["bg", 450, 500],
]);
await sampleScaled("s12", [
  ["left-dark", 80, 400],
  ["right", 700, 300],
]);
await sampleScaled("s4", [
  ["banner", 150, 230],
  ["active-pill-edge", 690, 119],
]);
await sampleScaled("s7", [
  ["tab-inactive-pill", 600, 60],
  ["header", 900, 30],
  ["placeholder-top", 160, 220],
  ["placeholder-bot", 160, 380],
]);
await sampleScaled("s11", [
  ["partners-bg", 500, 50],
  ["card", 130, 130],
]);
