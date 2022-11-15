import OrderModel from "./models/order";

interface Order<T> {

    orders: Array<OrderModel<T>>

    getOrderCount: () => any

}

type GetOrderCount = () => number

export default Order;