class FactsSlider {
  constructor({ target }) {
    this.target = target;
    this.sliders = target.querySelectorAll('.js-facts-slider');
    this.initialized = false;
    this.swipers = [];
    this.currentIndex = 0;
    this.totalSlides = 0;
  }

  init() {
    if (this.initialized || !this.sliders.length) return;
    this.enableSliders();
  }

  enableSliders() {
    let maxSlides = 0;
    this.sliders.forEach(slider => {
      const slidesCount = slider.querySelectorAll('.swiper-slide').length;
      maxSlides = Math.max(maxSlides, slidesCount);
    });
    this.totalSlides = maxSlides;

    this.sliders.forEach(slider => {
      const isTopSlider = slider.classList.contains('facts__slider--tl') ||
        slider.classList.contains('facts__slider--tr');

      this.swipers.push(
        new Swiper(slider, {
          slidesPerView: 1,
          direction: 'vertical',
          speed: 1000,
          freeMode: false,
          simulateTouch: false,
          allowTouchMove: false,
          mouseWheel: false,
          effect: "creative",
          creativeEffect: {
            prev: {
              shadow: false,
              translate: isTopSlider ? [0, '100%', 0] : [0, '-100%', 0],
              opacity: 0,
            },
            next: {
              shadow: false,
              translate: isTopSlider ? [0, '100%', 0] : [0, '-100%', 0],
              opacity: 0,
            },
          },
          // initialSlide: this.currentIndex
        })
      );
    });

    this.initialized = true;
  }

  nextSlide(swipersToSlide = []) {
    if (!this.swipers.length) return false;
    this.swipers.forEach(swiper => {
      if (swipersToSlide.length === 0) {
        swiper.slideNext();
      } else {
        swipersToSlide.forEach(type => {
          if (swiper.el.classList.contains(`facts__slider--${type}`)) {
            swiper.slideNext();
          }
        })
      }
    });

  }

  prevSlide(swipersToSlide = []) {
    if (!this.swipers.length) return false;

    this.swipers.forEach(swiper => {
      if (swipersToSlide.length === 0) {
        swiper.slidePrev();
      } else {
        swipersToSlide.forEach(type => {
          if (swiper.el.classList.contains(`facts__slider--${type}`)) {
            swiper.slidePrev();
          }
        })
      }
    });

  }

  disableSliders() {
    if (this.swipers) {
      this.swipers.forEach(swiper => {
        swiper.destroy(true, true);
      })
    }
    this.swipers = [];
    this.totalSlides = 0;
    this.initialized = false;
  }

  canGoNext() {
    return this.currentIndex < this.totalSlides - 1;
  }

  canGoPrev() {
    return this.currentIndex > 0;
  }
}


document.addEventListener('DOMContentLoaded', () => {

  const factsTitle = document.querySelector('.facts__title');
  const factsText = document.querySelector('.facts__center-block-text');
  const factsSliders = document.querySelectorAll('.facts__slider');

  if (factsTitle) factsTitle.classList.remove('facts__title--transition');
  if (factsText) factsText.classList.remove('facts__center-block-text--transition');

  factsSliders.forEach(slider => {
    slider.classList.remove('facts__slider--transition');
  });

  const sliderInstances = [];

  document.querySelectorAll('.js-facts-section').forEach((target) => {
    let factsSliderInstance = new FactsSlider({ target })
    sliderInstances.push(factsSliderInstance);
  });

  const instance = sliderInstances.find(inst => inst.target === document.querySelector('.js-facts-section'));

  let lastSegment = 0;

  const desktopST = ScrollTrigger.create({
    trigger: '.js-facts-section',
    start: 'top top',
    end: 'bottom bottom',
    onEnter: () => {
      const section = document.querySelector('.js-facts-section');
      const title = section.querySelector('.facts__title');
      const text = section.querySelector('.facts__center-block-text');
      const sliders = section.querySelectorAll('.facts__slider');

      if (title) title.classList.add('facts__title--transition');
      if (text) text.classList.add('facts__center-block-text--transition');

      if (sliders) {
        sliders.forEach(slider => {
          slider.classList.add('facts__slider--transition');
        });
      }
      if (instance) {
        instance.init();
      }
    },
    onUpdate: (self) => {
      const currentSegment = Math.floor(self.progress * 4);

      if (currentSegment !== lastSegment) {
        if (self.direction === 1 && currentSegment > lastSegment) {
          instance.nextSlide();
        } else if (self.direction === -1 && currentSegment < lastSegment) {
          instance.prevSlide();
        }
        lastSegment = currentSegment;
      }
    }
  });



  if (window.matchMedia('(max-width: 991px').matches) {
    desktopST.kill();
    const mobileSTFirstSection = ScrollTrigger.create({
      trigger: '.js-facts-mobile-first-section',
      start: 'top 1px',
      end: 'bottom bottom',
      onEnter: () => {

        const section = document.querySelector('.js-facts-section');
        const title = section.querySelector('.facts__title');
        const text = section.querySelector('.facts__center-block-text');
        const sliders = section.querySelectorAll('.facts__slider');

        if (title) title.classList.add('facts__title--transition');
        if (text) text.classList.add('facts__center-block-text--transition');

        if (sliders) {
          sliders.forEach(slider => {
            slider.classList.add('facts__slider--transition');
          });
        }

        if (instance) {
          instance.init();
        }
      },
      onUpdate: (self) => {
        const currentSegment = Math.floor(self.progress * 4);
        if (currentSegment !== lastSegment) {
          if (self.direction === 1 && currentSegment > lastSegment) {
            instance.nextSlide(['tl', 'bl']);
          } else if (self.direction === -1 && currentSegment < lastSegment) {
            instance.prevSlide(['tl', 'bl']);
          }
          lastSegment = currentSegment;
        }
      }
    });

    const mobileSTSecondSection = ScrollTrigger.create({
      trigger: '.js-facts-mobile-second-section',
      start: 'top 1px',
      end: 'bottom bottom',
      onEnter: () => {


        if (instance) {
          instance.init();
        }
      },
      onUpdate: (self) => {
        const currentSegment = Math.floor(self.progress * 4);
        if (currentSegment !== lastSegment) {
          if (self.direction === 1 && currentSegment > lastSegment) {
            instance.nextSlide(['tr', 'br']);
          } else if (self.direction === -1 && currentSegment < lastSegment) {
            instance.prevSlide(['tr', 'br']);
          }
          lastSegment = currentSegment;
        }
      }
    });
  }

});
