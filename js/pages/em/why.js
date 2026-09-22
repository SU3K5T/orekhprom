class WhyScrollTrigger {
  constructor() {
    this.items = [];
    this.texts = [];
    this.activeIndex = 0;
    this.trigger = document.querySelector('.js-page-em-why-section');
    this.init();
  }

  init() {
    if (!this.trigger) return;

    gsap.registerPlugin(ScrollTrigger);

    const total = this.trigger.querySelectorAll('[data-item]').length;
    if (!total) return;

    for (let i = 0; i < total; i++) {
      this.items[i] = this.trigger.querySelector(`[data-item="${i}"]`);
      this.texts[i] = this.trigger.querySelector(`[data-text="${i}"]`);
    }

    this.switchTo(0);

    const decorItems = this.trigger.querySelectorAll('.page-em-why__decor-item');
    const decorBaseDistance = -60;
    const decorBaseRotation = 4;

    // Pin/scrub only for users who haven't asked for reduced motion — matchMedia
    // handles teardown (tl.scrollTrigger.kill()) automatically if the query ever
    // stops matching. The decor parallax is a plain child tween on the same
    // timeline (its scrollTrigger lives on the timeline itself, not the tween),
    // so it scrubs in lockstep with the pin/active-item switching.
    gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: this.trigger,
          start: 'center center',
          end: '+=1800',
          pin: true,
          scrub: true,
          onUpdate: ({ progress }) => {
            const idx = Math.min(total - 1, Math.floor(progress * total));
            if (idx !== this.activeIndex) {
              this.switchTo(idx);
            }
          },
        },
      });

      // Each image's own data-weight is its parallax speed multiplier —
      // "heavier" images travel (and rotate) further over the same scrub
      // range, so they read as rising faster than "lighter" ones. Direction
      // of rotation alternates per item so they don't all tilt the same way.
      decorItems.forEach((el, i) => {
        const weight = parseFloat(el.dataset.weight) || 1;
        const sign = i % 2 === 0 ? 1 : -1;
        tl.to(el, {
          y: decorBaseDistance * weight,
          rotation: decorBaseRotation * weight * sign,
          ease: 'none',
        }, 0);
      });

      return () => tl.scrollTrigger.kill();
    });
  }

  switchTo(index) {
    this.items[this.activeIndex]?.classList.remove('active');
    this.texts[this.activeIndex]?.classList.remove('active');

    this.items[index]?.classList.add('active');
    this.texts[index]?.classList.add('active');

    this.activeIndex = index;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new WhyScrollTrigger();
});
