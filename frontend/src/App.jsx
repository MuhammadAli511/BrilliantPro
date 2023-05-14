import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import {
  AddAssessment,
  AddCourse,
  AddEnrollment,
  AddLearner,
  AddMaterial,
  AdminDashboard,
  AdminLogin,
  CourseCatalog,
  CourseDetails,
  DeleteCourse,
  DeleteEnrollment,
  DeleteLearner,
  GetCourses,
  GetLearner,
  LandingPage,
  Login,
  NotImplemented,
  SearchCourse,
  SignUp,
  StudentDashboard,
  UpdateCourse,
  UpdateLearner,
  ViewMaterials
} from "./pages";
function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* Student Routes */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/courses/catalog" element={<CourseCatalog />} />
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        {/* Learner Routes */}
        <Route path="/admin/learners/add" element={<AddLearner />} />
        <Route path="/admin/learners/delete" element={<DeleteLearner />} />
        <Route path="/admin/learners/update" element={<UpdateLearner />} />
        <Route path="/admin/learners/view" element={<GetLearner />} />
        {/* Courses Routes */}
        <Route path="/admin/courses/add" element={<AddCourse />} />
        <Route path="/admin/courses/remove" element={<DeleteCourse />} />
        <Route path="/admin/courses/update" element={<UpdateCourse />} />
        <Route path="/admin/courses/search" element={<SearchCourse />} />
        <Route path="/admin/courses/catalog" element={<GetCourses />} />
        <Route path="/admin/courses/catalog/details/:title" element={<CourseDetails />} />
        {/* Material Routes */}
        <Route path="/admin/materials/upload" element={<AddMaterial />} />
        <Route path="/admin/materials/view" element={<ViewMaterials />} />
        {/* Enrollment Routes */}
        <Route path="/admin/enrollments/enroll" element={<AddEnrollment />} />
        <Route path="/admin/enrollments/unenroll" element={<DeleteEnrollment />} />
        {/* Assessments Routes */}
        <Route path="/admin/assessments/upload" element={<AddAssessment />} />
        {/* Not Implemented Routes */}
        <Route path="*" element={<NotImplemented />} />
      </Routes>
    </Router>
  )
}

export default App
