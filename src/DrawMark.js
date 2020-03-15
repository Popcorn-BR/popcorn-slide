class DrawMark {
  constructor(ctx, marker, position, width, height, color) {
    this.ctx = ctx;
    this.marker = marker;
    this.position = position;
    this.width = width;
    this.height = height;
    this.color = color;
    this.x = 0;
    this.y = 0;
    this.limitX = 0;
    this.limiteY = 0;

    this.set();
  }

  clicked(callBack) {
    const { id } = this.marker;
    callBack({ id });
  }

  move() {
    this.set('#ff0000');
    setTimeout(() => {
      this.set(this.color);
    }, 500);
  }

  set() {
    if (!this.ctx) return;
    const { left, top, width, height } = this.createPosition();

    this.x = left;
    this.y = top;
    this.limitX = left + width;
    this.limitY = top + height;

    this.ctx.beginPath();
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(left, top, width, height);
    this.ctx.fill();
  }

  createPosition() {
    const { x, y, width, height } = this.marker.coordinate;
    const data = {
      left: this.width * (x / 100) + this.position,
      top: this.height * (y / 100),
      width: ((width - x) / 100) * this.width,
      height: ((height - y) / 100) * this.height,
    };

    return data;
  }
}

export default DrawMark;
