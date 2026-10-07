#!/usr/bin/env python3
"""Prepare brand assets for the FS Bilpleje & Service website.

Reads the untouched source files in `tmp/raw/` (Unsplash downloads) and the
original logo, then writes optimized WebP files into `public/`.

Run with:
    python3 scripts/prepare-assets.py
"""

from __future__ import annotations

import json
import os
from PIL import Image, ImageDraw

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RAW = os.path.join(ROOT, "tmp", "raw")
LOGO_SRC = os.path.join(ROOT, "src", "assets", "logo", "fs-logo-original.png")
IMAGES_OUT = os.path.join(ROOT, "public", "images")
LOGO_OUT = os.path.join(ROOT, "public", "logo")
PUBLIC = os.path.join(ROOT, "public")

BACKGROUND = (250, 250, 250)


def ensure_dirs() -> None:
    for path in (IMAGES_OUT, LOGO_OUT):
        os.makedirs(path, exist_ok=True)


# --------------------------------------------------------------------------
# Logo
# --------------------------------------------------------------------------


def logo_alpha_mask(img: Image.Image) -> Image.Image:
    """Alpha from how far each pixel sits from the flat light background."""
    rgb = img.convert("RGB")
    mask = Image.new("L", rgb.size)
    src = rgb.load()
    dst = mask.load()
    width, height = rgb.size
    for y in range(height):
        for x in range(width):
            r, g, b = src[x, y]
            darkness = BACKGROUND[0] - min(r, g, b)
            dst[x, y] = 0 if darkness <= 3 else min(255, int(darkness * 255 / 235))
    return mask


def tinted_logo(mask: Image.Image, color: tuple[int, int, int]) -> Image.Image:
    out = Image.new("RGBA", mask.size, color + (0,))
    out.putalpha(mask)
    return out


def trim(img: Image.Image, padding: int = 0) -> Image.Image:
    bbox = img.getbbox()
    if bbox is None:
        return img
    left, top, right, bottom = bbox
    left = max(0, left - padding)
    top = max(0, top - padding)
    right = min(img.width, right + padding)
    bottom = min(img.height, bottom + padding)
    return img.crop((left, top, right, bottom))


def emblem_split(mask: Image.Image) -> int:
    """Return the x offset where the hexagon emblem ends and the wordmark starts."""
    width, height = mask.size
    pixels = mask.load()
    column_ink = []
    for x in range(width):
        total = 0
        for y in range(0, height, 2):
            total += pixels[x, y]
        column_ink.append(total)

    started = False
    run = 0
    for x, ink in enumerate(column_ink):
        if ink > 255 * 2:
            if started and run >= 12:
                return x - run
            started = True
            run = 0
        elif started:
            run += 1
    return width // 3


def prepare_logo() -> dict[str, list[int]]:
    original = Image.open(LOGO_SRC).convert("RGB")
    mask = trim(logo_alpha_mask(original), padding=4)

    split = emblem_split(mask)
    emblem = trim(mask.crop((0, 0, split, mask.height)), padding=6)
    emblem = emblem.resize((emblem.width * 2, emblem.height * 2), Image.LANCZOS)

    sizes: dict[str, list[int]] = {}

    for name, color in (("light", (17, 17, 17)), ("dark", (255, 255, 255))):
        full = tinted_logo(mask, color)
        full.save(os.path.join(LOGO_OUT, f"fs-logo-{name}.png"), optimize=True)
        full.save(os.path.join(LOGO_OUT, f"fs-logo-{name}.webp"), quality=92, method=6)
        sizes[f"logo-{name}"] = [full.width, full.height]

        mark = tinted_logo(emblem, color)
        mark.save(os.path.join(LOGO_OUT, f"fs-emblem-{name}.png"), optimize=True)
        mark.save(os.path.join(LOGO_OUT, f"fs-emblem-{name}.webp"), quality=92, method=6)
        sizes[f"emblem-{name}"] = [mark.width, mark.height]

    # Favicons: emblem on a white rounded plate so it stays readable on any
    # browser chrome, light or dark.
    emblem_black = tinted_logo(emblem, (17, 17, 17))
    for size in (32, 180, 512):
        canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))
        pad = round(size * 0.08)
        inner = size - pad * 2
        scale = min(inner / emblem_black.width, inner / emblem_black.height)
        target = emblem_black.resize(
            (max(1, round(emblem_black.width * scale)), max(1, round(emblem_black.height * scale))),
            Image.LANCZOS,
        )
        plate = Image.new("RGBA", (size, size), (255, 255, 255, 255))
        plate_mask = Image.new("L", (size, size), 0)
        draw = ImageDraw.Draw(plate_mask)
        draw.rounded_rectangle((0, 0, size - 1, size - 1), radius=round(size * 0.22), fill=255)
        plate.putalpha(plate_mask)
        canvas.alpha_composite(plate)
        canvas.alpha_composite(target, ((size - target.width) // 2, (size - target.height) // 2))
        filename = "apple-touch-icon.png" if size == 180 else f"favicon-{size}.png"
        canvas.save(os.path.join(PUBLIC, filename), optimize=True)

    return sizes


# --------------------------------------------------------------------------
# Photographs
# --------------------------------------------------------------------------


def crop_to(img: Image.Image, ratio: float, anchor: float = 0.5) -> Image.Image:
    """Centre-crop to the target width/height ratio, biased by `anchor`."""
    width, height = img.size
    if width / height > ratio:
        new_width = round(height * ratio)
        left = round((width - new_width) * 0.5)
        return img.crop((left, 0, left + new_width, height))
    new_height = round(width / ratio)
    top = round((height - new_height) * anchor)
    return img.crop((0, top, width, top + new_height))


def save_webp(img: Image.Image, name: str, width: int, quality: int = 80) -> list[int]:
    if img.width > width:
        height = round(img.height * width / img.width)
        img = img.resize((width, height), Image.LANCZOS)
    img = img.convert("RGB")
    img.save(os.path.join(IMAGES_OUT, f"{name}.webp"), quality=quality, method=6)
    return [img.width, img.height]


def load(name: str) -> Image.Image:
    return Image.open(os.path.join(RAW, f"{name}.jpg")).convert("RGB")


def prepare_photos() -> dict[str, list[int]]:
    out: dict[str, list[int]] = {}

    hero = load("extra-studio-dark")
    out["hero"] = save_webp(crop_to(hero, 16 / 9, anchor=0.5), "hero", 1920, 80)
    out["hero-mobile"] = save_webp(crop_to(hero, 4 / 5, anchor=0.5), "hero-mobile", 1000, 78)

    og = crop_to(hero, 1200 / 630, anchor=0.5).resize((1200, 630), Image.LANCZOS)
    og.save(os.path.join(PUBLIC, "og-image.jpg"), quality=82, optimize=True)

    services = {
        "service-indvendig": "extra-dashboard-brush",
        "service-udvendig": "extra-foam-bmw",
        "service-polering": "service-polering",
        "service-komplet": "service-komplet",
        "service-tekstil": "service-tekstil",
    }
    for target, source in services.items():
        out[target] = save_webp(crop_to(load(source), 4 / 3, anchor=0.45), target, 1100, 78)

    # Bias the about photo towards the polishing pad so the shot stays about
    # the craft rather than the branding on the detailer's sleeve.
    about = load("om-os")
    about = about.crop((0, 150, 1650, 2212))
    out["om-os"] = save_webp(crop_to(about, 4 / 5, anchor=0.5), "om-os", 1100, 80)

    # Gallery keeps each photo's natural framing so the editorial rhythm holds.
    gallery = {
        "galleri-interior-clean": "galleri-interior-clean",
        "galleri-steam": "extra-steam",
        "galleri-wax": "galleri-wax",
        "galleri-reflection": "galleri-reflection",
        "galleri-wheel": "extra-glove",
        "galleri-studio-blue": "galleri-studio-blue",
        "galleri-foam-suv": "extra-suv-soap",
        "galleri-black-foam": "extra-black-foam",
        "galleri-handwash": "galleri-handwash",
        "galleri-garage-light": "galleri-garage-light",
        "galleri-interior-leather": "extra-interior2",
        "galleri-foam-car": "extra-foam-car",
    }
    for target, source in gallery.items():
        out[target] = save_webp(load(source), target, 1400, 78)

    # Klargøringskortet viser en nyvasket bil med vandperler på lakken.
    klargoering = load("galleri-reflection")
    out["service-klargoering"] = save_webp(
        crop_to(klargoering, 4 / 3, anchor=0.5), "service-klargoering", 1100, 80
    )

    # Beskær væk fra tøjtrykket med et produktbrand, så billedet kun viser
    # selve arbejdet på lakken.
    polering = load("galleri-polish-green").crop((560, 0, 2400, 1351))
    out["galleri-polering"] = save_webp(polering, "galleri-polering", 1400, 78)

    return out


def main() -> None:
    ensure_dirs()
    manifest = {"logo": prepare_logo(), "images": prepare_photos()}
    with open(os.path.join(ROOT, "tmp", "asset-manifest.json"), "w") as handle:
        json.dump(manifest, handle, indent=2)
    print(json.dumps(manifest, indent=2))


if __name__ == "__main__":
    main()
