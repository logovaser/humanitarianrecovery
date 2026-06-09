import sharp from "sharp";
import fs from "fs";
import path from "path";

const dir = "C:\\Users\\Artem\\.cursor\\projects\\d-W-test-humanitarianrecovery\\assets";
const files = fs.readdirSync(dir).filter((f) => f.endsWith(".png"));

const map = {
  s1: files.find((f) => f.includes("deck.pptx-")),
  s2: files.find((f) => f.includes("pptx__2_")),
  s3: files.find((f) => f.includes("pptx__3_")),
  s4: files.find((f) => f.includes("pptx__4_")),
  s5: files.find((f) => f.includes("pptx__5_")),
  s6: files.find((f) => f.includes("pptx__6_")),
  s7: files.find((f) => f.includes("pptx__7_")),
  s8: files.find((f) => f.includes("pptx__8_")),
  s9: files.find((f) => f.includes("pptx__9_")),
  s10: files.find((f) => f.includes("pptx__10_")),
  s11: files.find((f) => f.includes("pptx__11_")),
  s12: files.find((f) => f.includes("pptx__12_")),
};

fs.writeFileSync("scripts/slide-map.json", JSON.stringify(map, null, 2));

async function meta() {
  for (const [k, f] of Object.entries(map)) {
    const m = await sharp(path.join(dir, f)).metadata();
    console.log(k, m.width + "x" + m.height, f);
  }
}

async function sample(slide, points) {
  const f = path.join(dir, map[slide]);
  const { data, info } = await sharp(f).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const w = info.width;
  const ch = info.channels;
  const out = [];
  for (const [name, x, y] of points) {
    const i = (y * w + x) * ch;
    const hex =
      "#" +
      [data[i], data[i + 1], data[i + 2]].map((v) => v.toString(16).padStart(2, "0")).join("");
    out.push(`${name}=(${x},${y}) ${hex}`);
  }
  console.log(slide, out.join("  |  "));
}

await meta();
// sample using 1024x576 reference; will scale to actual size
const W = 1024,
  H = 576;
async function sampleScaled(slide, points) {
  const f = path.join(dir, map[slide]);
  const m = await sharp(f).metadata();
  const sx = m.width / W,
    sy = m.height / H;
  await sample(
    slide,
    points.map(([n, x, y]) => [n, Math.round(x * sx), Math.round(y * sy)]),
  );
}

await sampleScaled("s3", [
  ["mission-green", 256, 90],
  ["vision-green", 768, 90],
  ["vision-bg", 768, 480],
  ["mission-bg", 256, 480],
  ["icon-circle", 256, 222],
  ["body-text", 150, 335],
]);
await sampleScaled("s2", [
  ["banner-green", 200, 55],
  ["focus-pill", 150, 196],
  ["page-bg", 400, 130],
  ["pill-white", 300, 267],
]);
await sampleScaled("s6", [
  ["geo-green", 30, 300],
  ["map-dark", 600, 300],
]);
await sampleScaled("s12", [
  ["contacts-left", 100, 100],
  ["contacts-right", 700, 100],
]);
await sampleScaled("s4", [
  ["areas-banner", 150, 160],
  ["pill-active", 470, 119],
]);
await sampleScaled("s7", [
  ["tab-active", 280, 60],
  ["tab-inactive", 495, 60],
  ["header-green", 700, 30],
  ["sidebar-bg", 160, 300],
  ["name-text", 160, 470],
]);
