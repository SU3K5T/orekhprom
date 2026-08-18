class ShowcaseSlider {
  constructor({ target }) {
    this.target = target;
    this.slider = target.querySelector('.js-page-salt-showcase-slider');
    this.init();
  }

  init() {
    if (!this.slider) return;

    this.swiper = new Swiper(this.slider, {
      slidesPerView: 1,
      speed: 600,
      loop: true,
      effect: 'creative',
      creativeEffect: {
        prev: { opacity: 0, translate: ['-10%', 0, 0] },
        next: { opacity: 0, translate: ['10%', 0, -1] },
      },
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      navigation: {
        nextEl: '.js-page-salt-showcase-next',
        prevEl: '.js-page-salt-showcase-prev',
      },
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.page-salt-showcase').forEach((target) => {
    new ShowcaseSlider({ target });
  });
});
