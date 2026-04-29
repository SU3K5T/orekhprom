class CTMTrustSlider {
  constructor({ target }) {
    this.target = target;
    this.slider = target.querySelector('.js-page-ctm-trust__slider');

    this.init();
  }

  init() {
    if (!this.slider) return;

    this.swiper = new Swiper(this.slider, {
      slidesPerView: 'auto',
      spaceBetween: 20,
      loop: true,
      speed: 14000,
      loopPreventsSliding: false,

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
  document.querySelectorAll('.js-page-ctm-trust-section').forEach((target) => {
    new CTMTrustSlider({ target })
  })
});
