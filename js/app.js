(function () {
  "use strict";

  var PROJECTS = window.PROJECTS || [];
  var grid = document.getElementById("grid");
  var search = document.getElementById("search");
  var sortBtns = document.querySelectorAll(".sort");
  var themeToggle = document.getElementById("themeToggle");

  var sortMode = "stars";
  var query = "";

  function fmtStars(n) {
    if (n == null) return "";
    if (n >= 1000000) return (n / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
    if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "k";
    return String(n);
  }

  function render() {
    var q = query.trim().toLowerCase();
    var list = PROJECTS.filter(function (p) {
      if (!q) return true;
      var hay = [p.r, p.d, p.c, p.l || ""].join(" ").toLowerCase();
      return hay.indexOf(q) !== -1;
    });

    if (sortMode === "stars") {
      list.sort(function (a, b) { return (b.s || 0) - (a.s || 0); });
    } else {
      list.sort(function (a, b) { return a.r.toLowerCase().localeCompare(b.r.toLowerCase()); });
    }

    if (!list.length) {
      grid.innerHTML = '<div class="empty">Sin resultados para «' + escapeHtml(query) + '».</div>';
      return;
    }

    var html = list.map(function (p) {
      var meta = [];
      if (p.l) meta.push('<span>' + escapeHtml(p.l) + '</span>');
      if (p.s != null) meta.push('<span class="star">★ ' + fmtStars(p.s) + '</span>');
      return (
        '<article class="card">' +
          '<div class="card-tags">' +
            '<span class="tag boxed">' + escapeHtml(p.c) + '</span>' +
            '<span class="tag plain">Código abierto</span>' +
          '</div>' +
          '<h2 class="card-title">' + escapeHtml(p.d) + '</h2>' +
          '<a class="repo-link" href="https://github.com/' + escapeHtml(p.r) + '" target="_blank" rel="noopener noreferrer">' +
            '<span class="arrow">↳</span>' + escapeHtml(p.r) +
          '</a>' +
          (meta.length ? '<div class="card-meta">' + meta.join("") + '</div>' : "") +
        '</article>'
      );
    }).join("");

    grid.innerHTML = html;
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  search.addEventListener("input", function () {
    query = search.value;
    render();
  });

  sortBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      sortMode = btn.getAttribute("data-sort");
      sortBtns.forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      render();
    });
  });

  themeToggle.addEventListener("click", function () {
    var dark = document.body.classList.toggle("dark");
    themeToggle.textContent = dark ? "☀" : "☾";
    try { localStorage.setItem("osp-theme", dark ? "dark" : "light"); } catch (e) {}
  });

  // restore theme
  try {
    if (localStorage.getItem("osp-theme") === "dark") {
      document.body.classList.add("dark");
      themeToggle.textContent = "☀";
    }
  } catch (e) {}

  render();
})();
