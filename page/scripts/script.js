const navibar = document.querySelector('.navibar-wrapper');
const scrollBtn = document.querySelector('.scroll-top');

const observer = new IntersectionObserver(function (entries) {
  const entry = entries[0];
  console.log(entry);
  if (entry.isIntersecting) {
    scrollBtn.style.bottom = '-4em';
    scrollBtn.style.opacity = '0';
  } else {
    scrollBtn.style.bottom = '1.8em';
    scrollBtn.style.opacity = '1';
  }
});

observer.observe(navibar);

window.onscroll = function () {
  addNaviClass();
};

var sticky = navibar.offsetTop;

function addNaviClass() {
  if (window.pageYOffset > sticky) {
    navibar.classList.add('navibar-sticky');
  } else {
    navibar.classList.remove('navibar-sticky');
  }
}
