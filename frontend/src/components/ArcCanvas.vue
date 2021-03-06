<template>
  <canvas
    id="myCanvas"
    width="960"
    height="640"
  >
    <ArcPaddle/>
    <ArcBall/>
  </canvas>
</template>

<script lang="ts">
import ArcPaddle from '@/components/ArcPaddle.vue';
import ArcBall from '@/components/ArcBall.vue';
import { defineComponent, onMounted } from 'vue';

export default defineComponent({
  name: 'ArcCanvas',
  components: { ArcPaddle, ArcBall },
  setup () {
    const initCanvas = () => {
      const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
      const ctx = canvas?.getContext('2d');

      console.log(ctx)
      if (!ctx) {
        showError();
      } else {
        const brickRowCount = 5;
        const brickColumnCount = 10;
        const brickWidth = 81;
        const brickHeight = 20;
        const brickPadding = 10;
        const brickOffsetTop = 30;
        const brickOffsetLeft = 30;

        const bricks: { x: number; y: number; status: boolean }[][] = [];

        const countedBlocks = Array.from(Array(brickColumnCount).keys());

        countedBlocks.forEach((cb, c) => {
          bricks[c] = [];
          for (let r = 0; r < brickRowCount; r += 1) {
            bricks[c][r] = { x: 0, y: 0, status: true };
          }
        });

        const ballRadius = 25;

        const paddleHeight = 20;

        const paddleWidth = 150;

        let paddleX = 0;

        let rightPressed = false;
        let leftPressed = false;
        let lives = 3;
        let score = 0;

        let x = 0;
        let y = 0;

        let dx = 0;
        let dy = 0;

        const setInitialPosition = () => {
          // initial position
          x = canvas.width / 2;
          y = canvas.height - paddleHeight - ballRadius;

          dx = 2;
          dy = -2;

          paddleX = (canvas.width - paddleWidth) / 2;
        };
        const drawLives = () => {
          if (ctx) {
            ctx.font = '16px Arial';
            ctx.fillStyle = '#0095DD';
            ctx.fillText(`Lives: ${lives}`, canvas.width - 65, 20);
          }
        };

        const drawScore = () => {
          if (ctx) {
            ctx.font = '16px Arial';
            ctx.fillStyle = '#0095DD';
            ctx.fillText(`Score: ${score}`, 8, 20);
          }
        };

        const collisionDetection = () => {
          for (let c = 0; c < brickColumnCount; c += 1) {
            for (let r = 0; r < brickRowCount; r += 1) {
              const b = bricks[c][r];

              if (b.status) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                  dy = -dy;
                  b.status = false;

                  score += 1;

                  if (score === brickRowCount * brickColumnCount) {
                    // eslint-disable-next-line no-alert
                    alert('YOU WIN, CONGRATULATIONS!');
                    document.location.reload();
                  }
                }
              }
            }
          }
        };

        const drawBricks = () => {
          if (ctx) {
            for (let c = 0; c < brickColumnCount; c += 1) {
              for (let r = 0; r < brickRowCount; r += 1) {
                if (bricks[c][r].status) {
                  const brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                  const brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                  bricks[c][r].x = brickX;
                  bricks[c][r].y = brickY;
                  ctx.beginPath();
                  ctx.rect(brickX, brickY, brickWidth, brickHeight);
                  ctx.fillStyle = '#0095DD';
                  ctx.fill();
                  ctx.closePath();
                }
              }
            }
          }
        };

        const drawPaddle = () => {
          if (ctx) {
            ctx.beginPath();
            ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
            ctx.fillStyle = '#053455';
            ctx.fill();
            ctx.closePath();
          }
        };

        const drawBall = () => {
          if (ctx) {
            ctx.beginPath();
            ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
            ctx.fillStyle = '#0095DD';
            ctx.fill();
            ctx.closePath();
          }
        };

        const calcDeltas = () => {
          if (y + dy < ballRadius + paddleHeight) {
            dy = -dy;
          } else if (y + dy > canvas.height - ballRadius - paddleHeight + 5) {
            if (x > paddleX && x < paddleX + paddleWidth) {
              dy = -dy;
            } else {
              lives -= 1;
              if (!lives) {
                alert('GAME OVER');
                document.location.reload();
              } else {
                setInitialPosition();
                paddleX = (canvas.width - paddleWidth) / 2;
              }
            }
          }

          if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
            dx = -dx;
          }

          x += dx;
          y += dy;
        };

        const calcPaddle = () => {
          if (rightPressed) {
            paddleX += 7;
            if (paddleX + paddleWidth > canvas.width) {
              paddleX = canvas.width - paddleWidth;
            }
          } else if (leftPressed) {
            paddleX -= 7;
            if (paddleX < 0) {
              paddleX = 0;
            }
          }
        };

        const draw = () => {
          // clear canvas on each frame
          if (ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            calcPaddle();
            drawPaddle();
            drawBricks();
            drawBall();
            collisionDetection();
            drawScore();
            drawLives();
            calcDeltas();
            requestAnimationFrame(draw);
          }
        };

        const mouseMoveHandler = (e: { clientX: number; }) => {
          const relativeX = e.clientX - canvas.offsetLeft;
          if (relativeX > 0 && relativeX < canvas.width) {
            paddleX = relativeX - paddleWidth / 2;
          }
        };

        const keyDownHandler = (e: { key: string; }) => {
          if (e.key === 'Right' || e.key === 'ArrowRight') {
            rightPressed = true;
          } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
            leftPressed = true;
          }
        };

        const keyUpHandler = (e: { key: string; }) => {
          if (e.key === 'Right' || e.key === 'ArrowRight') {
            rightPressed = false;
          } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
            leftPressed = false;
          }
        };

        if (canvas) {
          setInitialPosition()
          document.addEventListener('mousemove', mouseMoveHandler, false);
          document.addEventListener('keydown', keyDownHandler, false);
          document.addEventListener('keyup', keyUpHandler, false);

          draw();
        }
      }
    }

    const showError = () => {
      throw new Error('2d context not supported or canvas already initialized');
    };

    onMounted(initCanvas);
  }
});
</script>

<style scoped>
  canvas {
  background: #eee;
  display: block;
}
</style>
