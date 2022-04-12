let source = document.getElementById('beer-template').innerHTML;
let template = Handlebars.compile(source);

const fetchBeers = (page, amount) => {
  fetch(`https://api.punkapi.com/v2/beers?page=${page}&per_page=${amount}`)
    .then((res) => res.json())
    .then((data) => {
      beers = data;
      document.getElementById('beer-output').innerHTML = template({
        beers: data,
      });
    });
};

fetchBeers(6, 10);

let currentPage = 1;
const nums = document.getElementsByClassName('page-values');
for (let i = 0; i < nums.length; i++) {
  nums[i].addEventListener('click', (e) => {
    const pageNum = e.target.innerHTML;
    fetchBeers(pageNum, 10);
  });
}

function changePage(val) {
  val === '+' ? currentPage++ : currentPage--;
  if (currentPage < 1) currentPage = 1;
  generatePageNums();
}

function generatePageNums() {
  nums[0].innerHTML = currentPage;
  nums[1].innerHTML = currentPage + 1;
}
