import Product from '../../models/products'

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const EDIT_PRODUCT = 'EDIT_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () => {

  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    try {
      const response = await fetch('https://mbeventos-4e794-default-rtdb.firebaseio.com/products.json');


      if (!response.ok) {
        throw Error('Alguma coisa deu errado ai ein!!')
      }

      const responseData = await response.json();

      const loadProd = [];


      for (const key in responseData) {
        loadProd.push(new Product(key, responseData[key].ownerId, responseData[key].title, responseData[key].imageUrl, responseData[key].description, responseData[key].price))
      }

      dispatch({ type: SET_PRODUCTS, products: loadProd, userId: userId })
    } catch (e) {
      console.log("opa é aqui");
      throw e;
    }
  };
}

export const deleteProduct = productId => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    await fetch(`https://mbeventos-4e794-default-rtdb.firebaseio.com/products/${productId}.json?auth=${token}`, {
      method: 'DELETE',

    });
    dispatch({
      type: DELETE_PRODUCT, pid: productId
    })
  }


};



export const createProduct = (title, description, imageUrl, price) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token
    const userId = getState().auth.userId;
    const response = await fetch(`https://mbeventos-4e794-default-rtdb.firebaseio.com/products.json?auth=${token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        description,
        imageUrl,
        price,
        ownerId: userId
      })
    });

    console.log(getState())
    const responseData = await response.json();

    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: responseData.name,
        title,
        description,
        imageUrl,
        price,
        ownerId: userId
      }
    });
  };
};

export const editProduct = (id, title, description, imageUrl) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;

    console.log(getState())
    const response = await fetch(`https://mbeventos-4e794-default-rtdb.firebaseio.com/products/${id}.json?auth=${token}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl
        })
      });

    if (!response.ok) {
      throw new Error('irmao deu errado!');
    }
    // console.log(response.json())

    dispatch({
      type: EDIT_PRODUCT,
      pid: id,
      productData: {
        title,
        description,
        imageUrl,
      }
    })
  }

}