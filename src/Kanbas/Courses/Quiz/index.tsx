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

  const handleAddClick = (() => {
    navigate(`/Kanbas/Courses/${courseId}/Quiz/newQuiz`);
  })

  const handleDeleteQuiz = (quizId: string) => {
    client.deleteQuiz(quizId).then((status) => {
      dispatch(deleteQuiz(quizId));
    });
  };
  useEffect(() => {
    if (courseId !== undefined) {
      client.findQuizzesForCourse(courseId)
        .then((quizzes) => dispatch(setQuiz(quizzes)));
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
          <p>Do you want to delete this quiz?</p>
          <button onClick={onConfirm} className="btn btn-success"> Yes</button>
          <button onClick={onCancel} className="btn btn-secondary">No</button>
        </div>
      </div>
    );
  }
  const handleDelete = (
    event: React.MouseEvent<HTMLButtonElement>,
    quizId: string
  ) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDialogOpen(true);
    setSelectQuizId(quizId);
  };

  const handleDeleteConfirm = () => {
    handleDeleteQuiz(selectQuizId);
    setIsDialogOpen(false);
    setSelectQuizId("");
  };
  console.log(quizList)



  return (

    <div className="list-group mb-3 me-5" style={{ borderRadius: '0' }}>
      <ConfirmPopUp
        isOpen={isDialogOpen}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setIsDialogOpen(false)} />

      {/* Add Quiz  */}
      <div className="d-flex justify-content-end align-items-right">
        <button className="btn me-2 btn-danger" onClick={handleAddClick}> Add Quiz<FaPlus /></button>
      </div>

      {/* Table Header*/}
      <div className="d-flex justify-content-between align-items-center list-group-item"
        style={{ backgroundColor: 'lightgrey' }}>
        <div className="d-flex align-items-center">
          <FaEllipsisV className="me-2" />
          <h3 className="mb-0">Assignment Quizzes</h3>
        </div>
        <div>
          <span className="border rounded px-2">20% of Total</span>
          <button className="btn btn-light me-2"><FaEllipsisV /></button>
        </div>
      </div>


      {/* Table content - quiz list  */}
      {quizList.filter((quiz) => quiz.course === courseId).map((quiz, index) => (
      <div key={quiz._id} className="list-group-item list-group-item-action">
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
            <div className="btn-group">
              <button type="button" className="btn dropdown-toggle" data-toggle="dropdown" aria-haspopup="false" aria-expanded="true">
                <FaEllipsisV className="me-2" />
              </button>
              <div className="dropdown-menu">
                <Link className="dropdown-item" to={`/Kanbas/Courses/${courseId}/Quiz/${quiz._id}`}>Edit</Link>
                <button onClick={(event) => handleDelete(event, quiz._id)} className="dropdown-item">Delete</button>
                <a className="dropdown-item" href="#">Publish</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    ))}
    </div >
  );
}

export default Quiz;