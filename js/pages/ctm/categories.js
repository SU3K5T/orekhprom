document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.page-ctm-categories__nav-item');
    const swiperEl = document.querySelector('.page-ctm-categories__slider');

    if (!swiperEl || navItems.length === 0) return;

    const swiper = new Swiper(swiperEl, {
        effect: "fade",
        on: {
            slideChange: function () {
                updateActiveNav(this.realIndex); 
            },
        },
    });

    navItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            swiper.slideTo(index);
        });
    });

    function updateActiveNav(activeIndex) {
        navItems.forEach((item, idx) => {
            item.classList.toggle('active', idx === activeIndex);
        });
    }

    updateActiveNav(swiper.realIndex || 0);
});