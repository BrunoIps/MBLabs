import { PRODUCTS } from '../../data/temporaryData'
import { DELETE_PRODUCT, CREATE_PRODUCT, EDIT_PRODUCT } from '../actions/products';
import Product from '../../models/products'

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter(prod => prod.ownerId === 'bd2')
};

const ProductsReducer = (state = initialState, action) => {

  const manager = state.userProducts;
  const available = state.availableProducts;
  switch (action.type) {
    case DELETE_PRODUCT:

      console.log(manager[0].ownerId)
      return {
        ...state,
        userProducts: manager.filter(product => product.id !== action.pid),
        availableProducts: available.filter(product => product.id !== action.pid),


      }
    case CREATE_PRODUCT:
      const newProduct = new Product(new Date().toString(), 'bd2', action.productData.title, action.productData.imageUrl, action.productData.description, action.productData.price)

      return {
        ...state,
        availableProducts: available.concat(newProduct),
        userProducts: manager.concat(newProduct)
      }
    case EDIT_PRODUCT:
      const productManagerIndex = manager.findIndex(prod => prod.id === action.pid)

      const productAvailableIndex = available.findIndex(prod => prod.id === action.pid)

      const updateProduct = new Product(
        action.pid,
        manager[productManagerIndex].ownerId,
        action.productData.title, action.productData.imageUrl,
        action.productData.description,

        manager[productManagerIndex].price);

      const updateManagerProducts = [...manager]
      updateManagerProducts[productManagerIndex] = updateProduct

      const updateAVailable = [...available]
      updateAVailable[productAvailableIndex] = updateProduct
      return {
        ...state,
        availableProducts: updateAVailable,
        userProducts: updateManagerProducts
      }
  }
  return state;
}

export default ProductsReducer;