import { courses } from "../../Kanbas/Database";
import {
  Navigate,
  Route,
  Routes,
  useParams,
  useLocation,
} from "react-router-dom";
import { HiMiniBars3 } from "react-icons/hi2";
import CourseNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import Grades from "./Grades";
import CourseStatus from "./Status";
import "./index.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Quiz from "./Quiz";
import QuizDetails from "./Quiz/Details";
import QuizQuestions from "./Quiz/Questions";
import QuizEditor from "./Quiz/QuizEditor";
import QuizDetailsEditor from "./Quiz/QuizEditor/DetailsEditor";
import Preview from "./Quiz/Preview";

function Courses() {
  const { courseId } = useParams();
  const location = useLocation();
  // const course = courses.find((course) => course._id === courseId);
  const API_BASE = process.env.REACT_APP_API_BASE;
  const COURSES_API = `${API_BASE}/api/courses`;

  const [course, setCourse] = useState<any>({ _id: "" });
  const findCourseById = async (courseId?: string) => {
    const response = await axios.get(`${COURSES_API}/${courseId}`);
    setCourse(response.data);
  };

  const pathSegments = location.pathname.split("/");
  const currentPage = pathSegments[pathSegments.length - 1];
  const formatPageTitle = (page: string): string => {
    if (page === "") return "Home";
    return page.charAt(0).toUpperCase() + page.slice(1);
  };

  useEffect(() => {
    findCourseById(courseId);
  }, [courseId]);

  return (
    <div>
      <div>
        <div className="courseTitle">
          <h4 className="menu"><HiMiniBars3 /></h4>
          <h4>{course?.number} {course?.name} <span>{formatPageTitle(currentPage)}</span></h4>
        </div>

        <div className="row">
          <div className="col-md-2">
            <CourseNavigation />
          </div>
          <div className="col-md-8">
            <div
              className=" bottom-0 end-0"
              style={{ left: "320px", top: "50px" }} >
              <Routes>
                <Route path="/" element={<Navigate to="Home" />} />
                <Route path="Home" element={<Home />} />
                <Route path="Modules" element={<Modules />} />
                <Route path="Piazza" element={<h1>Piazza</h1>} />
                <Route path="Assignments" element={<Assignments />} />
                <Route path="Quizzes" element={<Quiz />} />
                <Route path="Quizzes/:quizId" element={<QuizDetails />} />
                <Route path="Quizzes/:quizId/Editor" element={<QuizEditor />} />
                {/* <Route path="Quizzes/:quizId/Editor/" element={<QuizDetailsEditor />} /> */}
                <Route path="Quizzes/:quizId/Editor/Details" element={<QuizDetailsEditor />} />
                <Route path="Quizzes/:quizId/Editor/Questions" element={<QuizQuestions />} />
                <Route path="Quizzes/:quizId/Preview" element={<Preview />} />
                <Route path="Quizzes/:quizId/questions" element={<QuizQuestions />} />
                <Route path="Assignments/:assignmentId" element={<AssignmentEditor />} />
                <Route path="Grades" element={<Grades />} />
              </Routes>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
export default Courses;
