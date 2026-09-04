(() => {
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

  /* Theme */
  const root = document.documentElement;
  const themeButton = $('[data-theme-toggle]');
  const storedTheme = (() => {
    try { return localStorage.getItem('lts-theme'); } catch (_) { return null; }
  })();
  if (storedTheme === 'light' || storedTheme === 'dark') root.dataset.theme = storedTheme;

  const updateThemeLabel = () => {
    if (!themeButton) return;
    const isLight = root.dataset.theme === 'light';
    themeButton.setAttribute('aria-label', isLight ? 'Switch to dark theme' : 'Switch to light theme');
    themeButton.setAttribute('title', isLight ? 'Switch to dark theme' : 'Switch to light theme');
  };
  updateThemeLabel();

  themeButton?.addEventListener('click', () => {
    const next = root.dataset.theme === 'light' ? 'dark' : 'light';
    root.dataset.theme = next;
    try { localStorage.setItem('lts-theme', next); } catch (_) {}
    updateThemeLabel();
  });

  /* Mobile navigation */
  const menuButton = $('[data-menu-toggle]');
  const nav = $('#site-nav');
  const closeMenu = () => {
    if (!menuButton || !nav) return;
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  };
  menuButton?.addEventListener('click', () => {
    const open = nav?.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  nav?.addEventListener('click', event => {
    if (event.target.closest('a')) closeMenu();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMenu();
  });
  document.addEventListener('click', event => {
    if (nav?.classList.contains('open') && !event.target.closest('[data-site-header]')) closeMenu();
  });

  /* Current navigation item */
  const path = location.pathname.replace(/index\.html$/, '');
  $$('#site-nav a').forEach(link => {
    const target = new URL(link.href, location.origin).pathname;
    const matches =
      path === target ||
      (path.startsWith('/essays/') && target === '/essays.html') ||
      (path.startsWith('/guides/') && target === '/field-guides.html');
    if (matches) link.setAttribute('aria-current', 'page');
  });

  /* Reading progress */
  const progress = $('.reading-progress span');
  const updateProgress = () => {
    if (!progress) return;
    const scrollable = document.documentElement.scrollHeight - innerHeight;
    const value = scrollable > 0 ? Math.min(100, Math.max(0, (scrollY / scrollable) * 100)) : 0;
    progress.style.width = `${value}%`;
  };
  updateProgress();
  addEventListener('scroll', updateProgress, { passive: true });
  addEventListener('resize', updateProgress);

  /* Table of contents */
  const article = $('[data-article-body]');
  const toc = $('[data-toc]');
  if (article && toc) {
    const headings = $$('h2', article);
    headings.forEach((heading, index) => {
      if (!heading.id) {
        heading.id = heading.textContent
          .toLowerCase()
          .trim()
          .replace(/[^\p{L}\p{N}]+/gu, '-')
          .replace(/^-|-$/g, '') || `section-${index + 1}`;
      }
      const link = document.createElement('a');
      link.href = `#${heading.id}`;
      link.textContent = heading.textContent;
      toc.append(link);
    });

    if ('IntersectionObserver' in window && headings.length) {
      const links = $$('a', toc);
      const observer = new IntersectionObserver(entries => {
        const visible = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (!visible) return;
        links.forEach(link => link.classList.toggle('active', link.hash === `#${visible.target.id}`));
      }, { rootMargin: '-18% 0px -70% 0px', threshold: 0 });
      headings.forEach(heading => observer.observe(heading));
    }
  }

  /* Copy and print */
  $$('[data-copy-link]').forEach(button => {
    button.addEventListener('click', async () => {
      const original = button.textContent;
      try {
        await navigator.clipboard.writeText(location.href);
        button.textContent = 'Link copied';
      } catch (_) {
        const input = document.createElement('input');
        input.value = location.href;
        document.body.append(input);
        input.select();
        document.execCommand('copy');
        input.remove();
        button.textContent = 'Link copied';
      }
      setTimeout(() => { button.textContent = original; }, 1800);
    });
  });
  $$('[data-print]').forEach(button => button.addEventListener('click', () => print()));

  /* Archive filters and search */
  const filterContainer = $('[data-filter-container]');
  const filterGroup = $('[data-filter-group]');
  const searchInput = $('[data-filter-search]');
  if (filterContainer && (filterGroup || searchInput)) {
    const cards = $$('.filter-card');
    const count = $('[data-result-count]');
    const empty = $('[data-no-results]');
    const params = new URLSearchParams(location.search);
    let activeFilter = (params.get('filter') || 'all').toLowerCase();
    let query = (params.get('q') || '').trim().toLowerCase();

    const available = $$('[data-filter]', filterGroup || document).map(button => button.dataset.filter);
    if (!available.includes(activeFilter)) activeFilter = 'all';

    const apply = () => {
      let visible = 0;
      cards.forEach(card => {
        const category = (card.dataset.category || '').toLowerCase();
        const haystack = (card.dataset.search || card.textContent || '').toLowerCase();
        const categoryMatch = activeFilter === 'all' || category === activeFilter;
        const searchMatch = !query || haystack.includes(query);
        const show = categoryMatch && searchMatch;
        card.hidden = !show;
        if (show) visible += 1;
      });
      if (count) count.textContent = String(visible);
      if (empty) empty.hidden = visible !== 0;
      $$('[data-filter]', filterGroup || document).forEach(button => {
        button.classList.toggle('active', button.dataset.filter === activeFilter);
        button.setAttribute('aria-pressed', button.dataset.filter === activeFilter ? 'true' : 'false');
      });
    };

    if (searchInput) {
      searchInput.value = params.get('q') || '';
      searchInput.addEventListener('input', () => {
        query = searchInput.value.trim().toLowerCase();
        apply();
      });
    }

    filterGroup?.addEventListener('click', event => {
      const button = event.target.closest('[data-filter]');
      if (!button) return;
      activeFilter = button.dataset.filter;
      apply();
    });
    apply();
  }

  /* Random signal */
  const signalData = $('#signal-data');
  const signalButton = $('[data-random-signal]');
  if (signalData && signalButton) {
    let data = [];
    try { data = JSON.parse(signalData.textContent); } catch (_) {}
    let last = 0;
    signalButton.addEventListener('click', () => {
      if (!data.length) return;
      let index = Math.floor(Math.random() * data.length);
      if (data.length > 1 && index === last) index = (index + 1) % data.length;
      last = index;
      const signal = data[index];
      $('[data-random-signal-title]').textContent = signal.title;
      $('[data-random-signal-body]').textContent = signal.body;
      $('[data-random-signal-number]').textContent = `SIGNAL ${signal.number}`;
      $('[data-random-signal-category]').textContent = signal.category;
    });
  }

  /* Random experiment prompt */
  const promptData = $('#prompt-data');
  const promptButton = $('[data-new-prompt]');
  if (promptData && promptButton) {
    let prompts = [];
    try { prompts = JSON.parse(promptData.textContent); } catch (_) {}
    let last = 0;
    promptButton.addEventListener('click', () => {
      if (!prompts.length) return;
      let index = Math.floor(Math.random() * prompts.length);
      if (prompts.length > 1 && index === last) index = (index + 1) % prompts.length;
      last = index;
      $('[data-random-prompt]').textContent = prompts[index];
    });
  }

  /* Assumption audit */
  const claimForm = $('[data-claim-form]');
  const claimOutput = $('[data-claim-output]');
  claimForm?.addEventListener('submit', event => {
    event.preventDefault();
    const input = $('input', claimForm);
    const claim = input?.value.trim();
    if (!claim || !claimOutput) return;
    claimOutput.replaceChildren();
    const heading = document.createElement('strong');
    heading.textContent = 'AUDIT QUESTIONS';
    claimOutput.append(heading);
    [
      `Claim: “${claim}”`,
      'What part of this did you observe directly?',
      'What part was reported, inferred or repeated?',
      'What evidence would lower your confidence?',
      'What is the smallest useful action you can test next?'
    ].forEach(text => {
      const paragraph = document.createElement('p');
      paragraph.textContent = text;
      claimOutput.append(paragraph);
    });
    claimOutput.hidden = false;
  });

  /* Year */
  $$('[data-year]').forEach(node => { node.textContent = String(new Date().getFullYear()); });
})();
