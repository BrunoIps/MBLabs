import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart";
import { ADD_ORDER } from "../actions/orders";
import CartItem from '../../models/cartItem'
import { DELETE_PRODUCT } from "../actions/products";

const initialState = {
  items: {},
  totalAmount: 0
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      const prodPrice = addedProduct.price;
      const prodTitle = addedProduct.title;

      let updatedOrNewCartItem;

      if (state.items[addedProduct.id]) {
        updatedOrNewCartItem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          prodPrice,
          prodTitle,
          state.items[addedProduct.id].sum + prodPrice
        );

      } else {
        updatedOrNewCartItem = new CartItem(1, prodPrice, prodTitle, prodPrice);

      }
      return {
        ...state,
        items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem },
        totalAmount: state.totalAmount + prodPrice
      }
    case REMOVE_FROM_CART:
      const selectedCartItem = state.items[action.pid];
      const currentQtd = selectedCartItem.quantity;
      let updateCartItems;

      if (currentQtd > 1) {
        const updateCartItem = new CartItem(selectedCartItem.quantity - 1, selectedCartItem.productPrice, selectedCartItem.productTitle, selectedCartItem.sum - selectedCartItem.productPrice);
        updateCartItems = { ...state.items, [action.pid]: updateCartItem }
      } else {
        updateCartItems = { ...state.items }
        delete updateCartItems[action.pid];

      }
      return {
        ...state,
        items: updateCartItems,
        totalAmount: state.totalAmount - selectedCartItem.productPrice
      }
    case ADD_ORDER:
      return initialState;
    case DELETE_PRODUCT:
      if (!state.items[action.pid]) {
        return state;
      }
      const updItems = { ...state.items };
      const itemtotal = state.items[action.pid].sum;
      delete updItems[action.pid]
      return {
        ...state,
        items: updItems,
        totalAmount: state.totalAmount - itemtotal
      }
  }

  return state;
}

export default cartReducer;