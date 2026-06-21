(function () {
  if (document.querySelector('.contact-bar, .v21-contact-bar')) return;

  var PHONE = '+212673280009';
  var WHATSAPP = '212673280009';
  var MESSAGE = encodeURIComponent('Bonjour, je souhaite obtenir des informations sur les voyages Voyages21.');
  var ICONS = {
    wa: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M20.5 3.5A11.7 11.7 0 0 0 12.1 0C5.6 0 .3 5.3.3 11.8c0 2.1.6 4.2 1.6 6L.2 24l6.4-1.7a11.8 11.8 0 0 0 5.6 1.4h.1c6.5 0 11.8-5.3 11.8-11.8 0-3.1-1.3-6.1-3.6-8.4ZM12.2 21.7h-.1a9.8 9.8 0 0 1-5-1.4l-.4-.2-3.8 1 1-3.7-.2-.4a9.8 9.8 0 1 1 8.5 4.7Zm5.4-7.3c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.2-1.3-.8-.7-1.4-1.6-1.6-1.9-.2-.3 0-.4.1-.6l.5-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.1c-.2-.5-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.3 5.2 4.6.7.3 1.3.5 1.8.6.8.2 1.4.2 2 0 .6-.1 1.7-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.4Z"/></svg>',
    tel: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M6.6 10.8c1.7 3.4 3.2 4.9 6.6 6.6l2.2-2.2c.3-.3.8-.4 1.2-.3 1.3.4 2.6.6 4 .6.7 0 1.2.5 1.2 1.2v3.5c0 .7-.5 1.2-1.2 1.2C10.7 21.4 2.6 13.3 2.6 3.4c0-.7.5-1.2 1.2-1.2h3.5c.7 0 1.2.5 1.2 1.2 0 1.4.2 2.8.6 4 .1.4 0 .9-.3 1.2l-2.2 2.2Z"/></svg>',
    ig: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9Zm4.5 3.4A4.6 4.6 0 1 1 7.4 12 4.6 4.6 0 0 1 12 7.4Zm0 2A2.6 2.6 0 1 0 14.6 12 2.6 2.6 0 0 0 12 9.4Zm5-2.6a1.1 1.1 0 1 1-1.1 1.1A1.1 1.1 0 0 1 17 6.8Z"/></svg>',
    fb: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M14.2 22v-8h2.7l.4-3.1h-3.1V8.9c0-.9.3-1.5 1.6-1.5h1.7V4.6c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.4H8v3.1h2.8V22h3.4Z"/></svg>'
  };

  var style = document.createElement('style');
  style.id = 'v21-contact-bar-style';
  style.textContent = [
    '.v21-social-ready .wa-float,.v21-social-ready .whatsapp-btn{display:none!important}',
    '.v21-contact-bar{position:fixed;right:18px;bottom:20px;z-index:9999;display:flex;flex-direction:column-reverse;align-items:center;gap:8px}',
    '.v21-contact-main,.v21-contact-link{width:48px;height:48px;padding:0;border-radius:999px;display:flex;align-items:center;justify-content:center;text-decoration:none;font-size:0;line-height:0;box-shadow:0 12px 28px rgba(16,35,26,.25);transition:opacity .18s ease,transform .2s ease,background .2s ease,color .2s ease}',
    '.v21-contact-main{border:1px solid rgba(255,255,255,.5);background:#25d366;color:#082817;cursor:pointer;z-index:2}',
    '.v21-contact-main:hover{filter:brightness(1.02);transform:translateY(-1px)}',
    '.v21-contact-bar svg{width:22px;height:22px;display:block}',
    '.v21-contact-link{opacity:0;pointer-events:none;transform:translateY(8px);background:rgba(255,255,255,.94);color:#152e1f;border:1px solid rgba(16,35,26,.12);backdrop-filter:blur(10px)}',
    '.v21-contact-bar.open .v21-contact-link{opacity:1;pointer-events:auto;transform:translateY(0)}',
    '.v21-contact-bar.open .v21-contact-main{background:#1b3a28;color:#fff}',
    '.v21-contact-link.v21-wa{background:#25d366;color:#082817}',
    '.v21-contact-link.v21-tel{background:#fff;color:#1b3a28}',
    '.v21-contact-link.v21-ig{background:#c13584;color:#fff}',
    '.v21-contact-link.v21-fb{background:#1877f2;color:#fff}',
    '.v21-contact-main:focus-visible,.v21-contact-link:focus-visible{outline:3px solid rgba(200,164,64,.42);outline-offset:3px}',
    '.show-brochure>.v21-contact-bar{display:none}',
    '@media(max-width:560px){.v21-contact-bar{right:12px;bottom:14px;gap:7px}.v21-contact-main,.v21-contact-link{width:44px;height:44px}}'
  ].join('');
  document.head.appendChild(style);

  var bar = document.createElement('div');
  bar.className = 'v21-contact-bar';
  bar.setAttribute('aria-label', 'Contacts rapides');
  bar.innerHTML = ''
    + '<button class="v21-contact-main" type="button" aria-label="Ouvrir les contacts" aria-expanded="false">' + ICONS.wa + '</button>'
    + '<a class="v21-contact-link v21-wa" href="https://wa.me/' + WHATSAPP + '?text=' + MESSAGE + '" target="_blank" rel="noopener" aria-label="WhatsApp">' + ICONS.wa + '</a>'
    + '<a class="v21-contact-link v21-tel" href="tel:' + PHONE + '" aria-label="Téléphone">' + ICONS.tel + '</a>'
    + '<a class="v21-contact-link v21-ig" href="https://www.instagram.com/voyages21maroc" target="_blank" rel="noopener" aria-label="Instagram">' + ICONS.ig + '</a>'
    + '<a class="v21-contact-link v21-fb" href="https://www.facebook.com/Voyages21" target="_blank" rel="noopener" aria-label="Facebook">' + ICONS.fb + '</a>';
  document.body.appendChild(bar);
  document.body.classList.add('v21-social-ready');

  var main = bar.querySelector('.v21-contact-main');
  function setOpen(open) {
    bar.classList.toggle('open', open);
    main.setAttribute('aria-expanded', open ? 'true' : 'false');
    main.setAttribute('aria-label', open ? 'Fermer les contacts' : 'Ouvrir les contacts');
  }
  main.addEventListener('click', function () { setOpen(!bar.classList.contains('open')); });
  document.addEventListener('click', function (event) {
    if (bar.classList.contains('open') && !bar.contains(event.target)) setOpen(false);
  });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') setOpen(false);
  });
})();
