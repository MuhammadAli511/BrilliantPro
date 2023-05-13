import React, { useEffect, useState } from "react";
import { FaFileAlt, FaFileArchive, FaFileAudio, FaFileExcel, FaFileImage, FaFilePdf, FaFilePowerpoint, FaFileVideo, FaFileWord } from 'react-icons/fa';
import { useParams } from "react-router-dom";
import { AdminNavbar } from "../../../components";
import { getCourse } from "../../../helper";

const CourseDetails = () => {
    const iconMap = {
        'application/vnd.openxmlformats-officedocument.presentationml.presentation': FaFilePowerpoint,
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document': FaFileWord,
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': FaFileExcel,
        'application/vnd.ms-powerpoint': FaFilePowerpoint,
        'application/vnd.ms-word': FaFileWord,
        'application/pdf': FaFilePdf,
        'image/png': FaFileImage,
        'image/jpeg': FaFileImage,
        'image/jpg': FaFileImage,
        'image/gif': FaFileImage,
        'image/bmp': FaFileImage,
        'image/webp': FaFileImage,
        'application/msword': FaFileWord,
        'application/vnd.ms-excel': FaFileExcel,
        'text/plain': FaFileAlt,
        'application/zip': FaFileArchive,
        'audio/mpeg': FaFileAudio,
        'video/mp4': FaFileVideo,
        'audio/wav': FaFileAudio,
        'audio/mp3': FaFileAudio,
        'audio/ogg': FaFileAudio,
        'video/ogg': FaFileVideo,
        'video/webm': FaFileVideo,
        'video/quicktime': FaFileVideo,
        'video/3gpp': FaFileVideo,
        'video/3gpp2': FaFileVideo,
    };
    const [course, setCourse] = useState({});
    const { title } = useParams();


    useEffect(() => {
        const fetchProduct = async () => {
            const response = await getCourse({ title });
            response.course.materials = response.materials;
            setCourse(response.course);
        };
        fetchProduct();
    }, [title]);



    return (
        <>
            <AdminNavbar />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
                <img
                    src={`data:image/jpeg;base64,${course.image}`}
                    alt={course.title}
                    // show image in center of screen horizontally
                    className="w-1/2 h-64 mb-4 mx-auto"
                />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-gray-50 p-6 shadow-md rounded-md">
                        <h2 className="text-xl font-bold mb-2">Author:</h2>
                        <p className="text-gray-500 mb-4">{course.author}</p>

                        <h2 className="text-xl font-bold mb-2">Category:</h2>
                        <p className="text-gray-500 mb-4">{course.category}</p>

                        <h2 className="text-xl font-bold mb-2">Price:</h2>
                        <p className="text-gray-500 mb-4">{course.price}</p>

                        <h2 className="text-xl font-bold mb-2">Start Date:</h2>
                        <p className="text-gray-500 mb-4">{course.startDate}</p>

                        <h2 className="text-xl font-bold mb-2">End Date:</h2>
                        <p className="text-gray-500 mb-4">{course.endDate}</p>
                    </div>

                    <div className="bg-gray-50 p-6 shadow-md rounded-md">
                        <h2 className="text-xl font-bold mb-2">Description:</h2>
                        <p className="text-gray-500 mb-4">{course.description}</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-8 mt-10 mx-auto w-1/2 ">
                <div className="bg-gray-50 p-6 shadow-md rounded-md">
                        <h2 className="text-xl font-bold mb-2">Materials:</h2>
                        <div className="flex flex-wrap">
                            {course.materials &&
                                course.materials.map((material, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center mb-4 mr-4 bg-gray-300 p-2 rounded-md justify-between"
                                    >
                                        <div className="flex flex-row items-center">
                                        {React.createElement(iconMap[material.materialType], {
                                            className: "text-blue-500 mr-2",
                                        })}
                                        <p>{material.materialName}</p>
                                        </div>
                                        <a
                                            href={`data:${material.materialType};base64,${material.material}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            download={material.materialName}
                                            className="ml-2 text-blue-500 underline hover:text-blue-700"
                                        >
                                            Download
                                        </a>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
};

export default CourseDetails;