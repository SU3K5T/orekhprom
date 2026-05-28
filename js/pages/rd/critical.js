class CriticalSlider {
  constructor({ target }) {
    this.target = target;
    this.slider = target.querySelector('.js-page-rd-critical-slider');
    this.init();
  }

  init() {
    if (!this.slider) return;

    this.swiper = new Swiper(this.slider, {
      slidesPerView: 'auto',
      spaceBetween: 30,
      breakpoints: {
        0: {
          enabled: true,
          spaceBetween: 10,
        },
        992: {
          enabled: false,
        },
      }
    });

  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.js-critical-section').forEach((target) => {
    new CriticalSlider({ target })
  })
});