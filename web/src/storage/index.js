import { makeVar } from '@apollo/client';

const cartStorage = makeVar(null);

export const cart = () => {
  if(localStorage.getItem("cart") == null){
    localStorage.setItem("cart", JSON.stringify({
      total: 0,
      products: []
    }));
  }

  if(cartStorage() == null){
    cartStorage(JSON.parse(localStorage.getItem("cart")));
  }

  return cartStorage;
}

export const clearCart = () => {
  let cart = {
    total: 0,
    products: []
  };

  cartStorage(cart);
  localStorage.setItem("cart", JSON.stringify(cart));
}

export const addToCart = (data) => {
  let found = false;
  let currentCart = Object.assign({}, cartStorage());

  currentCart.products.map(product => {
    if(product.id == data.id){
      product.qnt += 1;
      found = true;
    }
  });

  if(!found){
    let newProduct = Object.assign({}, data);
    newProduct.qnt = 1;
    currentCart.products.push(newProduct);
  }

  currentCart.total += 1;
  cartStorage(currentCart);
  localStorage.setItem("cart", JSON.stringify(currentCart));
}

export const removeFromCart = (data) => {
  let productIndex = null;
  let currentCart = Object.assign({}, cartStorage());

  for(let i=0; i<currentCart.products.length; i++){
    let product = currentCart.products[i];
    if(product.id == data.id){
      product.qnt -= 1;
      if(product.qnt <= 0){
        productIndex = i;
      }
      break;      
    }
  }

  if(productIndex != null){
    currentCart.products.splice(productIndex, 1);
  }

  currentCart.total -= 1;
  cartStorage(currentCart);
  localStorage.setItem("cart", JSON.stringify(currentCart));
}