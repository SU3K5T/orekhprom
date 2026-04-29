class CTMHeroTicker {
  constructor({ target }) {
    this.target = target;
    this.slider = target.querySelector('.js-hero-ticker');

    this.init();
  }

  init() {
    if (!this.slider) return;

    this.swiper = new Swiper(this.slider, {
      slidesPerView: 'auto',
      spaceBetween: 30,
      loop: true,
      speed: 70000,

      simulateTouch: false,
      allowTouchMove: false,
      touchStartPreventDefault: false,
      touchMoveStopPropagation: false,

      autoplay: {
        delay: 0,
        disableOnInteraction: false,
        pauseOnMouseEnter: false,
      },
      freeMode: {
        enabled: true,
        momentum: false,
      },
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.js-page-ctm-hero-section').forEach((target) => {
    new CTMHeroTicker({ target })
  })
});
