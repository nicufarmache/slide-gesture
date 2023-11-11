async function importSlider() {
  if (import.meta.env?.DEV)  {
    return await import('../../dist/index.js');
  } else {
    return await import('https://unpkg.com/@nicufarmache/slide-gesture/dist/index.js');
  }
}

const { SlideGesture } = await importSlider();

// you can just use the import bellow:
// import { SlideGesture } from 'https://unpkg.com/@nicufarmache/slide-gesture/dist/index.js';

const manageVisualStuff = (el, evt, extra) => {
  console.log('position:', evt.type, extra.totalX, evt.pageX, extra);

  if (evt.type === 'pointerdown') {
    el.classList.add('moving');
    evt.preventDefault();
  }

  if (evt.type === 'pointerup') {
    el.classList.remove('moving');
  }

  if (evt.type === 'pointercancel') {
    el.classList.add('canceled');
    setTimeout(() => {
      el.classList.remove('moving');
      el.classList.remove('canceled');
    }, 50);
  }
};

const handlerFree = (evt, extra) => {
  const el = evt.target.closest('.thing');
  el.style.transform =`translate(${extra.totalX}px, ${extra.totalY}px)`;
  manageVisualStuff(el, evt, extra);
};

const handlerHorizontal = (evt, extra) => {
  const el = evt.target.closest('.thing');
  el.style.transform =`translate(${extra.totalX}px, 0)`;
  manageVisualStuff(el, evt, extra);
};

const handlerVertical = (evt, extra) => {
  const el = evt.target.closest('.thing');
  el.style.transform =`translate(0, ${extra.totalY}px)`;
  manageVisualStuff(el, evt, extra);
};

const elFree = document.getElementById("free");
const elHorizontal = document.getElementById("horizontal");
const elVertical = document.getElementById("vertical");

new SlideGesture(elFree, handlerFree);
new SlideGesture(elHorizontal, handlerHorizontal, { touchActions: 'pan-y', stopScrollDirection: 'horizontal' });
new SlideGesture(elVertical, handlerVertical, { touchActions: 'pan-x', stopScrollDirection: 'vertical' });




