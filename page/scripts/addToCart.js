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
  // To prevent quantity of 0 from being added to the cart.
  if (shopItem.quantity) {
    shoppingCart.push(shopItem);
    localStorage.setItem('cart', JSON.stringify(shoppingCart));
    shopItem = {};
    renderCart();
  }
}
function changeQuantity(val) {
  shopItem.quantity = val;
  cartQuantity += +val;
}

function renderCart() {
  const totalItems = document.querySelector('.cart-amount');
  totalItems.innerHTML = `YOUR CART: ${cartQuantity} items`;
  document.getElementById('beer-shop-cart').innerHTML = shopItemsTemplate({
    beeritems: shoppingCart,
  });
}
