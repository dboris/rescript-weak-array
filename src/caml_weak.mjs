function caml_invalid_argument (msg) {
  throw msg;
}

//Provides: caml_weak_create
//Requires: caml_ephe_key_offset, caml_invalid_argument
export function caml_weak_create (n) {
  if (n < 0) caml_invalid_argument ("Weak.create");
  return new Array(n);
}

//Provides: caml_weak_set
//Requires: caml_ephe_key_offset, caml_invalid_argument
export function caml_weak_set(x, i, v) {
  if (i < 0 || i >= x.length) caml_invalid_argument ("Weak.set");
  x[i] = v === undefined ? v : new WeakRef(v);
}

//Provides: caml_weak_get
//Requires: caml_ephe_key_offset, caml_invalid_argument
export function caml_weak_get(x, i) {
  if (i < 0 || i >= x.length) caml_invalid_argument ("Weak.get_key");
  return x[i] && x[i].deref();
}

//Provides: caml_weak_get_copy
//Requires: caml_weak_get,caml_ephe_key_offset
//Requires: caml_obj_dup, caml_invalid_argument
export function caml_weak_get_copy(x, i) {
  if(i < 0 || i >= x.length) caml_invalid_argument ("Weak.get_copy");
  var y = caml_weak_get(x, i);
  return caml_obj_dup(y);
}

//Provides: caml_weak_check mutable
//Requires: caml_ephe_key_offset
export function caml_weak_check(x, i) {
  return x[i] !== undefined && x[i].deref !== undefined
}

//Provides: caml_weak_blit
//Requires: caml_array_blit
//Requires: caml_ephe_key_offset
export function caml_weak_blit(a1, i1, a2, i2, len) {
  // minus one because caml_array_blit works on ocaml array
  console.log('blit', a1, i1, a2, i2, len)
  caml_array_blit(
    a1, i1 - 1,
    a2, i2 - 1,
    len
  );
}

//Provides: caml_ephe_set_key
//Requires: caml_weak_set
export function caml_ephe_set_key(x, i, v) {
  return caml_weak_set(x, i, v)
}

//Provides: caml_ephe_unset_key
//Requires: caml_weak_set
export function caml_ephe_unset_key(x, i) {
  return caml_weak_set(x, i, undefined)
}
