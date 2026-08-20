class ProductionGallerySlider {
  constructor({ target }) {
    this.target = target;
    this.slider = target.querySelector('.js-page-main-production-slider');
    this.init();
  }

  init() {
    if (!this.slider) return;

    this.swiper = new Swiper(this.slider, {
      slidesPerView: 'auto',
      spaceBetween: 16,
      navigation: {
        nextEl: '.js-page-main-production-next',
        prevEl: '.js-page-main-production-prev',
      },
    });
  }
}

class ProductionFancybox {
  constructor({ target }) {
    this.target = target;
    this.init();
  }

  init() {
    if (!window.Fancybox) return;

    Fancybox.bind(this.target, '[data-fancybox]');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.page-main-production').forEach((target) => {
    new ProductionGallerySlider({ target });
    new ProductionFancybox({ target });
  });
});
