import $ from './lib/$';
import _each from 'lodash/collection/forEach';
import animations from './lib/animations';
import helpers from './lib/helpers';
import subpage from './lib/subpage';


$(document).ready(function() {
  _each(document.getElementsByClassName('contact-link'), function(node, index) {
    var $obj = $(node);

    // delay each
    setTimeout(function() {
      $obj.removeClass('opacity-0');
      animations.bounceAnimations.contactAnimation.applyTo(node);
    }, 1000 * (index + 1));
  });
});