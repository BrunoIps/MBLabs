import { PRODUCTS } from '../../data/temporaryData'
import { DELETE_PRODUCT, CREATE_PRODUCT, EDIT_PRODUCT, SET_PRODUCTS } from '../actions/products';
import Product from '../../models/products'

const initialState = {
  availableProducts: [],
  userProducts: []
};

const ProductsReducer = (state = initialState, action) => {

  const manager = state.userProducts;
  const available = state.availableProducts;
  switch (action.type) {

    case SET_PRODUCTS:
      return {
        availableProducts: action.products,
        userProducts: action.products.filter(prod => prod.ownerId === action.userId)
      }
    case DELETE_PRODUCT:


      return {
        ...state,
        userProducts: manager.filter(product => product.id !== action.pid),
        availableProducts: available.filter(product => product.id !== action.pid),


      }
    case CREATE_PRODUCT:
      const newProduct = new Product(new Date().toString(), action.productData.ownerId, action.productData.title, action.productData.imageUrl, action.productData.description, action.productData.price)

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