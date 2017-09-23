const expect = require('chai').expect;
const _ = require('lodash');
const cssProp = require('./css-properties.js');

describe('css-properties', function() {
  describe('has', function() {
    it('should return true for command css properties', function() {
      expect(cssProp.has('background')).to.equal(true);
    })

    it('should return true for weirdly named css properties', function() {
      expect(cssProp.has('@font-face')).to.equal(true);
    })

    it('should return false for bogus css properties', function() {
      expect(cssProp.has('bogus-background')).to.equal(false);
    })
  })

  describe('fuzzyFind', function() {
    it('should find 10 matches for color', function() {
      expect(cssProp.fuzzyFind('color').length).to.equal(10);
    })

    it('should be case insensitive', function() {
      expect(cssProp.fuzzyFind('CoLoR').length).to.equal(10);
    })

    it('should return exact matches', function() {
      expect(cssProp.fuzzyFind('background-color').length).to.equal(1);
      expect(cssProp.fuzzyFind('background-color')[0].name)
        .to.equal('background-color');
    })
  })

  describe('find', function() {
    it('should return just the exact object', function() {
      expect(cssProp.find('background-color').name)
        .to.equal('background-color');
    })

    it('should return if we cannot find the proeprty', function() {
      expect(cssProp.find('bogus-background-color'))
        .to.equal(undefined);
    })
  })
})
