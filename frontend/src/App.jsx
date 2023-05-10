import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import {
  AddCourse,
  AddLearner,
  AdminDashboard,
  AdminLogin,
  DeleteCourse,
  DeleteLearner,
  GetLearner,
  LandingPage,
  Login,
  NotImplemented,
  SignUp,
  UpdateCourse,
  UpdateLearner
} from "./pages";
function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* Student Routes */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
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
        {/* <Route path="/admin/courses/search" element={<GetCourse />} /> */}
        {/* <Route path="/admin/courses/catalog" element={<GetAllCourses />} /> */}
        {/* Not Implemented Routes */}
        <Route path="*" element={<NotImplemented />} />
      </Routes>
    </Router>
  )
}

export default App
