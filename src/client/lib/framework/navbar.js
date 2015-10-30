import $ from '../$';
import Velocity from 'velocity-animate';

export default class Navbar {
  constructor() {
    this.initHandler();

    this.state = 'hidden';
  }

  initHandler() {
    $(document).ready(() => {
      $('body').on('click', '#nav-toggle', (e) => {
        this.navToggle();
      });
    });
  }

  navToggle() {
    if (this.state === 'animating') return;
    let currentState = this.state;

    this.state = 'animating';
    let left = '0%';
    if (currentState === 'shown') {
      left = '-25%';
    }

    Velocity(document.getElementById('nav-choices'), {
      left
    }, {
      complete: () => {
        this.state = currentState === 'hidden' ? 'shown' : 'hidden';
      }
    })
  }
}