import re

SRC = "images/ukraine-map-dark.svg"
OUT = "lib/map/ukraine-regions.ts"

# path index -> region id, established by rendering each path in isolation.
NAMES = {
    0: "crimea", 2: "chernihiv", 3: "volyn", 4: "rivne", 5: "zhytomyr",
    6: "kyivOblast", 7: "zakarpattia", 8: "chernivtsi", 9: "ivanoFrankivsk",
    10: "odesa", 11: "vinnytsia", 12: "lviv", 13: "sumy", 14: "kharkiv",
    15: "luhansk", 16: "donetsk", 17: "kherson", 18: "zaporizhzhia",
    19: "mykolaiv", 20: "poltava", 21: "khmelnytskyi", 22: "ternopil",
    23: "dnipropetrovsk", 24: "cherkasy", 25: "kirovohrad", 26: "kyivCity",
}
DECORATIVE = 1  # self-cancelling duplicate of the Crimea coastline, renders as stroke only

svg = open(SRC, encoding="utf-8").read()
body = svg.split("</defs>", 1)[1]
paths = re.findall(r'<path\b[^>]*\sd="([^"]*)"[^>]*/>', body)
assert len(paths) == 27, len(paths)

NUM = re.compile(r"-?\d+(?:\.\d+)?")


def normalize(d: str) -> str:
    """Fold the group's translate(-469 -147) into the coordinates and round to
    integers. At the sizes this map renders, one user unit is under one CSS pixel."""
    i = 0

    def repl(m):
        nonlocal i
        v = float(m.group(0)) - (469 if i % 2 == 0 else 147)
        i += 1
        return str(int(round(v)))

    return NUM.sub(repl, d)


def bbox(d: str):
    v = [int(x) for x in NUM.findall(d)]
    xs, ys = v[0::2], v[1::2]
    n = min(len(xs), len(ys))
    return min(xs[:n]), min(ys[:n]), max(xs[:n]), max(ys[:n])


entries, decorative = [], ""
for i, raw in enumerate(paths):
    d = normalize(raw)
    if i == DECORATIVE:
        decorative = d
        continue
    x0, y0, x1, y1 = bbox(d)
    entries.append((NAMES[i], d, x0, y0, x1, y1))

lines = [
    "// Generated from images/ukraine-map-dark.svg. Do not edit by hand.",
    "// Regenerate with: python3 scripts/generate-ukraine-regions.py",
    "// Coordinates are folded out of the source group transform and rounded to",
    "// integers, which cuts the inlined payload from 133 kB to 29 kB gzipped.",
    "",
    "export const UKRAINE_VIEWBOX = { width: 738, height: 495 } as const;",
    "",
    "export type RegionId = (typeof ukraineRegions)[number][\"id\"];",
    "",
    "/** Ordered as in the source file so Kyiv City still paints over Kyiv Oblast. */",
    "export const ukraineRegions = [",
]
for rid, d, x0, y0, x1, y1 in entries:
    lines.append("  {")
    lines.append(f'    id: "{rid}",')
    lines.append(f"    bbox: {{ x: {x0}, y: {y0}, width: {x1 - x0}, height: {y1 - y0} }},")
    lines.append(f'    d: "{d}",')
    lines.append("  },")
lines += [
    "] as const;",
    "",
    "/** Crimea's coastline drawn twice with fill-rule=evenodd, so it strokes but never",
    " *  fills. Purely decorative: it is not a selectable region. */",
    f'export const CRIMEA_OUTLINE_D = "{decorative}";',
    "",
]
open(OUT, "w", encoding="utf-8").write("\n".join(lines))
print(f"wrote {OUT}: {len(entries)} regions, {len('\n'.join(lines))} bytes")
