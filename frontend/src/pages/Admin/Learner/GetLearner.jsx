import React, { useEffect, useState } from "react";
import { AdminNavbar } from "../../../components";
import { getAllStudents } from "../../../helper";

const LearnerCard = ({ learner }) => {
  return (
    <div className="p-4 border rounded-md">
      <h2 className="text-xl font-semibold">{learner.firstName} {learner.lastName}</h2>
      <p className="text-gray-500">{learner.email}</p>
      
    </div>
  );
};

const GetLearner = () => {
  const [learners, setLearners] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchLearners = async () => {
      setIsLoading(true);
      const response = await getAllStudents();
      if (response.status === 200) {
        setLearners(response.students);
      }
      setIsLoading(false);
    };
    fetchLearners();
  }, []);

  return (
    <>
        <AdminNavbar />
      <h1 className="text-4xl font-bold mt-20 mb-8 text-center text-gray-700 tracking-wide">
        All Learners
      </h1>
      {isLoading ? (
        <div className="loader"></div>
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {learners.map((learner) => (
            <LearnerCard key={learner._id} learner={learner} />
          ))}
        </div>
      )}
    </>
  );
};

export default GetLearner;
