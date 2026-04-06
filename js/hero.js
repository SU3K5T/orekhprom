class HeroSlider {
  constructor({ target }) {
    this.target = target;
    this.slider = target.querySelector('.js-hero-slider');
    this.mediaQuery = window.matchMedia('(max-width: 991px)');

    this.init();
  }

  init() {
    if (!this.slider) return;

    const handleScreenChange = (e) => {
      if (e.matches) {
        this.enableSlider();
      } else {
        this.disableSlider();
      }
    };

    this.mediaQuery.addEventListener('change', handleScreenChange);

    handleScreenChange(this.mediaQuery);
  }

  enableSlider() {
    if (this.swiper) {
      this.swiper.destroy(true, true);
    }

    this.swiper = new Swiper(this.slider, {
      spaceBetween: 20,
      loop: true,
      allowTouchMove: true,
      breakpoints: {
        0: {
          slidesPerView: 'auto',
        },
        576: {
          slidesPerView: 1.8
        },
        768: {
          slidesPerView: 2,
        },
      }
    });
  }

  disableSlider() {
    if (this.swiper) {
      this.swiper.destroy(true, true);
      this.swiper = null;
    }
  }
}

class HeroTicker {
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
      speed: 29000,

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
  document.querySelectorAll('.js-hero-section').forEach((target) => {
    new HeroSlider({ target })
    new HeroTicker({ target })
  })
});