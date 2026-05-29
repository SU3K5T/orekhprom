class PromoScrollTrigger {
  constructor({ trigger }) {
    this.currentIdx = 0;
    this.trigger = trigger;
    this.init();
  }

  init() {
    if (!this.trigger) return;

    let mm = gsap.matchMedia();

    const st = ScrollTrigger.create({
      trigger: this.trigger,
      start: 'top +=140',
      end: '+=2600',
      pin: true,
      scrub: true,
      onUpdate: ({ progress }) => {
        const targetIdx = Math.floor(progress * 4);
        if (targetIdx !== this.currentIdx && targetIdx < 4) {
          this.updateItem(targetIdx);
        }
      }
    });
  }

  updateItem(idx) {
    const currentActiveEl = this.trigger.querySelector(`[data-item="${this.currentIdx}"]`);

    const nextEl = this.trigger.querySelector(`[data-item="${idx}"]`);
    console.log(nextEl.offsetTop);

    if (idx > this.currentIdx) {
      currentActiveEl.style.transform = `translateY(-${currentActiveEl.offsetHeight + 20}px)`;

      const onTransitionEnd = (event) => {
        if (event.target !== currentActiveEl) return;
        currentActiveEl.classList.remove('active');
        currentActiveEl.removeEventListener('transitionend', onTransitionEnd);
      };

      currentActiveEl.addEventListener('transitionend', onTransitionEnd);

      nextEl.style.transform = `translateY(-${currentActiveEl.offsetHeight}px)`;
      nextEl.classList.add('active');

    }

    // const currentActiveItem = this.trigger.querySelector('.page-rd-promo__interact-item.active');
    // const currentActiveItemHeight = currentActiveItem.offsetHeight;

    // const nextItem = this.trigger.querySelector(`[data-item="${idx}"]`);
    // console.log(nextItem)
    // const nextItemToTopDistance = nextItem.offsetTop;
    // console.log(nextItemToTopDistance);

    // if (idx > this.currentIdx) {
    //   currentActiveItem.style.transform = `translateY(-${currentActiveItemHeight + 20}px)`;

    //   const onTransitionEnd = (event) => {
    //     if (event.target !== currentActiveItem) return;
    //     currentActiveItem.classList.remove('active');
    //     currentActiveItem.removeEventListener('transitionend', onTransitionEnd);
    //   };

    //   currentActiveItem.addEventListener('transitionend', onTransitionEnd);

    //   nextItem.style.transform = `translateY(-${nextItemToTopDistance}px})`;
    //   nextItem.classList.add('active');

    // } else {
    //   currentActiveItem.style.transform = `translateY(0)`;
    //   currentActiveItem.classList.add('active');
    // }
    this.currentIdx = idx;
  }

}

document.addEventListener('DOMContentLoaded', () => {
  const trigger = document.querySelector('.js-scroll-trigger-promo');
  new PromoScrollTrigger({ trigger });
});