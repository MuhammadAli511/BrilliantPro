import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const StudentNavbar = () => {
    const [showCoursesMenu, setShowCoursesMenu] = useState(false);
    const [showCertificatesMenu, setShowCertificatesMenu] = useState(false);

    const toggleCoursesMenu = () => setShowCoursesMenu(!showCoursesMenu);
    const toggleCertificatesMenu = () => setShowCertificatesMenu(!showCertificatesMenu);

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = "/student/login";
    };
    const handleRedirection = () => {
        if (localStorage.getItem("token")) {
            window.location.href = "/student/dashboard";
            return;
        }
        window.location.href = "/";
    }

    return (
        <nav className="flex items-center justify-between py-4 px-6 bg-white shadow-md">
            <div className="flex items-center font-bold text-2xl">
                <button onClick={handleRedirection}>
                    BrilliantPro
                </button>
            </div>
            <div className="flex items-center justify-center">
                <div className="flex space-x-4">
                    <Link to="/student/dashboard" className="text-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                        Dashboard
                    </Link>

                    {/* Courses */}
                    <div className="relative">
                        <button
                            type="button"
                            onMouseEnter={toggleCoursesMenu}
                            onMouseLeave={toggleCoursesMenu}
                            className="text-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                        >
                            Courses
                            {showCoursesMenu && (
                                <div className="absolute right-[-72px] top-full w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none">
                                    <div className="py-1">
                                        <Link
                                            to="/student/courses/catalog"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                            onClick={toggleCoursesMenu}
                                        >
                                            Course Catalog
                                        </Link>
                                        <Link
                                            to="/student/courses/enrolledCourses"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                            onClick={toggleCoursesMenu}
                                        >
                                            Enrolled Courses
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </button>
                    </div>
                    {/* Certificates */}
                    <Link to="/student/certificates" className="text-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                        Certificates
                    </Link>


                </div>
            </div>
            <div className="flex items-center">
                <button onClick={handleLogout} className="flex items-center text-sm font-semibold py-2 px-3 rounded border border-gray-900 text-gray-900 ml-5">
                    Logout
                </button>
            </div>
        </nav>
    );
}

export default StudentNavbar;