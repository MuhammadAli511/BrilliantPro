import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import {
  AddLearner,
  AdminDashboard,
  AdminLogin,
  DeleteLearner,
  GetLearner,
  LandingPage,
  Login,
  NotImplemented,
  SignUp,
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
        <Route path="/admin/learners/add" element={<AddLearner />} />
        <Route path="/admin/learners/delete" element={<DeleteLearner />} />
        <Route path="/admin/learners/update" element={<UpdateLearner />} />
        <Route path="/admin/learners/view" element={<GetLearner />} />
        {/* Not Implemented Routes */}
        <Route path="*" element={<NotImplemented />} />
      </Routes>
    </Router>
  )
}

export default App
