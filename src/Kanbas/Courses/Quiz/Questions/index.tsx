import React, { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { FaCheckCircle, FaEllipsisV, FaPlus, FaPencilAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
// import {
//   addAssignment, deleteAssignment,
//   updateAssignment, selectAssignment
// } from ".././assignmentsReducer";
import { KanbasState } from "../../../store";
import * as client from "../client";

function QuizQuestions() {
    //   const { courseId, assignmentId } = useParams();
    //   const navigate = useNavigate();

    //   const assignmentList = useSelector((state: KanbasState) =>
    //     state.assignmentsReducer.assignments);
    //   const assignment = useSelector((state: KanbasState) =>
    //     state.assignmentsReducer.assignment);
    //   const dispatch = useDispatch();

    //   const handleAddAssignment = () => {
    //     if (typeof courseId === 'string') {
    //       client.createAssignment(courseId, assignment).then((assignment) => {
    //         dispatch(addAssignment(assignment));
    //       });
    //     } else {
    //       console.error('courseId is undefined');
    //     }
    //   };


    //   const handleUpdateAssignment = async () => {
    //     const status = await client.updateAssignment(assignment);
    //     dispatch(updateAssignment(assignment));
    //   };

    //   const handleSave = () => {
    //     if (assignmentId === "newAssignment") {
    //       handleAddAssignment();
    //     } else {
    //       handleUpdateAssignment();
    //     }

    //     navigate(`/Kanbas/Courses/${courseId}/Assignments`);
    // };

    return (
        <div className="ms-5 me-5">
            <div className="d-flex justify-content-end">
                <span style={{ color: 'green' }}><FaCheckCircle />Published</span>
                <button type="button" className="btn btn-light"><FaEllipsisV /></button>
            </div>
            <hr />
            <form>
                <table className="table">
                    <tbody>
                        <tr>
                            <td><label htmlFor="assignmentName" className="form-label">Quiz Name</label></td>
                            {/* <td><input
                                type="text"
                                className="form-control"
                                id="assignmentName"
                                value={assignment.title}
                                onChange={(e) =>
                                    dispatch(selectAssignment({ ...assignment, title: e.target.value }))}
                            /></td> */}
                        </tr>

                        <tr>
                            <td><label htmlFor="assignmentDescription" className="form-label">Assignment Description</label>
                            </td>
                            {/* <td>
                                <textarea
                                    className="form-control"
                                    id="assignmentDescription"
                                    value={assignment.description}
                                    onChange={(e) => dispatch(selectAssignment({ ...assignment, description: e.target.value }))}

                                />
                            </td> */}
                        </tr>

                        <tr>
                            <td><label htmlFor="points" className="form-label">Points</label></td>
                            {/* <td>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="points"
                                    value={assignment.points}
                                    onChange={(e) => dispatch(selectAssignment({ ...assignment, points: e.target.value }))}
                                />
                            </td> */}
                        </tr>

                        <tr>
                            <td><label htmlFor="due" className="form-label">Due</label></td>
                            {/* <td>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="dueDate"
                                    value={assignment.dueDate}
                                    onChange={(e) => dispatch(selectAssignment({ ...assignment, dueDate: e.target.value }))}
                                />
                            </td> */}
                        </tr>

                        <tr>
                            <td><label htmlFor="availableFromDate" className="form-label">Available From</label></td>
                            {/* <td>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="availableFromDate"
                                    value={assignment.availableFromDate}
                                    onChange={(e) => dispatch(selectAssignment({ ...assignment, availableFromDate: e.target.value }))}
                                />
                            </td> */}
                        </tr>

                        <tr>
                            <td>
                                <label htmlFor="availableUntilDate" className="form-label">Available Until</label></td>
                            {/* <td>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="availableUntilDate"
                                    value={assignment.availableUntilDate}
                                    onChange={(e) => dispatch(selectAssignment({ ...assignment, availableUntilDate: e.target.value }))}
                                />
                            </td> */}
                        </tr>

                        <div className="d-flex justify-content-between">
                            {/* <button onClick={handleSave} type="submit"
                                className="btn btn-success ms-2 float-end">
                                Save
                            </button>
                            <Link to={`/Kanbas/Courses/${courseId}/Assignments`}
                                className="btn btn-danger ms-2 float-end">
                                Cancel
                            </Link> */}

                        </div>

                    </tbody>
                </table>
            </form>
        </div>
    );
}

export default QuizQuestions;
