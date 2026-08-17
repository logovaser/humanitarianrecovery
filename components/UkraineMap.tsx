"use client";

import { useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import {
  CRIMEA_OUTLINE_D,
  UKRAINE_VIEWBOX,
  ukraineRegions,
  type RegionId,
} from "@/lib/map/ukraine-regions";

type UkraineMapProps = {
  onSelect: (region: RegionId) => void;
  className?: string;
};

export function UkraineMap({ onSelect, className }: UkraineMapProps) {
  const { t } = useLanguage();
  const [active, setActive] = useState<RegionId | null>(null);

  const clear = (region: RegionId) => setActive((current) => (current === region ? null : current));

  const activeRegion = ukraineRegions.find((region) => region.id === active);

  return (
    <svg
      viewBox={`0 0 ${UKRAINE_VIEWBOX.width} ${UKRAINE_VIEWBOX.height}`}
      preserveAspectRatio="xMidYMid meet"
      role="group"
      aria-label={t.geography.mapLabel}
      className={className}
    >
      {ukraineRegions.map((region) => (
        <path
          key={region.id}
          d={region.d}
          role="button"
          tabIndex={0}
          className="map-region"
          onPointerEnter={() => setActive(region.id)}
          onPointerLeave={() => clear(region.id)}
          onFocus={() => setActive(region.id)}
          onBlur={() => clear(region.id)}
          onClick={() => onSelect(region.id)}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              onSelect(region.id);
            }
          }}
        >
          <title>{t.geography.regions[region.id]}</title>
        </path>
      ))}

      {activeRegion ? (
        <path
          key={`${activeRegion.id}-overlay`}
          d={activeRegion.d}
          className="map-region-overlay"
          aria-hidden
        />
      ) : null}

      <path d={CRIMEA_OUTLINE_D} className="map-outline" aria-hidden />
    </svg>
  );
}
