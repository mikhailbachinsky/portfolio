import os
import shutil

def update_stickers_and_presentation():
    # Source mascot files
    sources = [
        'public/assets/mascot-emotion-1.png',
        'public/assets/mascot-emotion-2.png',
        'public/assets/mascot-emotion-3.png',
        'public/assets/mascot-emotion-4.png',
        'public/assets/mascot-emotion-5.png',
        'public/assets/mascot-emotion-6.png',
        'public/assets/mascot-emotion-7.png',
        'public/assets/mascot-main.png',
    ]

    target_dirs = [
        '.',
        'public',
        'public/assets'
    ]

    # Copy mascot emotions directly to digital-sticker-1.png .. digital-sticker-8.png
    for idx, src_path in enumerate(sources, start=1):
        target_filename = f"digital-sticker-{idx}.png"
        for d in target_dirs:
            dst_path = os.path.join(d, target_filename)
            shutil.copyfile(src_path, dst_path)
            print(f"Copied {src_path} -> {dst_path}")

            # Remove any lingering svg
            svg_path = os.path.join(d, f"digital-sticker-{idx}.svg")
            if os.path.exists(svg_path):
                os.remove(svg_path)
                print(f"Removed placeholder SVG {svg_path}")

    # Remove presentation SVG if exists to force PNG
    for d in target_dirs:
        pres_svg = os.path.join(d, "digital-presentation.svg")
        if os.path.exists(pres_svg):
            os.remove(pres_svg)
            print(f"Removed presentation SVG {pres_svg}")

if __name__ == '__main__':
    update_stickers_and_presentation()
