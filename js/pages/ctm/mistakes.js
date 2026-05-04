class MistakesScrollTrigger {
  constructor() {
    this.items = [];
    this.texts = [];
    this.activeIndex = 0;
    this.init();
  }

  init() {
    const trigger = document.querySelector('.js-scroll-trigger-1');
    if (!trigger) return;

    for (let i = 0; i < 4; i++) {
      this.items[i] = trigger.querySelector(`[data-item="${i}"]`);
      this.texts[i] = trigger.querySelector(`[data-text="${i}"]`);
    }

    this.switchTo(0);

    let progressMultiplier = 4;

    let mm = gsap.matchMedia();
    mm.add("(max-width: 767px", () => {
      progressMultiplier = 3;
    });

    mm.add("(min-width: 767px", () => {
      progressMultiplier = 4;
    });

    const st1 = ScrollTrigger.create({
      trigger,
      start: 'center top',
      end: '+=1600',          
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
    const prevText = this.texts[this.activeIndex];
    prevItem?.classList.remove('active');
    prevText?.classList.remove('active');

    const newItem = this.items[index];
    const newText = this.texts[index];
    newItem?.classList.add('active');
    newText?.classList.add('active');

    this.activeIndex = index;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new MistakesScrollTrigger();
});