import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

function Products() {
  const [menProducts, setMenProducts] = useState([]);
  const [womenProducts, setWomenProducts] = useState([]);
  const [jewelryProducts, setJewelryProducts] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/mens%20clothing")
      .then((response) => response.json())
      .then((data) => setMenProducts(data));

    fetch("http://127.0.0.1:5000/womens%20clothing")
      .then((response) => response.json())
      .then((data) => setWomenProducts(data));

    fetch("http://127.0.0.1:5000/jewelery")
      .then((response) => response.json())
      .then((data) => setJewelryProducts(data));
  }, []);

  return (
    <div className="container mx-auto my-4">
      <h2 className="text-2xl font-bold mb-4 mt-20 flex items-center justify-center">Men's Clothing</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {menProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <h2 className="text-2xl font-bold my-4 mt-20 flex items-center justify-center">Women's Clothing</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {womenProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <h2 className="text-2xl font-bold my-4 mt-20 flex items-center justify-center">Jewelry</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {jewelryProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Products;
