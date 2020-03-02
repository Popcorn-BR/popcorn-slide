import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';

import { PopcornCanvas } from '../src/Popcorn';

chai.use(sinonChai);
global.fetch = require('node-fetch');

describe('Popcorn', () => {
  const popcorn = new PopcornCanvas({ canvas: null, list: [], width: 1, height: 1 });
  describe('smoke test', () => {
    it('should have init method', () => {
      expect(popcorn.init).to.exist;
    });

    it('should have drawShapes method', () => {
      expect(popcorn.drawShapes).to.exist;
    });

    it('should have recreateMarkers method', () => {
      expect(popcorn.recreateMarkers).to.exist;
    });

    it('should have markersClicked method', () => {
      expect(popcorn.markersClicked).to.exist;
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
  });
});
