import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { en } from "@/lib/i18n/en";

// Crawlers send no language cookie, so the preview is always English.
export const alt = en.meta.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

function dataUrl(file: Buffer, type: string) {
  return `data:${type};base64,${file.toString("base64")}`;
}

export default async function OpengraphImage() {
  // Literal paths: a computed path makes the build trace the whole project.
  const [backgroundFile, logoFile] = await Promise.all([
    readFile(join(process.cwd(), "images/hero-bg.jpg")),
    readFile(join(process.cwd(), "public/images/logo-white.png")),
  ]);
  const background = dataUrl(backgroundFile, "image/jpeg");
  const logo = dataUrl(logoFile, "image/png");

  return new ImageResponse(
    <div style={{ display: "flex", width: "100%", height: "100%", position: "relative" }}>
      <img
        src={background}
        alt=""
        width={1200}
        height={630}
        style={{ position: "absolute", top: 0, left: 0, objectFit: "cover" }}
      />
      <div
        style={{
          // next/og does not support the inset shorthand.
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 40,
          background: "rgba(31, 97, 61, 0.72)",
          color: "white",
        }}
      >
        <img src={logo} alt="" width={322} height={234} />
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ fontSize: 60 }}>{en.hero.line1}</div>
          <div style={{ fontSize: 60 }}>{en.hero.line2}</div>
        </div>
      </div>
    </div>,
    size,
  );
}
