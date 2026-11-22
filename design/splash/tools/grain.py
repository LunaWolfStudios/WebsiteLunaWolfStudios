"""Add light luma grain to assembled frames, to keep the dark fog gradients from banding.

usage: python grain.py <in_dir> <out_dir> <sigma> <mode> [first] [count]
  sigma  standard deviation in 8-bit levels at black; fades to 0 by mid-grey, so the
         wolf and moon stay clean
  mode   static   one fixed pattern for every frame (cheap to encode, a fixed dither)
         temporal a new pattern every frame (seeded by frame index)
The noise is deterministic (seeded), so a re-run produces identical frames.
"""
import os
import sys

import numpy as np
from PIL import Image


def main():
    src, out, sigma, mode = sys.argv[1], sys.argv[2], float(sys.argv[3]), sys.argv[4]
    first = int(sys.argv[5]) if len(sys.argv) > 5 else 0
    files = sorted(f for f in os.listdir(src) if f.endswith('.png'))
    count = int(sys.argv[6]) if len(sys.argv) > 6 else len(files) - first
    os.makedirs(out, exist_ok=True)
    pat = None
    for j in range(first, first + count):
        a = np.asarray(Image.open(os.path.join(src, files[j])).convert('RGB')).astype(np.float32)
        if pat is None or mode == 'temporal':
            rng = np.random.default_rng(1337 + (0 if mode == 'static' else j))
            pat = rng.normal(0.0, 1.0, a.shape[:2]).astype(np.float32)
        luma = a @ np.array([0.2126, 0.7152, 0.0722], dtype=np.float32)
        weight = np.clip(1.0 - luma / 128.0, 0.0, 1.0)
        a = a + (pat * sigma * weight)[..., None]
        Image.fromarray(np.clip(a + 0.5, 0, 255).astype(np.uint8)).save(
            os.path.join(out, f'f{j - first:04d}.png'), compress_level=1)


if __name__ == '__main__':
    main()
