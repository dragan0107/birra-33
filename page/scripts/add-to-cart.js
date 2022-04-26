let beerItemSource = document.getElementById('cart-item').innerHTML,
  shopItemsTemplate = Handlebars.compile(beerItemSource);

Handlebars.registerHelper('json', function (context) {
  return JSON.stringify(context);
});
let cart = localStorage.getItem('cart');
if (!cart) localStorage.setItem('cart', JSON.stringify([]));

let shoppingCart = JSON.parse(cart),
  cartQuantity = 0;

let shopItem = {};
shoppingCart.forEach((item) => {
  cartQuantity += +item.quantity;
});
renderCart();

function addItem(item) {
  let prodAmt = document.getElementById('product-amount');
  if (arguments[1]) {
    changeQuantity(prodAmt.value);
  }
  shopItem.purchasedItem = item;
  console.log(shopItem);
  if (shopItem.quantity) {
    let duplicate = checkDuplicate(shopItem);
    if (!duplicate) {
      shoppingCart.push(shopItem);
      localStorage.setItem('cart', JSON.stringify(shoppingCart));
      clearInput(shopItem.purchasedItem.id);
      renderCart();
      shopItem = {};
    }
  }
  if (prodAmt) prodAmt.value = 1;
}
function changeQuantity(val) {
  shopItem.quantity = +val;
  cartQuantity += +val;
}

function clearInput(id) {
  let elem = document.querySelector(`.beer-quantity__input--${id}`);
  if (elem) elem.value = '';
}

function renderCart() {
  const totalItems = document.querySelector('.cart-amount');
  totalItems.innerHTML = `YOUR CART: ${cartQuantity} items`;
  document.getElementById('beer-shop-cart').innerHTML = shopItemsTemplate({
    beeritems: shoppingCart,
  });
}

function checkDuplicate(item) {
  let idx = shoppingCart.findIndex(
    (el) => el.purchasedItem.name === item.purchasedItem.name
  );
  console.log(idx);
  if (idx === -1) return false;
  shoppingCart[idx].quantity =
    Number(shoppingCart[idx].quantity) + +item.quantity;
  localStorage.setItem('cart', JSON.stringify(shoppingCart));
  clearInput(item.purchasedItem.id);
  renderCart();
  return true;
}
function removeItem(val) {
  let idx = shoppingCart.findIndex(
    (el) =>
      el.quantity === val.quantity &&
      el.purchasedItem.name === val.purchasedItem.name
  );
  shoppingCart.splice(idx, 1);
  cartQuantity -= val.quantity;
  localStorage.setItem('cart', JSON.stringify(shoppingCart));
  renderCart();
}
