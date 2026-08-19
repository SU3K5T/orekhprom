document.addEventListener('DOMContentLoaded', () => {
  const modalEl = document.getElementById('mainVideoModal');
  if (!modalEl) return;

  const video = modalEl.querySelector('.js-page-main-video-modal-player');

  modalEl.addEventListener('show.bs.modal', (event) => {
    const trigger = event.relatedTarget;
    const src = trigger?.dataset.videoSrc;
    if (!video || !src) return;

    video.src = src;
    video.load();
    video.play().catch(() => {});
  });

  modalEl.addEventListener('hidden.bs.modal', () => {
    if (!video) return;
    video.pause();
    video.removeAttribute('src');
    video.load();
  });
});
