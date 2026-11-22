"""Flatten a SplashKit render (straight-alpha RGBA PNG) over a solid colour, as an opaque RGB PNG.

usage: python still.py <in.png> <out.png> [bg_hex=04070a]
Uses the same arithmetic as assemble.py, so a still and the video's source frame agree.
"""
import sys

import numpy as np
from PIL import Image


def main():
    src, out = sys.argv[1], sys.argv[2]
    h = (sys.argv[3] if len(sys.argv) > 3 else '04070a').lstrip('#')
    bg = np.array([int(h[i:i + 2], 16) for i in (0, 2, 4)], dtype=np.float32) / 255.0
    a = np.asarray(Image.open(src).convert('RGBA')).astype(np.float32) / 255.0
    rgb = a[..., :3] * a[..., 3:4] + bg * (1.0 - a[..., 3:4])
    Image.fromarray(np.clip(rgb * 255.0 + 0.5, 0, 255).astype(np.uint8)).save(out, optimize=True)


if __name__ == '__main__':
    main()
