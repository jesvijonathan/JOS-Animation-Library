/**
 * DOM utilities for JOS.
 */

export function getData(el, key, fallback) {
  const val = el.dataset[key];
  return val !== undefined ? val : fallback;
}

export function setData(el, key, value) {
  el.dataset[key] = value;
}

export function addClass(el, cls) {
  if (cls) el.classList.add(cls);
}

export function removeClass(el, cls) {
  if (cls) el.classList.remove(cls);
}

export function toggleClass(el, cls, force) {
  if (cls) el.classList.toggle(cls, force);
}

export function hasClass(el, cls) {
  return el.classList.contains(cls);
}

export function queryAll(selector, root) {
  return Array.from((root || document).querySelectorAll(selector));
}

export function byId(id) {
  return document.getElementById(id.charAt(0) === "#" ? id.slice(1) : id);
}

let _id = 0;
export function uniqueId(prefix) {
  return (prefix || "jos") + "_" + (++_id) + "_" + ((Math.random() * 36e4) | 0).toString(36);
}
