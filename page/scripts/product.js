let headerSource = document.getElementById('header-template').innerHTML,
  productSource = document.getElementById('product-template').innerHTML,
  footerSource = document.getElementById('footer-template').innerHTML;
let tempHeader = Handlebars.compile(headerSource),
  tempProduct = Handlebars.compile(productSource),
  tempFooter = Handlebars.compile(footerSource);

document.getElementById('header-output').innerHTML = tempHeader();
document.getElementById('footer-output').innerHTML = tempFooter();

const fetchProduct = () => {
  let url = document.location.href,
    id = url.split('?')[1];

  fetch(`https://api.punkapi.com/v2/beers/${id}`)
    .then((res) => res.json())
    .then((data) => {
      let categs = [];
      data[0].ingredients.hops.forEach((el) => {
        categs.push(el.name);
      });
      let uniqueCategs = [...new Set(categs)];
      document.getElementById('product-output').innerHTML = tempProduct(
        data[0]
      );
      uniqueCategs.forEach((el, idx) => {
        let span = document.createElement('span');
        span.setAttribute('class', 'product-categ-list');
        span.innerHTML = idx === uniqueCategs.length - 1 ? `${el}` : `${el}, `;
        document.querySelector('.product-categs').appendChild(span);
      });
      document.querySelector('.breadcrumbs__beer-name').innerHTML =
        data[0].name;
      document.title = `${data[0].name} – Brewery & pub`;
    });
};

fetchProduct();

function changeAmount(val) {
  let elem = document.getElementById('product-amount');
  val ? elem.value++ : elem.value--;
  if (elem.value < 1) elem.value = 1;
}
