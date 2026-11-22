"""Compare two images after flattening any alpha over #04070a and resizing b to a's size.

usage: python cmp.py a.png b.png [diff_out.png]
Prints max / mean / 99.9th percentile absolute difference per channel (0..255), and PSNR.
"""
import sys

import numpy as np
from PIL import Image

BG = np.array([4, 7, 10], dtype=np.float32)


def flat(im):
    if im.mode in ('RGBA', 'LA', 'P'):
        a = np.asarray(im.convert('RGBA')).astype(np.float32)
        al = a[..., 3:4] / 255.0
        return np.round(a[..., :3] * al + BG * (1 - al))
    return np.asarray(im.convert('RGB')).astype(np.float32)


def main():
    A = Image.open(sys.argv[1])
    B = Image.open(sys.argv[2])
    a = flat(A)
    b = flat(B)
    if b.shape != a.shape:
        b = np.asarray(Image.fromarray(b.astype(np.uint8)).resize((A.width, A.height), Image.LANCZOS)).astype(np.float32)
    d = np.abs(a - b)
    mse = (d ** 2).mean()
    psnr = 99.0 if mse == 0 else 10 * np.log10(255 ** 2 / mse)
    print(f'max {d.max():.0f}  mean {d.mean():.3f}  p99.9 {np.percentile(d, 99.9):.1f}  PSNR {psnr:.2f} dB')
    if len(sys.argv) > 3:
        Image.fromarray(np.clip(d.max(-1) * 16, 0, 255).astype(np.uint8)).save(sys.argv[3])


if __name__ == '__main__':
    main()
