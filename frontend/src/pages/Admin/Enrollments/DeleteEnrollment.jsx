import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminNavbar } from "../../../components";
import { deleteEnrollment } from "../../../helper";

const DeleteEnrollment = () => {
    const [formData, setFormData] = useState({
        studentEmail: "",
        courseTitle: ""
    });
    const { studentEmail, courseTitle } = formData;
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const response = await deleteEnrollment({ studentEmail, courseTitle });
            if (!response) {
                alert("Can not reach Server");
            }
            if (response.status === 200) {
                alert("Enrollment Deleted");
                navigate("/admin/dashboard");
            } else {
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
                <h1 className="text-4xl font-bold mb-8 text-center text-gray-700 tracking-wide">
                    Delete Enrollment
                </h1>
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col items-center bg-slate-50 p-8 rounded-lg shadow-md w-[700px] mb-8 border border-gray-300"
                >
                    <div className="mb-4">
                        <label
                            htmlFor="courseTitle"
                            className="block text-gray-700 font-semibold mb-2"
                        >
                            Course Title
                        </label>
                        <input
                            type="courseTitle"
                            id="courseTitle"
                            name="courseTitle"
                            value={courseTitle}
                            onChange={onChange}
                            className="border border-gray-300 p-2 rounded w-80"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="studentEmail"
                            className="block text-gray-700 font-semibold mb-2"
                        >
                            Student Email
                        </label>
                        <input
                            type="studentEmail"
                            id="studentEmail"
                            name="studentEmail"
                            value={studentEmail}
                            onChange={onChange}
                            className="border border-gray-300 p-2 rounded w-80"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded"
                    >
                        {isLoading ? (
                            <div className="loader"></div>
                        ) : (
                            "Delete Learner"
                        )}
                    </button>
                </form>
            </div>
        </>
    );
};

export default DeleteEnrollment;
