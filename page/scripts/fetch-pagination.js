let currentPage = 1; // Page initialization.
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

// Initial beer fetch
fetchBeers(1, 10);

const nums = document.getElementsByClassName('page-values');
for (let i = 0; i < nums.length; i++) {
  nums[i].addEventListener('click', (e) => {
    const pageNum = e.target.innerHTML;
    let activeElem = document.getElementsByClassName('page-item active');
    let pageNumber = document.querySelectorAll('.page-number');
    activeElem[0].classList.remove('active'); // Remove the currently active element class
    fetchBeers(pageNum, 10);
    // Logic for adding the correct active class to the currently clicked page as well as incrementing or decrementing it in the dom.
    if (pageNum > currentPage) {
      currentPage = pageNum * 1;
      pageNumber[0].classList.add('active');
    } else if (currentPage === 1) {
      pageNumber[0].classList.add('active');
    } else {
      currentPage = pageNum * 1 - 1;
      pageNumber[1].classList.add('active');
    }
    if (currentPage < 1) {
      currentPage = 1;
    }

    generatePageNums();
  });
}

function changePage(val) {
  val === '+' ? currentPage++ : currentPage--;
  if (currentPage < 1) currentPage = 1;
  generatePageNums();
  fetchBeers(currentPage, 10);
}

// After manipulating with current page, we refresh the values in the dom with this function.
function generatePageNums() {
  nums[0].innerHTML = currentPage;
  nums[1].innerHTML = currentPage + 1;
}
