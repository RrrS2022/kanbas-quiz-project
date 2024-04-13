// import { Link, useLocation } from "react-router-dom";
// import "./index.css";
// function CourseNavigation() {
//   const links = ["Home", "Modules", "Piazza", "Grades", "Assignments"];
//   const { pathname } = useLocation();
//   return (
//     <ul className="wd-navigation">
//       {links.map((link, index) => (
//         <li key={index} className={pathname.includes(link) ? "wd-active" : ""}>
//           <Link to={link}>{link}</Link>
//         </li>
//       ))}
//     </ul>
//   );
// }
// export default CourseNavigation;
import { Link, useLocation } from "react-router-dom";
import "./index.css"; // feel free to use the CSS from previous assignments
import { FaEyeSlash } from "react-icons/fa";
function CourseNavigation() {
  const links = ["Home", "Modules", "Piazza", "Zoom Meetings", "Assignments", 
    "Quizzes", "Grades",  "People", "Panopto Video", "Discussion", "Announcement",
    "Pages", "Files", "Rubrics", "Outcomes", "Collaborations", "Syllabus", "Settings"];

  const linksWithEyeSlash = ["Discussion", "Announcement", "Pages", "Files", "Rubrics",
      "Outcomes", "Collabrations", "Syllabus"];

  const { pathname } = useLocation();
  return (
    <ul className="wd-navigation">
      {links.map((link, index) => (
        <li key={index} className={pathname.includes(link) ? "wd-active" : ""}>
          <Link to={link}>{link}</Link>
          {linksWithEyeSlash.includes(link) && (
            <span className="float-end" style={{ marginLeft: "auto" }}>
              <FaEyeSlash />
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
export default CourseNavigation;