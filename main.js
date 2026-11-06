/* Golden Crust Bakery - main.js (Part 3: interactivity, dynamic content, validation, AJAX, map) */
'use strict';
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

// Product data used for dynamic loading and the enquiry cost estimate
const PRODUCTS = [
  { id: 1, name: 'Sourdough Loaf', cat: 'Bread', price: 55, lead: 0, img: 'sourdough', alt: 'Illustration of a sourdough loaf' },
  { id: 2, name: 'Butter Croissants (6)', cat: 'Pastry', price: 90, lead: 0, img: 'croissant', alt: 'Illustration of a butter croissant' },
  { id: 3, name: 'Chocolate Cake', cat: 'Cakes', price: 320, lead: 2, img: 'chocolate-cake', alt: 'Illustration of a chocolate cake' },
  { id: 4, name: 'Custom Birthday Cake', cat: 'Cakes', price: 450, lead: 3, img: 'birthday-cake', alt: 'Illustration of a birthday cake' },
  { id: 5, name: 'Vetkoek (4)', cat: 'Savoury', price: 75, lead: 0, img: 'vetkoek', alt: 'Illustration of four vetkoek' },
  { id: 6, name: 'Milk Tart', cat: 'Cakes', price: 180, lead: 1, img: 'milk-tart', alt: 'Illustration of a milk tart' },
  { id: 7, name: 'Seed Loaf', cat: 'Bread', price: 60, lead: 0, img: 'seed-loaf', alt: 'Illustration of a seeded loaf' },
  { id: 8, name: 'Catering Platter', cat: 'Catering', price: 850, lead: 3, img: 'catering-platter', alt: 'Illustration of a catering platter box' }
];
const DELIVERY_FEE = 60;
const money = n => 'R' + n.toFixed(2);
const esc = s => s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// Footer year and mobile navigation
const yr = $('#year'); if (yr) yr.textContent = new Date().getFullYear();
const toggle = $('.nav-toggle');
if (toggle) toggle.addEventListener('click', () => {
  const open = $('.nav-list').classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
});

// Scroll reveal animation
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } }), { threshold: .15 });
  $$('.reveal').forEach(el => io.observe(el));
} else { $$('.reveal').forEach(el => el.classList.add('visible')); }

// Accordion (home page FAQ)
$$('.acc-btn').forEach(btn => btn.addEventListener('click', () => {
  const panel = btn.nextElementSibling, open = panel.classList.toggle('open');
  btn.setAttribute('aria-expanded', open);
}));

// Tabs (about page)
$$('.tab-btn').forEach(btn => btn.addEventListener('click', () => {
  $$('.tab-btn').forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
  $$('.tab-panel').forEach(p => p.classList.remove('active'));
  btn.classList.add('active'); btn.setAttribute('aria-selected', 'true');
  $('#' + btn.dataset.tab).classList.add('active');
}));

// Gallery lightbox (DOM manipulation: builds and removes an overlay)
$$('.gallery img').forEach(img => img.addEventListener('click', () => {
  const box = document.createElement('div');
  box.className = 'lightbox'; box.setAttribute('role', 'dialog'); box.setAttribute('aria-label', 'Enlarged image');
  box.innerHTML = '<button aria-label="Close">&times;</button><img src="' + img.currentSrc + '" alt="' + esc(img.alt) + '">';
  const close = () => { box.remove(); document.removeEventListener('keydown', onKey); };
  const onKey = e => { if (e.key === 'Escape') close(); };
  box.addEventListener('click', e => { if (e.target !== $('img', box)) close(); });
  document.addEventListener('keydown', onKey);
  document.body.appendChild(box); $('button', box).focus();
}));

// Dynamic product listing with search, filter and sort
const grid = $('#product-grid');
if (grid) {
  const render = () => {
    const q = $('#search').value.trim().toLowerCase(), cat = $('#category').value, sort = $('#sort').value;
    let list = PRODUCTS.filter(p => (cat === 'all' || p.cat === cat) && p.name.toLowerCase().includes(q));
    list.sort((a, b) => sort === 'low' ? a.price - b.price : sort === 'high' ? b.price - a.price : a.name.localeCompare(b.name));
    grid.innerHTML = list.map(p => `<article class="card reveal visible"><img src="images/${p.img}-800.png" srcset="images/${p.img}-400.png 400w, images/${p.img}-800.png 800w" sizes="(max-width: 600px) 100vw, 33vw" alt="${p.alt}" loading="lazy"><h3>${p.name}</h3><p>${p.cat}</p><p class="price">${money(p.price)}</p><a class="btn" href="enquiry.html?product=${p.id}">Enquire</a></article>`).join('');
    $('#count').textContent = list.length ? list.length + ' product(s) shown' : 'No products match your search.';
  };
  ['input', 'change'].forEach(ev => ['#search', '#category', '#sort'].forEach(s => $(s).addEventListener(ev, render)));
  render();
}

// Shared validation helpers
const setErr = (el, msg) => { const f = el.closest('.field'); f.classList.toggle('invalid', !!msg); const s = $('.error', f); if (s) s.textContent = msg; return !msg; };
const rules = {
  name: v => v.trim().length >= 2 && /^[A-Za-z\u00C0-\u024F' -]+$/.test(v.trim()) ? '' : 'Enter your full name (letters only, at least 2 characters).',
  email: v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? '' : 'Enter a valid email address, e.g. name@example.com.',
  phone: v => /^(\+27|0)\d{9}$/.test(v.replace(/[\s-]/g, '')) ? '' : 'Enter a valid South African number, e.g. 082 123 4567.',
  product: v => v ? '' : 'Please select a product.',
  type: v => v ? '' : 'Please select a message type.',
  qty: v => Number.isInteger(+v) && +v >= 1 && +v <= 50 ? '' : 'Quantity must be a whole number from 1 to 50.',
  date: v => { if (!v) return 'Please choose a date.'; const d = new Date(v), t = new Date(); t.setHours(0, 0, 0, 0); return d >= t ? '' : 'The date cannot be in the past.'; },
  msg: v => v.trim().length >= 20 && v.length <= 500 ? '' : 'Message must be 20 to 500 characters.'
};
function validate(form) {
  let ok = true;
  $$('input[name],select[name],textarea[name]', form).forEach(el => {
    if (el.type === 'radio' || !rules[el.name] || (el.name === 'msg' && !el.required)) return;
    if (!setErr(el, rules[el.name](el.value))) ok = false;
  });
  return ok;
}
function liveValidate(form) {
  $$('input[name],select[name],textarea[name]', form).forEach(el => el.addEventListener('blur', () => { if (rules[el.name] && el.required) setErr(el, rules[el.name](el.value)); }));
}

// Enquiry form: validate, then process into a cost and availability response
const eform = $('#enquiry-form');
if (eform) {
  const sel = $('#e-product');
  PRODUCTS.forEach(p => sel.insertAdjacentHTML('beforeend', `<option value="${p.id}">${p.name} - ${money(p.price)}</option>`));
  const pre = new URLSearchParams(location.search).get('product'); if (pre) sel.value = pre;
  $('#e-date').min = new Date().toISOString().split('T')[0];
  liveValidate(eform);
  eform.addEventListener('submit', e => {
    e.preventDefault();
    if (!validate(eform)) { $('.invalid input,.invalid select', eform)?.focus(); return; }
    const p = PRODUCTS.find(x => x.id === +sel.value), qty = +$('#e-qty').value;
    const deliver = eform.method.value === 'deliver';
    const total = p.price * qty + (deliver ? DELIVERY_FEE : 0);
    const days = Math.ceil((new Date($('#e-date').value) - new Date().setHours(0, 0, 0, 0)) / 864e5);
    const ok = days >= p.lead && qty <= 20 || (days >= p.lead + 2);
    const out = $('#enquiry-result');
    out.innerHTML = `<h2>Thank you, ${esc($('#e-name').value.trim())}</h2><p><strong>${qty} x ${esc(p.name)}</strong>${deliver ? ' with delivery' : ''}</p><p>Estimated cost: <strong>${money(total)}</strong></p><p>Availability: ${ok ? 'Available for your chosen date.' : 'Your date is too soon for this order. Please allow at least ' + (qty > 20 ? p.lead + 2 : p.lead) + ' day(s) notice.'}</p><p>We will confirm by email at ${esc($('#e-email').value.trim())}.</p>`;
    out.style.borderColor = ok ? '#2e7d32' : '#b26a00'; out.hidden = false; out.scrollIntoView({ behavior: 'smooth' });
  });
}

// Contact form: validate, compile an email (mailto) and submit asynchronously (AJAX/fetch)
const cform = $('#contact-form');
if (cform) {
  liveValidate(cform);
  cform.addEventListener('submit', async e => {
    e.preventDefault();
    if (!validate(cform)) return;
    const d = Object.fromEntries(new FormData(cform));
    const body = `Name: ${d.name}\nEmail: ${d.email}\nPhone: ${d.phone}\nType: ${d.type}\n\n${d.msg}`;
    const mail = 'mailto:hello@goldencrust.example?subject=' + encodeURIComponent('Website message: ' + d.type) + '&body=' + encodeURIComponent(body);
    const out = $('#contact-result'); out.hidden = false; out.textContent = 'Sending...';
    try {
      const r = await fetch('https://formsubmit.co/ajax/hello@goldencrust.example', { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(d) });
      if (!r.ok) throw new Error('Request failed');
      out.innerHTML = '<p>Thank you! Your message was sent without reloading the page.</p>'; cform.reset();
    } catch (err) {
      out.innerHTML = `<p>We could not send this online. Your email is ready instead:</p><a class="btn" href="${mail}">Open email to send</a>`;
    }
  });
}

// Interactive map (Leaflet + OpenStreetMap) with more than one location
window.addEventListener('load', () => {
  const m = $('#map'); if (!m || typeof L === 'undefined') return;
  const map = L.map('map').setView([-26.125, 28.03], 11);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; OpenStreetMap contributors', maxZoom: 18 }).addTo(map);
  [['Melville branch', -26.1750, 28.0074], ['Rosebank branch', -26.1458, 28.0436], ['Fourways branch', -26.0230, 28.0113]]
    .forEach(([n, a, b]) => L.marker([a, b]).addTo(map).bindPopup('<strong>Golden Crust Bakery</strong><br>' + n));
});
