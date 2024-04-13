import React, { useEffect, useState } from "react";
import { FaCheckCircle, FaPlusCircle, FaPlus, FaEllipsisV, FaPencilAlt } from "react-icons/fa";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./index.css";
import {
  addAssignment, deleteAssignment,
  updateAssignment, selectAssignment,
  setAssignments
} from "./assignmentsReducer";
import { KanbasState } from "../../store";
import * as client from "./client";

function Assignments() {
  const { courseId } = useParams();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectAssignmentId, setSelectAssignmentId] = useState("");
  const assignmentList = useSelector((state: KanbasState) =>
    state.assignmentsReducer.assignments);
  const assignment = useSelector((state: KanbasState) =>
    state.assignmentsReducer.assignment);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddClick = (() => {
    navigate(`/Kanbas/Courses/${courseId}/Assignments/newAssignment`);
  })
  const handleDeleteAssignment = (assignmentId: string) => {
    client.deleteAssignment(assignmentId).then((status) => {
      dispatch(deleteAssignment(assignmentId));
    });
  };
  useEffect(() => {
    if (courseId !== undefined) {
      client.findAssignmentsForCourse(courseId)
        .then((assignments) => dispatch(setAssignments(assignments)));
    }
  }, [courseId]);


  interface ConfirmDialogs {
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
  }

  function ConfirmPopUp({ isOpen, onConfirm, onCancel }: ConfirmDialogs) {
    if (!isOpen) return null;

    return (
      <div className="alert alert-danger">
        <div>
          <p>Do you want to delete this assignment?</p>
          <button onClick={onConfirm} className="btn btn-success"> Yes</button>
          <button onClick={onCancel} className="btn btn-secondary">No</button>
        </div>
      </div>
    );
  }
  const handleDelete = (
    event: React.MouseEvent<HTMLButtonElement>,
    assignmentId: string
  ) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDialogOpen(true);
    setSelectAssignmentId(assignmentId);
  };

  const handleDeleteConfirm = () => {
    handleDeleteAssignment(selectAssignmentId);
    setIsDialogOpen(false);
    setSelectAssignmentId("");
  };

  console.log(assignmentList)


  return (

    <div className="list-group mb-3 me-5" style={{ borderRadius: '0' }}>
      <ConfirmPopUp
        isOpen={isDialogOpen}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setIsDialogOpen(false)} />
      <div className="d-flex justify-content-between align-items-center list-group-item"
        style={{ backgroundColor: 'lightgrey' }}>
        <div className="d-flex align-items-center">
          <FaEllipsisV className="me-2" />
          <h3 className="mb-0">Assignments</h3>
        </div>
        <div>
          <span className="border rounded px-2">40% of Total</span>
          <button className="btn btn-light me-2" onClick={handleAddClick}><FaPlus /></button>

          {/* <button className="btn btn-light me-2" onClick={handleAddAssignment}>
            Add
          </button> */}

          <button className="btn btn-light me-2"><FaEllipsisV /></button>
        </div>
      </div>
      {assignmentList.filter((assignment) => assignment.course === courseId).map((assignment, index) => (
        <Link to={`/Kanbas/Courses/${courseId}/Assignments/${assignment._id}`}
          className="list-group-item list-group-item-action"
          key={assignment._id}
          onClick={() => dispatch(selectAssignment(assignment))}>
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <FaEllipsisV className="me-2" />
              <FaPencilAlt className="me-2" />
              <div>
                <h5 className="mb-1">{assignment.title}</h5>
                <p className="mb-0">Multiple modules | Not available yet | 100pts</p>
              </div>
            </div>
            <div>
              <FaCheckCircle className="me-2" />
              <FaEllipsisV className="me-2" />
              <button
                onClick={(event) => handleDelete(event, assignment._id)}
                className="btn btn-danger">
                Delete
              </button>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
export default Assignments;