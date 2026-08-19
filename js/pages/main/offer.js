class OfferSlider {
  constructor({ target }) {
    this.target = target;
    this.slider = target.querySelector('.js-page-main-offer-slider');
    this.init();
  }

  init() {
    if (!this.slider) return;

    this.swiper = new Swiper(this.slider, {
      slidesPerView: 'auto',
      spaceBetween: 12,
      navigation: {
        nextEl: '.js-page-main-offer-next',
        prevEl: '.js-page-main-offer-prev',
      },
      breakpoints: {
        768: {
          spaceBetween: 20,
        },
        992: {
          enabled: false,
        },
      },
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.page-main-offer').forEach((target) => {
    new OfferSlider({ target });
  });
});
