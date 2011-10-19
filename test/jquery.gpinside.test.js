var $el, $spacer, gpInside;

module("adjust", {
  setup: function() {
    $el = $('#item1');
    $spacer = $('<div />')
      .css({ height: 3000, width: 3000 })
      .appendTo('body');
    gpInside = com.ginpen.gpInside;
  },
  teardown: function() {
    $el.attr('style', '');
    $spacer.remove();
  }
});
test('get values', function() {
  $el.css({
    borderStyle: 'solid',
    borderWidth: '1px 2px 3px 4px',
    height: '5px',
    margin: '6px 7px 8px 9px',
    left: '10px',
    padding: '11px 12px 13px 14px',
    position: 'absolute',
    top: '15px',
    width: '16px'
  });
  $(document).scrollLeft(100);
  $(document).scrollTop(101);

  var settings = {};
  var vals = gpInside._getValues($el, settings);
  ok(vals.clientHeight > 0);
  ok(vals.clientWidth > 0);
  equals(vals.height, 1 + 3 + 5 + 6 + 8 + 11 + 13);
  equals(vals.left, 10 + 9);
  equals(vals.scrollLeft, 100);
  equals(vals.scrollTop, 101);
  equals(vals.top, 15 + 6);
  equals(vals.width, 2 + 4 + 7 + 9 + 12 + 14 + 16);

  var settings = {left: 100, top: 101};
  var vals = gpInside._getValues($el, settings);
  equals(vals.left, 100);
  equals(vals.top, 101);
});

test('calclate contain positions', function() {
  var v = {
    clientHeight: 110,
    clientWidth: 100,
    height: 50,
    left: 10,
    scrollLeft: 0,
    scrollTop: 0,
    top: 20,
    width: 60
  };
  var settings;
  gpInside._calclateContainPosition(v, $el, settings);
  equals(v.left, 10);
  equals(v.top, 20);

  var v = {
    clientHeight: 110,
    clientWidth: 100,
    height: 50,
    left: 50,
    top: 40,
    width: 50
  };
  var settings;
  gpInside._calclateContainPosition(v, $el, settings);
  equals(v.left, 50);
  equals(v.top, 40);

  var v = {
    clientHeight: 100,
    clientWidth: 110,
    height: 50,
    left: 110,
    scrollLeft: 0,
    scrollTop: 0,
    top: 100,
    width: 60
  };
  var settings;
  gpInside._calclateContainPosition(v, $el, settings);
  equals(v.left, 110 - 60);
  equals(v.top, 100 - 50);

  var v = {
    clientHeight: 10,
    clientWidth: 10,
    height: 50,
    left: 10,
    scrollLeft: 0,
    scrollTop: 0,
    top: 20,
    width: 60
  };
  var settings;
  gpInside._calclateCenterPosition(v, $el, settings);
  equals(v.left, 0);
  equals(v.top, 0);
});

test('calclate center positions', function() {
  var v = {
    clientHeight: 110,
    clientWidth: 100,
    height: 50,
    left: 10,
    scrollLeft: 0,
    scrollTop: 0,
    top: 20,
    width: 60
  };
  var settings;
  gpInside._calclateCenterPosition(v, $el, settings);
  equals(v.left, 20);
  equals(v.top, 30);

  var v = {
    clientHeight: 10,
    clientWidth: 10,
    height: 50,
    left: 10,
    scrollLeft: 0,
    scrollTop: 0,
    top: 20,
    width: 60
  };
  var settings;
  gpInside._calclateCenterPosition(v, $el, settings);
  equals(v.left, 0);
  equals(v.top, 0);
});

test('calclate contextmenu positions', function() {
  var v = {
    clientHeight: 110,
    clientWidth: 100,
    height: 50,
    left: 10,
    scrollLeft: 0,
    scrollTop: 0,
    top: 20,
    width: 60
  };
  var settings;
  gpInside._calclateContextmenuPosition(v, $el, settings);
  equals(v.left, 10);
  equals(v.top, 20);

  var v = {
    clientHeight: 110,
    clientWidth: 100,
    height: 50,
    left: 40,
    scrollLeft: 10,
    scrollTop: 10,
    top: 60,
    width: 60
  };
  var settings;
  gpInside._calclateContextmenuPosition(v, $el, settings);
  equals(v.left, 40);
  equals(v.top, 60);

  var v = {
    clientHeight: 110,
    clientWidth: 100,
    height: 50,
    left: 140,
    scrollLeft: 110,
    scrollTop: 110,
    top: 160,
    width: 60
  };
  var settings;
  gpInside._calclateContextmenuPosition(v, $el, settings);
  equals(v.left, 140);
  equals(v.top, 160);

  var v = {
    clientHeight: 110,
    clientWidth: 100,
    height: 50,
    left: 90,
    scrollLeft: 0,
    scrollTop: 0,
    top: 100,
    width: 60
  };
  var settings;
  gpInside._calclateContextmenuPosition(v, $el, settings);
  equals(v.left, 90 - 60);
  equals(v.top, 100 - 50);

  var v = {
    clientHeight: 10,
    clientWidth: 10,
    height: 50,
    left: 90,
    scrollLeft: 0,
    scrollTop: 0,
    top: 100,
    width: 60
  };
  var settings;
  gpInside._calclateContextmenuPosition(v, $el, settings);
  equals(v.left, 0);
  equals(v.top, 0);

});

test('set positions', function() {
  var v = {
    left: 100,
    top: 110
  };
  var settings;
  gpInside._setPosition(v, $el, settings);
  equals($el[0].style.left, '100px');
  equals($el[0].style.top, '110px');
});

/*
var $el, gpInside;
module('core', {
  setup: function() {
    $el = $('#item1');
    gpInside = com.ginpen.gpInside;
  },
  teardown: function() {
    $('#item1').gpInside('destroy');
  }
});

test("merge settings", function() {
  var setting = gpInside.mergeSettings(undefined);
  same(setting.appearance, true);
  same(setting.parent, document);
  same(setting.type, 'contained');
});

test('set up', function() {
  $el.gpInside();
  deepEqual($el.data('gpInside'), gpInside.DEFAULT);
});

test('clean up', function() {
  $el.gpInside();
  $el.gpInside('destroy');
  same($el.data('gpInside'), undefined);
});

module("contained", {
  x_teardown: function() {
  }
});

test('dont move', function() {
});
*/
