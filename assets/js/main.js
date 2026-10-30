(function(){
  "use strict";

  var overture = document.getElementById('overture');
  var suite    = document.getElementById('suite');
  var score    = document.getElementById('score');
  var toggle   = document.getElementById('music-toggle');
  var calm     = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  try { history.scrollRestoration = 'manual'; } catch (e) {}
  document.documentElement.classList.add('is-sealed');
  window.scrollTo(0, 0);

  (function motes(){
    if (calm) return;
    var host = document.getElementById('motes');
    if (!host) return;
    var frag = document.createDocumentFragment();
    for (var i = 0; i < 7; i++){
      var m = document.createElement('span');
      m.className = 'mote';
      m.style.left = (6 + Math.random() * 88).toFixed(2) + '%';
      m.style.animationDuration = (16 + Math.random() * 14).toFixed(1) + 's';
      m.style.animationDelay = (-Math.random() * 22).toFixed(1) + 's';
      m.style.setProperty('--mx', (Math.random() * 60 - 30).toFixed(0) + 'px');
      frag.appendChild(m);
    }
    host.appendChild(frag);
  })();

  (function drift(){
    if (calm) return;
    var host = document.getElementById('drift');
    if (!host) return;

    var stroke = '#B4B1A9';
    function leaf(size){
      return '<svg width="' + size + '" height="' + (size * 0.78).toFixed(1) + '" viewBox="0 0 30 24" fill="none">'
        + '<path d="M2 21C2 10 9 2 21 2c5 0 7 2 7 6 0 10-8 16-18 16-5 0-8-1-8-3Z" stroke="' + stroke + '" stroke-width="1.4" stroke-linejoin="round"/>'
        + '<path d="M2 21C9 17 16 11 21 2" stroke="' + stroke + '" stroke-width="1.2"/>'
        + '<path d="M8 18C9 14 10 12 12 9M13 20C15 16 17 13 19 10M18 20C20 17 22 15 24 12" stroke="' + stroke + '" stroke-width="1"/>'
        + '</svg>';
    }
    function pick(a, b){ return a + Math.random() * (b - a); }

    function petal(size){
      return '<svg width="' + size + '" height="' + (size * 1.55).toFixed(1) + '" viewBox="0 0 18 28" fill="none">'
        + '<path d="M9 1C15 8 17 17 12 24c-2.6 3.6-5.4 3.6-8 0C-1 17 3 8 9 1Z" stroke="' + stroke + '" stroke-width="1.4" stroke-linejoin="round"/>'
        + '<path d="M9 4c-2 7-2 13 0 20" stroke="' + stroke + '" stroke-width="1.1"/>'
        + '</svg>';
    }
    function sprig(size){
      return '<svg width="' + size + '" height="' + (size * 0.92).toFixed(1) + '" viewBox="0 0 28 26" fill="none">'
        + '<path d="M3 24C8 19 14 13 24 6" stroke="' + stroke + '" stroke-width="1.3" stroke-linecap="round"/>'
        + '<path d="M13 14c-1-5 1-8 6-9 1 5-1 8-6 9Z" stroke="' + stroke + '" stroke-width="1.3" stroke-linejoin="round"/>'
        + '<path d="M11 16c-5-1-7 1-8 6 5 1 7-1 8-6Z" stroke="' + stroke + '" stroke-width="1.3" stroke-linejoin="round"/>'
        + '</svg>';
    }

    function one(wide, box, slot, slots){
      var d = document.createElement('span');
      d.className = 'drift-leaf';
      var inner = document.createElement('span');
      var roll = Math.random();
      inner.innerHTML = roll < 0.36 ? petal(pick(12, 20).toFixed(1))
                      : roll < 0.62 ? sprig(pick(17, 28).toFixed(1))
                                    : leaf(pick(16, 29).toFixed(1));
      d.appendChild(inner);

      var lane = (slot + pick(0.16, 0.84)) / slots;
      d.style.left = (2 + lane * 88).toFixed(2) + '%';
      if (!wide) d.style.setProperty('--drop', (box + 160) + 'px');
      d.style.setProperty('--dx', pick(-40, 40).toFixed(0) + 'px');
      d.style.setProperty('--r0', pick(-40, 40).toFixed(0) + 'deg');
      d.style.setProperty('--r1', pick(150, 430).toFixed(0) + 'deg');
      d.style.setProperty('--o',  pick(0.34, 0.6).toFixed(2));
      d.style.setProperty('--sw', pick(8, 19).toFixed(0) + 'px');

      var span = pick(19, 30);
      d.style.animationDuration = span.toFixed(1) + 's';
      var turn = (slot + pick(0.1, 0.9)) / slots;
      d.style.animationDelay = (-turn * span).toFixed(1) + 's';
      inner.style.animationDuration = pick(4, 8).toFixed(1) + 's';
      inner.style.animationDelay = (-Math.random() * 6).toFixed(1) + 's';
      return d;
    }

    var narrow = window.innerWidth < 600;
    var frag = document.createDocumentFragment();
    var many = narrow ? 10 : 15;
    for (var i = 0; i < many; i++) frag.appendChild(one(true, 0, i, many));
    host.appendChild(frag);

    var over = document.getElementById('drift-over');
    if (over){
      var overFrag = document.createDocumentFragment();
      var overMany = narrow ? 8 : 12;
      for (var j = 0; j < overMany; j++) overFrag.appendChild(one(true, 0, j, overMany));
      over.appendChild(overFrag);
    }

    var LIGHT = '.pg-letter,.pg-details,.pg-story,.pg-note,.pg-ent,.pg-gift,.pg-faq,.pg-rsvp';
    var overs = document.querySelectorAll(LIGHT);
    for (var c = 0; c < overs.length; c++){
      var box = document.createElement('div');
      box.className = 'drift-in';
      box.setAttribute('aria-hidden', 'true');
      var inFrag = document.createDocumentFragment();
      var each = narrow ? 10 : 14;
      var tall = Math.round(overs[c].getBoundingClientRect().height) || 600;
      for (var k = 0; k < each; k++) inFrag.appendChild(one(false, tall, k, each));
      box.appendChild(inFrag);
      overs[c].classList.add('has-drift');
      overs[c].insertBefore(box, overs[c].firstChild);
    }
  })();

  (function countdown(){
    var when = new Date('2027-02-02T15:00:00+08:00').getTime();
    var d = document.getElementById('c-d'),
        h = document.getElementById('c-h'),
        m = document.getElementById('c-m'),
        s = document.getElementById('c-s');
    if (!d) return;

    function leaf(cell, name){
      var b = document.createElement('b');
      b.className = name;
      cell.appendChild(b);
      return b;
    }

    function card(){
      var cell = document.createElement('span');
      cell.className = 'fd';
      leaf(cell, 'd-top');
      leaf(cell, 'd-foot');
      leaf(cell, 'd-fold');
      leaf(cell, 'd-rise');

      cell.addEventListener('animationend', function(e){
        if (e.target !== cell.children[3] || e.animationName !== 'leaf-up') return;
        cell.children[1].setAttribute('data-d', cell.getAttribute('data-d'));
        cell.classList.remove('is-turning');
      });
      return cell;
    }

    function turn(cell, next){
      var now = cell.getAttribute('data-d');
      if (now === next) return;
      cell.setAttribute('data-d', next);
      cell.children[0].setAttribute('data-d', next);
      cell.children[2].setAttribute('data-d', now);
      cell.children[3].setAttribute('data-d', next);

      if (now === null){
        cell.children[1].setAttribute('data-d', next);
        return;
      }

      if (cell.classList.contains('is-turning')){
        cell.children[1].setAttribute('data-d', now);
      }
      cell.classList.remove('is-turning');
      void cell.offsetWidth;
      cell.classList.add('is-turning');
    }

    function cells(el, value){
      var want = String(value);
      var pad  = parseInt(el.getAttribute('data-pad'), 10) || 2;
      while (want.length < pad) want = '0' + want;

      if (el.childElementCount !== want.length){
        el.textContent = '';
        for (var i = 0; i < want.length; i++) el.appendChild(card());
      }
      for (var j = 0; j < want.length; j++) turn(el.children[j], want[j]);
    }

    function tick(){
      var left = when - Date.now();
      if (left <= 0){
        [d, h, m, s].forEach(function(el){ cells(el, 0); });
        clearInterval(timer);
        return;
      }
      var sec = Math.floor(left / 1000);
      cells(d, Math.floor(sec / 86400));
      cells(h, Math.floor(sec / 3600) % 24);
      cells(m, Math.floor(sec / 60) % 60);
      cells(s, sec % 60);
    }
    tick();
    var timer = setInterval(tick, 1000);
  })();

  var RSVP_ENDPOINT = 'https://script.google.com/macros/s/AKfycbwX7itsDawc_Cr2QFfYpwr4Q4VMH3MoiU3BDVISYa8P35Sl_t4vzWMe3ndbmg5jAn4N/exec';

  var woken = false;

  function wakeScript(){
    if (woken || !RSVP_ENDPOINT) return;
    woken = true;
    fetch(RSVP_ENDPOINT + '?name=').catch(function(){});
  }

  function askGoogle(url, options, ms){
    var ctl = ('AbortController' in window) ? new AbortController() : null;
    var bell = window.setTimeout(function(){
      try { if (ctl) ctl.abort(); } catch (ignored) {}
    }, ms);

    var sent = {};
    if (options) for (var k in options) if (options.hasOwnProperty(k)) sent[k] = options[k];
    if (ctl) sent.signal = ctl.signal;

    return fetch(url, sent)
      .then(function(r){ window.clearTimeout(bell); return r.json(); },
            function(err){ window.clearTimeout(bell); throw err; });
  }

  function askGoogleTwice(url, options){
    return askGoogle(url, options, 20000).catch(function(){
      return new Promise(function(go){ window.setTimeout(go, 1200); })
        .then(function(){ return askGoogle(url, options, 30000); })
        .then(function(res){
          if (res && typeof res === 'object') res.retried = true;
          return res;
        });
    });
  }

  (function coverPhotos(){
    var shots = document.querySelectorAll('.cover-photo img');

    Array.prototype.forEach.call(shots, function(img){
      function fallBack(){
        var cover = img.closest ? img.closest('section.cover') : null;
        if (!cover) return;
        cover.classList.remove('has-photo');
        cover.classList.add('no-photo');
      }

      img.addEventListener('error', fallBack);
      if (img.complete && img.naturalWidth === 0) fallBack();
    });
  })();

  (function coverJumps(){
    var cues = document.querySelectorAll('.cover-cue');

    Array.prototype.forEach.call(cues, function(cue){
      cue.addEventListener('click', function(ev){
        var id = String(cue.getAttribute('href') || '').replace('#', '');
        var target = id && document.getElementById(id);
        if (!target) return;

        ev.preventDefault();
        target.scrollIntoView({ behavior: calm ? 'auto' : 'smooth', block: 'start' });
      });
    });
  })();

  function wakeWhenSeen(el){
    if (!el) return;
    if (!('IntersectionObserver' in window)) return;

    var watcher = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (!entry.isIntersecting) return;
        wakeScript();
        watcher.disconnect();
      });
    }, { rootMargin: '0px 0px -20% 0px' });

    watcher.observe(el);
  }

  (function rsvp(){
    var find   = document.getElementById('rsvp-find');
    var input  = document.getElementById('rsvp-name');
    var look   = document.getElementById('rsvp-look');
    var msg    = document.getElementById('rsvp-msg');
    var party  = document.getElementById('rsvp-party');
    var seats  = document.getElementById('rsvp-seats');
    var seatsL = document.getElementById('rsvp-seats-l');
    var list   = document.getElementById('rsvp-guests');
    var others = document.getElementById('rsvp-others');
    var send   = document.getElementById('rsvp-send');
    var again  = document.getElementById('rsvp-again');
    var alt    = document.getElementById('rsvp-alt');
    var food   = document.getElementById('rsvp-food');

    if (!find || !RSVP_ENDPOINT) return;

    find.hidden = false;
    if (alt) alt.textContent = 'If your name does not come up, let us know';

    var current = null;

    function norm(value){
      return String(value == null ? '' : value)
        .normalize('NFD').replace(/[̀-ͯ]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9 ]+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
    }

    function whoWasLookedUp(typed, members){
      var key = norm(typed);

      for (var i = 0; i < members.length; i++){
        if (norm(members[i]) === key) return members[i];
      }

      var words = key.split(' ');
      var near = members.filter(function(m){
        var parts = norm(m).split(' ');
        return words.every(function(w){ return parts.indexOf(w) !== -1; });
      });

      return near.length === 1 ? near[0] : null;
    }

    function say(text, tone){
      if (!text){ msg.hidden = true; return; }
      msg.textContent = text;
      msg.setAttribute('data-tone', tone || 'soft');
      msg.hidden = false;
    }

    function busy(el, on, label){
      el.disabled = on;
      el.textContent = on ? label : el.getAttribute('data-idle');
    }

    look.setAttribute('data-idle', look.textContent);
    send.setAttribute('data-idle', send.textContent);

    input.addEventListener('focus', wakeScript);
    wakeWhenSeen(find);

    find.addEventListener('submit', function(ev){
      ev.preventDefault();
      var name = input.value.trim();
      if (!name){ say('Please enter your name first.'); input.focus(); return; }

      party.hidden = true;
      say('');
      busy(look, true, 'Looking…');

      var slow = window.setTimeout(function(){
        say('Still looking. This can take a few seconds.');
      }, 4000);

      function done(){
        window.clearTimeout(slow);
        busy(look, false);
      }

      askGoogleTwice(RSVP_ENDPOINT + '?name=' + encodeURIComponent(name))
        .then(function(data){
          done();
          if (!data || !data.found){
            say(data && data.several
              ? 'That name belongs to more than one guest. Please type your first name, or your full name.'
              : 'We could not find that name. Try your first name. If it still does not come up, please let us know.',
              'bad');
            return;
          }
          current = data;
          render(data);
        })
        .catch(function(){
          done();
          say('Something went wrong reaching our guest list. Please try again in a moment, or let us know.', 'bad');
        });
    });

    function render(data){
      var members = data.members || [];
      var replied = data.replied || {};

      current = { party: data.party || '', members: members, done: {}, going: {} };

      seats.textContent = members.length;
      seatsL.textContent = members.length === 1 ? 'seat' : 'seats';

      list.textContent = '';
      members.forEach(function(person, i){ list.appendChild(guestRow(person, i)); });

      members.forEach(function(person, i){
        if (replied.hasOwnProperty(person)) markDone(i, person, replied[person]);
      });

      var waiting = members.filter(function(m){ return !current.done[m]; });

      others.hidden = members.length < 2 || !waiting.length;
      party.hidden = false;
      again.hidden = waiting.length > 0;
      send.hidden = !waiting.length;
      busy(send, false);

      if (!waiting.length){
        say(members.length === 1
          ? 'You have already replied. Thank you.'
          : 'Everyone on this invitation has replied. Thank you.');
      } else {
        say('');
      }

      party.scrollIntoView({ behavior: calm ? 'auto' : 'smooth', block: 'center' });
    }

    function guestRow(person, i){
      var li = document.createElement('li');
      var wrap = document.createElement('div');
      wrap.className = 'guest';
      wrap.setAttribute('data-guest', String(i));

      var n = document.createElement('p');
      n.className = 'guest-n';
      n.textContent = person;
      wrap.appendChild(n);

      var reply = document.createElement('div');
      reply.className = 'reply';
      reply.setAttribute('role', 'radiogroup');
      reply.setAttribute('aria-label', 'Reply for ' + person);

      [['yes', 'Joyfully accepts'], ['no', 'Regretfully declines']].forEach(function(opt){
        var id = 'g' + i + '-' + opt[0];
        var r = document.createElement('input');
        r.type = 'radio'; r.name = 'guest-' + i; r.id = id; r.value = opt[0];
        var l = document.createElement('label');
        l.setAttribute('for', id);
        l.textContent = opt[1];
        reply.appendChild(r);
        reply.appendChild(l);
      });

      reply.addEventListener('change', function(){ say(''); });

      wrap.appendChild(reply);
      li.appendChild(wrap);
      return li;
    }

    function markDone(i, person, attending){
      var wrap = list.querySelector('[data-guest="' + i + '"]');
      if (!wrap) return;
      var reply = wrap.querySelector('.reply');
      if (reply) reply.remove();

      var done = document.createElement('p');
      done.className = 'reply-done';
      done.textContent = attending ? 'Joyfully accepts' : 'Regretfully declines';
      wrap.appendChild(done);
      wrap.classList.add('is-done');

      current.done[person] = true;
      current.going[person] = !!attending;
    }

    function reset(){
      current = null;
      party.hidden = true;
      again.hidden = true;
      find.hidden = false;
      busy(send, false);
      say('');
      input.value = '';
      input.focus();
      find.scrollIntoView({ behavior: calm ? 'auto' : 'smooth', block: 'center' });
    }

    again.addEventListener('click', reset);

    send.addEventListener('click', function(){
      if (!current) return;

      var members = current.members || [];
      var replies = [];

      members.forEach(function(person, i){
        if (current.done[person]) return;
        var picked = list.querySelector('input[name="guest-' + i + '"]:checked');
        if (picked) replies.push({ index: i, name: person, attending: picked.value === 'yes' });
      });

      if (!replies.length){
        say('Please reply for at least one guest before confirming.', 'bad');
        return;
      }

      busy(send, true, 'Sending');
      say('');

      askGoogleTwice(RSVP_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          party: current.party || '',
          lookup: input.value.trim(),
          food: (food && food.value.trim()) || '',
          replies: replies.map(function(r){ return { name: r.name, attending: r.attending }; })
        })
      })
        .then(function(res){
          var landed = res && res.already && res.retried;

          if (res && res.already && !landed){
            busy(send, false);
            say('That has already been answered. Search again to see what is recorded.', 'bad');
            return;
          }
          if (!res || (!res.ok && !landed)) throw new Error('rejected');

          replies.forEach(function(r){ markDone(r.index, r.name, r.attending); });

          var waiting = members.filter(function(m){ return !current.done[m]; });
          var names = replies.map(function(r){ return r.name; });

          busy(send, false);

          if (!waiting.length){
            party.hidden = true;
            again.hidden = false;
            var coming = members.some(function(m){ return current.going[m]; });
            say(coming
              ? 'Thank you. Your reply is in, and we cannot wait to celebrate with you.'
              : (members.length === 1
                  ? 'Thank you for letting us know. You will be missed on the day.'
                  : 'Thank you for letting us know. You will all be missed on the day.'));
            msg.scrollIntoView({ behavior: calm ? 'auto' : 'smooth', block: 'center' });
            return;
          }

          send.hidden = false;
          again.hidden = false;
          say('Recorded for ' + names.join(', ') + '. '
            + (waiting.length === 1 ? waiting[0] + ' has' : waiting.join(', ') + ' have')
            + ' still to reply, whenever is convenient.');
        })
        .catch(function(){
          busy(send, false);
          say('We could not record that just now. Please try again in a moment.', 'bad');
        });
    });
  })();

  (function share(){
    var box    = document.getElementById('share');
    var nameEl = document.getElementById('share-name');
    var pick   = document.getElementById('share-pick');
    var choose = document.getElementById('share-choose');
    var list   = document.getElementById('share-list');
    var msg    = document.getElementById('share-msg');
    var send   = document.getElementById('share-send');
    var again  = document.getElementById('share-again');

    if (!box || !RSVP_ENDPOINT) return;
    box.hidden = false;

    nameEl.addEventListener('focus', wakeScript);
    wakeWhenSeen(box);

    var link = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    var thin = !!(link && /^(slow-)?2g$|^3g$/.test(String(link.effectiveType || '')));

    var CHUNK = (thin ? 1 : 4) * 1024 * 1024;
    var CHUNK_TRIES = 3;
    var CHUNK_WAIT = 90000;
    var FALLBACK_MAX = 18 * 1024 * 1024;
    var INIT_WAIT = 12000;
    var picked = [];
    var seq = 0;
    var sending = false;
    var stopped = false;
    var inFlight = null;

    var directWorks = true;
    var directKnown = false;
    var roomLeft = -1;

    function checkRoute(){
      if (directKnown) return Promise.resolve(directWorks);

      return ask({
        action: 'upload-init',
        probe: true,
        from: '',
        name: 'route check',
        type: 'text/plain',
        size: 1,
        origin: window.location.origin
      }, 12000)
      .then(function(res){
        directWorks = !!(res && res.ok && res.session);
        directKnown = true;
        if (res && typeof res.free === 'number' && res.free >= 0) roomLeft = res.free;
        return directWorks;
      })
      .catch(function(){
        directWorks = false;
        directKnown = true;
        return false;
      });
    }

    var bigFiles = null;

    function dropOff(){
      if (bigFiles !== null) return Promise.resolve(bigFiles);

      return fetch(RSVP_ENDPOINT + '?folder=1')
        .then(function(r){ return r.json(); })
        .then(function(res){
          bigFiles = (res && res.folder) || '';
          return bigFiles;
        })
        .catch(function(){ bigFiles = ''; return ''; });
    }

    function sayWithDropOff(before, linkText, plainText, after, tone){
      dropOff().then(function(url){
        if (!url){
          say(before + plainText + '. ' + after, tone);
          return;
        }

        msg.textContent = '';
        msg.appendChild(document.createTextNode(before));

        var a = document.createElement('a');
        a.className = 'map-cta';
        a.href = url;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.textContent = linkText;
        msg.appendChild(a);

        msg.appendChild(document.createTextNode('. ' + after));
        msg.hidden = false;
        if (tone) msg.setAttribute('data-tone', tone);
        else msg.removeAttribute('data-tone');
      });
    }

    function say(text, tone){
      if (!text){ msg.hidden = true; return; }
      msg.textContent = text;
      msg.hidden = false;
      if (tone) msg.setAttribute('data-tone', tone);
      else msg.removeAttribute('data-tone');
    }

    function mb(bytes){
      return bytes < 1048576
        ? Math.max(1, Math.round(bytes / 1024)) + ' KB'
        : (Math.round((bytes / 1048576) * 10) / 10) + ' MB';
    }

    function rowFor(entry){
      var li = document.createElement('li');
      li.className = 'share-item';
      li.setAttribute('data-id', String(entry.id));

      var f = document.createElement('p');
      f.className = 'share-f';
      f.textContent = entry.file.name;

      var s = document.createElement('p');
      s.className = 'share-s';
      s.textContent = mb(entry.file.size);

      var bar = document.createElement('div');
      bar.className = 'share-bar';
      bar.appendChild(document.createElement('span'));

      var drop = document.createElement('button');
      drop.type = 'button';
      drop.className = 'share-x';
      drop.textContent = '×';
      drop.setAttribute('aria-label', 'Remove ' + entry.file.name);
      drop.addEventListener('click', function(){
        if (entry.sending) return;
        var at = picked.indexOf(entry);
        if (at === -1) return;
        picked.splice(at, 1);
        redraw();
        say(picked.length ? '' : 'Nothing chosen.');
      });

      li.appendChild(f);
      li.appendChild(s);
      li.appendChild(drop);
      li.appendChild(bar);
      return li;
    }

    function draw(){
      for (var i = list.children.length; i < picked.length; i++){
        list.appendChild(rowFor(picked[i]));
      }
      send.hidden = !picked.length;
    }

    function redraw(){
      list.textContent = '';
      draw();
    }

    function row(id){ return list.querySelector('[data-id="' + id + '"]'); }

    function progress(id, fraction){
      var li = row(id); if (!li) return;
      var fill = li.querySelector('.share-bar span');
      if (fill) fill.style.width = Math.round(fraction * 100) + '%';

      var s = li.querySelector('.share-s');
      if (s && !li.classList.contains('is-done') && !li.classList.contains('is-failed')){
        s.textContent = Math.round(fraction * 100) + '%';
      }
    }

    function state(id, text, klass){
      var li = row(id); if (!li) return;
      var s = li.querySelector('.share-s');
      if (s) s.textContent = text;
      if (klass) li.classList.add(klass);
    }

    choose.addEventListener('click', function(){ pick.click(); });

    pick.addEventListener('change', function(){
      var chosen = Array.prototype.slice.call(pick.files || []);
      if (!chosen.length) return;

      if (picked.length && picked.every(function(p){ return p.done || p.hopeless; })) picked = [];

      chosen.forEach(function(file){
        picked.push({ id: ++seq, file: file, done: false });
      });
      send.textContent = 'Send them';

      draw();

      var anyBig = picked.some(function(p){ return !p.done && p.file.size > FALLBACK_MAX; });

      if (anyBig && !directKnown){
        say('Checking whether these can be sent…');
        checkRoute().then(finishPick);
        return;
      }

      finishPick();
    });

    function finishPick(){
      if (sending){
        say('Added. They will go after the ones already on their way.');
        return;
      }

      finishPickIdle();
    }

    function ceiling(){
      var limits = [];
      if (!directWorks) limits.push(FALLBACK_MAX);
      if (roomLeft >= 0) limits.push(roomLeft);
      return limits.length ? Math.min.apply(null, limits) : Infinity;
    }

    function whyRefused(size){
      return (!directWorks && size > FALLBACK_MAX) ? 'route' : 'room';
    }

    function finishPickIdle(){
      var cap = ceiling();
      var overCap = 0;
      var reason = '';

      picked.forEach(function(p){
        if (p.done || p.file.size <= cap) return;
        p.hopeless = true;
        overCap++;
        reason = whyRefused(p.file.size);
        state(p.id, reason === 'room' ? 'No room left for this' : 'Too large to send', 'is-failed');
      });

      var heavy = picked.filter(function(p){ return !p.hopeless && p.file.size > 200 * 1048576; });
      var total = picked.reduce(function(n, p){ return n + p.file.size; }, 0);

      var opening = (picked.length === 1 ? 'One file' : picked.length + ' files')
        + ', ' + mb(total) + ' in all. ';
      var anyLeft = picked.some(function(p){ return !p.done && !p.hopeless; });
      var closing = !anyLeft
        ? ''
        : heavy.length
          ? 'A long video takes many minutes on phone signal, so keep this page open. If it is easier, send it later on wifi.'
          : 'Keep this page open while they go.';

      if (!overCap){
        say(opening + closing);
        return;
      }

      var many = overCap === 1 ? 'One is' : overCap + ' are';

      var them = overCap === 1 ? 'it' : 'those';

      if (reason === 'room'){
        say(opening + many + ' larger than the ' + mb(roomLeft)
          + ' of space left, so please send ' + them + ' to us directly. ' + closing, 'bad');
      } else {
        sayWithDropOff(opening + many + ' longer than this page can carry, so please ',
          overCap === 1 ? 'drop it here instead' : 'drop those here instead',
          overCap === 1 ? 'send it to us directly' : 'send those to us directly',
          closing, 'bad');
      }
    }

    function ask(payload, ms){
      return new Promise(function(resolve, reject){
        var settled = false;
        var timer = window.setTimeout(function(){
          if (!settled){ settled = true; reject(new Error('timeout')); }
        }, ms || 20000);

        fetch(RSVP_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(payload)
        })
        .then(function(r){ return r.json(); })
        .then(function(res){
          if (settled) return;
          settled = true; window.clearTimeout(timer); resolve(res);
        })
        .catch(function(err){
          if (settled) return;
          settled = true; window.clearTimeout(timer); reject(err);
        });
      });
    }

    function openSession(entry, tries){
      return ask({
        action: 'upload-init',
        from: nameEl.value.trim(),
        name: entry.file.name,
        type: entry.file.type || 'application/octet-stream',
        size: entry.file.size,

        origin: window.location.origin
      }, tries ? 30000 : INIT_WAIT)
      .catch(function(err){
        if (tries || String(err && err.message) !== 'timeout') throw err;

        return openSession(entry, 1);
      });
    }

    function putDirect(entry, id){
      var carried = entry.session && entry.at > 0
        ? Promise.resolve({ ok: true, session: entry.session,
            name: entry.sentAs, folder: entry.folder })
        : openSession(entry, 0).then(function(res){
            if (!res || !res.ok || !res.session){
              throw new Error('init: ' + ((res && res.error) || 'no session'));
            }
            entry.session = res.session;
            entry.sentAs = res.name || entry.file.name;
            entry.folder = res.folder || '';
            entry.at = 0;
            return res;
          });

      return carried.then(function(res){
        return putChunks(entry.session, entry, id).then(function(){
          ask({
            action: 'upload-done',
            from: nameEl.value.trim(),
            name: entry.sentAs || entry.file.name,
            folder: entry.folder || '',
            size: entry.file.size
          }).catch(function(){});
        });
      });
    }

    function putChunks(session, entry, id){
      var total = entry.file.size;

      function sendChunk(start, end, tries){
        var ctl = ('AbortController' in window) ? new AbortController() : null;
        inFlight = ctl;

        var giveUp = window.setTimeout(function(){
          try { if (ctl) ctl.abort(); } catch (ignored) {}
        }, CHUNK_WAIT);

        function rest(){ window.clearTimeout(giveUp); }

        return fetch(session, {
          method: 'PUT',
          headers: {
            'Content-Range': 'bytes ' + start + '-' + (end - 1) + '/' + total
          },
          body: entry.file.slice(start, end),
          signal: ctl ? ctl.signal : undefined
        })
        .then(function(r){ rest(); return r; }, function(err){ rest(); throw err; })
        .catch(function(){
          if (stopped) throw new Error('stopped');

          throw new Error('chunk: blocked or offline');
        })
        .then(function(r){
          if (r.status === 200 || r.status === 201 || r.status === 308) return r.status;

          if (r.status === 404 || r.status === 410){
            entry.session = null;
            entry.at = 0;
          }
          throw new Error('chunk: ' + r.status);
        })
        .catch(function(err){
          if (stopped || String(err && err.message) === 'stopped') throw new Error('stopped');

          var n = (tries || 0) + 1;
          if (n >= CHUNK_TRIES || !entry.session) throw err;

          return new Promise(function(resolve){
            window.setTimeout(resolve, 1500 * n);
          }).then(function(){ return sendChunk(start, end, n); });
        });
      }

      function step(start){
        if (stopped) return Promise.reject(new Error('stopped'));
        if (start >= total) return Promise.resolve();

        var end = Math.min(start + CHUNK, total);
        return sendChunk(start, end, 0).then(function(status){
          entry.at = end;
          progress(id, end / total);
          if (status === 308) return step(end);
        });
      }

      return step(entry.at || 0);
    }

    function putThroughScript(entry, id, why){
      if (entry.file.size > FALLBACK_MAX){
        return Promise.reject(new Error('too large'));
      }

      return new Promise(function(resolve, reject){
        var reader = new FileReader();
        reader.onerror = function(){ reject(new Error('unreadable')); };
        reader.onload = function(){
          var data = String(reader.result || '');
          var comma = data.indexOf(',');
          resolve(comma === -1 ? data : data.slice(comma + 1));
        };
        reader.readAsDataURL(entry.file);
      })
      .then(function(base64){
        progress(id, 0.6);
        return fetch(RSVP_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify({
            action: 'upload-blob',
            from: nameEl.value.trim(),
            name: entry.file.name,
            type: entry.file.type || 'application/octet-stream',
            why: String(why || ''),
            data: base64
          })
        });
      })
      .then(function(r){ return r.json(); })
      .then(function(res){
        if (!res || !res.ok) throw new Error((res && res.error) || 'refused');
        progress(id, 1);
      });
    }

    function sendOne(entry, id){
      if (entry.done) return Promise.resolve(true);
      state(id, 'Sending');

      var route = directWorks
        ? putDirect(entry, id).catch(function(err){
            var why = String((err && err.message) || '');
            var wobble = why === 'timeout' || why.indexOf('chunk:') === 0;

            if (!wobble){
              directWorks = false;
              directKnown = true;
            }

            if (entry.file.size > FALLBACK_MAX) throw err;

            return putThroughScript(entry, id, why);
          })
        : putThroughScript(entry, id, 'direct route already refused this visit');

      return route
        .then(function(){
          entry.done = true;
          state(id, 'Sent', 'is-done');
          return true;
        })
        .catch(function(err){
          var why = String(err && err.message);
          if (why === 'stopped' || stopped){
            state(id, 'Stopped', 'is-failed');
            progress(id, 0);
            return false;
          }

          var tooBig = why === 'too large';
          entry.hopeless = tooBig;
          state(id, tooBig ? 'Too large to send' : 'Did not send', 'is-failed');
          progress(id, 0);
          return false;
        });
    }

    function clearSent(){
      picked = picked.filter(function(p){ return !p.done && !p.hopeless; });
      redraw();
      say('');
    }

    function retryable(){
      return picked.filter(function(p){ return !p.done && !p.hopeless; });
    }

    function openPicker(){
      pick.value = '';
      pick.click();
    }

    function startPicking(){
      picked = [];
      redraw();
      say('');
      again.hidden = true;
      openPicker();
    }

    again.addEventListener('click', function(){
      if (sending) openPicker();
      else startPicking();
    });

    function stopSending(){
      stopped = true;
      send.disabled = true;
      send.textContent = 'Stopping';
      try { if (inFlight) inFlight.abort(); } catch (ignored) {}
      say('Stopping after the piece that is on its way.');
    }

    send.addEventListener('click', function(){
      if (sending){ stopSending(); return; }

      if (!retryable().length){
        startPicking();
        return;
      }

      if (!nameEl.value.trim()){
        say('Please add your name first, so we know whose photos these are.', 'bad');
        nameEl.focus();
        return;
      }

      sending = true;
      stopped = false;
      send.textContent = 'Stop sending';

      again.textContent = 'Add more photos';
      again.hidden = false;

      say('Please keep this page open until it says they are through.');

      var sent = 0, failed = 0;
      picked.forEach(function(p){ p.tried = false; });

      function next(){
        var entry = null;
        for (var k = 0; k < picked.length; k++){
          if (!picked[k].done && !picked[k].hopeless && !picked[k].tried){
            entry = picked[k]; break;
          }
        }
        if (!entry || stopped) return Promise.resolve();

        entry.tried = true;
        entry.sending = true;
        return sendOne(entry, entry.id).then(function(ok){
          entry.sending = false;
          if (ok) sent++; else failed++;
          return next();
        });
      }

      var run = next();

      run.then(function(){
        sending = false;
        send.disabled = false;
        inFlight = null;

        again.textContent = 'Choose other photos';

        if (stopped){
          again.hidden = false;
          send.textContent = 'Send them';
          say(sent
            ? 'Stopped. ' + sent + (sent === 1 ? ' had already been sent.' : ' had already been sent.')
            : 'Stopped. Nothing was sent.');
          stopped = false;
          return;
        }

        var left = retryable().length;
        var tooBig = picked.filter(function(p){ return p.hopeless; }).length;

        again.hidden = !left;
        send.textContent = left ? 'Try the rest again' : 'Send more photos';

        if (!failed){
          say(sent === 1
            ? 'Sent. Thank you for sharing it.'
            : 'All ' + sent + ' sent. Thank you for sharing them.');
          return;
        }

        var lines = [];
        if (sent) lines.push(sent + (sent === 1 ? ' sent' : ' sent'));
        if (tooBig) lines.push(tooBig + (tooBig === 1 ? ' too large to send' : ' too large to send'));
        if (left) lines.push(left + ' still to try');

        var closing = left
          ? 'Tap again for the rest.'
          : 'Tap Send more photos for another batch.';

        if (tooBig){
          sayWithDropOff(
            lines.join(', ') + '. A long video is beyond what we can take here, so please ',
            tooBig === 1 ? 'drop it here instead' : 'drop those here instead',
            tooBig === 1 ? 'send it to us directly' : 'send those to us directly',
            closing, 'bad');
        } else {
          say(lines.join(', ') + '. ' + closing, 'bad');
        }
      });
    });
  })();

  var LEVEL = 0.55;
  var scoreBroken = false;
  var fadeTimer = null;

  function showToggle(){ if (!scoreBroken) toggle.hidden = false; }
  function breakScore(){ scoreBroken = true; toggle.hidden = true; }

  score.addEventListener('loadedmetadata', showToggle);
  score.addEventListener('canplay', showToggle);
  score.addEventListener('error', breakScore);
  var src = score.querySelector('source');
  if (src) src.addEventListener('error', breakScore);

  function setPlaying(on){
    toggle.classList.toggle('is-playing', on);
    toggle.setAttribute('aria-pressed', on ? 'true' : 'false');
    toggle.setAttribute('aria-label', on ? 'Pause music' : 'Play music');
  }

  function fadeUp(){
    clearInterval(fadeTimer);
    var step = 0;
    fadeTimer = setInterval(function(){
      step += 1;
      score.volume = Math.min(LEVEL, (step / 44) * LEVEL);
      if (step >= 44) clearInterval(fadeTimer);
    }, 50);
  }

  function play(silent){
    if (scoreBroken) return;
    score.volume = silent ? 0 : LEVEL;
    var attempt = score.play();
    if (attempt && typeof attempt.then === 'function'){
      attempt.then(function(){
        showToggle(); setPlaying(true);
      }).catch(function(){
        clearInterval(fadeTimer);
        score.volume = LEVEL;
        showToggle(); setPlaying(false);
      });
    } else {
      showToggle(); setPlaying(true);
    }
  }

  function startScore(){ play(true); }

  toggle.addEventListener('click', function(){
    if (score.paused){
      play(false);
    } else {
      clearInterval(fadeTimer);
      score.pause();
      setPlaying(false);
    }
  });

  document.addEventListener('visibilitychange', function(){
    if (document.hidden && !score.paused){
      score.pause();
      setPlaying(false);
    }
  });

  var RISEN     = 1950;
  var HOLD      = 4400;
  var HOLD_CALM = 1400;
  var FADE      = 3560;

  var leaf   = document.querySelector('.leaf');
  var opened = false;
  var handoff = null;

  function lightSuite(){
    if (suite.classList.contains('is-lit')) return;
    window.scrollTo(0, 0);
    document.documentElement.classList.remove('is-sealed');
    suite.removeAttribute('aria-hidden');
    suite.classList.add('is-lit');
    reveal();
    wakeScript();
    if (!score.paused && score.volume < 0.02) fadeUp();
  }

  var EXIT = 1600;
  var EASE = [0.62, 0, 0.36, 1];

  function bezier(x1, y1, x2, y2){
    function a(u, v){ return 1 - 3 * v + 3 * u; }
    function b(u, v){ return 3 * v - 6 * u; }
    function c(u){ return 3 * u; }
    function at(t, u, v){ return ((a(u, v) * t + b(u, v)) * t + c(u)) * t; }
    function slope(t, u, v){ return 3 * a(u, v) * t * t + 2 * b(u, v) * t + c(u); }
    return function(x){
      var t = x;
      for (var i = 0; i < 8; i++){
        var d = slope(t, x1, x2);
        if (!d) break;
        t -= (at(t, x1, x2) - x) / d;
      }
      return at(t, y1, y2);
    };
  }

  var ZOOM   = 1750;
  var SETTLE = 260;
  var SCROLL = 1500;
  var CLIP   = 950;

  function glide(t){ return t * t * t * (t * (t * 6 - 15) + 10); }

  var V_APEX = 0.4239;
  var V_SLOPE = 0.8778;

  function local(y0, sill, open, scale, top){
    return (((y0 + (sill - y0) * open) - top) / scale).toFixed(1);
  }

  function exitTogether(){
    var card = overture.querySelector('.env-card');
    var front = overture.querySelector('.env-front');
    if (!card || !card.animate) return null;

    var r  = card.getBoundingClientRect();
    var fr = front ? front.getBoundingClientRect() : r;
    var vw = window.innerWidth;
    var vh = window.innerHeight;

    var fly = document.createElement('div');
    fly.className = 'paper-fly';
    fly.style.left  = r.left + 'px';
    fly.style.top   = r.top + 'px';
    fly.style.width = r.width + 'px';
    document.body.appendChild(fly);

    card.style.transition = 'none';
    card.style.transform  = 'none';
    card.style.position   = 'static';
    card.style.width      = '100%';
    fly.appendChild(card);

    var sr = suite.getBoundingClientRect();
    var k = sr.width / r.width;
    if (!(k > 1.02)) k = 1.02;

    var dx = (sr.left + sr.width / 2) - (r.left + r.width / 2);

    var mk = card.querySelector('.card-mark'), ms = card.querySelector('.card-msg');
    var dy = 0;
    if (mk && ms){
      var top0 = mk.getBoundingClientRect().top - r.top;
      var bot0 = ms.getBoundingClientRect().bottom - r.top;
      dy = r.top + (top0 + bot0) / 2 * k - vh / 2;
      if (!(dy > 0)) dy = 0;
    }

    function armY(x){
      var fx = (x - fr.left) / fr.width;
      return fr.top + fr.height * (V_APEX - Math.abs(fx - 0.5) * V_SLOPE);
    }

    var lx = -0.25 * r.width, rx = 1.25 * r.width;
    var apex0 = fr.top + fr.height * V_APEX;
    var left0 = armY(r.left + lx);
    var right0 = armY(r.left + rx);

    var floor = apex0 + (vh + 60 - apex0) * 2;

    var total = ZOOM + SETTLE + SCROLL;
    var ease  = bezier(EASE[0], EASE[1], EASE[2], EASE[3]);

    var frames = [];
    for (var i = 0; i <= 96; i++){
      var t = total * i / 96, scale, y = 0, g = 1, open = 1;
      if (t <= ZOOM){
        open = t / ZOOM;
        g = glide(open);
        scale = 1 + (k - 1) * g;
      } else if (t <= ZOOM + SETTLE){
        scale = k;
      } else {
        scale = k;
        y = -vh * ease((t - ZOOM - SETTLE) / SCROLL);
      }
      var cut = glide(Math.min(1, t / CLIP));
      var sill = apex0 + (floor - apex0) * cut;
      var rise = r.top - dy * g;
      frames.push({
        transform: 'translate(' + (dx * g).toFixed(2) + 'px, ' + (y - dy * g).toFixed(1) + 'px) scale(' + scale.toFixed(4) + ')',
        clipPath: 'polygon(' + lx.toFixed(0) + 'px -' + (r.height * 2).toFixed(0) + 'px, ' +
                  rx.toFixed(0) + 'px -' + (r.height * 2).toFixed(0) + 'px, ' +
                  rx.toFixed(0) + 'px ' + local(right0, sill, cut, scale, rise) + 'px, ' +
                  (r.width / 2).toFixed(1) + 'px ' + local(apex0, sill, cut, scale, rise) + 'px, ' +
                  lx.toFixed(0) + 'px ' + local(left0, sill, cut, scale, rise) + 'px)'
      });
    }
    fly.animate(frames, { duration: total, easing: 'linear', fill: 'forwards' });

    if (overture.animate){
      overture.animate(
        [{ transform: 'none' }, { transform: 'translateY(' + (-vh) + 'px)' }],
        { duration: SCROLL, delay: ZOOM + SETTLE, fill: 'forwards',
          easing: 'cubic-bezier(' + EASE.join(',') + ')' }
      );
    }

    suite.animate(
      [{ transform: 'translateY(' + vh + 'px)' }, { transform: 'none' }],
      { duration: SCROLL, delay: ZOOM + SETTLE, fill: 'backwards',
        easing: 'cubic-bezier(' + EASE.join(',') + ')' }
    );
    return fly;
  }

  function enterSuite(landOn){
    window.clearTimeout(handoff);
    lightSuite();

    if (overture.isConnected){
      var fly = calm ? null : exitTogether();
      overture.classList.add('is-leaving');
      if (!calm){
        suite.classList.add('is-arriving');
        document.documentElement.classList.add('is-arriving');
      }
      window.setTimeout(function(){
        if (overture.isConnected) overture.remove();
        if (fly && fly.isConnected) fly.remove();
        suite.classList.remove('is-arriving');
        document.documentElement.classList.remove('is-arriving');
      }, calm ? 0 : FADE);
    }

    if (landOn){
      var target = document.getElementById(landOn);
      if (target) window.setTimeout(function(){
        target.scrollIntoView({ behavior: calm ? 'auto' : 'smooth', block: 'start' });
      }, calm ? 0 : 140);
    }
  }

  (function skipToSection(){
    var wanted = (window.location.hash || '').replace('#', '');
    if (!wanted || !document.getElementById(wanted)) return;

    opened = true;
    if (overture.isConnected) overture.remove();
    lightSuite();
    var target = document.getElementById(wanted);
    if (target) window.setTimeout(function(){ target.scrollIntoView(); }, 60);
  })();

  function unseal(){
    if (opened) return;
    opened = true;

    overture.classList.add('is-open');
    startScore();

    window.setTimeout(function(){
      if (!score.paused) fadeUp();
    }, calm ? 0 : RISEN);

    handoff = window.setTimeout(enterSuite, calm ? HOLD_CALM : HOLD);

    window.setTimeout(function(){
      var go = function(e){
        if (e.type === 'keydown' &&
            ['ArrowDown', 'PageDown', ' ', 'Spacebar', 'Enter'].indexOf(e.key) < 0) return;
        if (e.type === 'wheel' && e.deltaY <= 0) return;
        enterSuite();
      };
      ['wheel', 'touchmove', 'click', 'keydown'].forEach(function(ev){
        window.addEventListener(ev, go, { once: true, passive: true });
      });
    }, calm ? 0 : RISEN);
  }

  ['unseal', 'unseal-cue'].forEach(function(id){
    var el = document.getElementById(id);
    if (el) el.addEventListener('click', unseal);
  });

  ['.envelope', '.env-seal', '.env-bow'].forEach(function(sel){
    var el = document.querySelector(sel);
    if (el) el.addEventListener('click', unseal);
  });

  (function nav(){
    var bar    = document.getElementById('nav');
    var burger = document.getElementById('nav-burger');
    var menu   = document.getElementById('nav-menu');
    if (!bar) return;

    if (burger && menu){
      burger.addEventListener('click', function(){
        var open = burger.getAttribute('aria-expanded') === 'true';
        burger.setAttribute('aria-expanded', open ? 'false' : 'true');
        menu.hidden = open;
      });
      menu.addEventListener('click', function(ev){
        if (ev.target.closest('a')){
          burger.setAttribute('aria-expanded', 'false');
          menu.hidden = true;
        }
      });
    }

    var links = Array.prototype.slice.call(bar.querySelectorAll('.nav-side a'));
    if (!links.length || !('IntersectionObserver' in window)) return;

    var byId = {};
    links.forEach(function(a){ byId[a.getAttribute('href').slice(1)] = a; });

    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        var a = byId[e.target.id];
        if (!a) return;
        if (e.isIntersecting){
          links.forEach(function(x){ x.classList.remove('is-here'); });
          a.classList.add('is-here');
        }
      });
    }, { rootMargin: '-45% 0px -45% 0px' });

    Object.keys(byId).forEach(function(id){
      var sec = document.getElementById(id);
      if (sec) io.observe(sec);
    });
  })();

  function qrMatrix(text){
    var EXP = new Array(512), LOG = new Array(256), x = 1, i;
    for (i = 0; i < 255; i++){
      EXP[i] = x; LOG[x] = i;
      x <<= 1; if (x & 0x100) x ^= 0x11D;
    }
    for (i = 255; i < 512; i++) EXP[i] = EXP[i - 255];
    function mul(a, b){ return (a === 0 || b === 0) ? 0 : EXP[LOG[a] + LOG[b]]; }

    function genPoly(n){
      var g = [1];
      for (var k = 0; k < n; k++){
        var ng = new Array(g.length + 1).fill(0);
        for (var j = 0; j < g.length; j++){
          ng[j]     ^= g[j];
          ng[j + 1] ^= mul(g[j], EXP[k]);
        }
        g = ng;
      }
      return g;
    }
    function ecc(data, n){
      var g = genPoly(n), r = new Array(n).fill(0);
      for (var j = 0; j < data.length; j++){
        var f = data[j] ^ r[0];
        r.shift(); r.push(0);
        for (var k = 0; k < n; k++) r[k] ^= mul(g[k + 1], f);
      }
      return r;
    }

    var CAP = [null,
      [19,1,7], [34,1,10], [55,1,15], [80,1,20], [108,1,26],
      [136,2,18], [156,2,20], [194,2,24], [232,2,30]];
    var ALIGN = [null, [], [6,18], [6,22], [6,26], [6,30], [6,34],
      [6,22,38], [6,24,42], [6,26,46]];
    var VBITS = { 7: 0x07C94, 8: 0x085BC, 9: 0x09A99 };

    var bytes = [];
    for (i = 0; i < text.length; i++){
      var c = text.charCodeAt(i);
      if (c < 0x80) bytes.push(c);
      else if (c < 0x800) bytes.push(0xC0 | (c >> 6), 0x80 | (c & 63));
      else bytes.push(0xE0 | (c >> 12), 0x80 | ((c >> 6) & 63), 0x80 | (c & 63));
    }

    var ver = 0;
    for (i = 1; i <= 9; i++){ if (bytes.length + 2 <= CAP[i][0]){ ver = i; break; } }
    if (!ver) return null;

    var cap = CAP[ver], total = cap[0], blocks = cap[1], ecLen = cap[2];

    var bits = [];
    function put(v, n){ for (var k = n - 1; k >= 0; k--) bits.push((v >> k) & 1); }
    put(4, 4); put(bytes.length, 8);
    for (i = 0; i < bytes.length; i++) put(bytes[i], 8);
    for (i = 0; i < 4 && bits.length < total * 8; i++) bits.push(0);
    while (bits.length % 8) bits.push(0);

    var words = [];
    for (i = 0; i < bits.length; i += 8){
      var b = 0;
      for (var q = 0; q < 8; q++) b = (b << 1) | bits[i + q];
      words.push(b);
    }
    var padv = [0xEC, 0x11], pi = 0;
    while (words.length < total) words.push(padv[pi++ % 2]);

    var per = total / blocks, dataB = [], ecB = [];
    for (i = 0; i < blocks; i++){
      var chunk = words.slice(i * per, (i + 1) * per);
      dataB.push(chunk); ecB.push(ecc(chunk, ecLen));
    }
    var stream = [];
    for (i = 0; i < per; i++) for (var b2 = 0; b2 < blocks; b2++) stream.push(dataB[b2][i]);
    for (i = 0; i < ecLen; i++) for (var b3 = 0; b3 < blocks; b3++) stream.push(ecB[b3][i]);

    var dbits = [];
    for (i = 0; i < stream.length; i++)
      for (var k2 = 7; k2 >= 0; k2--) dbits.push((stream[i] >> k2) & 1);

    var size = ver * 4 + 17;
    var mod = [], res = [];
    for (i = 0; i < size; i++){ mod.push(new Array(size).fill(0)); res.push(new Array(size).fill(false)); }
    function set(r, c, v){ mod[r][c] = v; res[r][c] = true; }

    function finder(r, c){
      for (var dr = -1; dr <= 7; dr++) for (var dc = -1; dc <= 7; dc++){
        var rr = r + dr, cc = c + dc;
        if (rr < 0 || cc < 0 || rr >= size || cc >= size) continue;
        var on = (dr >= 0 && dr <= 6 && (dc === 0 || dc === 6)) ||
                 (dc >= 0 && dc <= 6 && (dr === 0 || dr === 6)) ||
                 (dr >= 2 && dr <= 4 && dc >= 2 && dc <= 4);
        set(rr, cc, on ? 1 : 0);
      }
    }
    finder(0, 0); finder(0, size - 7); finder(size - 7, 0);

    for (i = 8; i < size - 8; i++){ set(6, i, i % 2 === 0 ? 1 : 0); set(i, 6, i % 2 === 0 ? 1 : 0); }

    var al = ALIGN[ver];
    for (var a1 = 0; a1 < al.length; a1++) for (var a2 = 0; a2 < al.length; a2++){
      var r0 = al[a1], c0 = al[a2];
      if ((r0 === 6 && c0 === 6) || (r0 === 6 && c0 === size - 7) || (r0 === size - 7 && c0 === 6)) continue;
      for (var dr2 = -2; dr2 <= 2; dr2++) for (var dc2 = -2; dc2 <= 2; dc2++){
        var on2 = Math.max(Math.abs(dr2), Math.abs(dc2)) !== 1;
        set(r0 + dr2, c0 + dc2, on2 ? 1 : 0);
      }
    }

    for (i = 0; i <= 8; i++){
      if (i !== 6){ res[8][i] = true; res[i][8] = true; }
    }
    res[8][6] = true; res[6][8] = true; res[8][8] = true;
    for (i = 0; i < 8; i++){ res[size - 1 - i][8] = true; res[8][size - 1 - i] = true; }

    if (ver >= 7){
      for (i = 0; i < 18; i++){
        var vb = (VBITS[ver] >> i) & 1;
        set(Math.floor(i / 3), size - 11 + (i % 3), vb);
        set(size - 11 + (i % 3), Math.floor(i / 3), vb);
      }
    }

    var idx = 0, dir = -1, row = size - 1;
    for (var col = size - 1; col > 0; col -= 2){
      if (col === 6) col--;
      for (;;){
        for (var t = 0; t < 2; t++){
          var cc2 = col - t;
          if (!res[row][cc2]){
            var bit = idx < dbits.length ? dbits[idx++] : 0;
            if ((row + cc2) % 2 === 0) bit ^= 1;
            mod[row][cc2] = bit;
          }
        }
        row += dir;
        if (row < 0 || row >= size){ row -= dir; dir = -dir; break; }
      }
    }

    var FMT = 0x77C4;
    function fb(n){ return (FMT >> n) & 1; }
    for (i = 0; i < 15; i++){
      var v = fb(i);
      if (i < 6)      mod[i][8] = v;
      else if (i < 8) mod[i + 1][8] = v;
      else            mod[size - 15 + i][8] = v;

      if (i < 8)      mod[8][size - 1 - i] = v;
      else if (i < 9) mod[8][7] = v;
      else            mod[8][14 - i] = v;
    }
    mod[size - 8][8] = 1;

    return mod;
  }

  (function qr(){
    var cv = document.getElementById('qr-photos');
    if (!cv || !cv.getContext) return;

    var here = window.location.href.split('#')[0] + '#photos';
    var m = qrMatrix(here);
    if (!m) return;

    var n = m.length, scale = Math.max(2, Math.floor(150 / (n + 8))), quiet = 4;
    var px = (n + quiet * 2) * scale;
    cv.width = px; cv.height = px;

    var g = cv.getContext('2d');
    g.fillStyle = '#fff'; g.fillRect(0, 0, px, px);
    g.fillStyle = '#000';
    for (var r = 0; r < n; r++) for (var c = 0; c < n; c++){
      if (m[r][c]) g.fillRect((c + quiet) * scale, (r + quiet) * scale, scale, scale);
    }
  })();

  function reveal(){
    var items = Array.prototype.slice.call(document.querySelectorAll('.js-reveal'));
    if (calm || !('IntersectionObserver' in window)) return;

    items.forEach(function(el){ el.classList.add('armed'); });

    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if (!e.isIntersecting) return;
        e.target.classList.add('seen');
        io.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -4% 0px', threshold: 0.08 });

    items.forEach(function(el){ io.observe(el); });
  }
})();
