class RDReasonsSlider {
  constructor({ target }) {
    this.target = target;
    this.slider = target.querySelector('.js-page-rd-reasons-slider');
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
          spaceBetween: 0
        },
      }
    });

  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.js-page-rd-reasons-section').forEach((target) => {
    new RDReasonsSlider({ target })
  })
});