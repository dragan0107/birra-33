let headerSource = document.getElementById('header-template').innerHTML,
  productSource = document.getElementById('product-template').innerHTML,
  footerSource = document.getElementById('footer-template').innerHTML;
let tempHeader = Handlebars.compile(headerSource),
  tempProduct = Handlebars.compile(productSource),
  tempFooter = Handlebars.compile(footerSource);

document.getElementById('header-output').innerHTML = tempHeader();
document.getElementById('footer-output').innerHTML = tempFooter();

// Change amount

const fetchProduct = () => {
  let url = document.location.href,
    id = url.split('?')[1];

  fetch(`https://api.punkapi.com/v2/beers/${id}`)
    .then((res) => res.json())
    .then((data) => {
      document.getElementById('product-output').innerHTML = tempProduct(
        data[0]
      );
      document.querySelector('.breadcrumbs__beer-name').innerHTML =
        data[0].name;
    });
};

fetchProduct();

function changeAmount(val) {
  let elem = document.getElementById('product-amount');
  val ? elem.value++ : elem.value--;
  if (elem.value < 1) elem.value = 1;
}
