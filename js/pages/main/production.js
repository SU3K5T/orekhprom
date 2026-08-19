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

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.page-main-production').forEach((target) => {
    new ProductionGallerySlider({ target });
  });
});
