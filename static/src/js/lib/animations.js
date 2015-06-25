import $ from './$';
import _each from 'lodash/collection/forEach';
import Bounce from 'bounce.js';
import Velocity from 'velocity-animate';
import moment from 'moment';

let cubicBezierEasings = {
  bounceOut: [0.680, -0.550, 0.265, 1.550]
}

let bounceAnimations = {

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

async function slideOutElement(selector, done) {
  // Apply a Bouncejs transformation to the .content div
  if (!$(selector).length) return;

  $('body').addClass('overflow-hidden');

  let destX = window.innerWidth;
  let srcX = $(selector)[0].offsetLeft;
  let srcY=0, destY = 0;


  // Compile arguments for velocity functions
  let promises = [];
  _each($(selector), function(node, index) {
    promises.push(velocityPromise(node, {
      left: destX
    }, {
      duration: 1000,
      delay: 500 * index,
      easing: cubicBezierEasings.bounceOut
    }));
  });

  let resolved = await Promise.all(promises);
  console.log('Done animating all')

  $('body').removeClass('overflow-hidden');
  if (done && typeof done === 'function') {
    // done();
  }
}

function slideDownElement(selector, done) {

  if (!$(selector).length) return;

  let currentTop = $(selector)[0].getBoundingClientRect().top;

  $(selector).velocity({
    'opacity': 0,
    'top': currentTop + 100,
  }, 500, function() {
    let el = $(selector)[0];
    el.parentNode.removeChild(el);

    if (done && typeof done === 'function') {
      done();
    }
  });
}

function velocityPromise(node, properties, options) {
  return new Promise(function(resolve, reject) {

    options.complete = function() {
      console.log('Done animating ' + $(node));
      resolve();
    }

    Velocity(node, properties, options);

  });
}

module.exports = {
  bounceAnimations,
  slideOutElement
}