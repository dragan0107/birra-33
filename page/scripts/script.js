const navibar = document.querySelector('.navibar-wrapper');
const breadcrumbs = document.querySelector('.breadcrumbs');
const scrollBtn = document.querySelector('.scroll-top');

const observer = new IntersectionObserver((entries) => {
  const entry = entries[0];
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

let source = document.getElementById('beer-test').innerHTML;
let template = Handlebars.compile(source);

fetch('https://api.punkapi.com/v2/beers?page=1&per_page=10')
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    document.getElementById('beer-output').innerHTML = template({
      beers: data,
    });
  });
