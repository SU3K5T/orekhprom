class AudienceSlider {
  constructor({ target }) {
    this.target = target;
    this.slider = target.querySelector('.js-page-main-audience-slider');
    this.init();
  }

  init() {
    if (!this.slider) return;

    this.swiper = new Swiper(this.slider, {
      slidesPerView: 'auto',
      spaceBetween: 12,
      navigation: {
        nextEl: '.js-page-main-audience-next',
        prevEl: '.js-page-main-audience-prev',
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
  document.querySelectorAll('.page-main-audience').forEach((target) => {
    new AudienceSlider({ target });
  });
});
