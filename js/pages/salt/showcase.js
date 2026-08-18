document.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector('.js-page-salt-showcase-slider');
  if (!slider) return;

  new Swiper(slider, {
    slidesPerView: 1,
    speed: 600,
    loop: true,
    effect: 'creative',
    creativeEffect: {
      prev: { opacity: 0, translate: ['-10%', 0, 0] },
      next: { opacity: 0, translate: ['10%', 0, -1] },
    },
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    navigation: {
      nextEl: '.js-page-salt-showcase-next',
      prevEl: '.js-page-salt-showcase-prev',
    },
  });
});
