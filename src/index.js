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
  }

  async init() {
    if (!this.canvas) return;
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.ctx = this.canvas.getContext('2d');

    let imgList = await Promise.all(this.getImages(this.list));

    const listWidth = imgList.map(i => i.width);

    imgList = imgList.map((item, i) => {
      const b = item;
      b.position = i !== 0 ? listWidth[i - 1] + imgList[i - 1].position : 0; // refatorar esse calculo
      return b;
    });

    this.drawImage = new DrawImage(this.canvas, this.ctx, imgList);
    this.makeSlide = new MakeSlide(
      this.canvas,
      imgList,
      this.ctx,
      this.width,
      this.height,
      this.scale
    );

    this.drawShapes();
    this.initEvents();
  }

  drawShapes() {
    if (!this.canvas) return;
    this.drawImage.redraw();
  }

  getImages(list) {
    if (!list || list.length === 0) return list;
    return list.map(
      src =>
        new Promise((resolve, reject) => {
          const img = new Image();
          img.src = `${src.url}`;
          img.onload = () => {
            const ratio = img.height / img.width;
            const width = this.height / ratio.toFixed(1);
            resolve({ width, height: this.height, img, position: 0 });
          };

          img.onerror = reject;
        })
    );
  }

  initEvents() {
    let interval;

    if (!this.canvas) return;
    this.makeSlide.mouseMove();

    this.makeSlide.mouseUp(() => {
      this.drawShapes();
      clearInterval(interval);
    });

    this.makeSlide.mouseDown(() => {
      interval = setInterval(() => {
        this.drawImage.redraw();
      }, 1000 / 60);
    });

    this.makeSlide.doubleClick(() => this.drawShapes());
  }

  next() {
    this.makeSlide.next(() => this.drawShapes());
  }

  previous() {
    this.makeSlide.previous(() => this.drawShapes());
  }
}
