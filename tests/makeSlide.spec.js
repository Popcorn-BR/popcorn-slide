import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';

import MakeSlide from '../src/MakeSlide';

chai.use(sinonChai);
global.fetch = require('node-fetch');

describe('MakeSlide', () => {
  const makeSlide = new MakeSlide();
  describe('smoke test', () => {
    it('should have zoom method', () => {
      expect(makeSlide.zoom).to.exist;
    });

    it('should have next method', () => {
      expect(makeSlide.next).to.exist;
    });

    it('should have previous method', () => {
      expect(makeSlide.previous).to.exist;
    });

    it('should have doubleClick method', () => {
      expect(makeSlide.doubleClick).to.exist;
    });

    it('should have mouseDown method', () => {
      expect(makeSlide.mouseDown).to.exist;
    });

    it('should have mouseUp method', () => {
      expect(makeSlide.mouseUp).to.exist;
    });

    it('should have mouseMove method', () => {
      expect(makeSlide.mouseMove).to.exist;
    });

    it('should have onPointerUp method', () => {
      expect(makeSlide.onPointerUp).to.exist;
    });

    it('should have getLimitX method', () => {
      expect(makeSlide.getLimitX).to.exist;
    });

    it('should have getPosition method', () => {
      expect(makeSlide.getPosition).to.exist;
    });

    it('should have getPointX method', () => {
      expect(makeSlide.getPointX).to.exist;
    });

    it('should have resetExtremities method', () => {
      expect(makeSlide.resetExtremities).to.exist;
    });
  });
});
