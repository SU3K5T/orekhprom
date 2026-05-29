class PromoScrollTrigger {
  constructor({ trigger }) {
    this.currentIdx = 0;
    this.trigger = trigger;
    this.slider = this.trigger.querySelector('.swiper');
    this.initSwiper();
    this.init();
  }

  initSwiper() {
    if (!this.slider) return;

    this.swiper = new Swiper(this.slider, {
      slidesPerView: "2",
      direction: "vertical",
      allowTouchMove: false,
      watchSlideProgress: true,
      speed: 800,
    });
  }

  init() {
    if (!this.trigger) return;

    const mm = gsap.matchMedia();

    mm.add({
      isDesktop: "(min-width: 992px)",
      isMobile: "(max-width: 991px)"
    }, (context) => {
      const { isDesktop } = context.conditions;
      const startValue = isDesktop ? 'top +=140' : 'top +=40';

      const st = ScrollTrigger.create({
        trigger: this.trigger,
        start: startValue,
        end: '+=2600',
        pin: true,
        scrub: true,
        onUpdate: ({ progress }) => {
          const targetIdx = Math.floor(progress * 4);
          if (targetIdx !== this.currentIdx && targetIdx < 4) {
            this.currentIdx = targetIdx;
            this.swiper.slideTo(targetIdx);
          }
        }
      });
      return () => {
        st.kill();
      };
    });
  }

}

document.addEventListener('DOMContentLoaded', () => {
  const trigger = document.querySelector('.js-scroll-trigger-promo');
  new PromoScrollTrigger({ trigger });
});