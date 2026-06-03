class RDAbout {
    constructor(target) {
        this.target = target;
        this.activeTitleElement = this.target.querySelector('.page-rd-about__accordion-title-item.active');
        this.activeImageElement = this.target.querySelector('.page-rd-about__accordion-image-item.active')
        this.init();
    }

    init() {
        const titleList = this.target.querySelectorAll('.page-rd-about__accordion-title-item');
        titleList.forEach(titleItem => {
            titleItem.addEventListener('mouseover', (e) => {
                this.setActiveElement(e.target.closest("[data-title]"));
            });
        });
    }

    setActiveElement(element) {

        if (element.classList.contains('active')) {
            return;
        }

        const elementIndex = element.dataset.title;

        const newActiveTitleElement = this.target.querySelector(`[data-title="${elementIndex}"]`);
        const newActiveImageElement = this.target.querySelector(`[data-image="${elementIndex}"]`);

        newActiveTitleElement.classList.add('active');
        newActiveImageElement.classList.add('active');

        this.activeImageElement.classList.remove('active');
        this.activeTitleElement.classList.remove('active');
        
        this.activeImageElement = newActiveImageElement;
        this.activeTitleElement = newActiveTitleElement;
    }

}

document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll('.page-rd-about__accordion-item');
    elements.forEach(element => {
        new RDAbout(element);
    })
})
