import { Component } from 'react';
import axios from "axios";
import bcrypt from "bcryptjs-react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import DisplayResult from './DisplayResult';

// const secret = "WelcometoMyWorldOfOrder";
var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync("B4c0/\/", salt);
const accessToken = hash;
const apiUrl = `http://localhost:8080/api/`;

class OrderForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      postData: [],
      buttonDisabled: true,
      refreshButton: false,
      isSubmitted: false
    };
  }

  handleChange = (e) => {
    const result = e.target.value;

    this.state.value = result;
    this.buttonDisabled = false;
  }

  submitForm = (e) => {
    e.preventDefault();
    const sendData = {
      from_here: 'testing',
      AuthToken: hash,
      'customer_total_order': this.state.value
    }

    //create axios token specific to our site
    axios.post(apiUrl, sendData, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then((response) => {
        const results = [];
        for (let key in response.data) {
          if (key !== 'status')
            results.push({ ...response.data[key] })
        }
        if (response.status === 200) {
          toast.success("Data retrieved successfully");
          this.setState({
            isSubmitted: true,
            postData: results
          });
        } else {
          toast.error("Some error occured! try again.");
        }
      })
      .catch((error) => {
        toast.error('Some error occured! try again. Error: ', error.message);
      })
  }

  render() {
    const dataToDisplay = this.state.postData.map((current, index, order) => {
      return <DisplayResult key={index} orderData={order} />
    })

    return (
      <>
        <form onSubmit={this.submitForm} >
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
            type="number"
            placeholder="Enter the quantity"
            name="total"
            min="0"
            required
            // value={this.state.value}
            onChange={this.handleChange}
          />
          <div className="mt-10">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Place your order
            </button>
          </div>
        </form>
        {/* This is to display order data post the form submission */}
        {
          this.state.isSubmitted && (
            dataToDisplay
          )
        }
        <ToastContainer />
      </>
    )
  }
}

export default OrderForm;
