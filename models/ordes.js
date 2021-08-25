import moment from 'moment';
import 'moment/locale/pt-br'

class Order {
  constructor(id, items, totalAmount, date) {
    this.id = id;
    this.items = items;
    this.totalAmount = totalAmount;
    this.date = date;
  }

  get dateString() {
    const data = moment(this.date).format('lll')
    return data

  }
}

export default Order;