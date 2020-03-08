class DrawImage {
  constructor(canvas, ctx, list) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.list = list;
    this.trackTransforms(this.ctx);
  }

  redraw() {
    return new Promise((resolve) => {
      if (resolve) {
        // Clear the entire canvas
        const p1 = this.ctx.transformedPoint(0, 0);
        const p2 = this.ctx.transformedPoint(
          this.canvas.width,
          this.canvas.height
        );
        this.ctx.clearRect(p1.x, p1.y, p2.x - p1.x, p2.y - p1.y);

        this.ctx.save();
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.restore();
        this.ctx.stroke();

        this.list.forEach(({ width, height, img, position }) => {
          this.ctx.drawImage(img, position, 0, width, height);
        });
        resolve();
      }
    });
  }
  // eslint-disable-next-line class-methods-use-this
  trackTransforms() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    let xform = svg.createSVGMatrix();

    this.ctx.getTransform = () => xform;

    const savedTransforms = [];
    const save = this.ctx.save;
    this.ctx.save = () => {
      savedTransforms.push(xform.translate(0, 0));
      return save.call(this.ctx);
    };

    const restore = this.ctx.restore;
    this.ctx.restore = () => {
      xform = savedTransforms.pop();
      return restore.call(this.ctx);
    };

    const s = this.ctx.scale;
    this.ctx.scale = (sx, sy) => {
      xform = xform.scaleNonUniform(sx, sy);
      return s.call(this.ctx, sx, sy);
    };

    const rotate = this.ctx.rotate;
    this.ctx.rotate = (radians) => {
      xform = xform.rotate((radians * 180) / Math.PI);
      return rotate.call(this.ctx, radians);
    };

    const translate = this.ctx.translate;
    this.ctx.translate = (dx, dy) => {
      xform = xform.translate(dx, dy);
      return translate.call(this.ctx, dx, dy);
    };

    const transform = this.ctx.transform;
    this.ctx.transform = (a, b, c, d, e, f) => {
      const m2 = svg.createSVGMatrix();
      m2.a = a;
      m2.b = b;
      m2.c = c;
      m2.d = d;
      m2.e = e;
      m2.f = f;
      xform = xform.multiply(m2);
      return transform.call(this.ctx, a, b, c, d, e, f);
    };

    const setTransform = this.ctx.setTransform;
    this.ctx.setTransform = (a, b, c, d, e, f) => {
      xform.a = a;
      xform.b = b;
      xform.c = c;
      xform.d = d;
      xform.e = e;
      xform.f = f;
      return setTransform.call(this.ctx, a, b, c, d, e, f);
    };

    const pt = svg.createSVGPoint();
    this.ctx.transformedPoint = (x, y) => {
      pt.x = x;
      pt.y = y;
      return pt.matrixTransform(xform.inverse());
    };
  }
}

export default DrawImage;
