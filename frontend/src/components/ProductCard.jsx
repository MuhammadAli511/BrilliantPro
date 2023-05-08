import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { addToCart } from '../redux/actions';

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();
    const [units, setUnits] = useState(1);
    const [cartItems, setCartItems] = useState([]);

    const handleUnitsChange = (event) => {
        setUnits(parseInt(event.target.value));
    };

    const handleAddToCart = () => {
        if (parseInt(units)>0 && parseInt(units)<=product.id) {
            dispatch(addToCart(product, units));
        }
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-4">
            <img src={product.image} alt={product.name} className="w-full h-48 object-contain" />
            <Link 
                to={`/details/${product.id}`}
                className="link"    
            >
            <h2 className="text-base font-medium my-2">{product.title}</h2>
            </Link>
            <div className="flex justify-between items-center">
                <span className="font-bold text-gray-700">${product.price}</span>
                <div className="flex items-center">
                    <span className="mr-2">{product.stock} in stock</span>
                    <input
                        type="number"
                        min="0"
                        value={units}
                        onChange={handleUnitsChange}
                        className="w-16 border-gray-400 border rounded py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                    />
                </div>
            </div>
            <div className="flex items-center justify-center">
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg" onClick={handleAddToCart}>
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
