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
      loop: true,
      speed: 700,
      freeMode: false,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      breakpoints: {
        0: {
          autoplay: false,
          centeredSlides: true,
        },
        992: {
          autoplay: {
            delay: 3000,
          },
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