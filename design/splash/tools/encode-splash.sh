#!/usr/bin/env bash
# Encode the unmodified Long Night (Final) splash, rendered as an opaque png-sequence,
# to web H.264+AAC and VP9+Opus with the howl and the fade the package README describes.
# usage: encode-splash.sh <frames_dir_with_f%04d.png> <out_base> <vp9_crf> <x264_crf>
set -euo pipefail
FF="${FFMPEG:-/c/Program Files (x86)/FFmpeg/bin/ffmpeg.exe}"   # ffmpeg 4.2
IN="$1"; OUT="$2"; VCRF="$3"; XCRF="$4"
HOWL="S:/splashkit/assets/sfx/night_falls_howl.wav"
COLOR=(-colorspace bt709 -color_primaries bt709 -color_trc bt709 -color_range tv)
VF="scale=in_range=full:out_range=tv:out_color_matrix=bt709:flags=lanczos+accurate_rnd+full_chroma_int,format=yuv420p"
# the package README's audio: start the wav 0.24 s in, gain 0.9, quadratic fade over the last 1.1 s
AF="volume=0.9,afade=t=out:st=2.5:d=1.1:curve=qua"
PASSLOG="${OUT}.vp9pass"

"$FF" -hide_banner -loglevel error -y -framerate 30 -i "$IN/f%04d.png" -vf "$VF" "${COLOR[@]}" \
  -c:v libvpx-vp9 -pass 1 -passlogfile "$PASSLOG" -b:v 0 -crf "$VCRF" -row-mt 1 -tile-columns 2 -threads 8 \
  -auto-alt-ref 1 -lag-in-frames 25 -deadline good -cpu-used 4 -an -f webm NUL
"$FF" -hide_banner -loglevel error -y -framerate 30 -i "$IN/f%04d.png" -ss 0.240 -i "$HOWL" \
  -map 0:v -map 1:a -vf "$VF" "${COLOR[@]}" \
  -c:v libvpx-vp9 -pass 2 -passlogfile "$PASSLOG" -b:v 0 -crf "$VCRF" -row-mt 1 -tile-columns 2 -threads 8 \
  -auto-alt-ref 1 -lag-in-frames 25 -deadline good -cpu-used 1 \
  -af "$AF" -c:a libopus -b:a 96k -t 3.6 "${OUT}.webm"
rm -f "${PASSLOG}"-0.log

"$FF" -hide_banner -loglevel error -y -framerate 30 -i "$IN/f%04d.png" -ss 0.240 -i "$HOWL" \
  -map 0:v -map 1:a -vf "$VF" "${COLOR[@]}" \
  -c:v libx264 -preset veryslow -profile:v high -level:v 4.0 -crf "$XCRF" \
  -x264-params "aq-mode=3:aq-strength=0.9:deblock=-1,-1" -pix_fmt yuv420p \
  -af "$AF" -c:a aac -b:a 128k -t 3.6 -movflags +faststart "${OUT}.mp4"
ls -l "${OUT}.webm" "${OUT}.mp4"
