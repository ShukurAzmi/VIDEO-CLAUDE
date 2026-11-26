#!/bin/bash
# v5: suara lebih jelas — clean2.wav (NR kedua + expander) -> chain jelas -> loudnorm 2-pass -14 LUFS -> voice.wav (+1.25s pad untuk CTA)
set -e; cd ${1:?work}; DUR=$(ffprobe -v error -show_entries format=duration -of csv=p=0 clean2.wav)
AF="highpass=f=85,lowpass=f=14000,equalizer=f=250:t=q:w=1.2:g=-3,equalizer=f=180:t=q:w=1:g=1.5,equalizer=f=3000:t=q:w=1.2:g=3,equalizer=f=5500:t=q:w=1.5:g=1,deesser=i=0.4,acompressor=threshold=-22dB:ratio=2.5:attack=8:release=120:makeup=1"
J=$(ffmpeg -hide_banner -i clean2.wav -af "$AF,loudnorm=I=-14:TP=-1.5:LRA=9:print_format=json" -f null - 2>&1 | sed -n '/^{/,/^}/p')
II=$(echo "$J"|python3 -c "import json,sys;d=json.load(sys.stdin);print(f\"measured_I={d['input_i']}:measured_TP={d['input_tp']}:measured_LRA={d['input_lra']}:measured_thresh={d['input_thresh']}:offset={d['target_offset']}\")")
FO=$(python3 -c "print(round($DUR-0.35,2))")
ffmpeg -v error -y -i clean2.wav -af "$AF,loudnorm=I=-14:TP=-1.5:LRA=9:$II:linear=true,aresample=48000,afade=t=out:st=$FO:d=0.35,apad=pad_dur=1.25" -t ${TOT:-76.2} -ac 2 voice.wav
echo voice2 OK
