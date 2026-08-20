class HeroGallery {
  constructor({ target }) {
    this.target = target;
    this.init();
  }

  init() {
    if (!window.Fancybox) return;

    Fancybox.bind(this.target, '[data-fancybox="hero-gallery"]', {
      groupAll: true,
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.page-main-hero').forEach((target) => {
    new HeroGallery({ target });
  });
});
