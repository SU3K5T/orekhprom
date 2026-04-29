class FactsSlider {
  constructor({ target }) {
    this.target = target;
    this.sliders = target.querySelectorAll('.js-facts-slider');
    this.mobileSliders = target.querySelectorAll('.js-facts-slider-mobile');
    this.DesktopInitialized = false;
    this.mobileInitialized = false;
    this.swipers = [];
    this.currentIndex = 0;
    this.totalSlides = 0;
  }

  initDesktop() {
    if (this.DesktopInitialized) return;
    this.mobileInitialized = false;
    this.enableDesktopSliders();
  }

  enableDesktopSliders() {
    if (this.swipers) {
      this.swipers.forEach(swiper => {
        swiper.destroy()
      });
    }

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
        })
      );
    });

    this.DesktopInitialized = true;
  }

  initMobile() {
    if (this.mobileInitialized) return;
    this.DesktopInitialized = false;
    this.enableMobileSliders();
  }

  enableMobileSliders() {
    if (this.swipers) {
      this.swipers.forEach(swiper => {
        swiper.destroy()
      });
    }

    this.mobileSliders.forEach(slider => {

      const isTopSlider = slider.classList.contains('facts__slider--tl') ||
        slider.classList.contains('facts__slider--tr');

      if (!slider.classList.contains('swiper-photos')) {
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
            loop: true,
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
          })
        );
      } else {
        this.swipers.push(
          new Swiper(slider, {
            slidesPerView: 1,
            direction: 'horizontal',
            speed: 1000,
            spaceBetween: 340,
            freeMode: false,
            simulateTouch: false,
            allowTouchMove: false,
            mouseWheel: false,
            centeredSlides: true,
            loop: true,
          })
        );
      }

    });

    this.mobileInitialized = true;
  }

  slideTo(idx) {
    if (!this.swipers.length) return false;

    this.swipers.forEach((swiper) => {
      swiper.slideTo(idx);
    })
  }

  mobileNextSlide() {
    this.swipers.forEach((swiper) => {
      swiper.slideNext()
    })
  }

  getMobileSliderIndex() {
    let realIndex = 0;
    this.swipers.forEach((swiper) => {
      if (swiper.realIndex) {
        realIndex = swiper.realIndex;
        return realIndex;
      }
    })
    return realIndex;
  }

}


document.addEventListener('DOMContentLoaded', () => {

  const factsTitle = document.querySelector('.facts__title');
  const factsText = document.querySelector('.facts__center-block-text');
  const factsSliders = document.querySelectorAll('.facts__slider');
  const factsDivider = document.querySelector('.facts__center-block-divider');

  const section = document.querySelector('.js-facts-section');
  const text = document.querySelector('.facts__center-block-text');
  const sliders = section.querySelectorAll('.swiper');

  if (factsTitle) factsTitle.classList.remove('facts__title--transition');
  if (factsText) factsText.classList.remove('facts__center-block-text--transition');
  if (factsDivider) factsDivider.classList.remove('facts__center-block-divider--transition')

  factsSliders.forEach(slider => {
    slider.classList.remove('facts__slider--transition');
  });

  const sliderInstances = [];

  document.querySelectorAll('.js-facts-section').forEach((target) => {
    let factsSliderInstance = new FactsSlider({ target })
    sliderInstances.push(factsSliderInstance);
  });

  const instance = sliderInstances.find(inst => inst.target === document.querySelector('.js-facts-section'));

  const title = document.querySelector('.facts__title');

  const mediaQuery = window.matchMedia('(max-width: 575px)');

  let st = null;

  function handleScreenWidth(e) {
    if (e.matches) {
      if (st) {
        st.kill();
      }

      st = ScrollTrigger.create({
        trigger: '.js-facts-section',
        start: 'top 70%',
        onEnter: () => {
          if (title) title.classList.add('facts__title--transition');
          if (text) text.classList.add('facts__center-block-text--transition');
          if (factsDivider) factsDivider.classList.add('facts__center-block-divider--transition');

          if (sliders) {
            sliders.forEach(slider => {
              slider.classList.add('swiper--transition');
            });
          }
        }
      });

      instance.initMobile();

      function setButtonPosition(currentIndex) {
        switch (currentIndex) {
          case 0:
            nextMobileButton.style.transform = `translate(calc(${section.clientWidth}px - 100% - 30px), 199px)`;
            break;
          case 1:
            nextMobileButton.style.transform = `translate(0, 364px)`;
            break;
          case 2:
            nextMobileButton.style.transform = `translate(calc(${section.clientWidth}px - 100% - 30px), 244px)`;
            break;
          case 3:
            nextMobileButton.style.transform = `translate(calc(${section.clientWidth}px - 100% - 30px), 384px)`;
            break;
          default:
            break;
        }
      }

      const nextMobileButton = document.querySelector('.js-facts-mobile-next');

      nextMobileButton.addEventListener('click', () => {
        instance.mobileNextSlide();
        let currentIndex = instance.getMobileSliderIndex();
        setButtonPosition(currentIndex);

      });

      setButtonPosition(0);
    } else {
      if (st) {
        st.kill();
      }
      
      st = ScrollTrigger.create({
        trigger: '.js-facts-section',
        start: 'top top',
        end: 'bottom bottom',
        onEnter: () => {
          if (title) title.classList.add('facts__title--transition');
          if (text) text.classList.add('facts__center-block-text--transition');
          if (factsDivider) factsDivider.classList.add('facts__center-block-divider--transition')

          if (sliders) {
            sliders.forEach(slider => {
              slider.classList.add('swiper--transition');
            });
          }


          if (instance) {
            instance.initDesktop();
          }
        },
        onUpdate: (self) => {
          const currentSegment = Math.floor(self.progress * 4);
          instance.slideTo(currentSegment);
        }
      });
    }
  }

  mediaQuery.addEventListener('change', handleScreenWidth);

  handleScreenWidth(mediaQuery);

});
