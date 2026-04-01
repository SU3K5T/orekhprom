let header = document.querySelector('.js-header');
let previousScroll = 0;

let throttleFn = debounce((isScrollDown) => {
    if(window.scrollY < 80) {
        return header.classList.remove("js-header--hidden");
    }
    if (isScrollDown)
        header.classList.add("js-header--hidden");
    else if (!isScrollDown)
        header.classList.remove("js-header--hidden");
}, 100);


document.addEventListener("scroll", () => {
    let isScrollDown = previousScroll < scrollY;
    throttleFn(isScrollDown);

    previousScroll = scrollY;
});

function setBodyPadding() {
    document.body.style.paddingTop = `${header.offsetHeight}px`;
}

setBodyPadding();

window.addEventListener('resize', () => {
  setBodyPadding();
});
