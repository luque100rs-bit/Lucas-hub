/* BL Escadas — interações e animações.
   Sem dependências: tudo com IntersectionObserver, requestAnimationFrame e CSS. */
(() => {
  'use strict';

  const WA_NUMBER = '5521964318649';
  const WA_DEFAULT = 'Olá! Vi o site da BL Escadas e queria um orçamento de escada pré-moldada.';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const waUrl = (text) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;

  /* Links de WhatsApp já com mensagem inicial */
  function initWhatsAppLinks() {
    $$('.wa-link').forEach((a) => { a.href = waUrl(WA_DEFAULT); });
  }

  /* Entrada do topo: título palavra por palavra, depois o resto em sequência */
  function initIntro() {
    const title = $('[data-split]');
    let delay = 0.35;
    if (title && !reduceMotion) {
      const words = title.textContent.trim().split(/\s+/);
      title.setAttribute('aria-label', title.textContent.trim());
      title.textContent = '';
      words.forEach((w, i) => {
        const outer = document.createElement('span');
        outer.className = 'word';
        outer.setAttribute('aria-hidden', 'true');
        const inner = document.createElement('span');
        inner.textContent = w;
        inner.style.animationDelay = `${(delay + i * 0.07).toFixed(2)}s`;
        outer.appendChild(inner);
        title.appendChild(outer);
        if (i < words.length - 1) title.appendChild(document.createTextNode(' '));
      });
      delay += words.length * 0.07;
    }
    const intro = $$('[data-intro]');
    intro.forEach((el) => {
      // A navegação entra primeiro; textos e botões depois do título
      const isNav = el.classList.contains('hero__nav');
      const d = isNav ? 0.15 : (el.classList.contains('eyebrow') ? 0.25 : delay + 0.1 + intro.indexOf(el) * 0.08);
      el.style.setProperty('--intro-delay', `${d.toFixed(2)}s`);
    });
  }

  /* Revelação ao rolar, uma vez só, com pequeno escalonamento entre irmãos */
  function initReveal() {
    const items = $$('[data-reveal]');
    if (reduceMotion || !('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('is-in'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const siblings = $$(':scope > [data-reveal]', el.parentElement);
        const index = Math.max(0, siblings.indexOf(el));
        el.style.setProperty('--d', `${Math.min(index, 5) * 0.09}s`);
        el.classList.add('is-in');
        io.unobserve(el);
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -6% 0px' });
    items.forEach((el) => io.observe(el));
  }

  /* Menu mobile em tela cheia */
  function initMenu() {
    const menu = $('#menu');
    const toggles = $$('[data-menu-toggle]');
    let lastFocus = null;
    const setOpen = (open) => {
      if (open) {
        lastFocus = document.activeElement;
        menu.hidden = false;
        requestAnimationFrame(() => menu.classList.add('is-open'));
        $$('.menu__nav a', menu).forEach((a, i) => { a.style.transitionDelay = `${0.08 + i * 0.05}s`; });
      } else {
        menu.classList.remove('is-open');
        $$('.menu__nav a', menu).forEach((a) => { a.style.transitionDelay = '0s'; });
        setTimeout(() => { if (!menu.classList.contains('is-open')) menu.hidden = true; }, 400);
      }
      document.body.classList.toggle('is-locked', open);
      toggles.forEach((t) => {
        t.setAttribute('aria-expanded', String(open));
        t.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
      });
      if (open) $('.menu__nav a', menu).focus({ preventScroll: true });
      else if (lastFocus) lastFocus.focus({ preventScroll: true });
    };
    toggles.forEach((t) => t.addEventListener('click', () => setOpen(!menu.classList.contains('is-open'))));
    menu.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) setOpen(false);
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 1080 && menu.classList.contains('is-open')) setOpen(false);
    });
  }

  /* Cabeçalho flutuante, botão de WhatsApp e seção ativa */
  function initScrollUi() {
    const hero = $('#topo');
    const topbar = $('#topbar');
    const waFloat = $('#wa-float');
    const nav = $('#pill-nav');
    const lamp = $('.pill-nav__lamp', nav);
    const links = $$('a', nav);
    const sections = links.map((a) => $(a.getAttribute('href'))).filter(Boolean);

    const placeLamp = () => {
      const active = links.find((a) => a.hasAttribute('aria-current'));
      if (!active || !active.offsetWidth) { lamp.style.opacity = '0'; return; }
      lamp.style.width = `${active.offsetWidth}px`;
      lamp.style.transform = `translateX(${active.offsetLeft}px)`;
      lamp.style.opacity = '1';
    };

    const update = () => {
      const past = window.scrollY > hero.offsetHeight * 0.7;
      topbar.classList.toggle('is-visible', past);
      waFloat.classList.toggle('is-visible', past);

      const probe = window.scrollY + window.innerHeight * 0.35;
      let current = null;
      sections.forEach((s) => { if (s.offsetTop <= probe) current = s; });
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) current = sections[sections.length - 1];
      links.forEach((a) => {
        if (current && a.getAttribute('href') === `#${current.id}`) a.setAttribute('aria-current', 'true');
        else a.removeAttribute('aria-current');
      });
      placeLamp();
    };

    let ticking = false;
    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => { update(); ticking = false; });
    }, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  /* Parallax leve na foto do topo e progresso da linha do "Como funciona" */
  function initScrollEffects() {
    const heroImg = $('[data-parallax]');
    const steps = $('#steps');
    const rail = $('.steps__rail span', steps);
    const stepItems = $$('.step', steps);
    const parallaxOn = () => !reduceMotion && window.innerWidth > 760;

    const frame = () => {
      if (heroImg && parallaxOn()) {
        const y = Math.min(window.scrollY, window.innerHeight);
        heroImg.style.transform = `translate3d(0, ${(y * Number(heroImg.dataset.parallax || 0.08)).toFixed(1)}px, 0)`;
      }
      if (steps) {
        const r = steps.getBoundingClientRect();
        const start = window.innerHeight * 0.8;
        const progress = Math.min(1, Math.max(0, (start - r.top) / (r.height + window.innerHeight * 0.2)));
        rail.style.setProperty('--progress', reduceMotion ? 1 : progress.toFixed(3));
        stepItems.forEach((s, i) => s.classList.toggle('is-lit', reduceMotion || progress >= i / stepItems.length + 0.02));
      }
    };
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => { frame(); ticking = false; });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    // a animação de entrada da foto usa transform; o parallax só assume depois dela
    setTimeout(() => {
      if (heroImg && parallaxOn()) heroImg.style.animation = 'none';
      frame();
    }, reduceMotion ? 0 : 2700);
    frame();
  }

  /* Perguntas frequentes com abertura suave */
  function initFaq() {
    $$('.qa button').forEach((btn) => {
      btn.addEventListener('click', () => {
        const qa = btn.closest('.qa');
        const open = !qa.classList.contains('is-open');
        qa.classList.toggle('is-open', open);
        btn.setAttribute('aria-expanded', String(open));
      });
    });
  }

  /* "Pedir orçamento" de cada modelo já escolhe o modelo no formulário */
  function initModelLinks() {
    const select = $('#f-model');
    const name = $('#f-name');
    $$('[data-model]').forEach((link) => {
      link.addEventListener('click', () => {
        const option = [...select.options].find((o) => o.value === link.dataset.model);
        if (option) select.value = option.value;
        select.closest('.field').animate?.(
          [{ backgroundColor: 'rgba(201,165,123,.18)' }, { backgroundColor: 'transparent' }],
          { duration: 1600, delay: 500, easing: 'ease-out' }
        );
        setTimeout(() => name.focus({ preventScroll: true }), reduceMotion ? 0 : 700);
      });
    });
  }

  /* Formulário: valida o nome e abre o WhatsApp com a mensagem montada */
  function initForm() {
    const form = $('#form');
    const nameInput = $('#f-name');
    const nameField = nameInput.closest('.field');
    const nameErr = $('#f-name-err');
    const status = $('#form-status');
    const val = (id) => $(id).value.trim();

    const setError = (msg) => {
      nameField.classList.toggle('has-error', Boolean(msg));
      nameInput.setAttribute('aria-invalid', msg ? 'true' : 'false');
      nameErr.textContent = msg;
    };
    nameInput.addEventListener('input', () => { if (val('#f-name')) setError(''); });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = val('#f-name');
      if (name.length < 2) {
        setError('Escreve seu nome pra gente saber com quem está falando.');
        nameInput.focus();
        return;
      }
      setError('');
      const lines = [`Olá! Meu nome é ${name} e quero um orçamento.`, '', `*Modelo:* ${val('#f-model')}`];
      if (val('#f-city')) lines.push(`*Local da obra:* ${val('#f-city')}`);
      if (val('#f-height')) lines.push(`*Altura piso a piso:* ${val('#f-height')}`);
      if (val('#f-width')) lines.push(`*Largura:* ${val('#f-width')}`);
      if (val('#f-msg')) lines.push('', val('#f-msg'));
      const url = waUrl(lines.join('\n'));
      const win = window.open(url, '_blank', 'noopener');
      status.innerHTML = '';
      const text = document.createTextNode(win ? 'Abrimos o WhatsApp numa nova aba. Se não apareceu, ' : 'Seu navegador bloqueou a nova aba. ');
      const link = document.createElement('a');
      link.href = url; link.target = '_blank'; link.rel = 'noopener';
      link.textContent = 'toque aqui pra abrir a mensagem';
      status.append(text, link, '.');
    });
  }

  /* Galeria: filtros e visualização ampliada com teclado e gesto */
  function initGallery() {
    const gallery = $('#gallery');
    const all = $$('.shot', gallery);
    const chips = $$('.chip');
    let visible = all;

    chips.forEach((chip) => {
      chip.addEventListener('click', () => {
        const f = chip.dataset.filter;
        chips.forEach((c) => {
          c.classList.toggle('is-on', c === chip);
          c.setAttribute('aria-pressed', String(c === chip));
        });
        all.forEach((s) => {
          s.hidden = f !== 'all' && s.dataset.cat !== f;
          s.classList.add('is-in');
        });
        gallery.classList.toggle('is-filtered', f !== 'all');
        visible = all.filter((s) => !s.hidden);
        if (!reduceMotion) {
          visible.forEach((s, i) => s.animate?.(
            [{ opacity: 0, transform: 'translateY(16px)' }, { opacity: 1, transform: 'none' }],
            { duration: 600, delay: i * 50, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'backwards' }
          ));
        }
      });
    });

    const lb = $('#lightbox');
    const img = $('#lb-img');
    const cap = $('#lb-cap');
    const count = $('#lb-count');
    let index = 0;
    let lastFocus = null;

    const show = (i) => {
      index = (i + visible.length) % visible.length;
      const src = $('img', visible[index]);
      img.classList.add('is-swapping');
      const swap = () => {
        img.src = src.currentSrc || src.src;
        img.alt = src.alt;
        cap.textContent = $('strong', visible[index]).textContent;
        count.textContent = `${index + 1} / ${visible.length}`;
        img.classList.remove('is-swapping');
      };
      if (lb.hidden || reduceMotion) swap(); else setTimeout(swap, 180);
    };
    const open = (i) => {
      lastFocus = document.activeElement;
      lb.hidden = false;
      show(i);
      requestAnimationFrame(() => lb.classList.add('is-open'));
      document.body.classList.add('is-locked');
      $('#lb-close').focus();
    };
    const close = () => {
      lb.classList.remove('is-open');
      document.body.classList.remove('is-locked');
      setTimeout(() => { lb.hidden = true; }, reduceMotion ? 0 : 350);
      if (lastFocus) lastFocus.focus({ preventScroll: true });
    };

    all.forEach((s) => s.addEventListener('click', () => open(visible.indexOf(s))));
    $('#lb-close').addEventListener('click', close);
    $('#lb-prev').addEventListener('click', () => show(index - 1));
    $('#lb-next').addEventListener('click', () => show(index + 1));
    lb.addEventListener('click', (e) => { if (e.target === lb) close(); });
    document.addEventListener('keydown', (e) => {
      if (lb.hidden) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(index - 1);
      if (e.key === 'ArrowRight') show(index + 1);
      if (e.key === 'Tab') {
        // mantém o foco dentro da visualização
        const focusables = $$('button', lb);
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
    let touchX = null;
    lb.addEventListener('touchstart', (e) => { touchX = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', (e) => {
      if (touchX === null) return;
      const dx = e.changedTouches[0].clientX - touchX;
      if (Math.abs(dx) > 50) show(index + (dx < 0 ? 1 : -1));
      touchX = null;
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    $('#year').textContent = new Date().getFullYear();
    initWhatsAppLinks();
    initIntro();
    initReveal();
    initMenu();
    initScrollUi();
    initScrollEffects();
    initFaq();
    initModelLinks();
    initForm();
    initGallery();
  });
})();
