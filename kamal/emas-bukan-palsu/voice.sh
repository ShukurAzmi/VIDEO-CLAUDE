#!/bin/bash
# Suara bersih: DeepFilterNet3 (venv $DFENV, model $DFM) + denoise.py + chain + loudnorm 2-pass -> voice.wav
# DFENV: python3 -m venv dfenv && dfenv/bin/pip install torch==2.6.0 torchaudio==2.6.0 --index-url https://download.pytorch.org/whl/cpu && dfenv/bin/pip install deepfilternet soundfile
# DFM: curl -L cdn.jsdelivr.net/gh/Rikorose/DeepFilterNet@main/models/DeepFilterNet3.zip ; unzip -> .../DeepFilterNet3
set -e; W=${1:?work}; cd $W; DUR=$(ffprobe -v error -show_entries format=duration -of csv=p=0 base_raw.mov)
ffmpeg -v error -y -i src.mov -ac 1 -ar 48000 src48.wav; ffmpeg -v error -y -i base_raw.mov -ac 1 -ar 48000 raw48.wav
$DFENV/bin/python -I $W/dfrun.py src48.wav src_df.wav none $DFM; $DFENV/bin/python -I $W/dfrun.py raw48.wav df_full.wav none $DFM
python3 denoise.py $W
AF="highpass=f=90,deesser,acompressor=threshold=-20dB:ratio=3:attack=5:release=80,equalizer=f=180:t=q:w=1:g=2,equalizer=f=350:t=q:w=1:g=-2,equalizer=f=3500:t=q:w=1:g=2.5"
J=$(ffmpeg -hide_banner -i df_nr.wav -af "$AF,loudnorm=I=-14:TP=-1.5:LRA=11:print_format=json" -f null - 2>&1 | sed -n '/^{/,/^}/p')
II=$(echo "$J"|python3 -c "import json,sys;d=json.load(sys.stdin);print(f\"measured_I={d['input_i']}:measured_TP={d['input_tp']}:measured_LRA={d['input_lra']}:measured_thresh={d['input_thresh']}:offset={d['target_offset']}\")")
FO=$(python3 -c "print(round($DUR-0.35,2))")
ffmpeg -v error -y -i df_nr.wav -af "$AF,loudnorm=I=-14:TP=-1.5:LRA=11:$II:linear=true,aresample=48000,afade=t=out:st=$FO:d=0.35" -ac 2 voice.wav
echo voice OK
