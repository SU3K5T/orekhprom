document.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector('.js-page-salt-showcase-slider');
  if (!slider) return;

  new Swiper(slider, {
    slidesPerView: 1,
    speed: 600,
    // не совсем fade и не совсем slide: старая панель уходит с лёгким
    // сдвигом влево и затуханием, новая приходит справа так же через
    // прозрачность — получается мягкий кросс-фейд со сдвигом, а не
    // резкая протяжка всей панели целиком
    effect: 'creative',
    creativeEffect: {
      prev: { opacity: 0, translate: ['-10%', 0, 0] },
      next: { opacity: 0, translate: ['10%', 0, -1] },
    },
    navigation: {
      nextEl: '.js-page-salt-showcase-next',
      prevEl: '.js-page-salt-showcase-prev',
    },
  });
});
