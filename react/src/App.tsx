import Navbar from "./components/Navbar";
import UserPage from "./pages/UserPage";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import StudentPage from "./pages/StudentPage";
import LessonPage from "./pages/LessonPage";
import AssignLessonStudentPage from "./pages/AssignLessonStudentPage";
import LoginPage from "./pages/LoginPage";
import { initOpenApi } from "./utils/api-helper";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { set } from "./stores/actions/roleActions";

function App() {
  const [userRole, setUserRole] = useState("");

  const parseToken = (token: string): { role: string } | null => {
    try {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      return {
        role: decodedToken.role,
      };
    } catch (error) {
      return null;
    }
  };

  initOpenApi();
  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
    }

    if (token) {
      const user = parseToken(token);
      setUserRole(user!.role);
    }
  }, []);

  return (
    <>
      <Navbar />
      <ToastContainer />
      <Routes>
        {/* <Route path="/" element={<HomePage />} /> */}

        {userRole == "Student" ? (
          <Route path="/" element={<StudentPage />} />
        ) : (
          <Route path="/" element={<LessonPage />} />
        )}
        <Route path="/user" element={<UserPage />} />
        <Route
          path="/assign-lesson-student/:lessonId"
          element={<AssignLessonStudentPage />}
        />
        {/* <Route path="/login" element={<LoginPage />} /> */}
      </Routes>
    </>
  );
}

export default App;
