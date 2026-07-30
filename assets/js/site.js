/* Xiangjie Zhao — site behaviour
   Theme, navigation, scroll choreography, and the hero perturbation field. */
(function () {
  'use strict';

  var root = document.documentElement;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ---------------- Theme ---------------- */
  var themeButton = document.querySelector('[data-theme-toggle]');
  if (themeButton) {
    themeButton.addEventListener('click', function () {
      var next = root.dataset.theme === 'dark' ? 'light' : 'dark';
      root.dataset.theme = next;
      try { localStorage.setItem('theme', next); } catch (e) { /* still applies this page */ }
      window.dispatchEvent(new CustomEvent('themechange', { detail: next }));
    });
  }

  /* ---------------- Mobile navigation ---------------- */
  var menuButton = document.querySelector('[data-menu-toggle]');
  var nav = document.getElementById('site-nav');
  if (menuButton && nav) {
    var setMenu = function (open) {
      nav.classList.toggle('is-open', open);
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.querySelector('.sr-only').textContent = open ? 'Close navigation' : 'Open navigation';
    };
    menuButton.addEventListener('click', function () {
      setMenu(menuButton.getAttribute('aria-expanded') !== 'true');
    });
    nav.addEventListener('click', function (event) {
      if (event.target.closest('a')) setMenu(false);
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') setMenu(false);
    });
  }

  /* ---------------- Masthead state + scroll progress ---------------- */
  var masthead = document.querySelector('[data-masthead]');
  var rail = document.querySelector('[data-scroll-rail]');
  var ticking = false;

  function onScroll() {
    var y = window.scrollY || 0;
    if (masthead) masthead.classList.toggle('is-stuck', y > 12);
    if (rail) {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      rail.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';
    }
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(onScroll);
    }
  }, { passive: true });
  onScroll();

  /* ---------------- Reveal on scroll ---------------- */
  var revealables = document.querySelectorAll('[data-reveal]');
  if (revealables.length) {
    if (!('IntersectionObserver' in window) || reduceMotion.matches) {
      revealables.forEach(function (el) { el.classList.add('is-in'); });
    } else {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-in');
          observer.unobserve(entry.target);
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

      revealables.forEach(function (el) {
        var group = el.parentElement;
        if (group && el.dataset.stagger !== 'off') {
          var siblings = Array.prototype.filter.call(group.children, function (child) {
            return child.hasAttribute('data-reveal');
          });
          var i = siblings.indexOf(el);
          if (i > 0) el.style.setProperty('--delay', Math.min(i, 6) * 0.07 + 's');
        }
        observer.observe(el);
      });
    }
  }

  /* ---------------- Pointer spotlight ---------------- */
  document.querySelectorAll('[data-spotlight]').forEach(function (card) {
    card.addEventListener('pointermove', function (event) {
      var box = card.getBoundingClientRect();
      card.style.setProperty('--mx', (event.clientX - box.left) + 'px');
      card.style.setProperty('--my', (event.clientY - box.top) + 'px');
    });
  });

  /* ---------------- Hero perturbation field ----------------
     A synthetic single-cell embedding: clustered points, short-range
     neighbourhood edges, and perturbation waves that displace and
     re-colour the cells they pass through. */
  var canvas = document.querySelector('[data-field]');
  if (!canvas || !canvas.getContext) return;

  var ctx = canvas.getContext('2d', { alpha: true });
  var host = canvas.parentElement;
  var width = 0;
  var height = 0;
  var dpr = 1;
  var cells = [];
  var edges = [];
  var waves = [];
  var clusters = [];
  var palette = { a: [111, 231, 162], b: [166, 142, 255], c: [255, 146, 100], strength: 1 };
  var pointer = { x: -9999, y: -9999, active: false };
  var time = 0;
  var lastWave = 0;
  var running = true;
  var rafId = null;

  /* x/y are fractions of the hero box, r is cluster spread, n the cell count,
     t the position along the spring→violet ramp (read as a maturation stage). */
  var CLUSTER_LAYOUT = [
    { x: 0.22, y: 0.26, r: 0.062, n: 130, t: 0.04 },
    { x: 0.33, y: 0.60, r: 0.070, n: 155, t: 0.26 },
    { x: 0.52, y: 0.22, r: 0.055, n: 110, t: 0.48 },
    { x: 0.60, y: 0.52, r: 0.075, n: 175, t: 0.70 },
    { x: 0.78, y: 0.30, r: 0.052, n: 105, t: 0.92 },
    { x: 0.88, y: 0.66, r: 0.048, n: 85, t: 1.00 },
    { x: 0.44, y: 0.84, r: 0.045, n: 70, t: 0.14 },
    { x: 0.70, y: 0.86, r: 0.038, n: 52, t: 0.58 },
    { x: 0.12, y: 0.74, r: 0.040, n: 58, t: 0.80 }
  ];

  /* Deterministic PRNG so the layout is identical on every load. */
  var seed = 20240917;
  function random() {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  }
  function gaussian() {
    return (random() + random() + random() + random() - 2) / 2;
  }

  function readPalette() {
    var styles = getComputedStyle(root);
    palette.a = parseColor(styles.getPropertyValue('--spring'), [111, 231, 162]);
    palette.b = parseColor(styles.getPropertyValue('--violet'), [166, 142, 255]);
    palette.c = parseColor(styles.getPropertyValue('--ember'), [255, 146, 100]);
    palette.strength = parseFloat(styles.getPropertyValue('--field-strength')) || 1;
  }

  function parseColor(value, fallback) {
    var hex = (value || '').trim();
    if (/^#[0-9a-f]{6}$/i.test(hex)) {
      return [
        parseInt(hex.slice(1, 3), 16),
        parseInt(hex.slice(3, 5), 16),
        parseInt(hex.slice(5, 7), 16)
      ];
    }
    return fallback;
  }

  function mix(from, to, t) {
    return [
      Math.round(from[0] + (to[0] - from[0]) * t),
      Math.round(from[1] + (to[1] - from[1]) * t),
      Math.round(from[2] + (to[2] - from[2]) * t)
    ];
  }

  function rgba(color, alpha) {
    return 'rgba(' + color[0] + ',' + color[1] + ',' + color[2] + ',' + alpha + ')';
  }

  function build() {
    seed = 20240917;
    cells = [];
    edges = [];
    clusters = [];

    var scale = Math.sqrt((width * height) / (1400 * 800));
    scale = Math.max(0.55, Math.min(scale, 1.25));

    CLUSTER_LAYOUT.forEach(function (spec, ci) {
      var cx = spec.x * width;
      var cy = spec.y * height;
      clusters.push({ x: cx, y: cy });
      var count = Math.round(spec.n * scale);
      /* An elongated, rotated Gaussian blob per cluster — the shape real
         embeddings tend to produce, rather than a symmetric disc. */
      var span = Math.sqrt(width * height);
      var spreadX = spec.r * span * 1.3;
      var spreadY = spec.r * span * 0.78;
      var rot = random() * Math.PI;
      var cosR = Math.cos(rot);
      var sinR = Math.sin(rot);

      for (var i = 0; i < count; i += 1) {
        var u = gaussian() * spreadX;
        var v = gaussian() * spreadY;
        if (random() < 0.07) { u *= 2.1; v *= 2.1; }
        cells.push({
          hx: cx + u * cosR - v * sinR,
          hy: cy + u * sinR + v * cosR,
          x: 0,
          y: 0,
          ox: 0,
          oy: 0,
          r: (0.85 + random() * 1.35) * scale,
          tone: Math.min(1, Math.max(0, spec.t + gaussian() * 0.22)),
          phase: random() * Math.PI * 2,
          speed: 0.35 + random() * 0.5,
          charge: 0,
          glow: random() < 0.09 ? 5 + random() * 8 : 0,
          cluster: ci
        });
      }
    });

    cells.forEach(function (cell) {
      cell.x = cell.hx;
      cell.y = cell.hy;
    });

    /* Short-range neighbourhood edges via a coarse spatial hash. */
    var reach = 34 * scale;
    var buckets = {};
    var key = function (x, y) {
      return Math.floor(x / reach) + ':' + Math.floor(y / reach);
    };

    cells.forEach(function (cell, index) {
      var k = key(cell.hx, cell.hy);
      (buckets[k] || (buckets[k] = [])).push(index);
    });

    cells.forEach(function (cell, index) {
      var gx = Math.floor(cell.hx / reach);
      var gy = Math.floor(cell.hy / reach);
      var links = 0;
      for (var dx = -1; dx <= 1 && links < 3; dx += 1) {
        for (var dy = -1; dy <= 1 && links < 3; dy += 1) {
          var list = buckets[(gx + dx) + ':' + (gy + dy)];
          if (!list) continue;
          for (var i = 0; i < list.length && links < 3; i += 1) {
            var j = list[i];
            if (j <= index) continue;
            var other = cells[j];
            var d = Math.hypot(other.hx - cell.hx, other.hy - cell.hy);
            if (d < reach) {
              edges.push([index, j, 1 - d / reach]);
              links += 1;
            }
          }
        }
      }
    });
  }

  function resize() {
    var box = host.getBoundingClientRect();
    /* The hero is always viewport-wide, so fall back to the window when the
       element reports nothing useful (prerender, background tab, bfcache). */
    var w = box.width || host.offsetWidth || window.innerWidth;
    var h = box.height || host.offsetHeight || Math.round(window.innerHeight * 0.84);
    if (!w || !h) return;
    if (Math.abs(w - width) < 1 && Math.abs(h - height) < 1) return;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = w;
    height = h;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    build();
    /* Repaint straight away: resetting canvas.width clears the bitmap, and the
       next animation frame may be a while off (background tab, reduced motion). */
    step(0);
    draw();
  }

  function fireWave(x, y, strength) {
    if (waves.length > 4) waves.shift();
    waves.push({ x: x, y: y, radius: 0, strength: strength || 1, life: 1 });
  }

  function step(delta) {
    time += delta;

    for (var w = waves.length - 1; w >= 0; w -= 1) {
      var wave = waves[w];
      wave.radius += delta * 420;
      wave.life -= delta * 0.42;
      if (wave.life <= 0) waves.splice(w, 1);
    }

    if (!reduceMotion.matches && time - lastWave > 5.4) {
      lastWave = time;
      var origin = clusters[Math.floor(random() * clusters.length)];
      if (origin) fireWave(origin.x, origin.y, 0.85);
    }

    for (var i = 0; i < cells.length; i += 1) {
      var cell = cells[i];
      var driftX = Math.cos(time * cell.speed + cell.phase) * 2.4;
      var driftY = Math.sin(time * cell.speed * 0.82 + cell.phase) * 2.4;
      var pushX = 0;
      var pushY = 0;
      var charge = 0;

      for (var k = 0; k < waves.length; k += 1) {
        var wv = waves[k];
        var dx = cell.hx - wv.x;
        var dy = cell.hy - wv.y;
        var dist = Math.hypot(dx, dy) || 0.001;
        var band = Math.abs(dist - wv.radius);
        if (band < 70) {
          var force = (1 - band / 70) * wv.life * wv.strength;
          pushX += (dx / dist) * force * 26;
          pushY += (dy / dist) * force * 26;
          charge = Math.max(charge, force);
        }
      }

      if (pointer.active) {
        var px = cell.hx - pointer.x;
        var py = cell.hy - pointer.y;
        var pd = Math.hypot(px, py) || 0.001;
        if (pd < 150) {
          var pf = (1 - pd / 150);
          pushX += (px / pd) * pf * 22;
          pushY += (py / pd) * pf * 22;
          charge = Math.max(charge, pf * 0.55);
        }
      }

      cell.ox += (pushX - cell.ox) * Math.min(1, delta * 9);
      cell.oy += (pushY - cell.oy) * Math.min(1, delta * 9);
      cell.charge += (charge - cell.charge) * Math.min(1, delta * 7);
      cell.x = cell.hx + driftX + cell.ox;
      cell.y = cell.hy + driftY + cell.oy;
    }
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    ctx.lineWidth = 0.75;
    for (var e = 0; e < edges.length; e += 1) {
      var a = cells[edges[e][0]];
      var b = cells[edges[e][1]];
      var weight = edges[e][2];
      var heat = Math.max(a.charge, b.charge);
      var tone = mix(palette.a, palette.b, (a.tone + b.tone) / 2);
      if (heat > 0.02) tone = mix(tone, palette.c, Math.min(1, heat * 1.4));
      ctx.strokeStyle = rgba(tone, ((0.07 + weight * 0.14 + heat * 0.4) * palette.strength).toFixed(3));
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    }

    for (var i = 0; i < cells.length; i += 1) {
      var cell = cells[i];
      var color = mix(palette.a, palette.b, cell.tone);
      if (cell.charge > 0.02) color = mix(color, palette.c, Math.min(1, cell.charge * 1.6));
      var alpha = (0.42 + cell.charge * 0.5) * palette.strength;
      var radius = cell.r * (1 + cell.charge * 1.1);
      var glow = cell.glow + cell.charge * 10;
      if (glow > 0.5) {
        ctx.shadowBlur = glow;
        ctx.shadowColor = rgba(color, 0.75);
      }
      ctx.fillStyle = rgba(color, alpha.toFixed(3));
      ctx.beginPath();
      ctx.arc(cell.x, cell.y, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  var previous = 0;
  function frame(now) {
    rafId = window.requestAnimationFrame(frame);
    if (!running) return;
    var delta = previous ? Math.min((now - previous) / 1000, 0.05) : 0.016;
    previous = now;
    step(reduceMotion.matches ? 0 : delta);
    draw();
  }

  host.addEventListener('pointermove', function (event) {
    var box = canvas.getBoundingClientRect();
    pointer.x = event.clientX - box.left;
    pointer.y = event.clientY - box.top;
    pointer.active = true;
  });
  host.addEventListener('pointerleave', function () { pointer.active = false; });
  host.addEventListener('pointerdown', function (event) {
    var box = canvas.getBoundingClientRect();
    fireWave(event.clientX - box.left, event.clientY - box.top, 1.35);
  });

  document.addEventListener('visibilitychange', function () {
    running = !document.hidden;
    previous = 0;
    /* A tab that was hidden at load time may have measured the hero as zero-sized. */
    if (running) resize();
  });

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      running = entries[0].isIntersecting && !document.hidden;
      previous = 0;
    }, { threshold: 0 }).observe(host);
  }

  window.addEventListener('themechange', function () {
    readPalette();
    draw();
  });

  function scheduleResize() {
    window.clearTimeout(canvas._resizeTimer);
    canvas._resizeTimer = window.setTimeout(resize, 160);
  }
  window.addEventListener('resize', scheduleResize);

  /* The hero can report a zero box at script time (background tab, prerender,
     late font metrics). Watching the element itself guarantees a first paint. */
  if ('ResizeObserver' in window) {
    new ResizeObserver(scheduleResize).observe(host);
  }

  readPalette();
  resize();
  if (!rafId) rafId = window.requestAnimationFrame(frame);
}());
