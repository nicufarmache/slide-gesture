
# Slide Gesture

This library that allows you to easly implement a sliding gesture on an element by using pointer events 

## Demo

https://nicufarmache.github.io/slide-gesture-demo/


## Usage/Examples
### Initialization

```javascript
import { SlideGesture } from 'https://unpkg.com/@nicufarmache/slide-gesture/'

const slideGesture = new SlideGesture(
    el, // emelement to track
    handler, // event handler 
    { 
      touchActions: 'pan-y', // allow vertical scrolling
      stopScrollDirection: 'horizontal' // prevent scrolling after horizontal sliding starts
    }
);

```
### Start listening

```javascript
slideGesture.addListeners();
```

### Event Handler 

```javascript
function handler(
  evt, // pointer event
  extra // extra info
) {
  console.log(evt.type) // event type (pointerdown, pointermove, etc)

  console.log(evt.pageX) // pointer position reltive to page
  console.log(evt.pageY) // pointer position reltive to page

  console.log(extra.startX) // pointer position at the begining of the slide
  console.log(extra.startY) // pointer position at the begining of the slide

  console.log(extra.relativeX) // pointer position difference since sliding began
  console.log(extra.relativeY) // pointer position difference since sliding began

  console.log(extra.totalX) // sum of position differences since initialisation
  console.log(extra.totalY) // sum of position differences since initialisation
}

```

### Example:
```javascript
import { SlideGesture } from 'https://unpkg.com/@nicufarmache/slide-gesture/index.js'

document.addEventListener("DOMContentLoaded", ()=>{
  const el = document.getElementById("el"); // element you want

  const handler = (evt, extra) => {

    if (evt.type === 'pointerdown') {
      console.log('Started sliding!')
    }

    if (evt.type === 'pointermove') {
        console.log('Sliding!')
    }
  
    if (evt.type === 'pointerup') {
      console.log('Stopped sliding!')
    }

    if (evt.type === 'pointercancel') {
      console.log('Caneled sliding!')
    }

    el.style.transform =`translate(${extra.totalX}px, 0px)`; // move element 
  };

  const slideGesture = new SlideGesture(el, handler, { 
    touchActions: 'pan-y', // allow vertical scrolling
    stopScrollDirection: 'horizontal' // prevent scrolling after horizontal sliding starts
  });

});
```

