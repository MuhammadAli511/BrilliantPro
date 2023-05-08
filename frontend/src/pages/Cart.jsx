import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { addNewCart } from "../helper/index";
import { removeFromCart, resetCart } from "../redux/actions";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const totalPrice = cart.reduce((acc, item) => {
    return acc + item.product.price * item.quantity;
  }, 0);
  const dispatch = useDispatch();
  const removeItemFromCart = (id) => {
    return () => {
      dispatch(removeFromCart(id));
    };
  };
  const handleReset = () => {
    dispatch(resetCart());
  };
  const placeOrder = () => {
    const email = localStorage.getItem("email");
    const value = {
      product: cart,
      customer: email,
      price: totalPrice,
    }
    addNewCart(value);
    dispatch(resetCart());
  };
  return (
    <>
      <Navbar cartItemsCount={cart.length} />
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-semibold text-gray-900">
                  Checkout
                </h1>
                <button
                  className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md text-base font-medium"
                  onClick={handleReset}
                >
                  Clear Cart
                </button>
              </div>
              {cart.length === 0 ? (
                <div className="empty-cart flex flex-col items-center justify-center space-y-2">
                  <FaShoppingCart className="h-16 w-16 text-gray-400" />
                  <h2 className="text-3xl font-bold text-gray-900">
                    Your cart is empty
                  </h2>
                  <p className="text-sm text-gray-600">
                    You have no items in your shopping cart.
                  </p>
                </div>
              ) : (
                <div className="mt-8">
                  <table className="w-full text-left">
                    <thead>
                      <tr>
                        <th className="py-2">Product</th>
                        <th className="py-2">Price</th>
                        <th className="py-2">Quantity</th>
                        <th className="py-2">Total</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.map((item) => (
                        <tr key={item.product.id} className="border-b border-gray-200">
                          <td className="py-4">
                            <div className="flex items-center">
                              <img
                                className="h-16 w-16 object-cover rounded mr-4"
                                src={item.product.image}
                                alt={item.product.title}
                              />
                              <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                  {item.product.title}
                                </h3>
                                <p className="text-gray-600">
                                  {item.product.description}
                                </p>
                                <button
                                  className="text-red-600 hover:text-red-700"
                                  onClick={removeItemFromCart(item.product.id)}
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 text-center">${item.product.price.toFixed(2)}</td>
                          <td className="py-4 text-center">{item.quantity}</td>
                          <td className="py-4 text-center">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>

                  </table>
                  <div className="mt-8 flex justify-between">
                    <div className="flex items-center">
                      <h2 className="text-2xl font-semibold text-gray-900">
                        Total
                      </h2>
                      <p className="text-sm text-gray-600 ml-2">
                        (including shipping)
                      </p>
                    </div>
                    <p className="text-2xl font-semibold text-gray-900">
                      ${totalPrice.toFixed(2)}
                    </p>
                  </div>
                  <div className="mt-8">
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md text-base font-medium"
                      onClick={placeOrder}
                    >
                      Checkout
                    </button>
                  </div>
                  <div className="mt-8">
                  <Link to="/">
                      <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md text-base font-medium">
                        Continue Shopping
                      </button>
                  </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;