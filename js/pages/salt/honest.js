class HonestCardsSlider {
  constructor({ target }) {
    this.target = target;
    this.slider = target.querySelector('.js-page-salt-honest-slider');
    this.init();
  }

  init() {
    if (!this.slider) return;

    this.swiper = new Swiper(this.slider, {
      slidesPerView: 'auto',
      spaceBetween: 20,
      breakpoints: {
        0: {
          enabled: true,
          spaceBetween: 20,
        },
        1200: {
          enabled: false,
          spaceBetween: 0,
        },
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.page-salt-honest').forEach((target) => {
    new HonestCardsSlider({ target });
  });
});
