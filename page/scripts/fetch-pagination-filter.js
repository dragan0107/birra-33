let currentPage = 1,
  postsPerPage = 10,
  maxPosts = 35,
  restOfPosts;

const options = document.getElementsByClassName('shop-beer-list-selector')[0],
  nums = document.querySelectorAll('.page-values');

options.addEventListener('change', () => {
  postsPerPage = options.value;
  generatePageNums();
  goToFirst();
});

// Filter query logic

const dateInputs = document.querySelectorAll('.abv-range__dates input'),
  foodInputs = document.querySelectorAll('.food-filter input');
let query,
  beerName = '',
  abvFrom = '',
  abvTo = '',
  brewedAfter = '',
  brewedBefore = '',
  food = '';

dateInputs.forEach((inp) => {
  inp.addEventListener('change', (e) => {
    let val = e.target.value;
    let date = `${val.substring(5, 8)}-${val.substring(0, 4)}`;
    if (e.target.id === 'date-after') {
      brewedAfter = `&brewed_after=${date}`;
    } else {
      brewedBefore = `&brewed_before=${date}`;
    }
  });
});

foodInputs.forEach((inp) => {
  inp.addEventListener('input', (e) => {
    food = `&food=${e.target.value}`;
  });
});

const beerInput = document.querySelector('.beer-name');
beerInput.addEventListener('change', (e) => {
  beerName = `&beer_name=${e.target.value}`;
});

// Slider Controller Logic
const rangeInputs = document.querySelectorAll('.abv-range__range-inputs input'),
  progress = document.querySelector('.abv-range__progress');
let minSpan = document.querySelector('.min-span'),
  maxSpan = document.querySelector('.max-span');

let rangeGap = 2;
rangeInputs.forEach((inp) => {
  inp.addEventListener('input', (e) => {
    let minVal = parseInt(rangeInputs[0].value),
      maxVal = parseInt(rangeInputs[1].value);

    if (maxVal - minVal < rangeGap) {
      if (e.target.className === 'range-min') {
        rangeInputs[0].value = maxVal - rangeGap;
      } else {
        rangeInputs[1].value = minVal + rangeGap;
      }
    } else {
      abvFrom = `&abv_gt=${rangeInputs[0].value}`;
      abvTo = `&abv_lt=${rangeInputs[1].value}`;
      progress.style.left = (minVal / rangeInputs[0].max) * 100 + '%';
      progress.style.right = 100 - (maxVal / rangeInputs[1].max) * 100 + '%';
      minSpan.innerHTML = `From: ${rangeInputs[0].value}`;
      maxSpan.innerHTML = `To: ${rangeInputs[1].value}`;
      updateAbvSpans(rangeInputs[0].value, rangeInputs[1].value);
    }
  });
});

function updateAbvSpans(val1, val2) {
  minSpan.innerHTML = `From: ${val1}`;
  maxSpan.innerHTML = `To: ${val2}`;
}

function updateQuery(val) {
  // If there is value, it will reset all filters.
  if (val) {
    dateInputs.forEach((inp) => {
      inp.value = '';
    });
    foodInputs.forEach((inp) => {
      inp.checked = false;
    });
    beerInput.value = '';
    (beerName = ''),
      (abvFrom = ''),
      (abvTo = ''),
      (brewedAfter = ''),
      (brewedBefore = ''),
      (food = '');
    query = '';
    progress.style.left = '0%';
    progress.style.right = '0%';
    rangeInputs[0].value = 1;
    rangeInputs[1].value = 56;
    updateAbvSpans(rangeInputs[0].value, rangeInputs[1].value);
  } else {
    query = `${beerName}${abvFrom}${abvTo}${brewedAfter}${brewedBefore}${food}`;
  }

  // fetchHelper();
  goToFirst();
}

const fetchBeers = (page, amount) => {
  const results = document.getElementsByClassName('results-showing')[0],
    loadingSpinner = document.getElementById('loading-spinner'),
    beerContainer = document.getElementById('beer-output');
  restOfPosts = maxPosts - postsPerPage * currentPage;
  loadingSpinner.style.display = 'inline-block';
  beerContainer.style.opacity = '0.2';
  fetch(
    query
      ? `https://api.punkapi.com/v2/beers?page=${page}&per_page=${amount}${query}`
      : `https://api.punkapi.com/v2/beers?page=${page}&per_page=${amount}`
  )
    .then((res) => res.json())
    .then((data) => {
      let source = document.getElementById('beer-template').innerHTML,
        template = Handlebars.compile(source),
        noResNotification = document.querySelector('.no-results-notification');
      beers = data;
      document.getElementById('beer-output').innerHTML = template({
        beers: data,
      });
      data.length === 0
        ? (noResNotification.style.visibility = 'visible')
        : (noResNotification.style.visibility = 'hidden');

      beerContainer.style.opacity = '1';
      loadingSpinner.style.display = 'none';
      generatePageNums();
    });
};

// Initial beer fetch
fetchBeers(currentPage, postsPerPage);

nums.forEach((num) => {
  num.addEventListener('click', (e) => {
    const pageNum = e.target.innerHTML;
    let activeElem = document.getElementsByClassName('page-item active'),
      pageNumber = document.querySelectorAll('.page-number');
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
});

function changePage(val) {
  let maxPage = Math.ceil(maxPosts / postsPerPage);
  if (val === '+') {
    if (beers.length < postsPerPage) {
      currentPage = currentPage;
      nums[1].parentNode.style.display = 'none';
    } else {
      currentPage++;
    }
  }
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

  if (currentPage === maxPage || beers.length < postsPerPage) {
    nums[1].parentNode.style.display = 'none';
    document.querySelector('.page-arrow-right').style.display = 'none';
    if (currentPage === 1) {
      document
        .querySelectorAll('.page-arrow-left')
        .forEach((el) => (el.style.display = 'none'));
    }
  } else {
    nums[1].parentNode.style.display = 'block';
    document.querySelector('.page-arrow-right').style.display = 'block';
    document
      .querySelectorAll('.page-arrow-left')
      .forEach((el) => (el.style.display = 'block'));
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
