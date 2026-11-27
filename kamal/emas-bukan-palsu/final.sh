W=${1:?work dir}
set -e
cd $W
python3 beauty.py run bfF bfB
FINAL=1 node render.js $W $W/fin 1 all 0 78.55
ffmpeg -v error -y -framerate 30 -i fin/%05d.jpg -i mix.wav -c:v libx264 -crf 16 -preset slow -pix_fmt yuv420p -c:a aac -b:a 256k -shortest -movflags +faststart FINAL_kamal_emas_bukan_palsu_1080x1920.mp4
echo FINAL_OK
