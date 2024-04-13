import React, { useEffect, useState } from "react";
import { FaCheckCircle, FaPlusCircle, FaPlus, FaEllipsisV, FaPencilAlt } from "react-icons/fa";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./index.css";
import {
    addQuiz, deleteQuiz,
    updateQuiz, selectQuiz, setQuiz
} from "./quizzesReducer";
import { KanbasState } from "../../store";
import * as client from "./client";

function Quiz() {
    const { courseId } = useParams();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectQuizId, setSelectQuizId] = useState("");
    const quizList = useSelector((state: KanbasState) =>
      state.quizzesReducer.quizzes);
    const quiz = useSelector((state: KanbasState) =>
      state.quizzesReducer.quiz);
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    // const handleAddClick = (() => {
    //   navigate(`/Kanbas/Courses/${courseId}/Assignments/newAssignment`);
    // })

    // const handleDeleteAssignment = (assignmentId: string) => {
    //   client.deleteAssignment(assignmentId).then((status) => {
    //     dispatch(deleteAssignment(assignmentId));
    //   });
    // };
    useEffect(() => {
      if (courseId !== undefined) {
        client.findQuizzesForCourse(courseId)
          .then((quizzes) => dispatch(setQuiz(quizzes)));
      }
    }, [courseId]);
  
  
    // interface ConfirmDialogs {
    //   isOpen: boolean;
    //   onConfirm: () => void;
    //   onCancel: () => void;
    // }
  
    // function ConfirmPopUp({ isOpen, onConfirm, onCancel }: ConfirmDialogs) {
    //   if (!isOpen) return null;
  
    //   return (
    //     <div className="alert alert-danger">
    //       <div>
    //         <p>Do you want to delete this assignment?</p>
    //         <button onClick={onConfirm} className="btn btn-success"> Yes</button>
    //         <button onClick={onCancel} className="btn btn-secondary">No</button>
    //       </div>
    //     </div>
    //   );
    // }
    // const handleDelete = (
    //   event: React.MouseEvent<HTMLButtonElement>,
    //   assignmentId: string
    // ) => {
    //   event.preventDefault();
    //   event.stopPropagation();
    //   setIsDialogOpen(true);
    //   setSelectAssignmentId(assignmentId);
    // };
  
    // const handleDeleteConfirm = () => {
    //   handleDeleteAssignment(selectAssignmentId);
    //   setIsDialogOpen(false);
    //   setSelectAssignmentId("");
    // };
    console.log(quizList)
  
  
  
    return (
  
      <div className="list-group mb-3 me-5" style={{ borderRadius: '0' }}>
        {/* <ConfirmPopUp
          isOpen={isDialogOpen}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setIsDialogOpen(false)} /> */}
        <div className="d-flex justify-content-between align-items-center list-group-item"
          style={{ backgroundColor: 'lightgrey' }}>
          <div className="d-flex align-items-center">
            <FaEllipsisV className="me-2" />
            <h3 className="mb-0">Quizzes</h3>
          </div>
          <div>
            <span className="border rounded px-2">20% of Total</span>
            <button className="btn btn-light me-2" ><FaPlus /></button>
  
            {/* <button className="btn btn-light me-2" onClick={handleAddAssignment}>
              Add
            </button> */}
  
            <button className="btn btn-light me-2"><FaEllipsisV /></button>
          </div>
        </div>
        {quizList.filter((quiz) => quiz.course === courseId).map((quiz, index) => (
          // <Link to={`/Kanbas/Courses/${courseId}/Quiz/${quiz._id}`}
          //   className="list-group-item list-group-item-action"
          //   key={quiz._id}
          //   onClick={() => dispatch(selectQuiz(quiz))}>
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <FaEllipsisV className="me-2" />
                <FaPencilAlt className="me-2" />
                <div>
                  <h5 className="mb-1">{quiz.title}</h5>
                  <p className="mb-0">Multiple modules | Not available yet | 100pts</p>
                </div>
              </div>
              <div>
                <FaCheckCircle className="me-2" />
                <FaEllipsisV className="me-2" />
                <button
                  className="btn btn-danger">
                  Delete
                </button>
              </div>
            </div>
          // </Link>
        ))}
      </div>
    );
}

export default Quiz;