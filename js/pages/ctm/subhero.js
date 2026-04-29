class HeroSlider {
  constructor({ target }) {
    this.target = target;
    this.slider = target.querySelector('.js-page-ctm-subhero__slider');

    this.init();
  }

  init() {
    if (!this.slider) return;

    this.swiper = new Swiper(this.slider, {
      slidesPerView: 'auto',
      spaceBetween: 20,

    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.js-page-ctm-subhero-section').forEach((target) => {
    new HeroSlider({ target })
  })
});
