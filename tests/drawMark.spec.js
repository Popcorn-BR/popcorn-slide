import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';

import DrawMark from '../src/DrawMark';

chai.use(sinonChai);
global.fetch = require('node-fetch');

describe('DrawImage', () => {
  const drawMark = new DrawMark();
  describe('smoke test', () => {
    it('should have clicked method', () => {
      expect(drawMark.clicked).to.exist;
    });

    it('should have move method', () => {
      expect(drawMark.move).to.exist;
    });

    it('should have set method', () => {
      expect(drawMark.set).to.exist;
    });
  });
});
