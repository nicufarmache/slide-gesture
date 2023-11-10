type SlideGestureOptions = {
  touchActions?: string,
  stopScrollDirection?: 'horizontal' | 'vertical',
}

type SlideGestureEvent = {
  startX: number,
  startY: number,
  relativeX: number,
  relativeY: number,
  totalX: number,
  totalY: number,
}

type CallbackFn = (evt: PointerEvent, data: SlideGestureEvent) => void;

export class SlideGesture {
  #el;
  #touchActions;
  #startX = 0;
  #startY = 0;
  #lastTotalX = 0;
  #lastTotalY = 0;
  #callback;
  #shouldPreventScroll = false
  #stopScrollDirection;
  #boundHandleScroll;
  #boundHandleEvt;

  constructor(
    el :HTMLElement, 
    callback: CallbackFn, 
    { touchActions, stopScrollDirection }: SlideGestureOptions = {}
  ){
    this.#el = el;
    this.#touchActions = touchActions;
    this.#callback = callback;
    this.#stopScrollDirection = stopScrollDirection;
    this.#boundHandleScroll = this.#handleScroll.bind(this);
    this.#boundHandleEvt = this.#handleEvt.bind(this);
    this.addListeners();
  }

  addListeners() {
    this.#el.addEventListener("pointerdown", this.#boundHandleEvt);
    this.#el.addEventListener("pointermove", this.#boundHandleEvt);
    this.#el.addEventListener("pointerup", this.#boundHandleEvt);
    this.#el.addEventListener("pointercancel", this.#boundHandleEvt);
    window.addEventListener("touchmove", this.#boundHandleScroll, {passive:false});
    if(this.#touchActions) this.#el.style.touchAction = this.#touchActions;
  }

  removeListeners() {
    this.#el.removeEventListener("pointerdown", this.#boundHandleEvt);
    this.#el.removeEventListener("pointermove", this.#boundHandleEvt);
    this.#el.removeEventListener("pointerup", this.#boundHandleEvt);
    this.#el.removeEventListener("pointercancel", this.#boundHandleEvt);
    window.removeEventListener("touchmove", this.#boundHandleScroll);
    if(this.#touchActions) this.#el.style.removeProperty('touch-action');
  }

  #preventTouchScroll() {
    this.#shouldPreventScroll = true;
  }

  #allowTouchScroll() {
    this.#shouldPreventScroll = false;
  }

  #handleScroll(evt: TouchEvent) {
    if(this.#shouldPreventScroll){
      evt.preventDefault();
    }
  }

  #handleEvt(evt: PointerEvent) {  
    if (evt.type === 'pointerdown') {
      this.#el.setPointerCapture(evt.pointerId);
      this.#startX = evt.pageX;
      this.#startY = evt.pageY;
    }

    if (this.#el.hasPointerCapture(evt.pointerId) && evt.type !== 'pointercancel' && (typeof this.#callback) === 'function') {
      const relativeX = evt.pageX - this.#startX;
      const relativeY = evt.pageY - this.#startY;

      if ( this.#stopScrollDirection === 'horizontal' && Math.abs(relativeX / relativeY) > 1 ) {
        this.#preventTouchScroll();
      }
      if ( this.#stopScrollDirection === 'vertical' && Math.abs(relativeX / relativeY) < 1 ) {
        this.#preventTouchScroll();
      }

      this.#callback(evt, {
        startX: this.#startX,
        startY: this.#startY,
        relativeX,
        relativeY,
        totalX: relativeX + this.#lastTotalX,
        totalY: relativeY + this.#lastTotalY,
      });
    }
  
    if (evt.type === 'pointerup') {
      this.#lastTotalX = + this.#lastTotalX + evt.pageX - this.#startX;
      this.#lastTotalY = + this.#lastTotalY + evt.pageY - this.#startY;
      this.#el.releasePointerCapture(evt.pointerId);
      this.#allowTouchScroll();
    }

    if (evt.type === 'pointercancel') {
      this.#callback(evt, {
        startX: this.#startX,
        startY: this.#startY,
        relativeX: 0,
        relativeY: 0,
        totalX: this.#lastTotalX,
        totalY: this.#lastTotalY,
      });
      this.#el.releasePointerCapture(evt.pointerId);
      this.#allowTouchScroll();
    }
  }
}
