import { PRODUCTS } from '../../data/temporaryData'

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter(prod => prod.ownerId === 'bd2')
};

const ProductsReducer = (state = initialState, action) => {
  return state;
}

export default ProductsReducer;