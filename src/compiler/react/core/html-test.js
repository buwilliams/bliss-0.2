var html = require('./html.js');

describe('html', function() {
  describe('getAttributes', function() {
    it('should be empty if no attributes', function() {
      expect(html.getAttributes({})).toEqual('');
    });

    it('should be empty if no attributes', function() {
      expect(html.getAttributes()).toEqual('');
    });

    it('should write out attributes', function() {
      expect(html.getAttributes({"href": "#"})).toEqual(' href="#"');
    });

    it('should write multiple attributes', function() {
      var attrs = {
        "href": "#",
        "class": "nav"
      };
      expect(html.getAttributes(attrs)).toEqual(' href="#" class="nav"');
    });
  });

  describe('openTag', function() {
    it('should not render text with null text', function() {
      expect(html.openTag('div', null, null)).toEqual('<div>');
    });

    it('should open html tag', function() {
      expect(html.openTag('a')).toEqual('<a>');
    });

    it('should write text', function() {
      expect(html.openTag('a', {}, 'hello')).toEqual('<a>hello');
    });

    it('should write text with null attrs', function() {
      expect(html.openTag('a', null, 'hello')).toEqual('<a>hello');
    });

    it('should write attributes in tag', function() {
      expect(html.openTag('a', {"href": "#"})).toEqual('<a href="#">');
    });

    it('should write attributes in tag', function() {
      var attrs = {
        "href": "#",
        "class": "nav"
      };

      expect(html.openTag('a', attrs)).toEqual('<a href="#" class="nav">');
    });
  });

  describe('closeTag', function() {
    it('should close html tag', function() {
      expect(html.closeTag('a')).toEqual('</a>');
    });
  });

  describe('openHtml', function() {
    it('should output correct HTML5', function() {
      var htmlTemplate = '<!DOCTYPE html><html><head><meta charset="utf-8"><title></title></head><body>';
      expect(html.openHtml()).toEqual(htmlTemplate);
    });

    it('should output correct HTML5 with title', function() {
      var htmlTemplate = '<!DOCTYPE html><html><head><meta charset="utf-8"><title>bliss</title></head><body>';
      expect(html.openHtml('bliss')).toEqual(htmlTemplate);
    });
  });

  describe('closeHtml', function() {
    it('should output correct closing tags for HTML5', function() {
      var htmlTemplate = '</body></html>';
      expect(html.closeHtml()).toEqual(htmlTemplate);
    });
  });

  describe('getExternalCss', function() {
    it('should give empty string is argument is undefined', function() {
      expect(html.getExternalCss()).toEqual('');
    });

    it('should give empty string is argument is null', function() {
      expect(html.getExternalCss(null)).toEqual('');
    });

    it('should give empty string is argument is empty array', function() {
      expect(html.getExternalCss([])).toEqual('');
    });

    it('should return one link tag', function() {
      var urls = ['/css/master.css'];
      var expected = '<link href="/css/master.css" rel="stylesheet">';
      expect(html.getExternalCss(urls)).toEqual(expected);
    });

    it('should return two link tags', function() {
      var urls = ['/css/master.css', '/css/report.css'];
      var expected = '<link href="/css/master.css" rel="stylesheet">'+
                     '<link href="/css/report.css" rel="stylesheet">';
      expect(html.getExternalCss(urls)).toEqual(expected);
    });
  });

  describe('getExternalJs', function() {
    it('should give empty string is argument is undefined', function() {
      expect(html.getExternalJs()).toEqual('');
    });

    it('should give empty string is argument is null', function() {
      expect(html.getExternalJs(null)).toEqual('');
    });

    it('should give empty string is argument is empty array', function() {
      expect(html.getExternalJs([])).toEqual('');
    });

    it('should return one link tag', function() {
      var urls = ['/js/master.js'];
      var expected = '<script src="/js/master.js" charset="utf-8"></script>';
      expect(html.getExternalJs(urls)).toEqual(expected);
    });

    it('should return two link tags', function() {
      var urls = ['/js/master.js', '/js/report.js'];
      var expected = '<script src="/js/master.js" charset="utf-8"></script>'+
                     '<script src="/js/report.js" charset="utf-8"></script>';
      expect(html.getExternalJs(urls)).toEqual(expected);
    });
  });
});
