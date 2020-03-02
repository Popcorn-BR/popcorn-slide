class MakeSlide {
  constructor(canvas, list, ctx, width, scale = 1) {
    this.canvas = canvas;
    this.list = list;
    this.ctx = ctx;
    this.position = 0;
    this.width = width;
    this.translateX = 0;
    this.translateY = 0;
    this.dragStart = null;
    this.tappedCount = 0;
    this.tappedCount = 0;
    this.scale = scale;
    this.activeZoom = false;
    this.oldDBClick = 0;
    this.oldTranslateX = 0;
  }

  zoom(clicks) {
    // eslint-disable-next-line no-restricted-properties
    const factor = Math.pow(2, clicks);
    this.ctx.translate(this.dragStart.x, this.dragStart.y);
    this.ctx.scale(factor, factor);
    this.ctx.translate(-this.dragStart.x, -this.dragStart.y);
    if (this.oldDBClick && clicks === -1) {
      let x = (this.oldDBClick - this.dragStart.x);
      if (this.oldTranslateX !== this.translateX) {
        const t = this.oldTranslateX - this.translateX;
        let newX = x;
        if ((t > 0 && x < 0) || (t < 0 && x > 0)) { newX = x * -1; }

        x = (newX - t) * -1;
      }
      this.translateX += -x;
    }
    this.oldDBClick = this.dragStart.x;
    this.oldTranslateX = this.translateX;
    this.resetExtremities();
  }

  next(callBack) {
    let calc = 0;

    // centraliza as imagens que não estão nas extremidades
    // centers images that are not at the edges
    if (this.position !== 0 && this.position !== (this.list.length - 1)) {
      calc = ((this.translateX + this.list[this.position + 1].position) * -1) +
       ((this.width / 2) - (this.list[this.position + 1].width / 2));

      this.position += 1;
    }

    // ajusta a ultima imagem dentro do limite
    // adjusts the last image within the boundary
    if (this.position === (this.list.length - 1)) {
      calc = (this.translateX - this.getLimitX()) * -1;
    }

    // centralizar a primeira imagem
    // center the first image
    if (this.position === 0) {
      calc = (((-this.list[this.getPosition()].position) +
       (this.width / 2)) - (this.list[this.getPosition()].width / 2));

      this.position = this.getPosition();
    }

    this.ctx.translate(calc, 0);
    this.translateX += calc;

    callBack(this.translateX);
  }

  previous(callBack) {
    let calc = 0;
    calc = ((this.translateX + this.list[this.position - 1].position) * -1) +
    ((this.width / 2) - (this.list[this.position - 1].width / 2));

    if (this.position === 1) {
      calc = this.translateX * -1;
    }
    this.ctx.translate(calc, 0);


    this.position += -1;
    this.translateX += calc;

    callBack(this.translateX);
  }

  doubleClick(callBack) {
    this.canvas.addEventListener('dblclick', (evt) => {
      const x = evt.offsetX || evt.pageX - this.canvas.offsetLeft;
      const y = evt.offsetY || evt.pageY - this.canvas.offsetTop;

      this.dragStart = this.ctx.transformedPoint(x, y);
      // console.log(this.dragStart.x);
      this.zoom(this.activeZoom ? -1 : 1);
      this.scale = this.activeZoom ? 1 : 5;
      this.activeZoom = !this.activeZoom;
      this.dragStart = null;
      this.canvas.style.cursor = 'default';

      callBack(this.translateX);
    }, false);
  }
  mouseDown() {
    this.canvas.addEventListener('mousedown', (evt) => {
      const x = evt.offsetX || evt.pageX - this.canvas.offsetLeft;
      const y = evt.offsetY || evt.pageY - this.canvas.offsetTop;
      this.dragStart = this.ctx.transformedPoint(x, y);
    }, false);
  }

  mouseUp(callBack) {
    this.canvas.addEventListener('mouseup', () => {
      this.dragStart = null;
      this.canvas.style.cursor = 'default';
      this.resetExtremities();
      callBack(this.translateX);
    }, false);
  }

  mouseMove(callBack) {
    this.canvas.addEventListener('mousemove', (event) => {
      const lastX = event.offsetX || event.pageX - this.canvas.offsetLeft;
      const lastY = event.offsetY || event.pageY - this.canvas.offsetTop;
      const pt = this.ctx.transformedPoint(lastX, lastY);


      if (!this.dragStart) return;
      this.position = this.getPointX();
      let x = (pt.x - this.dragStart.x);
      if (this.translateX < this.getLimitX()) { x = -0.5; }
      if (this.translateX > 0) { x = 0.5; }
      this.translateX += x;
      this.canvas.style.cursor = 'grabbing';

      this.ctx.translate(x, 0);
      callBack(this.translateX);
    }, false);
  }

  onPointerUp() {
    const currTimeStamp = Date.now();
    // Only when no sliding two far is considered as a valid tap
    if (currTimeStamp - this.lastTapTimestamp < 300) {
      this.tappedCount += 1;
    } else {
      this.tappedCount = 1;
    }
    this.lastTapTimestamp = Date.now();
    if (this.tappedCount === 2) {
      this.tappedCount = 0; // clear count on maximum tap count
    }
  }

  getLimitX() {
    return (
      -(this.list[this.list.length - 1].position - this.width)
      - this.list[this.list.length - 1].width
    );
  }

  getPosition() {
    const point = this.list.findIndex((a, i) => a.position >= (this.width / 2) &&
    (this.width / 2) <= this.list[i + 1].position);
    return point;
  }
  getPointX() {
    const point = this.list.findIndex((a, i) => a.position >= (this.translateX * -1) &&
    (this.translateX * -1) <= this.list[i + 1].position);
    return point;
  }

  resetExtremities() {
    if (this.translateX <= this.getLimitX()) {
      this.ctx.translate((this.translateX - this.getLimitX()) * -1, 0);
      this.translateX += (this.translateX - this.getLimitX()) * -1;
    }

    if (this.translateX >= 0) {
      this.ctx.translate((this.translateX) * -1, 0);
      this.translateX += (this.translateX) * -1;
    }
  }
}

export default MakeSlide;
