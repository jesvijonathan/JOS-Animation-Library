/**
 * JOS - Full bundle entry point.
 * Imports CSS alongside JS for "batteries included" usage.
 */
import "./animations/jos.css";
import JOS from "./core/JOS.js";

const instance = new JOS();

if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
  module.exports = instance;
} else if (typeof define === "function" && define.amd) {
  define([], () => instance);
} else if (typeof window !== "undefined") {
  window.JOS = instance;
}

export default instance;
