let beerItemSource = document.getElementById('cart-item').innerHTML;
let shopItemsTemplate = Handlebars.compile(beerItemSource);

// Helper to stringify the object passed in the function.
Handlebars.registerHelper('json', function (context) {
  return JSON.stringify(context);
});
let shoppingCart = JSON.parse(localStorage.getItem('cart'));
let cartQuantity = 0;

//Initial cart quantity calculation and shop cart render.
shoppingCart.forEach((item) => {
  cartQuantity += +item.quantity;
});
renderCart();

// Temporary object where we store the last purchased item.
let shopItem = {};

function addItem(item) {
  shopItem.purchasedItem = item;
  if (shopItem.quantity) {
    let duplicate = checkDuplicate(shopItem);
    if (!duplicate) {
      shoppingCart.push(shopItem);
      clearInput(shopItem.purchasedItem.id);
      localStorage.setItem('cart', JSON.stringify(shoppingCart));
      shopItem = {};
      renderCart();
    }
  }
}
function changeQuantity(val) {
  shopItem.quantity = val;
  cartQuantity += +val;
}

function clearInput(id) {
  let elem = document.querySelector(`.beer-quantity__input--${id}`);
  elem.value = '';
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
