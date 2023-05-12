import { useEffect, useState } from 'react';
import { FaBook, FaCertificate, FaUserCheck, FaUsers } from "react-icons/fa";
import { AdminNavbar } from "../../components";
// import { getActiveLearnerCount, getTotalLearnerCount } from '../helper';

const AdminDashboard = () => {
    const [activeLearners, setActiveLearners] = useState(0);
    const [totalLearners, setTotalLearners] = useState(0);
    const [totalCourses, setTotalCourses] = useState(0);
    const [totalCertificates, setTotalCertificates] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response1 = 1;
                setActiveLearners(response1);

                const response2 = 2;
                setTotalLearners(response2);

                const response3 = 4;
                setTotalCourses(response3);

                const response4 = 2;
                setTotalCertificates(response4);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <AdminNavbar />
            <div className="container mx-auto mt-20">
                <div className="grid grid-cols-2 gap-80 justify-items-center">
                    <div className="card mb-3 bg-red-300 w-full py-10">
                        <div className="card-body text-white">
                            <div className="flex items-center">
                                <div className="mx-4">
                                    <FaUserCheck size={40} />
                                </div>
                                <div>
                                    <h5 className="card-title mb-2 font-bold text-lg">Enrolled Learners</h5>
                                    <p className="text-2xl font-bold">{activeLearners}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card mb-3 bg-blue-300 w-full py-10">
                        <div className="card-body text-white">
                            <div className="flex items-center">
                                <div className="mx-4">
                                    <FaUsers size={40} />
                                </div>
                                <div>
                                    <h5 className="card-title mb-2 font-bold text-lg">Total Learners</h5>
                                    <p className="text-2xl font-bold">{totalLearners}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div className="grid grid-cols-2 gap-80 justify-items-center">
                <div className="card mb-3 bg-blue-300 w-full py-10">
                        <div className="card-body text-white">
                            <div className="flex items-center">
                                <div className="mx-4">
                                    <FaBook size={40} />
                                </div>
                                <div>
                                    <h5 className="card-title mb-2 font-bold text-lg">Total Courses</h5>
                                    <p className="text-2xl font-bold">{totalCourses}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card mb-3 bg-red-300 w-full py-10">
                        <div className="card-body text-white">
                            <div className="flex items-center">
                                <div className="mx-4">
                                    <FaCertificate size={40} />
                                </div>
                                <div>
                                    <h5 className="card-title mb-2 font-bold text-lg">Certificates Issued</h5>
                                    <p className="text-2xl font-bold">{totalCertificates}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminDashboard;
