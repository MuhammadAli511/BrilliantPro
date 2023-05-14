import { useEffect, useState } from 'react';
import { FaBook, FaCertificate, FaUserCheck, FaUsers } from "react-icons/fa";
import { StudentNavbar } from "../../components";
import { getCourseCount, getMaterialCount, getStudentCount } from '../../helper';

const StudentDashboard = () => {
    const [activeLearners, setActiveLearners] = useState(0);
    const [totalLearners, setTotalLearners] = useState(0);
    const [totalCourses, setTotalCourses] = useState(0);
    const [totalCertificates, setTotalCertificates] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response1 = await getMaterialCount();
                setActiveLearners(response1.materialCount);

                const response2 = await getStudentCount();
                setTotalLearners(response2.studentsCount);

                const response3 = await getCourseCount();
                setTotalCourses(response3.courseCount);

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
            <StudentNavbar />
            <div className="container mx-auto mt-20">
                <div className="grid grid-cols-3 gap-4">
                    <div className="card mb-3 bg-red-300 w-full py-10">
                        <div className="card-body text-white">
                            <div className="flex items-center">
                                <div className="mx-4">
                                    <FaUsers size={40} />
                                </div>
                                <div>
                                    <h5 className="card-title mb-2 font-bold text-lg">Completed Courses</h5>
                                    <p className="text-2xl font-bold">{totalLearners}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card mb-3 bg-blue-300 w-full py-10">
                        <div className="card-body text-white">
                            <div className="flex items-center">
                                <div className="mx-4">
                                    <FaBook size={40} />
                                </div>
                                <div>
                                    <h5 className="card-title mb-2 font-bold text-lg">Ongoing Courses</h5>
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
                                    <h5 className="card-title mb-2 font-bold text-lg">Certificates Earned</h5>
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

export default StudentDashboard;
