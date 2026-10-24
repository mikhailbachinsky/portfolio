import os
import subprocess

def process_stickers():
    # Directories to update
    dirs = ['.', 'public', 'public/assets']
    for d in dirs:
        os.makedirs(d, exist_ok=True)

    print("Processing stickers 1-7 with transparent background and optimal padding...")

    for i in range(1, 8):
        src = f"public/assets/mascot-emotion-{i}.png"
        
        # Step 1: Remove white background, trim transparent space
        trimmed = f"tmp_trimmed_{i}.png"
        cmd1 = f"convert '{src}' -fuzz 12% -transparent white -trim +repage '{trimmed}'"
        subprocess.run(cmd1, shell=True, check=True)
        
        # Step 2: Resize onto 512x512 canvas with ~92% fill factor
        for d in dirs:
            dst = os.path.join(d, f"digital-sticker-{i}.png")
            cmd2 = f"convert '{trimmed}' -resize 465x465 -background none -gravity center -extent 512x512 '{dst}'"
            subprocess.run(cmd2, shell=True, check=True)
            print(f"Created clean transparent sticker {dst}")
            
        if os.path.exists(trimmed):
            os.remove(trimmed)

    # For sticker 8: Generate a matching SVG squirrel sticker (celebrating/coffee pose) and render to 512x512 transparent PNG
    print("Generating matching mascot sticker 8...")
    svg_8 = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000000" flood-opacity="0.12"/>
    </filter>
  </defs>

  <!-- Mascot 8: Squirrel in green hoodie celebrating with stars and coffee cup -->
  <g filter="url(#shadow)">
    <!-- Bushy Tail -->
    <path d="M 330 220 C 440 200 470 320 420 400 C 380 460 290 440 310 380 C 330 330 380 340 370 280 C 360 240 310 260 300 280 Z" fill="#E8833A" stroke="#1F1F1F" stroke-width="8" stroke-linejoin="round"/>
    <path d="M 360 250 C 420 240 430 340 380 380" fill="none" stroke="#D16D2A" stroke-width="6" stroke-linecap="round"/>

    <!-- Hoodie Body -->
    <path d="M 170 340 C 150 450 350 450 330 340 Z" fill="#58C148" stroke="#1F1F1F" stroke-width="8" stroke-linejoin="round"/>
    <!-- Hood Collar & Drawstrings -->
    <path d="M 190 320 C 220 350 280 350 310 320 C 300 370 200 370 190 320 Z" fill="#46A038" stroke="#1F1F1F" stroke-width="6"/>
    <path d="M 235 345 L 230 390 M 265 345 L 270 390" fill="none" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round"/>

    <!-- Paws holding coffee mug -->
    <rect x="220" y="360" width="60" height="70" rx="10" fill="#FFFFFF" stroke="#1F1F1F" stroke-width="6"/>
    <path d="M 280 375 C 300 375 300 415 280 415" fill="none" stroke="#1F1F1F" stroke-width="6"/>
    <!-- Heart on mug -->
    <path d="M 250 388 C 245 380 235 385 250 398 C 265 385 255 380 250 388 Z" fill="#FF5E62"/>
    <!-- Paws -->
    <ellipse cx="210" cy="390" rx="18" ry="14" fill="#E8833A" stroke="#1F1F1F" stroke-width="6"/>
    <ellipse cx="290" cy="390" rx="18" ry="14" fill="#E8833A" stroke="#1F1F1F" stroke-width="6"/>

    <!-- Ears -->
    <path d="M 160 180 L 120 70 L 220 120 Z" fill="#E8833A" stroke="#1F1F1F" stroke-width="8" stroke-linejoin="round"/>
    <path d="M 165 160 L 140 90 L 200 125 Z" fill="#FFC2A6"/>

    <path d="M 340 180 L 380 70 L 280 120 Z" fill="#E8833A" stroke="#1F1F1F" stroke-width="8" stroke-linejoin="round"/>
    <path d="M 335 160 L 360 90 L 300 125 Z" fill="#FFC2A6"/>

    <!-- Hood Outline -->
    <path d="M 145 220 C 130 110 370 110 355 220 C 365 310 135 310 145 220 Z" fill="#58C148" stroke="#1F1F1F" stroke-width="8" stroke-linejoin="round"/>

    <!-- Head Face -->
    <ellipse cx="250" cy="220" rx="90" ry="75" fill="#E8833A" stroke="#1F1F1F" stroke-width="8"/>
    <!-- Muzzle / Cheeks -->
    <path d="M 170 230 C 170 280 210 290 250 290 C 290 290 330 280 330 230 C 330 190 170 190 170 230 Z" fill="#FFF0E6" stroke="#1F1F1F" stroke-width="6"/>

    <!-- Blushing cheeks -->
    <ellipse cx="190" cy="245" rx="16" ry="10" fill="#FF9E9E" opacity="0.8"/>
    <ellipse cx="310" cy="245" rx="16" ry="10" fill="#FF9E9E" opacity="0.8"/>

    <!-- Eyes: Happy Winking / Sparkle Eyes -->
    <circle cx="205" cy="210" r="14" fill="#1F1F1F"/>
    <circle cx="201" cy="206" r="5" fill="#FFFFFF"/>
    
    <!-- Big Joyful Smile Arc Eye -->
    <path d="M 280 215 C 290 195 310 195 320 215" fill="none" stroke="#1F1F1F" stroke-width="7" stroke-linecap="round"/>

    <!-- Cute Nose and Mouth -->
    <polygon points="250,235 242,225 258,225" fill="#1F1F1F"/>
    <path d="M 250 235 L 250 245 C 240 260 225 250 220 245 M 250 245 C 260 260 275 250 280 245" fill="none" stroke="#1F1F1F" stroke-width="6" stroke-linecap="round"/>

    <!-- Sparkles -->
    <path d="M 110 140 L 115 155 L 130 160 L 115 165 L 110 180 L 105 165 L 90 160 L 105 155 Z" fill="#FFD02C"/>
    <path d="M 390 130 L 394 142 L 406 146 L 394 150 L 390 162 L 386 150 L 374 146 L 386 142 Z" fill="#FFD02C"/>
  </g>
</svg>
"""
    
    tmp_svg = "tmp_sticker_8.svg"
    with open(tmp_svg, "w") as f:
        f.write(svg_8)

    for d in dirs:
        dst = os.path.join(d, "digital-sticker-8.png")
        cmd = f"rsvg-convert -w 512 -h 512 '{tmp_svg}' -o '{dst}'"
        subprocess.run(cmd, shell=True, check=True)
        print(f"Created sticker 8 PNG {dst}")

    if os.path.exists(tmp_svg):
        os.remove(tmp_svg)

    print("All 8 stickers processed successfully!")

if __name__ == '__main__':
    process_stickers()
