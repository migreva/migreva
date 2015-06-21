import $ from './lib/$';
import _each from 'lodash/collections/forEach';
import animations from './lib/animations';
import helpers from './lib/helpers';
import subpage from './lib/subpage';


_each($('.contact .contact-link'), function(node, index) {
  var $obj = $(node);

  // delay each
  setTimeout(function() {
    $obj.removeClass('opacity-0');
    animations.bounceAnimations.contactAnimation.applyTo(node);
  }, 1000 * (index + 1));
});