$ = jQuery = window.$ = window.jQuery = require('jQuery');
var _ = require('lodash');
var animations = require('./lib/animations');
var helpers = require('./lib/helpers');
var subpage = require('./lib/subpage');

$(document).ready(function($) {

  $.each($('.contact .contact-link'), function(index) {
    var $obj = $(this);

    // delay each 
    setTimeout(function() {
      $obj.removeClass('opacity-0');
      animations.bounceAnimations.contactAnimation.applyTo($obj);
    }, 1000 * (index + 1));
  });

});