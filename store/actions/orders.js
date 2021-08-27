import Order from '../../models/ordes'

export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDERS = 'SET_ORDERS';


export const fetchOrders = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;

    try {
      const response = await fetch(`https://mbeventos-4e794-default-rtdb.firebaseio.com/orders/${userId}.json`);


      if (!response.ok) {
        throw Error('Alguma coisa deu errado ai ein!!')
      }

      const responseData = await response.json();

      const loadOrders = [];

      for (const key in responseData) {
        loadOrders.push(new Order(key, responseData[key].cartItems,
          responseData[key].totalAmount,
          new Date(responseData[key].date)
        ))
      }

      dispatch({ type: SET_ORDERS, orders: loadOrders })
    } catch (e) {
      console.log(e)
    }
  }
}

export const addOrder = (cartItems, totalAmount) => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const token = getState().auth.token;
    const date = new Date()

    const response = await fetch(`https://mbeventos-4e794-default-rtdb.firebaseio.com/orders/${userId}.json?auth=${token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        cartItems,
        totalAmount,
        date: date.toString()
      })
    });

    const responseData = await response.json();


    dispatch({ type: ADD_ORDER, orderData: { id: responseData.name, items: cartItems, amount: totalAmount, date: date } })
  }


}