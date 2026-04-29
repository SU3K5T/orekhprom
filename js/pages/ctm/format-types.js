class FormatTypesScrollTrigger {
  constructor() {
    this.items = [];
    this.texts = [];
    this.activeIndex = 0;
    this.pointer = document.querySelector('.js-page-ctm-format-types__list-pointer');
    this.init();
  }

  init() {
    const trigger = document.querySelector('.js-scroll-trigger-2');
    if (!trigger) return;

    for (let i = 0; i < 5; i++) {
      this.items[i] = trigger.querySelector(`[data-item="${i}"]`);
    }

    this.switchTo(0);

    const st2 = ScrollTrigger.create({
      trigger,
      start: 'top top+=200',
      end: '+=1600',          
      pin: true,     
      scrub: true,
      onUpdate: ({ progress }) => {
        const idx = Math.min(Math.floor(progress * 4), 4);
        if (idx !== this.activeIndex) {
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

    this.pointer.style.transform = `translateY(${newItem.offsetTop - 30}px)`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new FormatTypesScrollTrigger();
});