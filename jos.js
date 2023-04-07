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
    console.log("fade animation triggered");
    target.classList.add("jos-fade-active");
  } else {
    console.log("fade animation reverting");
    target.classList.remove("jos-fade-active");
  }
}

function callbackRouter(entries, observer) {
  let entry = entries[0];
  let target = entry.target;

  //   console.log(target.dataset.jos_animation, entry.intersectionRatio);

  if (entry.intersectionRatio > 0) {
    if (target.dataset.jos_animation) {
      window[target.dataset.jos_animation](target, true);
      if (target.dataset.jos_once == "true") {
        target.classList.remove("jos");
        observer.unobserve(target);
      }
    }
  } else {
    if (target.dataset.jos_animation) {
      window[target.dataset.jos_animation](target, false);
    }
  }
}

const observer = new IntersectionObserver(callbackRouter);
const boxes = document.querySelectorAll(".jos");

boxes.forEach((box) => {
  // observer.observe(box);

  object_class = box.classList;

  object_default_animation = box.dataset.jos_animation;

  if (object_default_animation == undefined) {
    // alert("JOS: No animation specified for this object");
    object_default_animation = "fade";
    box.setAttribute("data-jos_animation", object_default_animation);
  }
  // console.log(object_class + "\n" + object_default_animation);

  switch (object_default_animation) {
    case "fade":
      box.classList.add("jos-fade");
      break;
    default:
      box.classList.add("jos-fade");
  }

  observer.observe(box);
});
// alert("JOS Loaded !");
