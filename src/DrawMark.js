class DrawMark {
  constructor(ctx, x, y, width, height, color, id = null) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.id = id;
    this.onMove = false;
    this.set();
  }

  clicked(callBack) {
    callBack({
      id: this.id,
      x: this.x,
      y: this.y,
    });
  }

  move() {
    this.set('#ff0000');
    setTimeout(() => {
      this.set(this.color);
    }, 500);
  }

  set() {
    this.ctx.beginPath();
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
    this.ctx.fill();
  }
}

export default DrawMark;
