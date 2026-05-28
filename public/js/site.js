document.getElementById("yr").textContent = new Date().getFullYear();

/* ---------- Image fallback shim ----------
   The jmcomputerweb.vercel.app host returns 308 on every asset, so swap
   any reference to that host for a deterministic Unsplash stock photo.
   Same source URL always maps to the same replacement, so the same photo
   stays consistent across the page (e.g. the gallery thumbnail matches
   the lightbox full-size). When you host your own real photos, update the
   URLs in the HTML and you can delete this block. */
(function(){
  const POOL = [
    'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&w=1400&q=80',
    'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=1400&q=80',
    'https://images.unsplash.com/photo-1587202372583-49330a15584d?auto=format&fit=crop&w=1400&q=80',
    'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=1400&q=80',
    'https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=1400&q=80',
    'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=1400&q=80',
    'https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&w=1400&q=80',
    'https://images.unsplash.com/photo-1622957461168-202193fff44d?auto=format&fit=crop&w=1400&q=80',
    'https://images.unsplash.com/photo-1623126908029-58cb08a2b272?auto=format&fit=crop&w=1400&q=80',
    'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1400&q=80',
    'https://images.unsplash.com/photo-1606293459339-aa5d34a7b0e1?auto=format&fit=crop&w=1400&q=80',
    'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=1400&q=80',
    'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1400&q=80',
    'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80'
  ];
  function hash(s){let h=0;for(let i=0;i<s.length;i++){h=((h<<5)-h)+s.charCodeAt(i);h|=0;}return Math.abs(h);}
  function pick(key){return POOL[hash(key) % POOL.length];}
  const HOST = 'jmcomputerweb.vercel.app';
  document.querySelectorAll('[style*="'+HOST+'"]').forEach(el=>{
    el.setAttribute('style', el.getAttribute('style').replace(
      /url\((['"]?)https:\/\/jmcomputerweb\.vercel\.app\/[^'")]+\1\)/g,
      (m, q)=>'url('+q+pick(m)+q+')'
    ));
  });
  document.querySelectorAll('img[src*="'+HOST+'"]').forEach(img=>{ img.src = pick(img.src); });
  document.querySelectorAll('[data-img*="'+HOST+'"]').forEach(el=>{
    el.setAttribute('data-img', pick(el.getAttribute('data-img')));
  });
})();

/* ---------- Voice agent · auto-greeting on visit ---------- */
(function(){
  if(!('speechSynthesis' in window)) return;

  const SCRIPT = "Hello and welcome to J M Computers! We provide custom R T X gaming P Cs, laptops, chip level repairs, annual maintenance, C C T V and networking — trusted across Pune for over eighteen years. You can connect with our team instantly on WhatsApp, or call us anytime. Thank you for visiting — we are happy to help!";

  let chosenVoice = null;
  let speaking = false;   // currently speaking
  let done = false;       // successfully spoke once — stop trying

  // Only greet once per browser session — not on every subpage navigation
  try{ if(sessionStorage.getItem('jm_voice_done') === '1'){ done = true; } }catch(e){}

  function pickVoice(){
    const voices = window.speechSynthesis.getVoices();
    if(!voices || !voices.length) return null;
    const prefer = [
      v => /en[-_]IN/i.test(v.lang) && /female|heera|veena|priya|raveena|aditi|kalpana/i.test(v.name),
      v => /en[-_]IN/i.test(v.lang),
      v => /en[-_](GB|AU)/i.test(v.lang) && /female|zira|hazel|susan|samantha/i.test(v.name),
      v => /en[-_]US/i.test(v.lang) && /female|zira|samantha|ava|jenny/i.test(v.name),
      v => /^en/i.test(v.lang),
    ];
    for(const test of prefer){
      const m = voices.find(test);
      if(m) return m;
    }
    return voices[0];
  }
  // Voices load asynchronously in Chrome — keep our pick fresh.
  if('onvoiceschanged' in window.speechSynthesis){
    window.speechSynthesis.addEventListener('voiceschanged', ()=>{ chosenVoice = pickVoice(); });
  }
  chosenVoice = pickVoice();

  function speakWelcome(){
    if(done || speaking) return;
    if(!chosenVoice) chosenVoice = pickVoice();
    try{ window.speechSynthesis.cancel(); }catch(e){}
    const u = new SpeechSynthesisUtterance(SCRIPT);
    if(chosenVoice){ u.voice = chosenVoice; u.lang = chosenVoice.lang; }
    else { u.lang = 'en-IN'; }
    u.rate = 0.96;
    u.pitch = 1.05;
    u.volume = 1;
    u.onstart = ()=>{ speaking = true; done = true; try{ sessionStorage.setItem('jm_voice_done','1'); }catch(e){} };
    u.onend   = ()=>{ speaking = false; };
    u.onerror = ()=>{ speaking = false; /* allow retry on next gesture */ };
    try{ window.speechSynthesis.speak(u); }catch(e){}
  }

  // Try once on load (some browsers permit it).
  setTimeout(()=>{ if(!done) speakWelcome(); }, 800);

  // Reliable fallback: speak on the first real user gesture.
  // Use only events that browsers count as "user activation".
  const gestureEvents = ['click','pointerdown','touchend','keydown'];
  function onFirstGesture(){
    speakWelcome();
    if(done){
      gestureEvents.forEach(ev => window.removeEventListener(ev, onFirstGesture, true));
    }
  }
  gestureEvents.forEach(ev => window.addEventListener(ev, onFirstGesture, true));

  // Stop speech if user leaves the tab — avoids ghost audio.
  document.addEventListener('visibilitychange', ()=>{
    if(document.hidden){ try{ window.speechSynthesis.cancel(); }catch(e){} }
  });
})();

/* ---------- WhatsApp FAB popup close ---------- */
(function(){
  const fab = document.getElementById('fabWa');
  const close = document.getElementById('fabClose');
  const btn = fab && fab.querySelector('.fab-btn');
  if(!fab || !close || !btn) return;
  close.addEventListener('click', (e)=>{
    e.preventDefault();
    e.stopPropagation();
    fab.classList.add('collapsed');
  });
  btn.addEventListener('click', ()=>{
    fab.classList.add('collapsed');
  });
})();

/* ---------- Scroll reveal (all variants + stagger) ---------- */
const REVEAL_SEL = ".reveal,.reveal-left,.reveal-right,.reveal-zoom,.reveal-blur,.split-words,.stagger,.title-accent";
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add("in");
      io.unobserve(e.target);
    }
  });
},{threshold:0.12, rootMargin:"0px 0px -40px 0px"});
document.querySelectorAll(REVEAL_SEL).forEach(el=>io.observe(el));

/* ---------- Count-up numbers ---------- */
function animateCount(el){
  const target = +el.dataset.count;
  const suffix = el.dataset.suffix || "";
  const dur = 1600;
  const start = performance.now();
  const fmt = (n)=> n >= 1000 ? n.toLocaleString('en-US') : String(n);
  function step(now){
    const t = Math.min(1,(now-start)/dur);
    const eased = 1 - Math.pow(1-t, 3);
    el.textContent = fmt(Math.round(target*eased)) + suffix;
    if(t<1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}
const countIO = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){animateCount(e.target);countIO.unobserve(e.target);}
  });
},{threshold:0.4});
document.querySelectorAll('[data-count]').forEach(el=>countIO.observe(el));

/* ---------- Mobile menu toggle ---------- */
(function(){
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('mobileMenu');
  if(!toggle || !menu) return;
  function setOpen(open){
    toggle.classList.toggle('open', open);
    menu.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    menu.setAttribute('aria-hidden', open ? 'false' : 'true');
    document.body.style.overflow = open ? 'hidden' : '';
    if(!open) menu.querySelectorAll('details[open]').forEach(d => d.open = false);
  }
  toggle.addEventListener('click', ()=> setOpen(!menu.classList.contains('open')));
  menu.querySelectorAll('a').forEach(a=> a.addEventListener('click', ()=> setOpen(false)));
  document.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape' && menu.classList.contains('open')) setOpen(false);
  });
})();

/* ---------- Subtle vertical parallax on key images ---------- */
const parallaxEls = [
  {sel:'.hero::before-skip', factor:0.15},
];
const parallaxImgs = document.querySelectorAll('.cta-mid img');
function onScrollParallax(){
  const sy = window.scrollY;
  parallaxImgs.forEach(el=>{
    const r = el.getBoundingClientRect();
    if(r.bottom < 0 || r.top > window.innerHeight) return;
    const mid = r.top + r.height/2;
    const off = (mid - window.innerHeight/2) * -0.04;
    el.style.transform = `translate3d(0, ${off.toFixed(1)}px, 0)`;
  });
}
window.addEventListener('scroll', onScrollParallax, {passive:true});
onScrollParallax();

/* ---------- Nav auto-hide on scroll down, show on scroll up ---------- */
let lastY = 0;
const nav = document.querySelector('.nav-wrap');
const mobileMenuEl = document.getElementById('mobileMenu');
window.addEventListener('scroll', ()=>{
  const y = window.scrollY;
  const menuOpen = mobileMenuEl && mobileMenuEl.classList.contains('open');
  if(menuOpen){ nav.classList.remove('hide'); lastY = y; return; }
  if(y > 80 && y > lastY + 4) nav.classList.add('hide');
  else if(y < lastY - 4) nav.classList.remove('hide');
  lastY = y;
},{passive:true});

/* ---------- Gallery lightbox + filters ---------- */
(function(){
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lbImg');
  const lbClose = document.getElementById('lbClose');
  const lbPrev = document.getElementById('lbPrev');
  const lbNext = document.getElementById('lbNext');
  const lbCounter = document.getElementById('lbCounter');
  if(!lb) return;

  let visibleItems = Array.from(document.querySelectorAll('.gal-item:not(.hidden)'));
  let cursor = 0;

  function openAt(i){
    if(!visibleItems.length) return;
    cursor = ((i % visibleItems.length) + visibleItems.length) % visibleItems.length;
    const item = visibleItems[cursor];
    lbImg.src = item.getAttribute('data-img');
    if(lbCounter) lbCounter.textContent = (cursor+1) + ' / ' + visibleItems.length;
  }
  function next(){ openAt(cursor+1) }
  function prev(){ openAt(cursor-1) }

  // Filter chip handling
  const chips = document.querySelectorAll('.gal-chip');
  const allItems = Array.from(document.querySelectorAll('.gal-item'));
  function applyFilter(filter){
    allItems.forEach(it=>{
      const cat = it.getAttribute('data-cat') || '';
      const show = filter === 'all' || cat === filter;
      it.classList.toggle('hidden', !show);
    });
    visibleItems = allItems.filter(it=>!it.classList.contains('hidden'));
  }
  chips.forEach(chip=>{
    chip.addEventListener('click', ()=>{
      chips.forEach(c=> c.classList.remove('active'));
      chip.classList.add('active');
      applyFilter(chip.getAttribute('data-filter'));
    });
  });

  if(lbPrev) lbPrev.addEventListener('click', (e)=>{ e.stopPropagation(); prev(); });
  if(lbNext) lbNext.addEventListener('click', (e)=>{ e.stopPropagation(); next(); });

  document.querySelectorAll('.gal-item').forEach(item=>{
    item.addEventListener('click', (e)=>{
      e.preventDefault();
      visibleItems = allItems.filter(it=>!it.classList.contains('hidden'));
      const i = visibleItems.indexOf(item);
      openAt(i >= 0 ? i : 0);
      lb.classList.add('open');
      lb.setAttribute('aria-hidden','false');
      document.body.style.overflow='hidden';
    });
  });
  function close(){
    lb.classList.remove('open');
    lb.setAttribute('aria-hidden','true');
    document.body.style.overflow='';
    setTimeout(()=>{lbImg.src='';},300);
  }
  lbClose.addEventListener('click', close);
  lb.addEventListener('click', (e)=>{ if(e.target===lb) close(); });
  document.addEventListener('keydown', (e)=>{
    if(!lb.classList.contains('open')) return;
    if(e.key==='Escape') close();
    else if(e.key==='ArrowRight') next();
    else if(e.key==='ArrowLeft') prev();
  });
})();

/* ---------- Product category search filter ---------- */
(function(){
  const input = document.getElementById('catSearch');
  const clear = document.getElementById('catSearchClear');
  const grid = document.getElementById('catGrid');
  const empty = document.getElementById('catEmpty');
  if(!input || !grid) return;
  const cards = Array.from(grid.querySelectorAll('.cat'));
  function applyFilter(){
    const q = input.value.trim().toLowerCase();
    let visible = 0;
    cards.forEach(card=>{
      const haystack = ((card.dataset.name||'') + ' ' + card.textContent).toLowerCase();
      const match = !q || haystack.includes(q);
      card.classList.toggle('is-hidden', !match);
      if(match) visible++;
    });
    if(empty) empty.classList.toggle('show', visible === 0 && q.length > 0);
    if(clear) clear.classList.toggle('show', q.length > 0);
  }
  input.addEventListener('input', applyFilter);
  if(clear) clear.addEventListener('click', ()=>{ input.value=''; applyFilter(); input.focus(); });
})();

/* ---------- Magnetic button effect ---------- */
if(matchMedia('(hover:hover)').matches){
  document.querySelectorAll('.btn, .dl-btn').forEach(btn=>{
    btn.addEventListener('mousemove',(e)=>{
      const r = btn.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width/2) * 0.15;
      const y = (e.clientY - r.top - r.height/2) * 0.25;
      btn.style.transform = `translate(${x}px, ${y}px)`;
    });
    btn.addEventListener('mouseleave',()=>{btn.style.transform=''});
  });
}

/* ---------- FAQ category filter (FAQ page) ---------- */
(function(){
  const tabs = document.querySelectorAll('.faq-cat');
  const items = document.querySelectorAll('.faq-q[data-cat]');
  if(!tabs.length || !items.length) return;
  tabs.forEach(tab=>{
    tab.addEventListener('click', ()=>{
      const cat = tab.dataset.cat || 'all';
      tabs.forEach(t=>t.classList.toggle('active', t === tab));
      items.forEach(q=>{
        const show = cat === 'all' || (q.dataset.cat||'').split(' ').includes(cat);
        q.style.display = show ? '' : 'none';
      });
    });
  });
})();

/* ---------- Product filter chips (Products page) ---------- */
(function(){
  const chips = document.querySelectorAll('.filter-chip');
  const cards = document.querySelectorAll('#catGrid .cat');
  if(!chips.length || !cards.length) return;
  chips.forEach(chip=>{
    chip.addEventListener('click', ()=>{
      const cat = chip.dataset.filter || 'all';
      chips.forEach(c=>c.classList.toggle('active', c === chip));
      cards.forEach(card=>{
        const tags = (card.dataset.tags || card.dataset.name || '').toLowerCase();
        const show = cat === 'all' || tags.includes(cat);
        card.classList.toggle('is-hidden', !show);
      });
    });
  });
})();

/* ---------- Category-page toolbar: count, sort, view toggle ---------- */
(function(){
  const grid = document.querySelector('.cat-grid--products');
  if(!grid) return;
  const items = Array.from(grid.querySelectorAll(':scope > .cat'));
  items.forEach((el, i)=>{ el.dataset.idx = i; });

  const countEl = document.querySelector('.cat-count');
  if(countEl) countEl.textContent = items.length + ' products';

  const sortEl = document.getElementById('catSort');
  if(sortEl){
    sortEl.addEventListener('change', ()=>{
      const arr = Array.from(grid.querySelectorAll(':scope > .cat'));
      const v = sortEl.value;
      const nameOf = el => (el.querySelector('.info b')?.textContent || '').trim();
      if(v === 'name-asc')      arr.sort((a,b)=> nameOf(a).localeCompare(nameOf(b)));
      else if(v === 'name-desc') arr.sort((a,b)=> nameOf(b).localeCompare(nameOf(a)));
      else                       arr.sort((a,b)=> (+a.dataset.idx) - (+b.dataset.idx));
      arr.forEach(el=> grid.appendChild(el));
    });
  }

  const viewBtns = document.querySelectorAll('.cat-view-btn');
  viewBtns.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      viewBtns.forEach(b=> b.classList.remove('active'));
      btn.classList.add('active');
      const isList = !!btn.querySelector('i.fa-list');
      grid.classList.toggle('cat-grid--list', isList);
    });
  });
})();

/* ---------- Shop catalogue toolbar: count, name/price sort, view toggle ---------- */
(function(){
  const grid = document.querySelector('.shop-grid');
  if(!grid) return;
  const items = Array.from(grid.querySelectorAll(':scope > .shop-card'));
  items.forEach((el, i)=>{ el.dataset.idx = i; });

  const countEl = document.querySelector('.shop-sec .cat-count');
  if(countEl) countEl.textContent = items.length + ' products';

  const nameOf  = el => (el.querySelector('.name')?.textContent || '').trim();
  const priceOf = el => {
    const raw = (el.querySelector('.price')?.textContent || '').replace(/[^0-9]/g,'');
    return parseInt(raw, 10) || 0;
  };

  const sortEl = document.querySelector('.shop-sec #catSort');
  if(sortEl){
    sortEl.addEventListener('change', ()=>{
      const arr = Array.from(grid.querySelectorAll(':scope > .shop-card'));
      const v = sortEl.value;
      if(v === 'name-asc')        arr.sort((a,b)=> nameOf(a).localeCompare(nameOf(b)));
      else if(v === 'name-desc')  arr.sort((a,b)=> nameOf(b).localeCompare(nameOf(a)));
      else if(v === 'price-asc')  arr.sort((a,b)=> priceOf(a) - priceOf(b));
      else if(v === 'price-desc') arr.sort((a,b)=> priceOf(b) - priceOf(a));
      else                        arr.sort((a,b)=> (+a.dataset.idx) - (+b.dataset.idx));
      arr.forEach(el=> grid.appendChild(el));
    });
  }

  const viewBtns = document.querySelectorAll('.shop-sec .cat-view-btn');
  viewBtns.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      viewBtns.forEach(b=> b.classList.remove('active'));
      btn.classList.add('active');
      const isList = !!btn.querySelector('i.fa-list');
      grid.classList.toggle('shop-grid--list', isList);
    });
  });
})();

/* ---------- Horizontal scroll-row arrows ---------- */
(function(){
  const rows = document.querySelectorAll('.scroll-row');
  if(!rows.length) return;
  rows.forEach(row=>{
    const track = row.querySelector('.scroll-track');
    const prev  = row.querySelector('.scroll-prev');
    const next  = row.querySelector('.scroll-next');
    if(!track) return;
    function stepSize(){
      const first = track.querySelector(':scope > *');
      if(!first) return 320;
      const cs = getComputedStyle(track);
      const gap = parseFloat(cs.columnGap || cs.gap || '0') || 0;
      return first.getBoundingClientRect().width + gap;
    }
    function update(){
      const max = track.scrollWidth - track.clientWidth - 2;
      if(prev) prev.classList.toggle('is-disabled', track.scrollLeft <= 2);
      if(next) next.classList.toggle('is-disabled', track.scrollLeft >= max);
    }
    if(prev) prev.addEventListener('click', ()=> track.scrollBy({ left: -stepSize(), behavior: 'smooth' }));
    if(next) next.addEventListener('click', ()=> track.scrollBy({ left:  stepSize(), behavior: 'smooth' }));
    track.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  });
})();

