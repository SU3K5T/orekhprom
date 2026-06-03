class ProcessPicker {
    constructor(target) {
        this.target = target;
        this.lastEl = target.querySelector('.last');
        this.init();
        this.setLast();
    }

    init() {
        this.target.querySelectorAll('[data-number]').forEach(element => {
            element.addEventListener('click', (e) => {
                this.moveNumber(e.target);
            })
        });
        window.addEventListener('resize', () => {
            this.updateUI();
        })
    }

    updateUI() {
        this._moveNumberBackward(this.target.querySelector('[data-number="0"]'));
        this.setLast();
    }

    setLast() {
        if (window.matchMedia("(max-width: 767px)").matches) {
            const distToParent = this.lastEl.offsetTop;
            this.lastEl.style.transform = `translateY(-${distToParent}px)`;
        } else {
            const distToParent = this.lastEl.offsetLeft;
            this.lastEl.style.transform = `translateX(-${distToParent}px)`;
        }
    }

    moveNumber(el) {
        let lastIndex = Number(this.lastEl.dataset.number);
        const elIndex = Number(el.dataset.number);

        if (lastIndex < elIndex) {
            this._moveNumberForward(el)
        } else if (lastIndex > elIndex) {
            this._moveNumberBackward(el)
        } else {
            return;
        }

    }

    _moveNumberBackward(el) {
        let lastIndex = Number(this.lastEl.dataset.number);
        const elIndex = el.dataset.number;

        while (lastIndex > elIndex) {
            const movableItem = this.target.querySelector(`[data-number="${lastIndex}"]`);

            if (window.matchMedia("max-width: 767px").matches) {
                movableItem.style.transform = `translateY(0)`;
            } else {
                movableItem.style.transform = `translateX(0)`;
            }

            lastIndex = lastIndex - 1;

            this.lastEl.classList.remove('active');
            this._updateLastElement(this.target.querySelector(`[data-number="${lastIndex}"]`))

            this._activateByIndex();
        }
    }

    _moveNumberForward(el) {
        let lastIndex = Number(this.lastEl.dataset.number);
        const elIndex = el.dataset.number;

        while (lastIndex < elIndex) {
            const movableItem = this.target.querySelector(`[data-number="${Number(lastIndex) + 1}"]`);

            if (window.matchMedia("(max-width: 767px)").matches) {
                const deltaDist = movableItem.offsetHeight * (lastIndex + 1);
                const distToParent = movableItem.offsetTop;

                movableItem.style.transform = `translateY(-${distToParent - deltaDist}px)`;
            } else {
                const deltaDist = movableItem.offsetWidth * (lastIndex + 1);
                const distToParent = movableItem.offsetLeft;

                movableItem.style.transform = `translateX(-${distToParent - deltaDist}px)`;
            }

            lastIndex = lastIndex + 1;
            this._updateLastElement(movableItem);

            this._activateByIndex();
        }
    }

    _updateLastElement(newElement) {
        this.lastEl.classList.remove('last');
        this.lastEl = newElement;
        this.lastEl.classList.add('active');
        this.lastEl.classList.add('last');
    }

    _activateByIndex() {
        const dataItems = this.target.querySelectorAll('[data-item]');
        dataItems.forEach(item => item.classList.remove('active'));

        this.target.querySelector(`[data-item="${this.lastEl.dataset.number}"]`).classList.add('active');
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const el = document.querySelector('.js-page-rd-process-section');
    new ProcessPicker(el);
})
