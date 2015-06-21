import $ from './$';
import _each from 'lodash/collections/forEach';
import Bounce from 'bounce.js';
import Velocity from 'velocity-animate';
import moment from 'moment';

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

  _each($(selector).find('.row'), (function(node, index) {
    var $obj = $(node);
    setTimeout(function() {
      Velocity(node, {
        'left': destX
      }, cubicBezierEasings.bounceOut, 1000, function() {
        node.parentNode.removeChild(node);
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

  var currentTop = $(selector)[0].getBoundingClientRect().top;

  $(selector).velocity({
    'opacity': 0,
    'top': currentTop + 100,
  }, 500, function() {
    var el = $(selector)[0];
    el.parentNode.removeChild(el);

    if (done && typeof done === 'function') {
      done();
    }
  });
}

module.exports = {
  bounceAnimations: bounceAnimations,
  slideOutElement: slideOutElement
}