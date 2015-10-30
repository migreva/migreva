import * as animations from './lib/animations';

let count = 0;
for(let node of document.getElementsByClassName('contact-link')) {

    // delay each
    setTimeout(function() {
      node.className = node.className.replace('opacity-0', '');
      animations.bounceAnimations.contactAnimation.applyTo(node);
    }, 1000 * (count++));
}
