import Bounce from 'bounce.js';

let cubicBezierEasings = {
  bounceOut: [0.680, -0.550, 0.265, 1.550]
}

export let bounceAnimations = {

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
  })
}
