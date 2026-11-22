# Splash and hero media sources

Everything in `public/media/` and `src/assets/hero/` that comes from the studio splash is
reproducible from this folder plus two other repos:

- SplashKit, `S:\splashkit` (rendered at commit `309c506` plus the uncommitted working-tree
  changes present on 2026-11-21; the falling-star fix lives in `src/core/fx/shaders.ts`).
- The Sheep Tag 2 splash package,
  `S:\Unity\SheepTag2\Sheep Tag 2 Unity\Packages\com.lunawolfstudios.splashscreen\`, which
  holds the unmodified Long Night (Final) sources (`Source~/long-night-final.sk`) and the
  videos that ship in the game (`Runtime/Videos/`).

| File | What it is |
|---|---|
| `hero-desktop.sk` | Home hero, 16:9, 1440×810 design units, 13.5 s. Long Night (Final) without the wordmark or audio, emblem at x 72 % / y 50 %, moon disc 52 % of the height. |
| `hero-mobile.sk` | Home hero, 9:16, 810×1440 design units, 13.5 s. Emblem at x 50 % / y 30 %, moon disc 62 % of the width, flatter falling star. |
| `hero-*.recipe` | The SplashKit CLI edits that turn `long-night-final.sk` into each hero document. |
| `tools/assemble.py` | Flattens a png-sequence over `#04070a` and crossfades the loop seam. |
| `tools/grain.py` | Adds a fixed, dark-weighted grain pattern so the fog does not band. |
| `tools/encode-hero.sh` | VP9 WebM (2-pass) and H.264 MP4 with keyframes on `loopStart`. |
| `tools/encode-splash.sh` | The 1080p splash with the howl, for the About page and press kit. |
| `tools/still.py` | Flattens a single render into an opaque PNG still. |
| `tools/cmp.py`, `tools/check.sh` | Frame differencing used to verify stills, seams and encodes. |

## Timeline of the hero

| Time | What happens |
|---|---|
| 0.00 s | Sky only: fog and snow already settled, no emblem. This frame is `hero-*-first.png`. |
| 0.20 to 1.20 s | Moon, wolf and glow fade in, as in the splash. |
| 1.00 to 1.22 s | The eyes open. |
| 1.25 to 1.9 s | The falling star crosses once (top of the frame, then behind the moon). |
| 1.30 to 2.50 s | The glow swells and settles. |
| 2.85 s | Left wink, as in the splash. |
| 4.50 s | `loopStart`. Keyframe in both files. From here the scene idles. |
| 6.25 s, 10.75 s | Blinks (every 4.5 s, also across the loop seam). |
| 12.50 to 13.50 s | The idle tail crossfades into the frames that lead into 4.50 s, so `ended` then seek to 4.5 is seamless. |

The glow breathes at 0.2222 Hz, exactly two cycles per 9 s loop.

## Reproduce

Run from Git Bash. `WORK` is any scratch folder outside both repos. ffmpeg must be 4.2 or later
with libvpx-vp9 and libx264; the scripts default to `C:\Program Files (x86)\FFmpeg\bin\ffmpeg.exe`
(the 2018 build in `C:\WINDOWS\system32` is too old) and honour `FFMPEG=...`. Python needs numpy
and Pillow.

```bash
WEB=/s/WebsiteLunaWolfStudios
PKG="/s/Unity/SheepTag2/Sheep Tag 2 Unity/Packages/com.lunawolfstudios.splashscreen"
T=$WEB/design/splash/tools
WORK=/c/temp/hero && mkdir -p "$WORK" && cp "$PKG/Source~/long-night-final.sk" "$WORK/"
cd /s/splashkit
sk() { node tools/splashkit.mjs "$@"; }
```

### 1. The hero documents (already saved here; only needed to rebuild them)

```bash
sk derive "$WORK/long-night-final.sk" --id hero-desktop --name "Hero (desktop)" --out "$WORK/hero-desktop.sk"
sk run "$WEB/design/splash/hero-desktop.recipe" --in "$WORK/hero-desktop.sk" -y
sk derive "$WORK/long-night-final.sk" --id hero-mobile --name "Hero (mobile)" --out "$WORK/hero-mobile.sk"
sk run "$WEB/design/splash/hero-mobile.recipe" --in "$WORK/hero-mobile.sk" -y
```

### 2. Hero videos

```bash
# render (straight-alpha PNGs; ~80 s and ~500 MB for desktop)
sk export --in "$WEB/design/splash/hero-desktop.sk" --target png-sequence --size 1920x1080 --out-dir "$WORK/d1080" -y
sk export --in "$WEB/design/splash/hero-mobile.sk"  --target png-sequence --size 720x1280  --out-dir "$WORK/m1280" -y

# flatten over #04070a; loop = frames 135..404, crossfade the last 30 frames into 105..134
python -I $T/assemble.py "$WORK/d1080/hero-desktop" "$WORK/asm-d" 135 30
python -I $T/assemble.py "$WORK/m1280/hero-mobile"  "$WORK/asm-m" 135 30

# light grain in the darks (sigma 1.2 levels at black, none above mid-grey), one fixed pattern
python -I $T/grain.py "$WORK/asm-d" "$WORK/grain-d" 1.2 static
python -I $T/grain.py "$WORK/asm-m" "$WORK/grain-m" 1.2 static

# encode: <frames> <out> <loopStart> <vp9 crf> <vp9 cap kbps> <x264 crf> <x264 maxrate kbps>
bash $T/encode-hero.sh "$WORK/grain-d" "$WORK/hero-desktop" 4.5 35 1000 25 1800
bash $T/encode-hero.sh "$WORK/grain-m" "$WORK/hero-mobile" 4.5 37 420 27 650
cp "$WORK"/hero-desktop.{webm,mp4} "$WORK"/hero-mobile.{webm,mp4} $WEB/public/media/
```

### 3. Hero stills (2560×1440 and 1080×1920, lossless)

```bash
sk render --in "$WEB/design/splash/hero-desktop.sk" --at 0   --size 2560x1440 --backdrop none --out "$WORK/d0.png" -y
sk render --in "$WEB/design/splash/hero-desktop.sk" --at 4.5 --size 2560x1440 --backdrop none --out "$WORK/d45.png" -y
sk render --in "$WEB/design/splash/hero-mobile.sk"  --at 0   --size 1080x1920 --backdrop none --out "$WORK/m0.png" -y
sk render --in "$WEB/design/splash/hero-mobile.sk"  --at 4.5 --size 1080x1920 --backdrop none --out "$WORK/m45.png" -y
python -I $T/still.py "$WORK/d0.png"  $WEB/src/assets/hero/hero-desktop-first.png
python -I $T/still.py "$WORK/d45.png" $WEB/src/assets/hero/hero-desktop-final.png
python -I $T/still.py "$WORK/m0.png"  $WEB/src/assets/hero/hero-mobile-first.png
python -I $T/still.py "$WORK/m45.png" $WEB/src/assets/hero/hero-mobile-final.png
```

### 4. The real splash, from the unmodified `long-night-final.sk`

```bash
# 1080p web versions with the howl (offset 0.24 s, gain 0.9, quadratic fade over the last 1.1 s)
sk export --in "$WORK/long-night-final.sk" --target png-sequence --size 1920x1080 --out-dir "$WORK/splash1080" -y
python -I $T/assemble.py "$WORK/splash1080/long-night-final" "$WORK/asm-splash" 0 0 000000
bash $T/encode-splash.sh "$WORK/asm-splash" "$WORK/splash-long-night" 25 18
cp "$WORK"/splash-long-night.{webm,mp4} $WEB/public/media/

# poster: the last frame (107), 2560x1440, on black
sk render --in "$WORK/long-night-final.sk" --frame 107 --size 2560x1440 --backdrop black --out "$WORK/poster.png" -y
python -I $T/still.py "$WORK/poster.png" $WEB/src/assets/hero/splash-poster.png 000000

# press kit: the single-video version, exactly as the package README builds it
sk export --in "$WORK/long-night-final.sk" --target webm-opaque --size 2560x1440 --crf 10 --out "$WORK/one-video.raw.webm" -y
"${FFMPEG:-/c/Program Files (x86)/FFmpeg/bin/ffmpeg.exe}" -i "$WORK/one-video.raw.webm" -ss 0.240 -i assets/sfx/night_falls_howl.wav \
  -map 0:v -map 1:a -c:v copy -af "volume=0.9,afade=t=out:st=2.5:d=1.1:curve=qua" -c:a libvorbis -q:a 4 -t 3.6 \
  $WEB/public/media/press/luna-wolf-studios-splash.webm

# press kit: the two files that ship in the game, copied byte for byte
cp "$PKG/Runtime/Videos/LongNight.Background.webm" $WEB/public/media/press/luna-wolf-studios-splash-background.webm
cp "$PKG/Runtime/Videos/LongNight.Lockup.webm"     $WEB/public/media/press/luna-wolf-studios-splash-logo-alpha.webm
```

### 5. Verify

```bash
bash $T/check.sh "$WEB/public/media/hero-desktop.webm" "$WORK/asm-d" "$WORK/chk" 0 135 270 404   # PSNR per frame vs source
python -I $T/cmp.py "$WORK/chk/dec_0000.png" $WEB/src/assets/hero/hero-desktop-first.png        # still vs video frame 0
ffprobe -v error -select_streams v -show_entries packet=pts_time,flags -of csv=p=0 \
  $WEB/public/media/hero-desktop.webm | grep K                                                 # 0, 4.5, 9.0
```

Notes:

- The png-sequence target writes straight alpha and ignores `doc.background`, so the flatten
  over `#04070a` happens in `assemble.py` and `still.py` with the same arithmetic. That is what
  makes the "first" stills match the videos' frame 0.
- `sk render` and `sk export --target png-sequence` agree to within 1/255 after flattening.
- Renders are deterministic; re-running gives the same PNGs. The encoders are multithreaded,
  so a re-encode can differ by a few bytes.
