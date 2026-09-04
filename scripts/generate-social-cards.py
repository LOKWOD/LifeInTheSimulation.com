#!/usr/bin/env python3
"""Generate deterministic, branded share cards for every indexable HTML page."""

from __future__ import annotations

import html as html_module
import re
import sys
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(sys.argv[1] if len(sys.argv) > 1 else ".").resolve()
OUT = ROOT / "assets" / "social"
OUT.mkdir(parents=True, exist_ok=True)

FONT_BOLD = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
FONT_REGULAR = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
if not Path(FONT_BOLD).exists():
    FONT_BOLD = FONT_REGULAR = "/usr/share/fonts/truetype/liberation2/LiberationSans-Regular.ttf"


def clean_markup(value: str) -> str:
    return re.sub(r"\s+", " ", html_module.unescape(re.sub(r"<[^>]+>", " ", value))).strip()


def page_info(file: Path) -> tuple[str, str, str]:
    rel = file.relative_to(ROOT).as_posix()
    source = file.read_text(encoding="utf-8")
    h1 = re.search(r"<h1\b[^>]*>(.*?)</h1>", source, re.I | re.S)
    title = clean_markup(h1.group(1)) if h1 else "Life in the Simulation"
    category_match = re.search(r"<(?:p|b|span)\b[^>]*class=[\"'][^\"']*(?:eyebrow|tag)[^\"']*[\"'][^>]*>(.*?)</(?:p|b|span)>", source, re.I | re.S)
    category = clean_markup(category_match.group(1)).split("•")[0].strip() if category_match else "FIELD NOTES"
    stem = "home" if rel == "index.html" else rel.removesuffix(".html").replace("/", "-")
    return stem, title, category.upper()[:42]


def fit_title(draw: ImageDraw.ImageDraw, text: str, width: int, height: int) -> tuple[ImageFont.FreeTypeFont, list[str]]:
    for size in range(min(76, height // 7), 33, -2):
        font = ImageFont.truetype(FONT_BOLD, size)
        words = text.split()
        lines: list[str] = []
        current = ""
        for word in words:
            trial = f"{current} {word}".strip()
            if draw.textbbox((0, 0), trial, font=font)[2] <= width:
                current = trial
            else:
                if current:
                    lines.append(current)
                current = word
        if current:
            lines.append(current)
        line_height = int(size * 1.14)
        if len(lines) <= 5 and len(lines) * line_height <= height:
            return font, lines
    font = ImageFont.truetype(FONT_BOLD, 34)
    return font, [text]


def card(title: str, category: str, size: tuple[int, int]) -> Image.Image:
    width, height = size
    # Build the smooth background on a small canvas, then upscale. This keeps
    # CI generation fast while producing the same deterministic result.
    base = Image.new("RGB", (120, 120), (8, 10, 15))
    pixels = base.load()
    for y in range(120):
        for x in range(120):
            glow_a = max(0.0, 1.0 - (((x - 103) ** 2 + (y - 7) ** 2) ** .5) / 98)
            glow_b = max(0.0, 1.0 - (((x - 6) ** 2 + (y - 106) ** 2) ** .5) / 84)
            pixels[x, y] = (8 + int(10 * glow_a), 10 + int(8 * glow_b), 15 + int(20 * glow_a + 10 * glow_b))
    image = base.resize(size, Image.Resampling.BICUBIC)

    draw = ImageDraw.Draw(image, "RGBA")
    step = max(44, width // 24)
    for x in range(0, width, step):
        draw.line((x, 0, x, height), fill=(138, 244, 203, 10), width=1)
    for y in range(0, height, step):
        draw.line((0, y, width, y), fill=(138, 244, 203, 10), width=1)
    draw.ellipse((width * .66, -height * .23, width * 1.1, height * .55), outline=(169, 151, 255, 38), width=max(2, width // 400))
    draw.ellipse((-width * .18, height * .61, width * .28, height * 1.25), outline=(138, 244, 203, 28), width=max(2, width // 500))

    margin_x = int(width * .075)
    top = int(height * .09)
    badge_font = ImageFont.truetype(FONT_BOLD, max(16, width // 55))
    small_font = ImageFont.truetype(FONT_REGULAR, max(15, width // 62))
    brand_font = ImageFont.truetype(FONT_BOLD, max(18, width // 50))
    draw.rounded_rectangle((margin_x, top, margin_x + int(width * .085), top + int(height * .075)), radius=10, outline=(138, 244, 203, 115), fill=(14, 19, 28, 210), width=2)
    draw.text((margin_x + int(width * .012), top + int(height * .018)), "L//S", font=badge_font, fill=(138, 244, 203, 255))
    draw.text((margin_x + int(width * .108), top + int(height * .018)), "LIFE IN THE SIMULATION", font=brand_font, fill=(242, 245, 247, 245))

    category_y = int(height * .255)
    draw.text((margin_x, category_y), category, font=small_font, fill=(138, 244, 203, 255))
    draw.line((margin_x, category_y + int(height * .065), margin_x + int(width * .09), category_y + int(height * .065)), fill=(138, 244, 203, 180), width=3)

    title_top = category_y + int(height * .105)
    max_title_height = int(height * .48)
    font, lines = fit_title(draw, title, int(width * .82), max_title_height)
    line_height = int(font.size * 1.14)
    for index, line in enumerate(lines):
        draw.text((margin_x, title_top + index * line_height), line, font=font, fill=(242, 245, 247, 255), stroke_width=0)

    baseline = height - int(height * .105)
    draw.line((margin_x, baseline - 22, width - margin_x, baseline - 22), fill=(51, 64, 82, 180), width=1)
    draw.text((margin_x, baseline), "QUESTION THE DEFAULTS  •  TEST THE MODEL", font=small_font, fill=(148, 160, 175, 255), anchor="ls")
    draw.text((width - margin_x, baseline), "LIFEINTHESIMULATION.COM", font=small_font, fill=(169, 151, 255, 255), anchor="rs")
    return image


def save_webp(image: Image.Image, destination: Path) -> None:
    image.save(destination, "WEBP", quality=84, method=6)


html_files = sorted(file for file in ROOT.rglob("*.html") if file.name != "404.html" and "_site" not in file.parts)
for file in html_files:
    stem, title, category = page_info(file)
    save_webp(card(title, category, (1200, 630)), OUT / f"{stem}-social.webp")
    rel = file.relative_to(ROOT).as_posix()
    if rel.startswith(("essays/", "guides/")):
        save_webp(card(title, category, (1200, 675)), OUT / f"{stem}-16x9.webp")
        save_webp(card(title, category, (1200, 900)), OUT / f"{stem}-4x3.webp")
        save_webp(card(title, category, (1200, 1200)), OUT / f"{stem}-1x1.webp")

logo = Image.new("RGB", (512, 512), (8, 10, 15))
logo_draw = ImageDraw.Draw(logo, "RGBA")
logo_draw.rounded_rectangle((42, 42, 470, 470), radius=92, outline=(138, 244, 203, 180), fill=(14, 19, 28, 255), width=7)
logo_draw.line((104, 385, 408, 127), fill=(169, 151, 255, 90), width=9)
logo_draw.text((256, 256), "L//S", font=ImageFont.truetype(FONT_BOLD, 116), fill=(138, 244, 203, 255), anchor="mm")
logo.save(ROOT / "assets" / "publisher-logo.png", "PNG", optimize=True)

print(f"Generated social imagery for {len(html_files)} pages in {OUT}")
