var b = (h, i, e) => {
  if (!i.has(h))
    throw TypeError("Cannot " + e);
};
var t = (h, i, e) => (b(h, i, "read from private field"), e ? e.call(h) : i.get(h)), r = (h, i, e) => {
  if (i.has(h))
    throw TypeError("Cannot add the same private member more than once");
  i instanceof WeakSet ? i.add(h) : i.set(h, e);
}, o = (h, i, e, a) => (b(h, i, "write to private field"), a ? a.call(h, e) : i.set(h, e), e);
var c = (h, i, e) => (b(h, i, "access private method"), e);
var s, d, l, p, u, v, f, L, E, m, n, X, S, Y, g, w, P, y, C;
class A {
  constructor(i, e, { touchActions: a, stopScrollDirection: I } = {}) {
    r(this, X);
    r(this, Y);
    r(this, w);
    r(this, y);
    r(this, s, void 0);
    r(this, d, void 0);
    r(this, l, 0);
    r(this, p, 0);
    r(this, u, 0);
    r(this, v, 0);
    r(this, f, void 0);
    r(this, L, !1);
    r(this, E, void 0);
    r(this, m, void 0);
    r(this, n, void 0);
    o(this, s, i), o(this, d, a), o(this, f, e), o(this, E, I), o(this, m, c(this, w, P).bind(this)), o(this, n, c(this, y, C).bind(this)), this.addListeners();
  }
  addListeners() {
    t(this, s).addEventListener("pointerdown", t(this, n)), t(this, s).addEventListener("pointermove", t(this, n)), t(this, s).addEventListener("pointerup", t(this, n)), t(this, s).addEventListener("pointercancel", t(this, n)), window.addEventListener("touchmove", t(this, m), { passive: !1 }), t(this, d) && (t(this, s).style.touchAction = t(this, d));
  }
  removeListeners() {
    t(this, s).removeEventListener("pointerdown", t(this, n)), t(this, s).removeEventListener("pointermove", t(this, n)), t(this, s).removeEventListener("pointerup", t(this, n)), t(this, s).removeEventListener("pointercancel", t(this, n)), window.removeEventListener("touchmove", t(this, m)), t(this, d) && t(this, s).style.removeProperty("touch-action");
  }
}
s = new WeakMap(), d = new WeakMap(), l = new WeakMap(), p = new WeakMap(), u = new WeakMap(), v = new WeakMap(), f = new WeakMap(), L = new WeakMap(), E = new WeakMap(), m = new WeakMap(), n = new WeakMap(), X = new WeakSet(), S = function() {
  o(this, L, !0);
}, Y = new WeakSet(), g = function() {
  o(this, L, !1);
}, w = new WeakSet(), P = function(i) {
  t(this, L) && i.preventDefault();
}, y = new WeakSet(), C = function(i) {
  if (i.type === "pointerdown" && (t(this, s).setPointerCapture(i.pointerId), o(this, l, i.pageX), o(this, p, i.pageY)), t(this, s).hasPointerCapture(i.pointerId) && i.type !== "pointercancel" && typeof t(this, f) == "function") {
    const e = i.pageX - t(this, l), a = i.pageY - t(this, p);
    t(this, E) === "horizontal" && Math.abs(e / a) > 1 && c(this, X, S).call(this), t(this, E) === "vertical" && Math.abs(e / a) < 1 && c(this, X, S).call(this), t(this, f).call(this, i, {
      startX: t(this, l),
      startY: t(this, p),
      relativeX: e,
      relativeY: a,
      totalX: e + t(this, u),
      totalY: a + t(this, v)
    });
  }
  i.type === "pointerup" && (o(this, u, +t(this, u) + i.pageX - t(this, l)), o(this, v, +t(this, v) + i.pageY - t(this, p)), t(this, s).releasePointerCapture(i.pointerId), c(this, Y, g).call(this)), i.type === "pointercancel" && (t(this, f).call(this, i, {
    startX: t(this, l),
    startY: t(this, p),
    relativeX: 0,
    relativeY: 0,
    totalX: t(this, u),
    totalY: t(this, v)
  }), t(this, s).releasePointerCapture(i.pointerId), c(this, Y, g).call(this));
};
export {
  A as SlideGesture
};
