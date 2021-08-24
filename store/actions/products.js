import PRODUCTS from '../../data/temporaryData'

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter(prod => prod.ownerId === 'bd2')
};

export default (state = initialState, action) => {
  return state;
}