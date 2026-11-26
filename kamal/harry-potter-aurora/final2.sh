set -e; cd /tmp/claude-0/-home-user-VIDEO-CLAUDE/7cbbdbc1-fe4c-565e-bd97-f0b9b1d957b8/scratchpad/work
python3 beauty2.py bfF bfB
FINAL=1 node render.js /tmp/claude-0/-home-user-VIDEO-CLAUDE/7cbbdbc1-fe4c-565e-bd97-f0b9b1d957b8/scratchpad/work /tmp/claude-0/-home-user-VIDEO-CLAUDE/7cbbdbc1-fe4c-565e-bd97-f0b9b1d957b8/scratchpad/work/fin 1 all 0 61.55
ffmpeg -v error -y -framerate 30 -i fin/%05d.jpg -i mix.wav -c:v libx264 -crf 16 -preset slow -pix_fmt yuv420p -c:a aac -b:a 256k -shortest -movflags +faststart /home/user/VIDEO-CLAUDE/FINAL_harry_potter_aurora_1080x1920.mp4
echo FINAL_OK
