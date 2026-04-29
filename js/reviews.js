class ReviewsSlider {
  constructor({ target }) {
    this.target = target;
    this.slider = target.querySelector('.js-reviews-slider');
    this.init();
  }

  init() {
    if (!this.slider) return;

    this.swiper = new Swiper(this.slider, {
      slidesPerView: 'auto',
      loop: true,
      speed: 14000,

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

      breakpoints: {
        0: {
          spaceBetween: 8,
        },
        768: {
          spaceBetween: 20,
        }
      }

    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.js-reviews-section').forEach((target) => {
    new ReviewsSlider({ target })
  })
});