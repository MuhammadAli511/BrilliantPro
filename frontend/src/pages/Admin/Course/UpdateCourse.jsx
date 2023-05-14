import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminNavbar } from "../../../components";
import { updateCourse } from "../../../helper";

const UpdateCourse = () => {
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
        }));
    }
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
            setFormData((prevState) => ({
                ...prevState,
                image: base64String,
            }));
        };
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const response = await updateCourse({ title, author, price, description, category, image, startDate, endDate });
            if (!response) {
                alert("Can not reach Server");
            }
            if (response.status === 200) {
                alert("Course Updated");
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
                <h1 className="text-4xl font-bold mb-8 text-center text-gray-700 tracking-wide">Update Course</h1>
                <form onSubmit={handleSubmit} className="flex flex-col items-center bg-slate-50 p-8 rounded-lg shadow-md w-[700px] mb-8 border border-gray-300">
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={title}
                            onChange={onChange}
                            className="border border-gray-300 p-2 rounded w-80"
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
                            className="border border-gray-300 p-2 rounded w-80"
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
                            className="border border-gray-300 p-2 rounded w-80"
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
                            className="border border-gray-300 p-2 rounded w-80"
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
                            className="border border-gray-300 p-2 rounded w-80"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="image" className="block text-gray-700 font-semibold mb-2">Image</label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            onChange={handleImageUpload}
                            className="border border-gray-300 p-2 rounded w-80"
                            accept="image/*"
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
                            className="border border-gray-300 p-2 rounded w-80"
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
                            className="border border-gray-300 p-2 rounded w-80"
                            required
                        />
                    </div>

                    <button type="submit" className="bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded">
                        {isLoading ? <div className="loader"></div> : "Update Course"}</button>
                </form>
            </div>
        </>
    );
};

export default UpdateCourse;


