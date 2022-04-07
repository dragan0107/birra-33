const navibar = document.querySelector('.navibar-wrapper');
const scrollBtn = document.querySelector('.scroll-top');

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      scrollBtn.style.bottom = '-4em';
      scrollBtn.style.opacity = '0';
    } else {
      scrollBtn.style.bottom = '1.8em';
      scrollBtn.style.opacity = '1';
    }
  });
});

observer.observe(navibar);