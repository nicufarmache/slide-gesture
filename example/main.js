// import { SlideGesture } from 'https://unpkg.com/@nicufarmache/slide-gesture/index.js';
import { SlideGesture } from '../dist/slide-gesture';

const el = document.getElementById("el");
const handler = (evt, extra) => {

  console.log('Main handleEvt', evt.type, extra.totalX, evt.pageX, extra);

  el.style.transform =`translate(${extra.totalX}px, 0px)`;

  if (evt.type === 'pointerdown') {
    el.classList.add('moving');
    evt.preventDefault();
  }

  if (evt.type === 'pointermove') {

  }

  if (evt.type === 'pointerup') {
    setTimeout(() => {
      el.classList.remove('moving');
      el.classList.remove('canceled');
    }, 50);
  }

  if (evt.type === 'pointercancel') {
    el.classList.add('canceled');
    setTimeout(() => {
      el.classList.remove('moving');
      el.classList.remove('canceled');
    }, 50);
  }
};

window.slideGesture = new SlideGesture(el, handler, { touchActions: 'pan-y', stopScrollDirection: 'horizontal' });




