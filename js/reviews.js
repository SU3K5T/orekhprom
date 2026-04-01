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
      spaceBetween: 20,
      loop: true,
      speed: 8000,
      simulateTouch: false,
      allowTouchMove: false,
      autoplay: {
        delay: 0,
        disableOnInteraction: false,
        pauseOnMouseEnter: false,
      },
      preventClicks: false,
      freeMode: true,
      touchStartPreventDefault: false,
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.js-reviews-section').forEach((target) => {
    new ReviewsSlider({ target })
  })
});