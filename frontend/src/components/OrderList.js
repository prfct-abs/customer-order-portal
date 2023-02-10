import { Component } from "react";
import OrderForm from "./OrderForm";

class OrderList extends Component {

  render() {
    return (
      <div className="flex h-screen1">
        <div className="container m-auto1">
          <div>
            <label className="block text-gray-700 text-sm font-bold pt-5 mb-2 text-xl" htmlFor="total">
              Enter your order
            </label>
          </div>

          <div className="my-1">
            <OrderForm />
          </div>
        </div>
      </div>
    );
  }
}

export default OrderList;
