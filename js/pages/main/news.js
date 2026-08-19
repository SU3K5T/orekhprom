class NewsFilter {
  constructor({ target }) {
    this.target = target;
    this.filters = [...target.querySelectorAll('.js-page-main-news-filter')];
    this.cards = [...target.querySelectorAll('.js-page-main-news-card')];
    this.init();
  }

  init() {
    if (!this.filters.length) return;

    this.filters.forEach((filter) => {
      filter.addEventListener('click', () => this.setActive(filter));
    });
  }

  setActive(activeFilter) {
    const category = activeFilter.dataset.category;

    this.filters.forEach((filter) => {
      filter.classList.toggle('is-active', filter === activeFilter);
    });

    this.cards.forEach((card) => {
      const match = category === 'all' || card.dataset.category === category;
      card.classList.toggle('is-hidden', !match);
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.js-page-main-news').forEach((target) => {
    new NewsFilter({ target });
  });
});
