function accept_cookie() {
  (notify_va.style.padding = "0vw 0vw"),
    (notify_va.style.opacity = "0"),
    (notify_va.style.zIndex = "-1");
}
function deccept_cookie() {
  (notify_va.style.zIndex = "100"),
    (notify_va.style.padding = "1.8vw 1vw"),
    (notify_va.style.opacity = "1");
}
function notify(e, l) {
  (not_con.innerHTML = e),
    deccept_cookie(),
    -1 != l &&
      setTimeout(function () {
        accept_cookie();
      }, l);
}
var login_error_list = [
  "Error !",
  "Invalid email !",
  "Wrong Credentials, Try again !",
  "Try again..",
];
function login_error(e = null) {
  e && notify(login_error_list[e], 3e3);
}
function popstasticopener(
  e = "/",
  l = "Takshashila Google Authentication",
  n = "height=600,width=450"
) {
  var a = window.open(e, l, n);
  window.focus && a.focus();
}
function password_eye() {
  onload = function () {
    let e = document.getElementById("passwordEye"),
      l = document.getElementById("password_input");
    e.onclick = function (e) {
      let n = "password" === l.getAttribute("type") ? "text" : "password";
      l.setAttribute("type", n), this.classList.toggle("fa-eye-slash");
    };
    var n = document.getElementById("password_input"),
      a = document.getElementById("passwordEye");
    n.addEventListener(
      "input",
      function () {
        a.style.display = "block";
      },
      { passive: !0 }
    ),
      (n.onblur = function () {
        "" == this.value && (a.style.display = "none");
      });
  };
}
function validatePassword() {
  let e = document.getElementById("password"),
    l = document.getElementById("repassword");
  e.value != l.value
    ? (l.setCustomValidity("Password Does Not Match !"),
      console.log("Password Does Not Match !"))
    : l.setCustomValidity("");
}
function set_deafult_graduation_date() {
  let e = document.getElementById("graduate_year"),
    l = new Date(),
    n = ("0" + (l.getMonth() + 1)).slice(-2),
    a = l.getFullYear();
  e.value = `${a + 3}-${n}`;
}
function getCookie(e) {
  let l = e + "=",
    n = decodeURIComponent(document.cookie).split(";");
  for (let a = 0; a < n.length; a++) {
    let s = n[a];
    for (; " " == s.charAt(0); ) s = s.substring(1);
    if (0 == s.indexOf(l)) return s.substring(l.length, s.length);
  }
  return "";
}
function load_hash() {
  var e = getCookie("hash");
  return (document.getElementById("hash").value = e), e;
}
function load_details() {
  load_hash();
  var e = getCookie("first_name");
  document.getElementById("first_name").value = e;
  var l = getCookie("last_name");
  document.getElementById("last_name").value = l;
  var n = getCookie("phone");
  document.getElementById("ph_number").value = n;
}
function load_date(e = !1) {
  var l = new Date().getFullYear();
  let n = l + 8;
  var a = document.getElementById("graduate_year");
  for (i = l - 8; i < n; i++) a.add(new Option(i));
  !0 == e && (a.selectedIndex = 12);
}
function sign_in_check(e) {
  h = getCookie("hash");
  var l = getCookie("session");
  if ((console.log(h && l), h))
    switch (e) {
      case 0:
        window.location.replace("/");
        break;
      case 1:
        getCookie("user_details") && window.location.replace("/"),
          window.location.replace("/login");
    }
  else 0 === e && window.location.replace("/login");
}
function get_acc() {
  (t = getCookie("hash")) &&
    ((top_link.innerHTML = "Account"), (top_link.href = "/profile/" + t));
}
function profile_edit(e) {
  var l = document.getElementById(e);
  (l.disabled = !1), (l.readOnly = !1), l.focus();
  var n = l.nextElementSibling.firstElementChild;
  n.classList.remove("fa-edit"), n.classList.add("fa-save");
}
function profile_onblur(e, l) {
  (e.disabled = !0), (e.readOnly = !0), e.value || (e.value = l);
  var n = e.nextElementSibling.firstElementChild;
  n.classList.remove("fa-save"), n.classList.add("fa-edit");
}
function single_page_login(e) {
  let l = document.getElementById("regi");
  1 == e
    ? ((l.style.transform = "translate(-50%, 100%) scale(0)"),
      window.history.pushState("page2", "Title", "/login"))
    : ((l.style.transform = "translate(-50%, -52%) scale(1)"),
      window.history.pushState("page2", "Title", "/login#/signup"));
}
var slideIndex = 1;
function plusSlides(e) {
  showSlides((slideIndex += e));
}
function currentSlide(e) {
  showSlides((slideIndex = e));
}
function showSlides(e) {
  var l,
    n = document.getElementsByClassName("locac"),
    a = document.getElementsByClassName("dot");
  for (
    e > n.length && (slideIndex = 1), e < 1 && (slideIndex = n.length), l = 0;
    l < n.length;
    l++
  )
    n[l].style.display = "none";
  for (l = 0; l < a.length; l++)
    a[l].className = a[l].className.replace(" current", "");
  (n[slideIndex - 1].style.display = "block"),
    (a[slideIndex - 1].className += " current"),
    1 == e
      ? (document.getElementById("Loconn").innerHTML = "Location")
      : (document.getElementById("Loconn").innerHTML = "Contact");
}
function myFunction(e) {
  e >= 200 ? myvid.classList.add("blur") : myvid.classList.remove("blur");
}
function nav_hide(e) {
  let l = e;
  prevScrollpos > l
    ? (document.getElementById("navbar").style.top = "89%")
    : (document.getElementById("navbar").style.top = "100%"),
    (prevScrollpos = l);
}
function fly_in(e, l) {
  l ? e.classList.add("fly_in") : e.classList.remove("fly_in");
}
function lin() {
  let e = $(".card_l");
  $(".day_l").addClass("l_in"), e.addClass("l_in");
}
function l_in(e, l) {
  lin();
}
function r_in(e, l) {
  let n = $(".card_r"),
    a = $(".day_r");
  l && (a.addClass("l_in"), n.addClass("l_in")), lin();
}
function opa_rev(e, l) {
  l ? e.classList.add("fade_rot") : e.classList.remove("fade_rot");
}
function fade_opaci(e, l) {
  l ? e.classList.add("opaci") : e.classList.remove("opaci");
}
function splash_pop(e, l) {
  l && e.classList.add("splash_slide");
}
function callbackRouter(e, l) {
  let n = e[0],
    a = n.target;
  n.intersectionRatio > 0
    ? a.dataset.callback &&
      (window[a.dataset.callback](a, !0),
      "true" == a.dataset.once && (a.classList.remove("jos"), l.unobserve(a)))
    : a.dataset.callback && window[a.dataset.callback](a, !1);
}
function graphic() {
  1 == graphic_high
    ? ((graphic_high = 0),
      (myvid.style.display = "none"),
      // (image4.style.display = "block"),
      // (image3.style.display = "block"),
      // (image9.style.display = "block"),
      (pro_sec.style.background = "#131313"),
      ripple.classList.remove("rypol"),
      notify("Acrylic Theme Deactivated !", 3e3))
    : ((graphic_high = 1),
      (myvid.style.display = "block"),
      // (image4.style.display = "none"),
      // (image3.style.display = "none"),
      // (image9.style.display = "none"),
      (pro_sec.style.background = "transparent"),
      ripple.classList.add("rypol"),
      notify("Acrylic Theme Activated !", 3e3));
}

(onload = function () {
  showSlides(slideIndex);
}),
  (onload = function () {
    document.getElementById("image4"),
      document.getElementById("image3"),
      document.getElementById("image9"),
      document.getElementById("pro_sec"),
      document.getElementById("ripple");
  }),
  "serviceWorker" in navigator
    ? navigator.serviceWorker
        .register("service-worker.js")
        .then((e) => {})
        .catch((e) => {
          console.log("SW Registration Failed");
        })
    : console.log("Not supported");
