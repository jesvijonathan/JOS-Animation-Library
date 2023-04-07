function intersectionRatio_set() {
  if (jos_default_threshold == 1) return 0.99;

  return jos_default_threshold;
}

let jos_default_once = false; // true or false
let jos_default_animation = "fade"; // fade, slide, zoom, rotate
let jos_default_threshold = 0.4; // 0-1
let jos_default_intersectionRatio = intersectionRatio_set(); //0-0.99
let jos_default_duration = 0.7;
let jos_default_type = "ease-in-out";

onload = () => {
  const jos_stylesheet = document.getElementById("jos-stylesheet").sheet;
  //   jos_css = document.getElementsByClassName("jos");
  let transition_temp = jos_default_duration + "s " + jos_default_type;
  //   console.log(transition_temp);
  jos_stylesheet.insertRule(
    ".jos { transition: " + transition_temp + " !important; }"
  );
};

function fly_in(target, state) {
  if (state) {
    target.classList.add("fly_in");
  } else {
    target.classList.remove("fly_in");
  }
}

function lin() {
  let op = $(".card_l");
  let oop = $(".day_l");

  oop.addClass("l_in");
  op.addClass("l_in");
  return;
}

function l_in(target, state) {
  lin();
}

function r_in(target, state) {
  let op = $(".card_r");
  let oop = $(".day_r");

  if (state) {
    oop.addClass("l_in");
    op.addClass("l_in");
  }
  // else {
  //   $(".card_l").removeClass("l_in");
  // }
  lin();
}

function opa_rev(target, state) {
  if (state) {
    target.classList.add("fade_rot");
  } else {
    target.classList.remove("fade_rot");
  }
}

function splash_pop(target, state) {
  if (state) {
    target.classList.add("splash_slide");
  }
}

function fade(target, state) {
  if (state) {
    target.classList.add("jos-fade-active");
  } else {
    target.classList.remove("jos-fade-active");
  }
}

function callbackRouter(entries, observer) {
  let entry = entries[0];
  let target = entry.target;

  //   console.log(target.dataset.jos_animation, entry.intersectionRatio);

  if (entry.intersectionRatio > jos_default_intersectionRatio) {
    if (target.dataset.jos_animation) {
      console.log("Animation-Triggered");
      window[target.dataset.jos_animation](target, true);
      if (target.dataset.jos_once == "true") {
        target.classList.remove("jos");
        console.log("Removed-Observer");
        observer.unobserve(target);
      }
    }
  } else {
    if (target.dataset.jos_animation) {
      console.log("Animation-Reverting");
      window[target.dataset.jos_animation](target, false);
    }
  }
}

var options = {
  root: null,
  rootMargin: "100px",
  threshold: jos_default_threshold,
};

// There is another way to implement this,
// by creating an instance of the IntersectionObserver class and create a unique object for every element.
// but this fucks your cpu and performace at the same time, but offers customizability

const observer = new IntersectionObserver(callbackRouter, options);
const boxes = document.querySelectorAll(".jos");

boxes.forEach((box) => {
  // observer.observe(box);

  object_class = box.classList;

  object_default_once = box.dataset.jos_once;
  object_default_animation = box.dataset.jos_animation;

  if (object_default_once == undefined) {
    // alert("JOS: No once specified for this object");
    object_default_once = jos_default_once;
    box.setAttribute("data-jos_once", object_default_once);
  }
  if (object_default_animation == undefined) {
    // alert("JOS: No animation specified for this object");
    object_default_animation = jos_default_animation;
    box.setAttribute("data-jos_animation", object_default_animation);
  }

  // console.log(object_class + "\n" + object_default_animation);

  switch (object_default_animation) {
    case "fade":
      box.classList.add("jos-fade");
      break;
  }

  observer.observe(box);
});
// alert("JOS Loaded !");
