/**
 * JOS - JavaScript On Scroll Animation Library
 *
 * Entry point. Creates and exports the singleton JOS instance.
 */
import JOS from "./core/JOS.js";

const instance = new JOS();

// UMD-style export
if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
  module.exports = instance;
} else if (typeof define === "function" && define.amd) {
  define([], () => instance);
} else if (typeof window !== "undefined") {
  window.JOS = instance;
}

export default instance;
