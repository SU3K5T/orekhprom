class RDReviewsSlider {
  constructor({ target }) {
    this.target = target;
    this.slider = target.querySelector('.js-page-rd-reviews__slider');

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
  document.querySelectorAll('.js-page-rd-reviews-section').forEach((target) => {
    new RDReviewsSlider({ target })
  })
});
