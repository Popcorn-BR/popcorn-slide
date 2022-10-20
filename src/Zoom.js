class Zoom {
  constructor(ctx, scale) {
    this.ctx = ctx;
    this.scale = scale;
    this.oldX = 0;
    this.oldY = 0;
    this.oldTranslateX = 0;
    this.oldTranslateY = 0;
    this.oldOffX = 0;
    this.oldOffY = 0;
  }

  zoomIn(x, y, translateX, translateY, offX, offY) {
    if (!this.ctx) return true;
    const factor = Math.pow(this.scale, 1);
    let newTranslateX = translateX;
    let newTranslateY = translateY;

    this.ctx.translate(x, y);
    this.ctx.scale(factor, factor);
    this.ctx.translate(-x, -y);

    newTranslateX += -(offX / this.scale);
    newTranslateY += -(offY / this.scale);

    this.oldOffX = offX;
    this.oldOffY = offY;

    this.updateParams(x, newTranslateX, y, newTranslateY);

    return { x: newTranslateX, y: newTranslateY };
  }

  zoomOut(x, y, translateX, translateY) {
    if (!this.ctx) return true;
    const factor = Math.pow(this.scale, -1);
    this.ctx.translate(x, y);
    this.ctx.scale(factor, factor);
    this.ctx.translate(-x, -y);

    const newTranslateX = this.getX(x, translateX, this.oldX);

    const newTranslateY = this.getY(y, translateY, this.oldY);

    this.updateParams(x, newTranslateX, y, newTranslateY);

    return { x: newTranslateX, y: newTranslateY };
  }

  updateParams(x, translateX, y, translateY) {
    this.oldX = x;
    this.oldTranslateX = translateX;

    this.oldY = y;
    this.oldTranslateY = translateY;
  }

  getY(y, translate, oldY) {
    let Y = y - oldY;
    let Translate = translate;

    if (this.oldTranslateY !== Translate) {
      const t = this.oldTranslateY - Translate;
      let newY = Y;
      if ((t > 0 && Y < 0) || (t < 0 && Y > 0)) {
        newY = Y;
      }

      Y = newY - t;
    }

    Translate += Y + this.oldOffY / this.scale;

    return Translate;
  }

  getX(x, translate, oldX) {
    let newX = oldX - x;
    let newTranslate = translate;

    if (this.oldTranslateX !== newTranslate) {
      const t = this.oldTranslateX - newTranslate;

      newX = (newX * -1 - t) * -1; // refatorar essa parte do codigo
    }

    newTranslate += -newX + this.oldOffX / this.scale;
    return newTranslate;
  }
}

export default Zoom;
