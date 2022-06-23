export const ACTIONS = {
  NOTIFY: "NOTIFY",
  AUTH: "AUTH",
  ADD_CART: "ADD_CART",
  ADD_ORDERS: "ADD_ORDERS",
  CATEGORY: "CATEGORY",
  PRODUCT: "PRODUCT",
};

export const addToCart = (product, cart) => {
  if (product.productType === "bespoke" && product.inStock === false)
    return {
      type: "NOTIFY",
      payload: { error: "This product is out of stock." },
    };

  const check = cart.every((item) => {
    return item._id !== product._id;
  });

  if (!check)
    return {
      type: "NOTIFY",
      payload: { error: "The product has been added to cart." },
    };

  return { type: "ADD_CART", payload: [...cart, { ...product, quantity: 1 }] };
};

export const decrease = (data, id) => {
  const newData = [...data];
  newData.forEach((item) => {
    if (item._id === id) item.quantity -= 1;
  });

  return { type: "ADD_CART", payload: newData };
};

export const increase = (data, id) => {
  const newData = [...data];
  newData.forEach((item) => {
    if (item._id === id) item.quantity += 1;
  });

  return { type: "ADD_CART", payload: newData };
};

export const deleteItem = (data, id) => {
  console.log(data, id);
  const newData = data.filter((item) => item._id !== id);
  return { type: "ADD_CART", payload: newData };
};
