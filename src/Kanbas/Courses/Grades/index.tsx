import { assignments, enrollments, grades, users } from "../../Database";
import { useParams } from "react-router-dom";
import { FaDownload, FaUpload, FaCog } from 'react-icons/fa';


function Grades() {
    const { courseId } = useParams();
    const as = assignments.filter((assignment) => assignment.course === courseId);
    const es = enrollments.filter((enrollment) => enrollment.course === courseId);
    return (
        <div>
            <h1>Grades</h1>
            <div className="d-flex justify-content-end me-5">
                <div className="d-flex">
                    <button className="btn btn-light me-2">
                        <FaDownload aria-hidden="true" /> Import
                    </button>
                    <button className="btn btn-light me-2">
                        <FaUpload aria-hidden="true" /> Export
                    </button>
                    <button className="btn btn-light flex-fill">
                        <FaCog aria-hidden="true" />
                    </button>
                </div>
            </div>

            <div className="d-flex flex-column flex-md-row mb-2 me-2 ms-5">
                <div className="flex-fill mb-2 mb-md-0 me-md-2">
                    <label htmlFor="searchStudents" className="form-label">Student Names</label>
                    <input type="text" className="form-control" id="searchStudents" placeholder="Search Students" />
                </div>

                <div className="flex-fill mb-2 mb-md-0 ms-md-2">
                    <label htmlFor="searchAssignments" className="form-label">Assignment Names</label>
                    <input type="text" className="form-control" id="searchAssignments" placeholder="Search Assignments" />
                </div>
            </div>



            <div className="table-responsive">
                <table className="table table-bordered table-hover table-striped">
                    <thead className="thead-light">
                        <th>Student Name</th>
                        {as.map((assignment) => (<th>{assignment.title}</th>))}
                    </thead>
                    <tbody>
                        {es.map((enrollment) => {
                            const user = users.find((user) => user._id === enrollment.user);
                            return (
                                <tr>
                                    <td>{user?.firstName} {user?.lastName}</td>
                                    {as.map((assignment) => {
                                        const grade = grades.find(
                                            (grade) => grade.student === enrollment.user && grade.assignment === assignment._id);
                                        return (<td>{grade?.grade || ""}</td>);
                                    })}
                                </tr>);
                        })}
                    </tbody>
                </table>
            </div>
        </div>);
}
export default Grades;
