(function () {
  var root = document.documentElement;
  var themeButton = document.querySelector('.theme-toggle');
  var menuButton = document.querySelector('.menu-toggle');
  var nav = document.querySelector('.site-nav');

  if (themeButton) {
    themeButton.addEventListener('click', function () {
      var next = root.dataset.theme === 'dark' ? 'light' : 'dark';
      root.dataset.theme = next;
      try { localStorage.setItem('theme', next); } catch (error) { /* Theme still applies for this page. */ }
      document.querySelector('meta[name="theme-color"]').setAttribute('content', next === 'dark' ? '#0c1512' : '#f5f7f6');
    });
  }

  if (menuButton && nav) {
    menuButton.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(isOpen));
      menuButton.querySelector('.sr-only').textContent = isOpen ? 'Close navigation' : 'Open navigation';
    });

    nav.addEventListener('click', function (event) {
      if (event.target.tagName === 'A') {
        nav.classList.remove('open');
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.querySelector('.sr-only').textContent = 'Open navigation';
      }
    });
  }

  var field = document.querySelector('.research-field');
  if (field) {
    var context = field.getContext('2d');
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var points = [];
    var pointer = { x: -1000, y: -1000 };
    var frame = 0;
    var seed = 17;

    function random() {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    }

    function resizeField() {
      var box = field.getBoundingClientRect();
      var ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      field.width = Math.round(box.width * ratio);
      field.height = Math.round(box.height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      if (!points.length) {
        for (var i = 0; i < 58; i += 1) {
          var cluster = i % 3;
          var centerX = [0.24, 0.56, 0.83][cluster] * box.width;
          var centerY = [0.34, 0.65, 0.28][cluster] * box.height;
          points.push({
            x: centerX + (random() - .5) * box.width * .3,
            y: centerY + (random() - .5) * box.height * .34,
            ox: 0,
            oy: 0,
            r: 1.1 + random() * 1.7,
            phase: random() * Math.PI * 2
          });
        }
      }
    }

    function drawField() {
      var box = field.getBoundingClientRect();
      var fieldColor = root.dataset.theme === 'dark' ? '131,172,209' : '36,91,143';
      context.clearRect(0, 0, box.width, box.height);
      frame += reduceMotion ? 0 : .006;

      points.forEach(function (point, index) {
        var driftX = Math.cos(frame + point.phase) * 3;
        var driftY = Math.sin(frame * .8 + point.phase) * 3;
        var dx = point.x - pointer.x;
        var dy = point.y - pointer.y;
        var distance = Math.sqrt(dx * dx + dy * dy);
        var influence = distance < 130 ? (130 - distance) / 130 : 0;
        point.ox = influence ? (dx / Math.max(distance, 1)) * influence * 8 : 0;
        point.oy = influence ? (dy / Math.max(distance, 1)) * influence * 8 : 0;
        var x = point.x + driftX + point.ox;
        var y = point.y + driftY + point.oy;

        for (var j = index + 1; j < points.length; j += 1) {
          var other = points[j];
          var lineX = other.x - point.x;
          var lineY = other.y - point.y;
          var lineDistance = Math.sqrt(lineX * lineX + lineY * lineY);
          if (lineDistance < 95) {
            context.beginPath();
            context.moveTo(x, y);
            context.lineTo(other.x, other.y);
            context.strokeStyle = 'rgba(' + fieldColor + ',' + ((95 - lineDistance) / 95 * .12) + ')';
            context.lineWidth = .7;
            context.stroke();
          }
        }

        context.beginPath();
        context.arc(x, y, point.r, 0, Math.PI * 2);
        context.fillStyle = index % 7 === 0 ? 'rgba(' + fieldColor + ',.46)' : 'rgba(' + fieldColor + ',.2)';
        context.fill();
      });

      if (!reduceMotion) window.requestAnimationFrame(drawField);
    }

    field.parentElement.addEventListener('pointermove', function (event) {
      var box = field.getBoundingClientRect();
      pointer.x = event.clientX - box.left;
      pointer.y = event.clientY - box.top;
    });
    field.parentElement.addEventListener('pointerleave', function () {
      pointer.x = -1000;
      pointer.y = -1000;
    });
    window.addEventListener('resize', resizeField);
    resizeField();
    drawField();
  }
}());
