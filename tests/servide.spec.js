import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';

import Service from '../src/Service';

chai.use(sinonChai);
global.fetch = require('node-fetch');

describe('Service', () => {
  const service = new Service(null, [], 1, 1);
  describe('smoke test', () => {
    it('should have init method', () => {
      expect(service.init).to.exist;
    });

    it('should have drawShapes method', () => {
      expect(service.drawShapes).to.exist;
    });

    it('should have recreateMarkers method', () => {
      expect(service.recreateMarkers).to.exist;
    });

    it('should have markersClicked method', () => {
      expect(service.markersClicked).to.exist;
    });

    it('should have initEvents method', () => {
      expect(service.initEvents).to.exist;
    });

    it('should have next method', () => {
      expect(service.next).to.exist;
    });

    it('should have previous method', () => {
      expect(service.previous).to.exist;
    });
  });
});
