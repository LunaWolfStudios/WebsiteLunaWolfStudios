# Home hero and splash media

Made on 2026-11-21 with SplashKit (`S:\splashkit`) from the Long Night (Final) sources in the
Sheep Tag 2 splash package. Reproduce everything with the commands in
`design/splash/README.md`.

## What was produced

### Home hero video (no audio, 30 fps, 13.5 s, `loopStart` 4.5 s)

| File | Size | Codec | Average bitrate | Budget |
|---|---:|---|---:|---:|
| `public/media/hero-desktop.webm` | 1.43 MB (1,433,935 B) | VP9 profile 0, 1920×1080, yuv420p, BT.709 | 850 kb/s | 1.5 MB |
| `public/media/hero-desktop.mp4` | 2.16 MB (2,157,372 B) | H.264 High 4.0, 1920×1080, yuv420p, BT.709, `+faststart` | 1,278 kb/s | 2.2 MB |
| `public/media/hero-mobile.webm` | 0.68 MB (681,881 B) | VP9 profile 0, 720×1280, yuv420p, BT.709 | 404 kb/s | 0.7 MB |
| `public/media/hero-mobile.mp4` | 0.95 MB (949,534 B) | H.264 High 4.0, 720×1280, yuv420p, BT.709, `+faststart` | 563 kb/s | 1.0 MB |

Keyframes: 0 s and 4.5 s in the MP4s (IDR); 0, 4.5 and 9.0 s in the WebMs. All four are
405 frames, exactly 13.5 s. All under budget at full resolution with the splash's full snow
density, so particle density was not reduced.

`src/assets/hero/hero.json`:

```json
{
  "desktop": { "width": 1920, "height": 1080, "duration": 13.5, "loopStart": 4.5, "fps": 30 },
  "mobile": { "width": 720, "height": 1280, "duration": 13.5, "loopStart": 4.5, "fps": 30 }
}
```

### Hero stills (lossless PNG, opaque, sRGB)

| File | Size | What |
|---|---|---|
| `src/assets/hero/hero-desktop-first.png` | 2560×1440, 367 KB | Frame 0: sky only. The placeholder. |
| `src/assets/hero/hero-desktop-final.png` | 2560×1440, 908 KB | 4.5 s (`loopStart`): emblem settled, eyes open. The fallback. |
| `src/assets/hero/hero-mobile-first.png` | 1080×1920, 274 KB | Frame 0. |
| `src/assets/hero/hero-mobile-final.png` | 1080×1920, 683 KB | 4.5 s. |

"First" still against the decoded frame 0 of each video (still scaled to the video size):
mean absolute difference 0.6 to 0.8 of a level, mean signed difference under 0.3 of a level
per channel (no colour shift), and 0.2 to 0.6 % of pixels more than 8 levels apart. Those are
the edges of snowflakes, which are sharper in the 2560 still. Same stars in the same places.

### The real splash (unmodified `long-night-final.sk`: wordmark, 3.6 s, howl with its fade)

| File | Size | What |
|---|---:|---|
| `public/media/splash-long-night.mp4` | 1.48 MB | H.264 High + AAC-LC 128 kb/s stereo, 1920×1080, 30 fps, `+faststart` |
| `public/media/splash-long-night.webm` | 0.89 MB | VP9 + Opus 96 kb/s stereo, 1920×1080, 30 fps |
| `src/assets/hero/splash-poster.png` | 2560×1440, 896 KB | Last frame (frame 107), on black, lossless |
| `public/media/press/luna-wolf-studios-splash.webm` | 2.67 MB | Single-video version per the package README: VP8 2560×1440 opaque + Vorbis |
| `public/media/press/luna-wolf-studios-splash-background.webm` | 1.24 MB | `LongNight.Background.webm`, byte-identical copy from the game |
| `public/media/press/luna-wolf-studios-splash-logo-alpha.webm` | 4.02 MB | `LongNight.Lockup.webm`, byte-identical copy (VP8 + alpha + howl) |

Audio in all three with sound: the `night_falls_howl` wav from 0.24 s in, gain 0.9, quadratic
fade over the last 1.1 s (measured: −20 dB at 1.4 s, −28 dB at 2.4 s, −39 dB at 3.0 s, −63 dB
at 3.4 s, matching the shipped single video).

### Sources

`design/splash/hero-desktop.sk`, `hero-mobile.sk`, the two CLI recipes that derive them from
`long-night-final.sk`, and the scripts in `design/splash/tools/`. `design/splash/README.md` has
the exact commands for every file above.

## What the hero shows

| Time | Event |
|---|---|
| 0 s | Sky only: fog and snow already settled, no emblem. |
| 0.2 to 1.2 s | Moon, wolf and glow fade in (the splash's own timings). |
| 1.0 to 1.22 s | Eyes open. |
| 1.25 to 1.9 s | Falling star, once. Desktop: across the top of the frame, then behind the moon. Mobile: a flatter path through the top third. |
| 1.3 to 2.5 s | Glow swells and settles. |
| 2.85 s | Left wink (kept from the splash). |
| 4.5 s | `loopStart`. Idle from here: fog drifts, snow falls, glow breathes. |
| 6.25 s, 10.75 s | Blinks, every 4.5 s including across the seam. |
| 12.5 to 13.5 s | Idle tail crossfades into the frames that precede 4.5 s. |

Composition, measured on the renders: desktop emblem centre at x 72 %, y 50 %, moon disc
52 % of the height; mobile at x 50 %, y 30 %, disc 62 % of the width. Frame background is
`#04070a`, the site's night colour, so the video edge disappears into a section of that colour.

Text areas: white text over the left 55 % (desktop) or lower half (mobile) has at least 9:1
contrast at the 99th-percentile pixel (7.9:1 on mobile) and about 15:1 on average. Nothing
bright enters those areas in the idle loop. The glow's soft halo does reach about 50 % of the
desktop width (the moon edge sits at 57 % by the spec's geometry).

The loop seam: the frame step from the last frame to `loopStart` measures the same as the step
the video takes when it plays through 4.5 s the first time (mean 0.63 vs 0.67 levels on
desktop; 0.94 vs 1.03 on mobile). Checked by eye on extracted frames; no ghosting in the
crossfade.

## How the page should use the files

1. **Placeholder and LCP.** Put the "first" still in the HTML as an eager image with
   `fetchpriority="high"`, through `<Picture>` from `src/assets/hero/`: `hero-mobile-first.png`
   for portrait / narrow screens, `hero-desktop-first.png` otherwise. Give the still and the
   video the same box and the same `object-fit: cover` and `object-position`, or the hand-off
   will jump:
   - desktop: `object-position: 72% 50%`
   - mobile: `object-position: 50% 30%`

   `72% 50%` keeps the emblem at 72 % of the viewport whatever the crop. With the default
   `50% 50%`, a 4:3 screen crops the moon's right edge. Section background `#04070a`.
2. **Reduced motion.** Show the final still, no video. This can be done without script:
   `<source media="(prefers-reduced-motion: reduce)" srcset="…final…">` inside the same
   `<picture>`.
3. **Load the video late.** Create or fill the `<video muted playsinline preload="none">` only
   after `load` (or on idle), and only when all of these hold: no reduced motion,
   `navigator.connection?.saveData` is not true, and the effective connection is not `2g` /
   `slow-2g`. Pick the files in script: mobile pair when `matchMedia('(orientation: portrait)')`
   matches, else desktop. `<source type="video/webm">` first, MP4 second.
4. **Swap.** Hide the video until its `playing` event, then show it over the still. Frame 0
   matches the still, so no fade is needed.
5. **Loop.** Do not use the `loop` attribute (it would replay the intro). On `ended`, set
   `currentTime = loopStart` (from `hero.json`) and call `play()`. There is a keyframe exactly
   at 4.5 s in every file, so the seek is cheap and exact.
6. **Fall back to the final still** when Save-Data is on, when `play()` rejects (autoplay
   refused, Low Power Mode on iOS), on a video `error`, or if `playing` has not fired a few
   seconds after the request. Without script the page keeps the "first" still, which is the
   empty sky; if that is a concern, switch the `<img>` to the final still from script before
   starting the video instead, and accept a cut at frame 0.
7. Pause the video when the hero leaves the viewport (`IntersectionObserver`) and when the tab
   is hidden.
8. When the stills go through `astro:assets`, check the dark fog for banding in the generated
   AVIF/WebP. Raise the quality (around 80) or keep a PNG/high-quality WebP if it bands.

**Conflict with `CLAUDE.md`.** The performance rules say "Video and YouTube never load until
asked." An autoplaying hero is a video that loads without being asked. Steps 1 to 3 keep the
LCP an image in the HTML and defer every video byte until after `load`, but they still break
that rule as written. The owner needs to approve the exception, or the rule needs a carve-out
for a muted, deferred hero loop. Without that, the hero should ship as the final still only.

The press files: the logo-alpha WebM is VP8 with an alpha side channel. Chrome and Firefox
show its transparency; Safari does not play it. It is a download for press, not for inline
playback. Use `splash-long-night.mp4` / `.webm` with `splash-poster.png` as the poster for the
About page and press kit players.

## Where this falls short of the brief

- **No AV1.** The only usable ffmpeg is 4.2 (2019), where `libaom-av1` is marked experimental and
  very slow. VP9 and H.264 were used.
- **Faint VP9 contours in the darkest fog.** The H.264 files keep the added grain and are
  smooth. VP9 at this bitrate strips the grain (grain strength, `-sharpness`, `-aq-mode` and
  CRF were all tried) and leaves one-level contours that show only with the darks stretched
  2.5×; at normal viewing they are not visible on the frames checked. A lower VP9 CRF (a larger
  file than the 1.5 MB budget) should reduce them; not tested.
- **Outer glow at the crop extremes.** The glow is +20 luma above the sky at 1.4 moon radii,
  +12 at 1.5 and about 0 at 1.8. With `object-position: 72% 50%`, a 4:3 or 21:9 crop keeps
  1.43 to 1.46 radii, so the faintest outer haze is trimmed at those two extremes. The moon
  and the bright rim always survive.
- **The falling star crosses the left half.** On desktop it runs through the top 15 % of the
  text side for about 0.3 s at 1.3 s, as authored in the splash. It stays above a vertically
  centred headline. On mobile it was flattened to stay in the top third.
- **Changes from the splash look** (all for the hero only): wordmark and howl removed;
  background `#04070a` instead of black; fog and snow fade-ins removed so frame 0 is a settled
  sky (snow opacity 0.27 = the splash's 0.36 × its settled 0.75 fade); glow breathing 0.26 Hz →
  0.2222 Hz so it repeats exactly in the 9 s loop; two idle blinks added.
- **Portrait fog.** The moor-fog shader is not aspect-corrected, so on the 9:16 canvas its
  features stretch vertically. It still reads as fog.
- **Reproducibility.** SplashKit had uncommitted changes in its working tree (including the
  falling-star fix in `src/core/fx/shaders.ts`) that these renders depend on. They were not
  made by this task and were not touched. WebM encodes repeat byte for byte; x264 encodes can
  differ by a few KB between runs.

## With more time

- Encode AV1 with a current ffmpeg: about a third smaller at the same quality, listed first in
  the `<source>` order.
- Add dithering inside the SplashKit fog shader so the gradients never band at the source,
  rather than grain after the fact.
- Make the fog drift periodic (move the noise offset on a circle) so the loop needs no
  crossfade.
- Aspect-correct the fog for portrait, and add a tablet-portrait crop.
- Render at 2× and downsample for crisper snowflakes at the same bitrate.
