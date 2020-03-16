import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';

import Zoom from '../src/Zoom';

chai.use(sinonChai);

describe('Popcorn', () => {
  const zoom = new Zoom();
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

  describe('Popcorn.Zoom.init', () => {
    it('should have init method', () => {
      const call = zoom.init();
    });
  });
  describe('Popcorn.Zoom.zoomIn', () => {
    it('should have zoomIn method', () => {
      const call = zoom.zoomIn();
    });
  });

  describe('Popcorn.Zoom.zoomOut', () => {
    it('should have zoomOut method', () => {
      const call = zoom.zoomOut();
    });
  });

  describe('Popcorn.Zoom.updateParams', () => {
    it('should have updateParams method', () => {
      const call = zoom.updateParams();
    });
  });

  describe('Popcorn.Zoom.getY', () => {
    it('should have getY method', () => {
      const call = zoom.getY();
    });

    it('should have getX method', () => {
      const call = zoom.getX();
    });
  });

  describe('Popcorn.Zoom.getX', () => {
    it('should have getX method', () => {
      const call = zoom.getX();
    });
  });
});
