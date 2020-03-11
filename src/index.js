import 'babel-polyfill';
import DrawImage from './DrawImage';
import MakeSlide from './MakeSlide';

export default class PopcornSlide {
  constructor({ canvas, list, width, height, scale = 2 }) {
    this.canvas = canvas;
    this.list = list;
    this.width = width;
    this.height = height;
    this.drawImage = '';
    this.makeSlide = '';
    this.ctx = '';
    this.calc = 0;
    this.scale = scale;

    this.init();
    this.drawShapes();
    this.initEvents();
  }

  init() {
    if (!this.canvas) return;
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.ctx = this.canvas.getContext('2d');

    let imgList = this.list.map((src) => {
      const img = new Image();
      img.src = `${src.url}`;
      const ratio = img.height / img.width;
      const width = this.height / ratio.toFixed(1);
      return { width, height: this.height, img, position: 0 };
    });

    const listWidth = imgList.map(i => i.width);

    imgList = imgList.map((item, i) => {
      const b = item;
      b.position = i !== 0 ?
        listWidth[i - 1] + imgList[i - 1].position : 0; // refatorar esse calculo
      return b;
    });

    this.drawImage = new DrawImage(this.canvas, this.ctx, imgList);
    this.makeSlide = new MakeSlide(
      this.canvas, imgList,
      this.ctx,
      this.width,
      this.height,
      this.scale
    );
  }

  drawShapes() {
    if (!this.canvas) return;
    setTimeout(() => {
      this.drawImage.redraw();
    }, 1000);
  }

  initEvents() {
    let interval;

    if (!this.canvas) return;
    this.makeSlide.mouseMove();

    this.makeSlide.mouseUp(() => clearInterval(interval));

    this.makeSlide.mouseDown(() => {
      interval = setInterval(() => {
        this.drawImage.redraw();
      }, 1000 / 60);
    });

    this.makeSlide.doubleClick(() => this.drawImage.redraw());
  }

  next() {
    this.makeSlide.next(() => this.drawImage.redraw());
  }

  previous() {
    this.makeSlide.previous(() => this.drawImage.redraw());
  }
}
