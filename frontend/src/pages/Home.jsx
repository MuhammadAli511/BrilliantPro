import React, { useEffect, useState } from "react";
import { Categories, Navbar } from "../components";
import ProductCard from "../components/ProductCard";
import { getAllProducts } from "../helper";

const Home = () => {

    const [products, setProducts] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchData = async () => {
          const data = await getAllProducts();
          if (data.message === "Unauthorized"){
            alert("You are not logged in. Please login to continue.");
            window.location.href = "/login";
            return;
          }
          setProducts(data.products);
        };
      
        fetchData();
      }, []);

    useEffect(() => {
        if (searchTerm === "") {
            setFiltered(products);
        }
    }, [searchTerm, products]);

    const onChange = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        setSearchTerm(searchTerm);

        if (!searchTerm) {
            setFiltered(products);
            return;
        }

        const filteredProducts = products.filter((product) =>
            product.title.toLowerCase().includes(searchTerm)
        );
        setFiltered(filteredProducts);
    };


    return (
        <div>
            <Navbar onChange={onChange} />
            <Categories />
            <div className="container mx-auto my-4">
                <h2 className="text-2xl font-bold mb-4 mt-20 flex items-center justify-center">Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                    {filtered.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Home