(() => {
  const views = [...document.querySelectorAll('.profile-view')];
  const navigation = [...document.querySelectorAll('[data-profile-view]')];
  if (!views.length) return;

  function activateSection() {
    let target;
    try {
      const hash = decodeURIComponent(location.hash.slice(1));
      target = document.getElementById(hash);
      if (!target && hash === 'about') {
        target = document.getElementById('about-me');
      }
    } catch {
      target = null;
    }
    const selected = target?.closest('.profile-view') || views[0];
    views.forEach(view => { view.hidden = view !== selected; });
    navigation.forEach(link => {
      if (link.dataset.profileView === selected.id) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
    const details = target?.closest('details');
    if (details) details.open = true;
    if (target) target.scrollIntoView({ block: 'start' });
  }

  // Keep ordinary hash links and browser Back/Forward navigation working.
  window.addEventListener('hashchange', activateSection);
  const details = [...document.querySelectorAll('details')];
  let detailsBeforePrint = [];
  window.addEventListener('beforeprint', () => {
    detailsBeforePrint = details.map(element => element.open);
    details.forEach(element => { element.open = true; });
  });
  window.addEventListener('afterprint', () => {
    details.forEach((element, index) => { element.open = detailsBeforePrint[index]; });
  });
  activateSection();
})();
