let currentPage = 1; // Page initialization.
let postsPerPage = 10;
let maxPosts = 35;
let restOfPosts;

const options = document.getElementsByClassName('shop-beer-list-selector')[0];
const nums = document.getElementsByClassName('page-values');

options.addEventListener('change', () => {
  postsPerPage = options.value;
  generatePageNums();
  goToFirst();
});

const fetchBeers = (page, amount) => {
  const results = document.getElementsByClassName('results-showing')[0];
  const loadingSpinner = document.getElementById('loading-spinner');
  const beerContainer = document.getElementById('beer-output');
  restOfPosts = maxPosts - postsPerPage * currentPage;
  loadingSpinner.style.display = 'inline-block';
  beerContainer.style.opacity = '0.2';
  fetch(`https://api.punkapi.com/v2/beers?page=${page}&per_page=${amount}`)
    .then((res) => res.json())
    .then((data) => {
      beers = data;
      // To postpone the template rendering just to display the loading spinner.
      setTimeout(() => {
        let source = document.getElementById('beer-template').innerHTML;
        let template = Handlebars.compile(source);
        document.getElementById('beer-output').innerHTML = template({
          beers: data,
        });
        results.innerText = `Showing ${data[0].id}-${
          data[data.length - 1].id
        } of ${maxPosts} results`;
        beerContainer.style.opacity = '1';
        loadingSpinner.style.display = 'none';
      }, 1000);
    });
};

// Initial beer fetch
fetchBeers(currentPage, postsPerPage);

for (let i = 0; i < nums.length; i++) {
  nums[i].addEventListener('click', (e) => {
    const pageNum = e.target.innerHTML;
    let activeElem = document.getElementsByClassName('page-item active');
    let pageNumber = document.querySelectorAll('.page-number');
    activeElem[0].classList.remove('active'); // Remove the currently active element class
    fetchBeers(pageNum, postsPerPage);
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
    generatePageNums();
  });
}

function changePage(val) {
  let maxPage = Math.ceil(maxPosts / postsPerPage);
  if (val === '+') currentPage++;
  if (val === '-') {
    currentPage--;
    restOfPosts += +postsPerPage;
  }
  if (currentPage < 1) currentPage = 1;
  if (currentPage > maxPage) {
    return (currentPage = maxPage);
  }
  generatePageNums();
  fetchHelper();
}

// After manipulating with current page, we refresh the values in the dom with this function.
function generatePageNums() {
  // Preventing the page from going below 1.
  if (currentPage < 1) {
    currentPage = 1;
  }
  let maxPage = Math.ceil(maxPosts / postsPerPage);
  nums[0].innerHTML = currentPage;
  nums[1].innerHTML = currentPage + 1;

  if (currentPage === maxPage) {
    nums[1].parentNode.style.display = 'none';
  } else {
    nums[1].parentNode.style.display = 'block';
  }
}

// We set the current page to the first again and start all over.
function goToFirst() {
  currentPage = 1;
  generatePageNums();
  fetchBeers(currentPage, postsPerPage);
}

// Function that checks how many beers we can fetch per request (because we set the limit to 35);
function fetchHelper() {
  let beersToFetch;
  if (restOfPosts >= postsPerPage) {
    beersToFetch = postsPerPage;
  } else {
    beersToFetch = restOfPosts;
  }
  fetchBeers(currentPage, beersToFetch);
}
