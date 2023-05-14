import React, { useEffect, useState } from "react";
import { FaFileAlt, FaFileArchive, FaFileAudio, FaFileExcel, FaFileImage, FaFilePdf, FaFilePowerpoint, FaFileVideo, FaFileWord } from 'react-icons/fa';
import { AdminNavbar } from "../../../components";
import { deleteMaterial, getAllMaterials } from "../../../helper";


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

const MaterialCard = ({ materialsEach }) => {
    const { _id, material, materialName, materialType, courseTitles } = materialsEach;

    const deletePressed = async (_id) => {
        const response = await deleteMaterial({_id});
        if (response.status === 200) {
            alert("Material Deleted Successfully");
            window.location.reload();
        }
    };
    

    return (
        <div className="p-4 border border-gray-200 rounded-md shadow-md transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between h-full">
            <div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <div className="flex items-center justify-center h-10 w-10 rounded-md bg-blue-500 text-white">
                            {React.createElement(iconMap[materialType], {
                                className: "h-6 w-6",
                            })}
                        </div>
                        <div className="ml-4">
                            <p className="text-lg font-medium text-gray-700">{materialName}</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap mt-4">
                    {courseTitles.map((course) => (
                        <span
                            key={course}
                            className="bg-gray-200 text-gray-800 rounded-full text-sm font-medium py-1 px-2 mr-2 mb-2"
                        >
                            {course}
                        </span>
                    ))}
                </div>
            </div>
            <div className="mt-auto">
                <div className="flex items-center justify-between">
                    <a
                        href={`data:${material.materialType};base64,${material.material}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        download={material.materialName}
                        className="ml-2 text-blue-500 underline hover:text-blue-700"
                    >
                        Download
                    </a>
                    {/* delete */}
                    <button
                        onClick={() => {
                            deletePressed(_id);
                        }}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Delete
                    </button>


                </div>
            </div>
        </div>
    );
};


const GetMaterials = () => {
    const [materials, setMaterials] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchMaterials = async () => {
            setIsLoading(true);
            const response = await getAllMaterials();
            if (response.status === 200) {
                setMaterials(response.materials);
            }
            setIsLoading(false);
        };
        fetchMaterials();
    }, []);
    return (
        <>
            <AdminNavbar />
            <h1 className="text-4xl font-bold mt-20 mb-8 text-center text-gray-700 tracking-wide">
                All Materials
            </h1>
            <div className="container mx-auto">
                {isLoading ? (
                    <div className="loader"></div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {materials.map((materialsEach) => (
                            <MaterialCard key={materialsEach._id} materialsEach={materialsEach} />
                        ))}
                    </div>

                )}
            </div>
        </>
    )
};

export default GetMaterials;