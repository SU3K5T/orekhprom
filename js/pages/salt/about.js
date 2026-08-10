class AboutCardsSlider {
  constructor({ target }) {
    this.target = target;
    this.slider = target.querySelector('.js-page-salt-about-slider');
    this.init();
  }

  init() {
    if (!this.slider) return;

    this.swiper = new Swiper(this.slider, {
      slidesPerView: 'auto',
      spaceBetween: 10,
      breakpoints: {
        0: {
          enabled: true,
          spaceBetween: 10,
        },
        992: {
          enabled: false,
          spaceBetween: 0,
        },
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.page-salt-about').forEach((target) => {
    new AboutCardsSlider({ target });
  });
});
