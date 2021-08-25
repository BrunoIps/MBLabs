import { PRODUCTS } from '../../data/temporaryData'
import { DELETE_PRODUCT } from '../actions/products';

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter(prod => prod.ownerId === 'bd2')
};

const ProductsReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_PRODUCT:
      const manager = state.userProducts;
      const available = state.availableProducts;
      return {
        ...state,
        userProducts: manager.filter(product => product.id !== action.pid),
        availableProducts: available.filter(product => product.id !== action.pid),


      }
  }
  return state;
}

export default ProductsReducer;