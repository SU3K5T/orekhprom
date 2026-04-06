class FlavorsSlider {
  constructor({ target }) {
    this.target = target;
    this.slider = target.querySelector('.js-flavors-slider');
    this.init();
  }

  init() {
    if (!this.slider) return;

    this.swiper = new Swiper(this.slider, {
      slidesPerView: 'auto',
      spaceBetween: 30,
      freeMode: false,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      breakpoints: {
        0: {
          enabled: true,
          autoplay: false,
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
  document.querySelectorAll('.js-flavors-section').forEach((target) => {
    new FlavorsSlider({ target })
  })
});