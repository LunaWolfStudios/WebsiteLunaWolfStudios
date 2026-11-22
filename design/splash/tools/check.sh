#!/usr/bin/env bash
# Decode chosen frames of an encoded hero file and compare them with the assembled source frames.
# usage: check.sh <video> <frames_dir> <out_dir> frame...
set -euo pipefail
FF="${FFMPEG:-/c/Program Files (x86)/FFmpeg/bin/ffmpeg.exe}"
V="$1"; SRC="$2"; OUT="$3"; shift 3
mkdir -p "$OUT"
DEC=()
[[ "$V" == *.webm ]] && DEC=(-c:v libvpx-vp9)
for f in "$@"; do
  n=$(printf %04d "$f")
  # decode with the BT.709 matrix the file is tagged with
  "$FF" -hide_banner -loglevel error -y "${DEC[@]}" -i "$V" \
    -vf "select=eq(n\,$f),scale=in_color_matrix=bt709:in_range=tv:out_range=full:flags=accurate_rnd+full_chroma_int,format=rgb24" \
    -vframes 1 "$OUT/dec_$n.png"
  echo -n "frame $f: "; python -I "$(dirname "$0")/cmp.py" "$SRC/f$n.png" "$OUT/dec_$n.png"
done
