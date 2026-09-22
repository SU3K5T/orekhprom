class CatalogTabs {
  constructor({ target }) {
    this.target = target;
    this.tabs = [...target.querySelectorAll('.js-page-em-catalog-tab')];
    this.panels = [...target.querySelectorAll('.js-page-em-catalog-panel')];
    this.activeIndex = this.panels.findIndex((panel) => panel.classList.contains('active'));
    if (this.activeIndex < 0) this.activeIndex = 0;
    this.init();
  }

  init() {
    if (!this.tabs.length) return;

    this.tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => this.select(index));
    });
  }

  select(index) {
    if (index === this.activeIndex) return;

    const oldPanel = this.panels[this.activeIndex];
    const newPanel = this.panels[index];
    this.activeIndex = index;

    this.tabs.forEach((tab, i) => tab.classList.toggle('active', i === index));

    // Panels sit one after another in normal flow (only the active one is
    // display: flex), so a true overlapping crossfade would stack both on
    // top of each other — fade the old one out, swap display, fade the new
    // one in instead.
    gsap.to(oldPanel, {
      opacity: 0,
      duration: 0.2,
      ease: 'power1.out',
      onComplete: () => {
        oldPanel.classList.remove('active');
        oldPanel.querySelector('video')?.pause();

        newPanel.classList.add('active');
        gsap.fromTo(newPanel, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: 'power1.in' });

        const newVideo = newPanel.querySelector('video');
        if (newVideo) {
          newVideo.currentTime = 0;
          newVideo.play();
        }
      },
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.page-em-catalog').forEach((target) => {
    new CatalogTabs({ target });
  });
});
