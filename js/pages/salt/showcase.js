class ShowcaseScrollTrigger {
  constructor({ trigger }) {
    this.itemsCount = 2;
    this.currentIdx = 0;
    this.trigger = trigger;
    this.slider = this.trigger.querySelector('.js-page-salt-showcase-slider');
    this.scrollTrigger = null;
    this.swiper = null;

    this.initSwiper();
    this.init();
  }

  initSwiper() {
    if (!this.slider) return;

    this.swiper = new Swiper(this.slider, {
      slidesPerView: 1,
      effect: 'fade',
      fadeEffect: { crossFade: true },
      speed: 800,
      allowTouchMove: false,
    });
  }

  init() {
    if (!this.trigger || !this.swiper) return;
    const mm = gsap.matchMedia();

    mm.add({ isDesktop: '(min-width: 992px)', isMobile: '(max-width: 991px)' }, (context) => {
      const { isDesktop } = context.conditions;
      const distancePerItem = isDesktop ? 700 : 500;

      this.currentIdx = 0;
      this.scrollTrigger = ScrollTrigger.create({
        trigger: this.trigger,
        start: 'top top',
        end: `+=${this.itemsCount * 500}`,
        pin: true,
        scrub: true,
        refreshPriority: 1,
        invalidateOnRefresh: true,
        onUpdate: ({ progress }) => {
          const targetIdx = Math.min(this.itemsCount - 1, Math.floor(progress * this.itemsCount));
          if (targetIdx !== this.currentIdx) {
            this.currentIdx = targetIdx;
            this.swiper.slideTo(targetIdx);
          }
        },
      });

      return () => {
        this.scrollTrigger.kill();
        this.scrollTrigger = null;
      };
    });
  }

}

document.addEventListener('DOMContentLoaded', () => {
  const trigger = document.querySelector('.js-scroll-trigger-showcase');
  if (!trigger) return;

  new ShowcaseScrollTrigger({ trigger });

  const refresh = () => ScrollTrigger.refresh();
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(refresh);
  }
  window.addEventListener('load', refresh);
});
