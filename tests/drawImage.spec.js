import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';

import DrawImage from '../src/DrawImage';

chai.use(sinonChai);
global.fetch = require('node-fetch');

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
});
