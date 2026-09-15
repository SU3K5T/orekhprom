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

    const initialFilter =
      this.filters.find((filter) => filter.classList.contains('is-active')) ||
      this.filters[0];
    this.setActive(initialFilter);
  }

  setActive(activeFilter) {
    const category = activeFilter.dataset.category;

    this.filters.forEach((filter) => {
      filter.classList.toggle('is-active', filter === activeFilter);
    });

    const matched = this.cards.filter(
      (card) => category === 'all' || card.dataset.category === category
    );
    const hasMainCard = matched.some((card) =>
      card.classList.contains('page-main-news__main')
    );
    const limit = hasMainCard ? 4 : 6;
    const visible = matched.slice(0, limit);

    this.cards.forEach((card) => {
      card.classList.toggle('is-hidden', !visible.includes(card));
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.js-page-main-news').forEach((target) => {
    new NewsFilter({ target });
  });
});
