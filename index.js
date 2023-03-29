export class SlideGesture {
  constructor(el, callback, { touchActions, stopScrollDirection } = {}){
    this.el = el;
    this.touchActions = touchActions;
    this.startX = 0;
    this.startY = 0;
    this.lastTotalX = 0;
    this.lastTotalY = 0;
    this.callback = callback;
    this.stopScrollDirection = stopScrollDirection;
    this.addListeners();
  }

  addListeners() {
    this.el.addEventListener("pointerdown", this.handleEvt.bind(this));
    this.el.addEventListener("pointermove", this.handleEvt.bind(this));
    this.el.addEventListener("pointerup", this.handleEvt.bind(this));
    this.el.addEventListener("pointercancel", this.handleEvt.bind(this));
    window.addEventListener("touchmove", this.handleScroll.bind(this), {passive:false});
    if(this.touchActions) this.el.style.touchAction = this.touchActions;
  }

  removeListeners() {
    this.el.removeEventListener("pointerdown", this.handleEvt.bind(this));
    this.el.removeEventListener("pointermove", this.handleEvt.bind(this));
    this.el.removeEventListener("pointerup", this.handleEvt.bind(this));
    this.el.removeEventListener("pointercancel", this.handleEvt.bind(this));
    window.removeEventListener("touchmove", this.handleScroll.bind(this));
    if(this.touchActions) this.el.style.touchAction = null;
  }

  preventTouchScroll() {
    this.shouldPreventScroll = true;
  }

  allowTouchScroll() {
    this.shouldPreventScroll = false;
  }

  handleScroll(evt) {
    if(this.shouldPreventScroll){
      evt.preventDefault();
    }
  }

  handleEvt(evt) {  
    if (evt.type === 'pointerdown') {
      this.el.setPointerCapture(evt.pointerId);
      this.startX = evt.pageX;
      this.startY = evt.pageY;
    }

    if (this.el.hasPointerCapture(evt.pointerId) && evt.type !== 'pointercancel' && (typeof this.callback) === 'function') {
      const relativeX = evt.pageX - this.startX;
      const relativeY = evt.pageY - this.startY;

      if ( this.stopScrollDirection === 'horizontal' && Math.abs(relativeX / relativeY) > 1 ) {
        this.preventTouchScroll();
      }
      if ( this.stopScrollDirection === 'vertical' && Math.abs(relativeX / relativeY) < 1 ) {
        this.preventTouchScroll();
      }

      this.callback(evt, {
        startX: this.startX,
        startY: this.startY,
        relativeX,
        relativeY,
        totalX: relativeX + this.lastTotalX,
        totalY: relativeY + this.lastTotalY,
      });
    }
  
    if (evt.type === 'pointerup') {
      this.lastTotalX = + this.lastTotalX + evt.pageX - this.startX;
      this.lastTotalY = + this.lastTotalY + evt.pageY - this.startY;
      this.el.releasePointerCapture(evt.pointerId);
      this.allowTouchScroll();
    }

    if (evt.type === 'pointercancel') {
      this.callback(evt, {
        startX: this.startX,
        startY: this.startY,
        relativeX: 0,
        relativeY: 0,
        totalX: this.lastTotalX,
        totalY: this.lastTotalY,
      });
      this.el.releasePointerCapture(evt.pointerId);
      this.allowTouchScroll();
    }
  }
}
