$ = jQuery = window.jQuery = window.$ = require('jQuery');
var _ = require('lodash');
var Bounce = require('bounce.js');
var velocity = require('velocity-animate');
var moment = require('moment');

var cubicBezierEasings = {
  bounceOut: [0.680, -0.550, 0.265, 1.550]
}

var bounceAnimations = {

  // Spin in and get bigger
  contactAnimation: new Bounce().scale({
    from: { x: 0, y: 0 },
    to: { x: 1, y: 1 },
    stiffness: 1,
    bounces: 4,
    duration: 1500,
  }).rotate({
    from: 180,
    to: 360,
    duration: 2000,
    bounce: 5
  }),

  // content slide out
}

var slideOutElement = function(selector, done) {
  // Apply a Bouncejs transformation to the .content div
  if (!$(selector).length) return;

  $('body').addClass('overflow-hidden');

  var destX = $(window).width();
  var srcX = $(selector).offset().left;
  var srcY = destY = 0;

  $(selector).find('.row').each(function(index) {
    var $obj = $(this);
    setTimeout(function() {
      $obj.velocity({
        'left': destX
      }, cubicBezierEasings.bounceOut, 1000, function() {
        $obj.remove();
        if ($(selector).find('.row').length) return;

        $(selector).remove();
        $('body').removeClass('overflow-hidden');

        if (done && typeof done === 'function') {
          done();
        }
      });
    }, 500 * index);
  });
}

var slideDownElement = function(selector, done) {

  if (!$(selector).length) return;

  var currentTop = $(selector).offset().top;

  $(selector).velocity({
    'opacity': 0,
    'top': currentTop + 100,
  }, 500, function() {
    $(selector).remove();

    if (done && typeof done === 'function') {
      done();
    }
  });
}

module.exports = {
  bounceAnimations: bounceAnimations,
  slideOutElement: slideOutElement
}