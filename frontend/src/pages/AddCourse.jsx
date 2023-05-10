import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminNavbar } from "../components";
import { addCourse } from "../helper";

const AddCourse = () => {
    const [formData, setFormData] = useState({
        title: "",
        author: "",
        price: "",
        description: "",
        category: "",
        image: "",
        startDate: "",
        endDate: "",
    });
    const { title, author, price, description, category, image, startDate, endDate } = formData;
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const response = await addCourse({ title, author, price, description, category, image, startDate, endDate });
            if (!response) {
                alert("Can not reach Server");
            }
            if (response.status === 200) {
                alert("Course Added");
                navigate("/admin/dashboard");
            }
            else {
                alert(response.message);
            }
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <>
            <AdminNavbar />
            <div className="mt-20 flex justify-center items-center flex-col overflow-y-hidden">
                <h1 className="text-4xl font-bold mb-8 text-center text-gray-700 tracking-wide">Add Course</h1>
                <form onSubmit={handleSubmit} className="flex flex-col items-center bg-slate-50 p-8 rounded-lg shadow-md w-[500px] mb-8 border border-gray-300">
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={title}
                            onChange={onChange}
                            className="border border-gray-300 p-2 rounded w-64"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="author" className="block text-gray-700 font-semibold mb-2">Author</label>
                        <input
                            type="text"
                            id="author"
                            name="author"
                            value={author}
                            onChange={onChange}
                            className="border border-gray-300 p-2 rounded w-64"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="price" className="block text-gray-700 font-semibold mb-2">Price</label>
                        <input
                            type="text"
                            id="price"
                            name="price"
                            value={price}
                            onChange={onChange}
                            className="border border-gray-300 p-2 rounded w-64"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">Description</label>
                        <input
                            type="text"
                            id="description"
                            name="description"
                            value={description}
                            onChange={onChange}
                            className="border border-gray-300 p-2 rounded w-64"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="category" className="block text-gray-700 font-semibold mb-2">Category</label>
                        <input
                            type="text"
                            id="category"
                            name="category"
                            value={category}
                            onChange={onChange}
                            className="border border-gray-300 p-2 rounded w-64"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="image" className="block text-gray-700 font-semibold mb-2">Image</label>
                        <input
                            type="text"
                            id="image"
                            name="image"
                            value={image}
                            onChange={onChange}
                            className="border border-gray-300 p-2 rounded w-64"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="startDate" className="block text-gray-700 font-semibold mb-2">Start Date</label>
                        <input
                            type="text"
                            id="startDate"
                            name="startDate"
                            value={startDate}
                            onChange={onChange}
                            className="border border-gray-300 p-2 rounded w-64"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="endDate" className="block text-gray-700 font-semibold mb-2">End Date</label>
                        <input
                            type="text"
                            id="endDate"
                            name="endDate"
                            value={endDate}
                            onChange={onChange}
                            className="border border-gray-300 p-2 rounded w-64"
                            required
                        />
                    </div>

                    <button type="submit" className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded">
                        {isLoading ? <div className="loader"></div> : "Add Course"}</button>
                </form>
            </div>
        </>
    );
};

export default AddCourse;
