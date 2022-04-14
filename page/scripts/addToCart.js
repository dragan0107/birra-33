let beerItemSource = document.getElementById('cart-item').innerHTML;
let shopItemsTemplate = Handlebars.compile(beerItemSource);

Handlebars.registerHelper('json', function (context) {
  return JSON.stringify(context);
});
let shoppingCart = [];

let shopItem = {};

function addItem(item) {
  shopItem.purchasedItem = item;
  if (shopItem.quantity) {
    shoppingCart.push(shopItem);
    localStorage.setItem('cart', JSON.stringify(shoppingCart));
    shopItem = {};
    renderCart();
  }
}

function renderCart() {
  let cartItems = JSON.parse(localStorage.getItem('cart'));
  const totalItems = document.querySelector('.cart-amount');
  totalItems.innerHTML = `YOUR CART: ${cartItems.length} items`;
  document.getElementById('beer-shop-cart').innerHTML = shopItemsTemplate({
    beeritems: cartItems,
  });
}
renderCart();

function changeQuantity(val) {
  shopItem.quantity = val;
}
