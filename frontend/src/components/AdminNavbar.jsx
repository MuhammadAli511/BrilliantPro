import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AdminNavbar = () => {
    const [showLearnerMenu, setShowLearnerMenu] = useState(false);
    const [showCoursesMenu, setShowCoursesMenu] = useState(false);
    const [showEnrollmentsMenu, setShowEnrollmentsMenu] = useState(false);
    const [showMaterialsMenu, setShowMaterialsMenu] = useState(false);
    const [showAssessmentsMenu, setShowAssessmentsMenu] = useState(false);

    const toggleLearnerMenu = () => setShowLearnerMenu(!showLearnerMenu);
    const toggleCoursesMenu = () => setShowCoursesMenu(!showCoursesMenu);
    const toggleEnrollmentsMenu = () => setShowEnrollmentsMenu(!showEnrollmentsMenu);
    const toggleMaterialsMenu = () => setShowMaterialsMenu(!showMaterialsMenu);
    const toggleAssessmentsMenu = () => setShowAssessmentsMenu(!showAssessmentsMenu);

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = "/admin/login";
    };
    const handleRedirection = () => {
        if (localStorage.getItem("token")) {
            window.location.href = "/admin/dashboard";
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
                    <Link to="/admin/dashboard" className="text-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                        Dashboard
                    </Link>
                    {/* Learner */}
                    <div className="relative">
                        <button
                            type="button"
                            onMouseEnter={toggleLearnerMenu}
                            onMouseLeave={toggleLearnerMenu}
                            className="text-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                        >
                            Learner
                            {showLearnerMenu && (
                                <div className="absolute -right-20 top-full w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none">
                                    <div className="py-1">
                                        <Link
                                            to="/admin/learners/add"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                        >
                                            Add Learner
                                        </Link>
                                        <Link
                                            to="/admin/learners/delete"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                        >
                                            Delete Learner
                                        </Link>
                                        <Link
                                            to="/admin/learners/update"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                        >
                                            Update Learner
                                        </Link>
                                        <Link
                                            to="/admin/learners/view"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                        >
                                            View Learners
                                        </Link>


                                    </div>
                                </div>
                            )}
                        </button>
                    </div>
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
                                <div className="absolute -right-20 top-full w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none">
                                    <div className="py-1">
                                        <Link
                                            to="/admin/courses/add"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                            onClick={toggleCoursesMenu}

                                        >
                                            Add Course
                                        </Link>
                                        <Link
                                            to="/admin/courses/update"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                            onClick={toggleCoursesMenu}
                                        >
                                            Update Course
                                        </Link>
                                        <Link
                                            to="/admin/courses/search"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                            onClick={toggleCoursesMenu}
                                        >
                                            Search Course
                                        </Link>
                                        <Link
                                            to="/admin/courses/catalog"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                            onClick={toggleCoursesMenu}
                                        >
                                            Course Catalog
                                        </Link>
                                        <Link
                                            to="/admin/courses/remove"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                            onClick={toggleCoursesMenu}
                                        >
                                            Remove Course
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </button>
                    </div>
                    {/* Enrollments */}
                    <div className="relative">
                        <button
                            type="button"
                            onMouseEnter={toggleEnrollmentsMenu}
                            onMouseLeave={toggleEnrollmentsMenu}
                            className="text-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                        >
                            Enrollments
                            {showEnrollmentsMenu && (
                                <div className="absolute -right-20 top-full w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none">
                                    <div className="py-1">
                                        <Link
                                            to="/admin/enrollments/enroll"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                            onClick={toggleEnrollmentsMenu}
                                        >
                                            Enroll Learner
                                        </Link>
                                        <Link
                                            to="/admin/enrollments/unenroll"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                            onClick={toggleEnrollmentsMenu}
                                        >
                                            Unenroll Learner
                                        </Link>
                                        <Link
                                            to="/admin/enrollments/viewall"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                            onClick={toggleEnrollmentsMenu}
                                        >
                                            View All Enrollments
                                        </Link>
                                        <Link
                                            to="/admin/enrollments/viewcourseenrollments"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                            onClick={toggleEnrollmentsMenu}
                                        >
                                            View Course Enrollments
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </button>
                    </div>
                    {/* Materials */}
                    <div className="relative">
                        <button
                            type="button"
                            onMouseEnter={toggleMaterialsMenu}
                            onMouseLeave={toggleMaterialsMenu}
                            className="text-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                        >
                            Materials
                            {showMaterialsMenu && (
                                <div className="absolute -right-20 top-full mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none">
                                    <div className="py-1">
                                        <Link
                                            to="/admin/materials/upload"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                            onClick={toggleMaterialsMenu}
                                        >
                                            Upload Material
                                        </Link>
                                        <Link
                                            to="/admin/materials/view"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                            onClick={toggleMaterialsMenu}
                                        >
                                            View Material
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </button>
                    </div>
                    {/* Assessments */}
                    <div className="relative">
                        <button
                            type="button"
                            onMouseEnter={toggleAssessmentsMenu}
                            onMouseLeave={toggleAssessmentsMenu}
                            className="text-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                        >
                            Assessments
                            {showAssessmentsMenu && (
                                <div className="absolute -right-20 top-full w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none">
                                    <div className="py-1">
                                        <Link
                                            to="/admin/assessments/upload"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                            onClick={toggleAssessmentsMenu}
                                        >
                                            Upload Assessment
                                        </Link>
                                        <Link
                                            to="/admin/assessments/search"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                            onClick={toggleAssessmentsMenu}
                                        >
                                            Search Assessment
                                        </Link>

                                    </div>
                                </div>
                            )}
                        </button>
                    </div>
                    <Link to="/admin/settings" className="text-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                        Settings
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

export default AdminNavbar;