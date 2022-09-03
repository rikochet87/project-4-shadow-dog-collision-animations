/**@type {HTMLCanvasElement}*/
import img from "../img/boom.png";
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 700;
const explosions = [];
let canvasPosition = canvas.getBoundingClientRect();

function createImage(imageSrc) {
  const image = new Image();
  image.src = imageSrc;
  return image;
}

const boom = createImage(img);

class Explosion {
  constructor(x, y) {
    this.spritesWidth = 200;
    this.spritesHeight = 179;
    this.width = this.spritesWidth * 0.7;
    this.height = this.spritesHeight * 0.7;
    this.x = x;
    this.y = y;
    this.sound = new Audio();
    this.sound.src = "../sounds/fire-impact-1.mp3";
    this.frame = 0;
    this.image = boom;
    this.timer = 0;
    this.angle = Math.random() * 6.2;
 
  }
  update() {
    if (this.frame === 0) {
      this.sound.play()
     }
    this.timer++;
    if (this.timer % 10 === 0) {
      this.frame++;
    }
  }
  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    //   ctx.draImage(image, sx, sy, sw, sh, dx, dy, dw, dh)
    ctx.drawImage(
      this.image,
      this.spritesWidth * this.frame,
      0,
      this.spritesWidth,
      this.spritesHeight,
      0 - this.width * 0.5,
      0 - this.height * 0.5,
      this.width,
      this.height
    );
    ctx.restore();
  }
}

window.addEventListener("click", function (e) {
  createAnimation(e);
});

function createAnimation(e) {
  let positionX = e.x - canvasPosition.left;
  let positionY = e.y - canvasPosition.top;
  explosions.push(new Explosion(positionX, positionY));
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < explosions.length; i++) {
    explosions[i].update();
    explosions[i].draw();
    if (explosions[i].frame > 5) {
      explosions.splice(i, 1);
      i--;
    }
  }
  requestAnimationFrame(animate);
}
animate();
