# Final PG Jewel v2: frame 1080 + grade Kamal -> muka glowing -> green screen -> render penuh -> encode
W=${1:?work dir}
set -e
cd $W
DUR=$(python3 -c "import json;print(json.load(open('segs.json'))['dur'])")
mkdir -p bfF bfB fin
ffmpeg -v error -y -i base_raw.mov -vf "scale=1080:1920:flags=lanczos,$(cat grade.txt)" -q:v 2 bfF/%05d.jpg
python3 beauty.py run bfF bfB
python3 gs.py bfB brf2
FINAL=1 node render.js $W $W/fin 1 all 0 $DUR
ffmpeg -v error -y -framerate 30 -i fin/%05d.jpg -i mix.wav -map 0:v -map 1:a -c:v libx264 -crf 16 -preset slow -pix_fmt yuv420p -c:a aac -b:a 256k -shortest -movflags +faststart FINAL_kamal_pg_jewel_1080x1920.mp4
echo FINAL_OK
