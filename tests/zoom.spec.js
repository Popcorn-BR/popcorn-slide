import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';

import Zoom from '../src/Zoom';

chai.use(sinonChai);

describe('Popcorn', () => {
  const zoom = new Zoom({
    canvas: null,
    list: [],
    width: 1,
    height: 1,
  });
  describe('smoke test', () => {
    it('should have init method', () => {
      expect(zoom.init).to.exist;
    });

    it('should have zoomIn method', () => {
      expect(zoom.zoomIn).to.exist;
    });

    it('should have zoomOut method', () => {
      expect(zoom.zoomOut).to.exist;
    });

    it('should have updateParams method', () => {
      expect(zoom.updateParams).to.exist;
    });

    it('should have getY method', () => {
      expect(zoom.getY).to.exist;
    });

    it('should have getX method', () => {
      expect(zoom.getX).to.exist;
    });
  });
});
