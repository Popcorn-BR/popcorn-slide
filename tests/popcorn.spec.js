import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';

import PopcornSlide from '../src/index';

const jsdom = require('jsdom');

const { JSDOM } = jsdom;

const { document } = new JSDOM(`...`).window;

chai.use(sinonChai);

describe('Popcorn', () => {
  const canvas = document.createElement('canvas');
  const list = [
    {
      url:
        'https://upload.wikimedia.org/wikipedia/pt/thumb/6/6d/Alita-anjo-de-combate-posterr.jpg/250px-Alita-anjo-de-combate-posterr.jpg',
    },
    {
      url:
        'https://www.diariodetaubateregiao.com.br/dt/wp-content/uploads/2019/02/artigo-05-1.jpg',
    },
    {
      url:
        'https://sucodemanga.com.br/wp-content/uploads/2019/03/alita-anjo-de-combate-1.jpg',
    },
    {
      url:
        'https://www.diariodetaubateregiao.com.br/dt/wp-content/uploads/2019/02/artigo-05-1.jpg',
    },
    {
      url: 'https://br.web.img3.acsta.net/pictures/19/01/31/11/55/2714336.jpg',
    },
    {
      url:
        'https://upload.wikimedia.org/wikipedia/pt/thumb/6/6d/Alita-anjo-de-combate-posterr.jpg/250px-Alita-anjo-de-combate-posterr.jpg',
    },
    {
      url: 'https://br.web.img3.acsta.net/pictures/19/01/31/11/55/2714336.jpg',
    },
    {
      url:
        'https://sucodemanga.com.br/wp-content/uploads/2019/03/alita-anjo-de-combate-1.jpg',
    },
  ];
  const popcorn = new PopcornSlide({
    canvas,
    list,
    width: 1400,
    height: 662,
  });
  describe('smoke test', () => {
    it('should have init method', () => {
      expect(popcorn.init).to.exist;
    });

    it('should have drawShapes method', () => {
      expect(popcorn.drawShapes).to.exist;
    });

    it('should have initEvents method', () => {
      expect(popcorn.initEvents).to.exist;
    });

    it('should have next method', () => {
      expect(popcorn.next).to.exist;
    });

    it('should have previous method', () => {
      expect(popcorn.previous).to.exist;
    });

    it('should have getImages method', () => {
      expect(popcorn.getImages).to.exist;
    });
  });
});
