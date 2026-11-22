#!/usr/bin/env bash
# Encode an assembled hero frame folder (f0000.png ...) to VP9 WebM and H.264 MP4.
# usage: encode-hero.sh <frames_dir> <out_base> <loop_start_s> <vp9_crf> <vp9_cap_k> <x264_crf> [<x264_maxrate_k>]
# Writes <out_base>.webm and <out_base>.mp4, 30 fps, no audio.
# Keyframes: H.264 gets forced IDR frames at 0 and loop_start. libvpx in ffmpeg 4.2 ignores
# -force_key_frames, so VP9 gets a fixed keyframe interval equal to loop_start (keyframes at
# 0, loop_start, 2*loop_start ...), which puts one exactly on loop_start.
# VP9 is two-pass constrained quality: -crf with -b:v as the cap.
set -euo pipefail
FF="${FFMPEG:-/c/Program Files (x86)/FFmpeg/bin/ffmpeg.exe}"   # ffmpeg 4.2; the 2018 build on PATH is older
IN="$1"; OUT="$2"; LS="$3"; VCRF="$4"; VMAX="$5"; XCRF="$6"; XMAX="${7:-0}"
COLOR=(-colorspace bt709 -color_primaries bt709 -color_trc bt709 -color_range tv)
# sRGB PNG -> BT.709 limited-range 4:2:0, the matrix browsers assume for HD video
VF="scale=in_range=full:out_range=tv:out_color_matrix=bt709:flags=lanczos+accurate_rnd+full_chroma_int,format=yuv420p"
KF=(-force_key_frames "0,${LS}")
GOP=$(python -c "print(round($LS*30))")
PASSLOG="${OUT}.vp9pass"

"$FF" -hide_banner -loglevel error -y -framerate 30 -i "$IN/f%04d.png" -vf "$VF" "${COLOR[@]}" \
  -c:v libvpx-vp9 -pass 1 -passlogfile "$PASSLOG" -b:v "${VMAX}k" -crf "$VCRF" \
  -g $GOP -keyint_min $GOP -row-mt 1 -tile-columns 2 -threads 8 -auto-alt-ref 1 -lag-in-frames 25 -aq-mode 0 \
  -deadline good -cpu-used 4 -an -f webm NUL
"$FF" -hide_banner -loglevel error -y -framerate 30 -i "$IN/f%04d.png" -vf "$VF" "${COLOR[@]}" \
  -c:v libvpx-vp9 -pass 2 -passlogfile "$PASSLOG" -b:v "${VMAX}k" -crf "$VCRF" \
  -g $GOP -keyint_min $GOP -row-mt 1 -tile-columns 2 -threads 8 -auto-alt-ref 1 -lag-in-frames 25 -aq-mode 0 \
  -deadline good -cpu-used 1 -an "${OUT}.webm"
rm -f "${PASSLOG}"-0.log

X264RC=(-crf "$XCRF")
if [ "$XMAX" != "0" ]; then X264RC+=(-maxrate "${XMAX}k" -bufsize "$((XMAX*2))k"); fi
"$FF" -hide_banner -loglevel error -y -framerate 30 -i "$IN/f%04d.png" -vf "$VF" "${COLOR[@]}" \
  -c:v libx264 -preset veryslow -profile:v high -level:v 4.0 "${X264RC[@]}" \
  -g 300 "${KF[@]}" -forced-idr 1 -x264-params "aq-mode=3:aq-strength=0.9:deblock=-1,-1" \
  -pix_fmt yuv420p -movflags +faststart -an "${OUT}.mp4"
ls -l "${OUT}.webm" "${OUT}.mp4"
