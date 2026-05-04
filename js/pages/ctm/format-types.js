class FormatTypesScrollTrigger {
  constructor() {
    this.items = [];
    this.texts = [];
    this.activeIndex = 0;
    this.pointer = document.querySelector('.js-page-ctm-format-types__list-pointer');
    this.itemsBlock = document.querySelector('.page-ctm-format-types__list');
    this.init();
  }

  init() {
    const trigger = document.querySelector('.js-scroll-trigger-2');
    if (!trigger) return;

    for (let i = 0; i < 5; i++) {
      this.items[i] = trigger.querySelector(`[data-item="${i}"]`);
    }

    this.switchTo(0);

    let progressMultiplier = 4;

    let mm = gsap.matchMedia();
    mm.add("(max-width: 767px", () => {
      progressMultiplier = 4;
    });

    mm.add("(min-width: 767px", () => {
      progressMultiplier = 9;
    });

    const st2 = ScrollTrigger.create({
      trigger,
      start: 'top top+=200',
      end: '+=2000',
      pin: true,
      scrub: true,
      onUpdate: ({ progress }) => {
        const idx = Math.floor(progress * progressMultiplier);
        if (idx !== this.activeIndex && idx < this.items.length) {
          this.switchTo(idx);
        }
      }
    });
  }

  switchTo(index) {
    const prevItem = this.items[this.activeIndex];
    prevItem?.classList.remove('active');

    const newItem = this.items[index];
    newItem?.classList.add('active');
    this.activeIndex = index;


    const elTransformer = this.itemsBlock.clientHeight * 0.2;
    this.itemsBlock.style.transform = `translateY(-${elTransformer * index + index * 2}px)`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new FormatTypesScrollTrigger();
});