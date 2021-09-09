"use strict";

const enableWeak = (function (global) {
  return global.WeakRef !== undefined;
})(this);

export function caml_weak_create (n) {
  if (n < 0) throw "Weak.create";
  return new Array(n);
}

export function caml_weak_set(x, i, v) {
  if (i < 0 || i >= x.length) throw "Weak.set";
  x[i] = v === undefined || !enableWeak ? v : new WeakRef(v);
}

export function caml_weak_unset(x, i) {
  return caml_weak_set(x, i, undefined);
}

export function caml_weak_get(x, i) {
  if (i < 0 || i >= x.length) throw "Weak.get_key";
  const v = x[i];
  return enableWeak ? v && v.deref() : v;
}

export function caml_weak_get_copy(x, i) {
  if (i < 0 || i >= x.length) throw "Weak.get_copy";
  return caml_obj_dup(caml_weak_get(x, i));
}

export function caml_weak_check(x, i) {
  const v = x[i];
  return enableWeak
    ? v !== undefined && v.deref() !== undefined
    : v !== undefined;
}

export function caml_weak_blit(a1, i1, a2, i2, len) {
  // minus one because caml_array_blit works on ocaml array
  caml_array_blit(
    a1, i1 - 1,
    a2, i2 - 1,
    len
  );
}
