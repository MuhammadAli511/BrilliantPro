import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getSingleProduct } from "../helper/index";
import { addToCart } from "../redux/actions";

const ProductDetail = () => {
    const [selectedColor, setSelectedColor] = useState("");
    const [selectedQuantity, setSelectedQuantity] = useState(1);
    const [product, setProduct] = useState({});
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const { id } = useParams();

    useEffect(() => {
        const fetchProduct = async () => {
            const response = await getSingleProduct(id);
            if (data.message === "Unauthorized"){
                alert("You are not logged in. Please login to continue.");
                window.location.href = "/login";
                return;
              }
            setProduct(response.product[0]);
        };
        fetchProduct();
    }, [id]);

    const handleColorChange = (color) => {
        setSelectedColor(color);
    };

    const handleQuantityChange = (e) => {
        setSelectedQuantity(parseInt(e.target.value));
    };

    const handleAddToCart = () => {
        dispatch(addToCart(product, selectedQuantity));
    };

    return (
        <>
            <Navbar cartItemsCount={cart.length} />
            <div className="flex flex-wrap justify-center items-center mt-10">
                <div className="w-full md:w-1/2 p-4">
                    <img src={product.image} alt={product.title} className="mx-auto w-64" />
                </div>
                <div className="w-full md:w-1/2 p-4">
                    <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
                    <p className="text-gray-600 mb-2">${product.price}</p>
                    <p className="text-gray-700 mb-4">{product.description}</p>
                    <div className="mb-4">
                        <span className="mr-2">Color:</span>
                        <div className="flex flex-wrap justify-start items-center">
                            <button
                                className={`color-option ${selectedColor === "red" ? "selected border-2 border-red-500" : ""
                                    }`}
                                onClick={() => handleColorChange("red")}
                            >
                                <div className="w-8 h-8 rounded-full bg-red-500 mx-3"></div>
                            </button>
                            <button
                                className={`color-option ${selectedColor === "blue" ? "selected border-2 border-blue-500" : ""
                                    }`}
                                onClick={() => handleColorChange("blue")}
                            >
                                <div className="w-8 h-8 rounded-full bg-blue-500 mx-3"></div>
                            </button>
                            <button
                                className={`color-option ${selectedColor === "green" ? "selected border-2 border-green-500" : ""
                                    }`}
                                onClick={() => handleColorChange("green")}
                            >
                                <div className="w-8 h-8 rounded-full bg-green-500 mx-3"></div>
                            </button>
                        </div>

                    </div>
                    <div className="mb-4">
                        <span className="mr-2">Size:</span>
                        <select className="border border-gray-400 rounded py-2 px-4">
                            <option>Small</option>
                            <option>Medium</option>
                            <option>Large</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <span className="mr-2">Quantity:</span>
                        <input
                            type="number"
                            min="1"
                            max="10"
                            value={selectedQuantity}
                            onChange={handleQuantityChange}
                            className="border border-gray-400 rounded py-2
                px-4"
                        />
                    </div>
                    <div className="mb-4">
                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                            onClick={handleAddToCart}
                        >
                            Add to cart
                        </button>
                    </div>
                    <div className="mb-4">
                        <Link to="/cart" className="text-blue-500 hover:text-blue-600">
                            Go to cart
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductDetail;