class ShowcaseScrollTrigger {
  constructor({ trigger }) {
    this.itemsCount = 2;
    this.currentIdx = 0;
    this.trigger = trigger;
    this.slider = this.trigger.querySelector('.js-page-salt-showcase-slider');
    this.scrollTrigger = null;
    this.initSwiper();
    this.init();
  }

  initSwiper() {
    if (!this.slider) return;

    // effect: 'fade' — панели не уезжают в сторону, а кроссфейдятся друг в
    // друга на месте (crossFade: true — обе панели фейдятся одновременно,
    // а не "сначала спрячь старую, потом покажи новую"). Листает и на
    // десктопе, и на мобилке только скролл страницы через ScrollTrigger
    // (см. init() ниже), поэтому свайп пальцем/мышью отключен везде —
    // иначе ручной свайп и скролл-прогресс будут спорить друг с другом
    // за то, какой слайд активен
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

    // и на десктопе, и на мобилке секция пинится и слушает скролл — просто
    // с разной "длиной" прогона на слайд (на маленьком экране укорачиваем,
    // чтобы не заставлять долго скроллить один и тот же зафиксированный блок)
    mm.add({ isDesktop: '(min-width: 992px)', isMobile: '(max-width: 991px)' }, (context) => {
      const { isDesktop } = context.conditions;
      const distancePerItem = isDesktop ? 700 : 500;

      this.currentIdx = 0;
      this.scrollTrigger = ScrollTrigger.create({
        trigger: this.trigger,
        start: 'top top',
        end: `+=${this.itemsCount * distancePerItem}`,
        pin: true,
        scrub: true,
        // эта секция стоит в документе выше "Аудитории" (тоже запиненной) —
        // более высокий refreshPriority заставляет GSAP пересчитать именно
        // её первой при refresh(), чтобы пин-спейсер под ней уже был на
        // месте, когда ScrollTrigger аудитории будет считать свой start/end
        // (иначе оба триггера могут "наехать" друг на друга)
        refreshPriority: 1,
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
