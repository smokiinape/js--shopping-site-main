const shoppingCart = document.getElementById("shopping-cart");
const basket = JSON.parse(localStorage.getItem("basketData")) || [];

const generateCartItems = () => {
    const cartItemsHTML = basket
      .map((item) => {
        const { id, image, title, price } = item.product;
        const quantity = item.quantity;
        const total = quantity * price;
  
        return `
          <div class="cart-item">
            <img width="100" src="${image}" alt="" />
            <<div class="details">
              <div class="title-price-x">
                <h4 class="title-price">
                  <p>${title}</p>
                  <<p class="cart-item-price">${price}</p>
                </h4>
                <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
              </div>
              <div class="cart-buttons">
                <div class="buttons">
                  <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                  <div id="${id}" class="quantity">${quantity}</div>
                  <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                </div>
              </div>
              <h3>${total}</h3>
            </div>
          </div>
        `;
      })
      .join("");
  
    shoppingCart.innerHTML = cartItemsHTML;
  };
  



  const decrement = (productId) => {
    const productIndex = basket.findIndex(
      (item) => item.product.id === productId
    );
  
    if (basket[productIndex].quantity > 1) {
      basket[productIndex].quantity--;
    } else {
      basket.splice(productIndex, 1);
    }
  
    localStorage.setItem("basketData", JSON.stringify(basket));
    generateCartItems();
  };
  
  
const increment = (id) => {
    const item = basket.find((item) => item.product.id === id);
    item.quantity++;
    localStorage.setItem("basketData", JSON.stringify(basket));
    generateCartItems();
  };
  
generateCartItems();

const goToCartButton = document.getElementById("go-to-cart");
goToCartButton.addEventListener("click", () => {
  generateCartItems();
  shoppingCart.style.display = "block";
});
