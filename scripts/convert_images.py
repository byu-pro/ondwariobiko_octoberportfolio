from pathlib import Path

from PIL import Image, ImageOps


IMAGE_ROOT = Path("images")
SOURCE_FORMATS = {".jpg", ".jpeg", ".png"}
MAX_WIDTH = 1920
MOBILE_WIDTH = 960


def save_webp(image: Image.Image, destination: Path, icc_profile: bytes | None) -> None:
    image.save(destination, "WEBP", quality=91, method=6, alpha_quality=100, exact=True, icc_profile=icc_profile)


def convert_image(source: Path) -> None:
    destination = source.with_suffix(".webp")
    mobile_destination = source.with_name(f"{source.stem}-{MOBILE_WIDTH}.webp")
    needs_update = not destination.exists() or destination.stat().st_mtime < source.stat().st_mtime
    needs_mobile = (
        not mobile_destination.exists() or mobile_destination.stat().st_mtime < source.stat().st_mtime
    )
    with Image.open(source) as opened:
        icc_profile = opened.info.get("icc_profile")
        if not needs_update and not (opened.width > MOBILE_WIDTH and needs_mobile):
            return
        has_alpha = "A" in opened.getbands() or "transparency" in opened.info
        image = ImageOps.exif_transpose(opened).convert("RGBA" if has_alpha else "RGB")
        if image.width > MAX_WIDTH:
            height = round(image.height * MAX_WIDTH / image.width)
            image = image.resize((MAX_WIDTH, height), Image.Resampling.LANCZOS)
        save_webp(image, destination, icc_profile)

        if image.width > MOBILE_WIDTH and needs_mobile:
            mobile = image.copy()
            height = round(mobile.height * MOBILE_WIDTH / mobile.width)
            mobile = mobile.resize((MOBILE_WIDTH, height), Image.Resampling.LANCZOS)
            save_webp(mobile, mobile_destination, icc_profile)


def main() -> None:
    if not IMAGE_ROOT.exists():
        return

    sources = [path for path in IMAGE_ROOT.rglob("*") if path.is_file() and path.suffix.lower() in SOURCE_FORMATS]
    for source in sources:
        convert_image(source)
    print(f"Converted {len(sources)} source images to optimized WebP variants.")


if __name__ == "__main__":
    main()
