class WhySteps {
  constructor({ target }) {
    this.target = target;
    this.navItems = [...target.querySelectorAll('.js-page-main-why-nav-item')];
    this.visuals = [...target.querySelectorAll('.js-page-main-why-visual')];
    this.stepLabel = target.querySelector('.js-page-main-why-step');
    this.panelTitle = target.querySelector('.js-page-main-why-panel-title');
    this.stepsCount = this.navItems.length;
    this.init();
  }

  init() {
    if (!this.navItems.length) return;

    this.navItems.forEach((item) => {
      item.addEventListener('click', () => this.setActive(item));
    });
  }

  setActive(activeItem) {
    const step = activeItem.dataset.step;

    this.navItems.forEach((item) => {
      item.classList.toggle('is-active', item === activeItem);
    });

    this.visuals.forEach((visual) => {
      visual.classList.toggle('is-active', visual.dataset.step === step);
    });

    if (this.stepLabel) {
      this.stepLabel.textContent = `Этап ${step.padStart(2, '0')} / ${String(this.stepsCount).padStart(2, '0')}`;
    }

    if (this.panelTitle) {
      const title = activeItem.querySelector('.js-page-main-why-nav-title')?.textContent.trim();
      if (title) this.panelTitle.textContent = title;
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.js-page-main-why').forEach((target) => {
    new WhySteps({ target });
  });
});
