from pathlib import Path

from PIL import Image, ImageOps


IMAGE_ROOT = Path("images")
SOURCE_FORMATS = {".jpg", ".jpeg", ".png"}


def is_line_art(stem: str) -> bool:
    s = stem.lower()
    return "blackandwhite" in s


def is_sketch_or_bw(stem: str) -> bool:
    s = stem.lower()
    return "sketch" in s or "blackandwhite" in s


def save_webp(image: Image.Image, destination: Path, icc_profile: bytes | None, stem: str = "") -> None:
    if is_line_art(stem):
        image.save(destination, "WEBP", lossless=True, quality=100, method=6, exact=True, icc_profile=icc_profile)
    elif is_sketch_or_bw(stem):
        image.save(destination, "WEBP", quality=98, method=6, alpha_quality=100, exact=True, icc_profile=icc_profile)
    else:
        image.save(destination, "WEBP", quality=91, method=6, alpha_quality=100, exact=True, icc_profile=icc_profile)


def convert_image(source: Path) -> None:
    stem = source.stem
    destination = source.with_suffix(".webp")
    max_w = 2880 if is_sketch_or_bw(stem) else 1920
    mobile_w = 1440 if is_sketch_or_bw(stem) else 960
    mobile_destination = source.with_name(f"{source.stem}-960.webp")

    needs_update = not destination.exists() or destination.stat().st_mtime < source.stat().st_mtime
    needs_mobile = (
        not mobile_destination.exists() or mobile_destination.stat().st_mtime < source.stat().st_mtime
    )
    with Image.open(source) as opened:
        icc_profile = opened.info.get("icc_profile")
        if not needs_update and not (opened.width > mobile_w and needs_mobile):
            return
        has_alpha = "A" in opened.getbands() or "transparency" in opened.info
        image = ImageOps.exif_transpose(opened).convert("RGBA" if has_alpha else "RGB")
        if image.width > max_w:
            height = round(image.height * max_w / image.width)
            image = image.resize((max_w, height), Image.Resampling.LANCZOS)
        save_webp(image, destination, icc_profile, stem)

        if image.width > mobile_w and needs_mobile:
            mobile = image.copy()
            height = round(mobile.height * mobile_w / mobile.width)
            mobile = mobile.resize((mobile_w, height), Image.Resampling.LANCZOS)
            save_webp(mobile, mobile_destination, icc_profile, stem)


def main() -> None:
    if not IMAGE_ROOT.exists():
        return

    sources = [path for path in IMAGE_ROOT.rglob("*") if path.is_file() and path.suffix.lower() in SOURCE_FORMATS]
    for source in sources:
        convert_image(source)
    print(f"Converted {len(sources)} source images to optimized WebP variants.")


if __name__ == "__main__":
    main()
