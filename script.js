(() => {
  document.querySelectorAll('[data-carousel]').forEach((root) => {
    const track = root.querySelector('.track');
    const slides = [...root.querySelectorAll('.slide')];
    const dotsBox = root.querySelector('.dots');
    const prev = root.querySelector('.prev');
    const next = root.querySelector('.next');
    const delay = Number(root.dataset.delay || 4500);
    const autoplay = root.dataset.autoplay !== 'false';
    const groupSize = Math.max(1, Number(root.dataset.groupSize || 1));
    const pageCount = Math.ceil(slides.length / groupSize);
    let index = 0;
    let timer;

    root.style.setProperty('--slides-per-view', groupSize);

    const dots = Array.from({ length: pageCount }, (_, i) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.setAttribute('aria-label', `Go to group ${i + 1}`);
      button.addEventListener('click', () => {
        show(i);
        restart();
      });
      dotsBox.appendChild(button);
      return button;
    });

    function show(i) {
      index = (i + pageCount) % pageCount;
      track.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((dot, n) => dot.classList.toggle('active', n === index));
    }

    function stop() {
      clearInterval(timer);
      timer = undefined;
    }

    function restart() {
      stop();
      if (autoplay && pageCount > 1) {
        timer = setInterval(() => show(index + 1), delay);
      }
    }

    prev.addEventListener('click', () => {
      show(index - 1);
      restart();
    });

    next.addEventListener('click', () => {
      show(index + 1);
      restart();
    });

    if (autoplay) {
      root.addEventListener('mouseenter', stop);
      root.addEventListener('mouseleave', restart);
      root.addEventListener('focusin', stop);
      root.addEventListener('focusout', restart);
    }

    show(0);
    restart();
  });
})();
