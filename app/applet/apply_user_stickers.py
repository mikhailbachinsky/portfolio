import os
import shutil

def apply_user_stickers():
    dirs = ['.', 'public', 'public/assets']
    for d in dirs:
        os.makedirs(d, exist_ok=True)

    print("Copying user uploaded stickers (digital-sticker-X-1.png) to digital-sticker-X.png...")

    for i in range(1, 9):
        src_file = f"digital-sticker-{i}-1.png"
        if not os.path.exists(src_file):
            print(f"Warning: {src_file} not found in root!")
            continue

        for d in dirs:
            dst_file = os.path.join(d, f"digital-sticker-{i}.png")
            shutil.copyfile(src_file, dst_file)
            print(f"Copied {src_file} -> {dst_file}")

            # Remove any legacy svg if exists
            svg_file = os.path.join(d, f"digital-sticker-{i}.svg")
            if os.path.exists(svg_file):
                os.remove(svg_file)

    # Clean up the temporary -1.png files from root if required
    for i in range(1, 9):
        src_file = f"digital-sticker-{i}-1.png"
        if os.path.exists(src_file):
            os.remove(src_file)
            print(f"Removed temporary upload file {src_file}")

if __name__ == '__main__':
    apply_user_stickers()
