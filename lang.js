// Language switcher: ?lang=ru|en > saved choice > browser language. Runs in <head> before render.
(function () {
  var supported = ["ru", "en"];
  function saved() { try { return localStorage.getItem("lang"); } catch (e) { return null; } }
  function save(l) { try { localStorage.setItem("lang", l); } catch (e) {} }
  var q = new URLSearchParams(location.search).get("lang");
  var lang = supported.indexOf(q) >= 0 ? q
    : supported.indexOf(saved()) >= 0 ? saved()
    : ((navigator.language || "").toLowerCase().indexOf("ru") === 0 ? "ru" : "en");
  var root = document.documentElement;
  function apply(l) {
    root.setAttribute("data-lang", l);
    root.setAttribute("lang", l);
    var t = root.getAttribute("data-title-" + l);
    if (t) document.title = t;
    var buttons = document.querySelectorAll(".lang-switch button");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].setAttribute("aria-pressed", buttons[i].getAttribute("data-set-lang") === l ? "true" : "false");
    }
  }
  apply(lang);
  document.addEventListener("DOMContentLoaded", function () {
    apply(lang);
    var buttons = document.querySelectorAll(".lang-switch button");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", function () {
        lang = this.getAttribute("data-set-lang");
        save(lang);
        apply(lang);
      });
    }
  });
})();
