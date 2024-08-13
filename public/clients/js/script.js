let swiper = new Swiper(".mySwiper", {
  spaceBetween: 2,
  slidesPerView: 4,
  freeMode: true,
  watchSlidesProgress: true,
});

let swiper2 = new Swiper(".mySwiper2", {
  spaceBetween: 10,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  thumbs: {
    swiper: swiper,
  },
});

// showMiniCart
function showMiniCart(cart) {
  const totalQuantity = JSON.parse(cartStore).reduce((total, item) => {
    return total + item.quantity;
  }, 0);
  return totalQuantity;
}

// Carts
const cartStore = localStorage.getItem("cart");
if (!cartStore) {
  localStorage.setItem("cart", JSON.stringify([]));
} else {
  const miniCart = document.querySelector(".cart");
  miniCart.innerHTML = showMiniCart(cartStore);
}

const formAddToCart = document.querySelector("[form-add-to-cart]");
if (formAddToCart) {
  formAddToCart.addEventListener("submit", (e) => {
    e.preventDefault();
    const quantity = parseInt(e.target.elements.quantity.value);
    const tourId = parseInt(formAddToCart.getAttribute("tour-id"));

    if (quantity > 0 && tourId) {
      const cart = JSON.parse(localStorage.getItem("cart"));
      const findIndex = cart.findIndex((item) => item.tourId == tourId);
      if (findIndex !== -1) {
        cart[findIndex].quantity += quantity;
      } else {
        cart.push({
          tourId,
          quantity,
        });
      }
      localStorage.removeItem("cart");
      localStorage.setItem("cart", JSON.stringify(cart));
      const miniCart = document.querySelector(".cart");
      miniCart.innerHTML = showMiniCart(cart);
    }
  });
}
// End carts
