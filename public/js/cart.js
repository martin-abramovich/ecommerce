const cart = [];

module.exports = {
  getCart: () => cart,
  addToCart: (product) => cart.push(product),
  removeFromCart: (productId) => {
    const index = cart.findIndex((item) => item.id == productId);
    console.log("Index a eliminar:", index);
    if (index !== -1) {
      cart.splice(index, 1);
    }
  },
  clearCart: () => {
    cart.length = 0;
  },
};
