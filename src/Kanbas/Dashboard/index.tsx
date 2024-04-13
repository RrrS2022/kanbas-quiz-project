import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as db from "../Database";

function Dashboard({ courses, course, setCourse, addNewCourse,
    deleteCourse, updateCourse }: {
        courses: any[]; course: any; setCourse: (course: any) => void;
        addNewCourse: () => void; deleteCourse: (course: any) => void;
        updateCourse: () => void;
    }) {
    return (
        <div className="p-4">
            <h1>Dashboard</h1>

            <form className="border rounded p-3">

                <h5>Course</h5>
                <input value={course.name} className="form-control"
                    onChange={(e) => setCourse({ ...course, name: e.target.value })} />
                <input value={course.number} className="form-control"
                    onChange={(e) => setCourse({ ...course, number: e.target.value })} />
                <input value={course.startDate} className="form-control" type="date"
                    onChange={(e) => setCourse({ ...course, startDate: e.target.value })} />
                <input value={course.endDate} className="form-control" type="date"
                    onChange={(e) => setCourse({ ...course, endDate: e.target.value })} />

                <div className="d-flex">
                    <button className="btn btn-primary m-3" onClick={addNewCourse} >
                        Add
                    </button>

                    <button className="btn btn-success m-3" onClick={updateCourse} >
                        Update
                    </button>
                </div>
            </form>


            <hr />
            <h2>Published Courses (12)</h2>
            <hr />
            <div className="row">
                <div className="row row-cols-1 row-cols-md-5 g-4">
                    {courses.map((course) => (
                        <div key={course._id} className="col" style={{ width: "300px" }}>
                            <div className="card">
                                <img src={`/images/${course.image}`} className="card-img-top" style={{ maxHeight: "150px" }} />
                                <div className="card-body">
                                    <Link to={`/Kanbas/Courses/${course._id}/Home`}
                                        className="card-title"
                                        style={{ textDecoration: "none", color: "navy", fontWeight: "bold" }}>
                                        <div className="d-flex justify-content-end">
                                            <button className="btn btn-success btn-sm" onClick={(event) => {
                                                event.preventDefault();
                                                setCourse(course);
                                            }}>
                                                Edit
                                            </button>

                                            <button className="btn btn-danger btn-sm" onClick={(event) => {
                                                event.preventDefault();
                                                deleteCourse(course._id);
                                            }}>
                                                Delete
                                            </button>
                                        </div>
                                        {course.name}
                                    </Link>
                                    <h5 className="card-subtitle mb-2 text-muted">{course.number}</h5>
                                    <h6 className="card-text mb-2 text-muted">202430_2 Spring2024</h6>
                                    <Link to={`/Kanbas/Courses/${course._id}/Home`} className="btn btn-primary">
                                        Go
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
export default Dashboard;