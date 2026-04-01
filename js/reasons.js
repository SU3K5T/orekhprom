document.addEventListener('DOMContentLoaded', () => {
  const line1 = document.getElementById('line1');
  const line2 = document.getElementById('line2');
  const magnet = document.getElementById('magnetText');
  const container = document.getElementById('linesContainer');

  function getMagnetWidth() {
    return magnet.offsetWidth;
  }

  function updateMagnetPosition(targetLine) {
    if (!targetLine || !magnet || !container) return;

    const lineRect = targetLine.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    const relativeTop = lineRect.top - containerRect.top;

    magnet.style.transform = `translateY(${relativeTop}px)`;

    const magnetWidth = getMagnetWidth();

    const lines = document.querySelectorAll('.reasons__line');
    lines.forEach(line => {
      line.style.marginLeft = magnetWidth + 10 + 'px';
    });

    document.querySelectorAll('.reasons__line').forEach(line => {
      line.classList.remove('active');
    });
    targetLine.classList.add('active');
  }

  function updateContent(line) {
    const currentActive = document.querySelector('.js-reasons__content.active');
    if (currentActive) {
      currentActive.classList.remove('active');
    }

    const nextActive = document.querySelector(`[data-reasons-content="${line}"]`);

    if (nextActive) {
      nextActive.classList.add('active');
    }
  }

  line1.addEventListener('mouseenter', () => {
    updateMagnetPosition(line1);
    updateContent('1');
  });

  line2.addEventListener('mouseenter', () => {
    updateMagnetPosition(line2);
    updateContent('2');
  });

  window.addEventListener('resize', () => {
    const activeLine = document.querySelector('.reasons__line.active') || line1;
    updateMagnetPosition(activeLine);
  });

  line1.addEventListener('touchstart', (e) => {
    e.preventDefault();
    updateMagnetPosition(line1);
    updateContent('1');
  });

  line2.addEventListener('touchstart', (e) => {
    e.preventDefault();
    updateMagnetPosition(line2);
    updateContent('2');
  });

  const resizeObserver = new ResizeObserver(() => {
    const activeLine = document.querySelector('.reasons__line.active') || line1;
    updateMagnetPosition(activeLine);
  });

  resizeObserver.observe(magnet);
  resizeObserver.observe(line1);
  resizeObserver.observe(line2);
});