var $ = jQuery = require('jQuery');
var _ = require('lodash');
var Bounce = require('bounce.js');

$(document).ready(function($) {

  var animations = {
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
  }

  $.each($('.contact .contact-link'), function(index) {
    var $obj = $(this);

    // delay each 
    setTimeout(function() {
      $obj.removeClass('opacity-0');
      animations.contactAnimation.applyTo($obj);
    }, 1000 * (index + 1));
  });

});