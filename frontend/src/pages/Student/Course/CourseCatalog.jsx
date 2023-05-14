import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { StudentNavbar } from "../../../components";
import { getAllStudentCourses } from "../../../helper";

const CourseCard = ({ course }) => {
  const { title, author, category, price, image } = course;

  return (
    <div className="p-4 border border-gray-200 rounded-md shadow-md transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-xl">
      <img src={`data:image/jpeg;base64,${image}`} alt={title} className="w-full h-48 object-cover mb-4 rounded-md" />
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-gray-600 mb-2">{author}</p>
      <p className="text-gray-500 text-sm mb-2">{category}</p>
      <p className="text-gray-500 text-lg font-bold mb-4">${price}</p>
      <Link to={`/admin/courses/catalog/details/${title}`}>
        <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded">
          View Details
        </button>
      </Link>
    </div>
  );
};

const CourseCatalog = () => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);
      const email = localStorage.getItem("email");
      const response = await getAllStudentCourses(email);
      if (response.status === 200) {
        setCourses(response.courses);
      }
      setIsLoading(false);
    };
    fetchCourses();
  }, []);

  return (
    <>
        <StudentNavbar />
      <h1 className="text-4xl font-bold mt-20 mb-8 text-center text-gray-700 tracking-wide">
        All Courses
      </h1>
      <div className="container mx-auto">
      {isLoading ? (
        <div className="loader"></div>
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {courses.map((course) => (
            <CourseCard key={course.title} course={course} />
          ))}
        </div>
      )}
      </div>
    </>
  );
};

export default CourseCatalog;
