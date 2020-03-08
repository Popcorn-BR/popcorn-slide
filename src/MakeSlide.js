import Zoom from './Zoom';

class MakeSlide {
  constructor(canvas, list, ctx, width, height, scale) {
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
    this.scaleCalc = 0;
    this.activeZoom = false;
    this.height = height;
    this.classZoom = '';

    this.init();
  }

  init() {
    this.classZoom = new Zoom(this.ctx, this.scale);
  }

  zoom(offX, offY) {
    const params = [
      this.dragStart.x,
      this.dragStart.y,
      this.translateX,
      this.translateY,
    ];

    if (this.activeZoom) {
      const { y, x } = this.classZoom.zoomOut(...params);

      this.translateX = x;
      this.translateY = y;
      this.scaleCalc = 0;
    }


    if (!this.activeZoom) {
      const { x, y } = this.classZoom.zoomIn(...params, offX, offY);

      this.translateX = x;
      this.translateY = y;
      this.scaleCalc = this.scale - 1;
    }


    this.resetExtremities();
  }

  next() {
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
  }

  previous() {
    let calc = 0;
    if (this.position < 1) return;
    calc = ((this.translateX + this.list[this.position - 1].position) * -1) +
    ((this.width / 2) - (this.list[this.position - 1].width / 2));

    if (this.position === 1) {
      calc = this.translateX * -1;
    }
    this.ctx.translate(calc, 0);


    this.position += -1;
    this.translateX += calc;
  }

  doubleClick() {
    this.canvas.addEventListener('dblclick', (evt) => {
      const x = evt.offsetX || evt.pageX - this.canvas.offsetLeft;
      const y = evt.offsetY || evt.pageY - this.canvas.offsetTop;

      this.dragStart = this.ctx.transformedPoint(x, y);
      this.zoom(evt.offsetX, evt.offsetY);
      this.activeZoom = !this.activeZoom;
      this.dragStart = null;
      this.canvas.style.cursor = 'default';
    }, false);
  }
  mouseDown() {
    this.canvas.addEventListener('mousedown', (evt) => {
      const x = evt.offsetX || evt.pageX - this.canvas.offsetLeft;
      const y = evt.offsetY || evt.pageY - this.canvas.offsetTop;
      this.dragStart = this.ctx.transformedPoint(x, y);
    }, false);
  }

  mouseUp() {
    this.canvas.addEventListener('mouseup', () => {
      this.dragStart = null;
      this.canvas.style.cursor = 'default';
      this.resetExtremities();
    }, false);
  }

  mouseMove() {
    this.canvas.addEventListener('mousemove', (event) => {
      if (!this.dragStart) return;

      const lastX = event.offsetX || event.pageX - this.canvas.offsetLeft;
      const lastY = event.offsetY || event.pageY - this.canvas.offsetTop;
      const pt = this.ctx.transformedPoint(lastX, lastY);


      this.dragableSlide(pt);


      this.position = this.getPointX();


      this.canvas.style.cursor = 'grabbing';
    }, false);
  }

  dragableSlide(pt) {
    let x = (pt.x - this.dragStart.x);
    let y = (pt.y - this.dragStart.y);

    if (this.translateX < this.getLimitX()) { x = -0.4; }
    if (this.translateX > 0) { x = 0.4; }

    if ((this.translateY <= this.getLimitY()) && y < 0) { y = this.activeZoom ? -0.4 : 0; }
    if ((this.translateY >= 0) && y > 0) { y = this.activeZoom ? 0.4 : 0; }

    this.translateX += x;
    this.translateY += y;

    this.ctx.translate(x, y);
  }

  getLimitX() {
    return (
      -(this.list[this.list.length - 1].position - this.width)
      - this.list[this.list.length - 1].width - ((this.width / this.scale) * this.scaleCalc)
    );
  }
  getLimitY() {
    return (-((this.height / 2) * this.scaleCalc));
  }

  getPosition() {
    const point = this.list.findIndex((a, i) => a.position >= (this.width / 2) &&
    (this.width / 2) <= this.list[i + 1].position);
    return point;
  }
  getPointX() {
    if (this.translateX <= -this.list[this.list.length - 2].position) return this.list.length - 1;
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

    if (this.translateY <= this.getLimitY()) {
      this.ctx.translate(0, (this.getLimitY() - this.translateY));
      this.translateY += (this.getLimitY() - this.translateY);
    }

    if (this.translateY >= 0) {
      this.ctx.translate(0, (this.translateY) * -1);
      this.translateY += (this.translateY) * -1;
    }
  }
}

export default MakeSlide;
