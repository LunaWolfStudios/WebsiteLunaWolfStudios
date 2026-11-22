"""Flatten a SplashKit png-sequence over the night colour and crossfade the loop seam.

The document is rendered straight through (0 .. N frames). The idle loop is
[L, N). The page seeks back to L when the video ends, so the frame after N-1 is
frame L. To make that cut invisible, the last D frames of the idle segment are
crossfaded into the D frames that precede L in the render (L-D .. L-1), which are
the frames that naturally lead into frame L:

    out[j] = (1 - w) * src[j] + w * src[j - (N - L)],  w = (k + 1) / D,  k = j - (N - D)

so out[N-1] == src[L-1] exactly, and the seek lands on src[L], its true successor.
Frames 0 .. N-D-1 are untouched apart from the flatten.

usage: python assemble.py <seq_dir> <out_dir> <loop_start_frame> <fade_frames> [bg_hex]
  bg_hex defaults to 04070a (the site's night colour); 0 0 skips the crossfade (a plain flatten).
"""
import os
import sys

import numpy as np
from PIL import Image

BG = np.array([4, 7, 10], dtype=np.float32) / 255.0


def load(path):
    a = np.asarray(Image.open(path).convert('RGBA')).astype(np.float32) / 255.0
    rgb, al = a[..., :3], a[..., 3:4]
    return rgb * al + BG * (1.0 - al)


def save(rgb, path):
    Image.fromarray(np.clip(rgb * 255.0 + 0.5, 0, 255).astype(np.uint8)).save(path, compress_level=1)


def main():
    global BG
    seq, out, L, D = sys.argv[1], sys.argv[2], int(sys.argv[3]), int(sys.argv[4])
    if len(sys.argv) > 5:
        h = sys.argv[5].lstrip('#')
        BG = np.array([int(h[i:i + 2], 16) for i in (0, 2, 4)], dtype=np.float32) / 255.0
    os.makedirs(out, exist_ok=True)
    files = sorted(f for f in os.listdir(seq) if f.endswith('.png'))
    N = len(files)
    idle = N - L
    assert D <= L and D < idle, (N, L, D)
    for j in range(N):
        a = load(os.path.join(seq, files[j]))
        k = j - (N - D)
        if k >= 0:
            w = (k + 1) / D
            b = load(os.path.join(seq, files[j - idle]))
            a = (1.0 - w) * a + w * b
        save(a, os.path.join(out, f'f{j:04d}.png'))
    print(f'{N} frames, loop {L}..{N - 1} ({idle} frames), seam crossfade {D} frames -> {out}')


if __name__ == '__main__':
    main()
