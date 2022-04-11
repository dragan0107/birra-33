const navibar = document.querySelector('.navibar-wrapper');
const breadcrumbs = document.querySelector('.breadcrumbs');
const scrollBtn = document.querySelector('.scroll-top');

const observer = new IntersectionObserver((entries) => {
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

observer.observe(breadcrumbs);

window.onscroll = () => {
  toggleNavi();
};

let sticky = navibar.offsetTop;

function toggleNavi() {
  if (window.pageYOffset > sticky) {
    navibar.classList.add('navibar-sticky');
  } else {
    navibar.classList.remove('navibar-sticky');
  }
}
