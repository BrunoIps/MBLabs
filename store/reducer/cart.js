import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart";
import CartItem from '../../models/cartItem'

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
  }

  return state;
}

export default cartReducer;