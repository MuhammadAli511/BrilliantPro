import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from 'react-select';
import { AdminNavbar } from "../../../components";
import { addMaterial, getAllCourses } from "../../../helper";

const AddMaterial = () => {
    const [formData, setFormData] = useState({
        material: "",
        materialName: "",
        materialType: "",
        courses: []
    });
    const { material,  materialName, materialType, courses } = formData;
    const [isLoading, setIsLoading] = useState(false);
    const [courseOptions, setCourseOptions] = useState([]);
    const navigate = useNavigate();
    const handleMaterialUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
            setFormData((prevState) => ({
                ...prevState,
                material: base64String,
                materialName: file.name,
                materialType: file.type,
            }));
        };
      };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const response = await addMaterial({ material, materialName, materialType, courses });
            if (!response) {
                alert("Can not reach Server");
            }
            if (response.status === 200) {
                alert("Material Added");
                navigate("/admin/dashboard");
            }
            else {
                alert(response.message);
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await getAllCourses();
                if (response.status === 200) {
                    const options = response.courses.map((course) => ({
                        value: course.title,
                        label: course.title,
                    }));
                    setCourseOptions(options);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchCourses();
    }, []);

    const handleCourseSelect = (selectedOptions) => {
        setFormData((prevState) => ({
            ...prevState,
            courses: selectedOptions.map(option => option.value),
        }));
    };

    
    return (
        <>
            <AdminNavbar />
            <div className="mt-20 flex justify-center items-center flex-col overflow-y-hidden">
                <h1 className="text-4xl font-bold mb-8 text-center text-gray-700 tracking-wide">Add Material</h1>
                <form onSubmit={handleSubmit} className="flex flex-col items-center bg-slate-50 p-8 rounded-lg shadow-md w-[700px] mb-8 border border-gray-300">
                    <div className="mb-4">
                        <label htmlFor="material" className="block text-gray-700 font-semibold mb-2">Material</label>
                        <input
                            type="file"
                            id="material"
                            name="material"
                            onChange={handleMaterialUpload}
                            className="border border-gray-300 p-2 rounded w-80"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="courses" className="block text-gray-700 font-semibold mb-2">Courses</label>
                        <Select
                            isMulti
                            options={courseOptions}
                            value={courseOptions.filter(option => courses.includes(option.value))}
                            onChange={handleCourseSelect}
                        />
                    </div>
                    <button type="submit" className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded">
                        {isLoading ? <div className="loader"></div> : "Add Material"}</button>
                </form>
            </div>
        </>
    );
};

export default AddMaterial;
