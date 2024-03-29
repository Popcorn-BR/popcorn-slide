import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';

import DrawImage from '../src/DrawImage';

chai.use(sinonChai);

describe('DrawImage', () => {
  const drawImage = new DrawImage();
  describe('smoke test', () => {
    it('should have redraw method', () => {
      expect(drawImage.redraw).to.exist;
    });

    it('should have trackTransforms method', () => {
      expect(drawImage.trackTransforms).to.exist;
    });
  });

  describe('Popcorn.DrawImage.redraw', () => {
    it('should return true', () => {});
  });

  describe('Popcorn.DrawImage.redraw', () => {
    it('should return true', () => {
      const call = drawImage.redraw();
    });
  });

  describe('Popcorn.DrawImage.redraw', () => {
    it('should return true', () => {
      const call = drawImage.trackTransforms();
    });
  });
});
