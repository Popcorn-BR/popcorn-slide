import 'babel-polyfill';
import DrawImage from './DrawImage';
import MakeSlide from './MakeSlide';
import DrawMark from './DrawMark';


class Service {
  constructor(canvas = null, list, width, height) {
    this.canvas = canvas;
    this.list = list;
    this.width = width;
    this.height = height;
    this.drawImage = '';
    this.makeSlide = '';
    this.markers = [];
    this.ctx = '';
    this.translateX = 0;

    this.init();
    this.drawShapes();
    this.initEvents();
  }

  async init() {
    if (!this.canvas) return;
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    const ctx = this.canvas.getContext('2d');

    let imgList = this.list.map((src) => {
      const img = new Image();
      img.src = `${src}`;
      const ratio = img.height / img.width;
      const width = this.height / ratio.toFixed(1);

      return { width, height: this.height, img, position: 0, markers: [] };
    });

    const listWidth = imgList.map(i => i.width);

    imgList = imgList.map((item, i) => {
      const b = item;
      b.position = i !== 0 ?
        listWidth[i - 1] + imgList[i - 1].position : 0; // refatorar esse calculo

      b.markers = [b.position, 50, 100, 100];

      return b;
    });

    this.drawImage = new DrawImage(this.canvas, ctx, imgList);
    this.makeSlide = new MakeSlide(this.canvas, imgList, ctx, this.width);
    this.markers = imgList.map(
      (marker, i) =>
        new DrawMark(
          ctx,
          marker.markers[0],
          marker.markers[1],
          marker.markers[2],
          marker.markers[3],
          'rgba(244, 67, 54, 0.5)',
          i,
        ),
    );
  }

  drawShapes() {
    if (!this.canvas) return;
    setInterval(async () => {
      await this.drawImage.redraw();
      this.recreateMarkers();
    }, 1000 / 60);
  }

  recreateMarkers() {
    this.markers.forEach(element => element.set());
  }

  markersClicked(callBack) {
    this.canvas.addEventListener('click', (e) => {
      // eslint-disable-next-line one-var
      const x = (this.translateX - e.offsetX) * -1,
        y = e.offsetY;
      this.markers.forEach((element) => {
        if (
          x > element.x &&
              x < element.x + 100 &&
              y > element.y &&
              y < element.y + 100
        ) {
          element.clicked(resp => callBack(resp));
        }
      });
    });
  }

  async initEvents() {
    if (!this.canvas) return;
    this.makeSlide.mouseMove((x) => {
      this.translateX = x;
    });

    this.makeSlide.mouseUp((x) => {
      this.translateX = x;
    });

    this.makeSlide.mouseDown();

    this.makeSlide.doubleClick((x) => {
      this.translateX = x;
    });
  }

  next() {
    this.makeSlide.next((x) => {
      this.translateX = x;
    });
  }

  previous() {
    this.makeSlide.previous((x) => {
      this.translateX = x;
    });
  }
}

export default Service;
