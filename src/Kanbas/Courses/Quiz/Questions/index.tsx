import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { FaCheckCircle, FaEllipsisV, FaPlus, FaPencilAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import * as client from "./client";
import { KanbasState } from "../../../store";
import {
    setQuestions
  } from "./questionsReducer";


function QuizQuestions() {
    const { quizId } = useParams();
    const [selectQuestionId, setSelectQuestionId] = useState("");
    const questionList = useSelector((state: KanbasState) =>
        state.questionReducer.questions);
    const question = useSelector((state: KanbasState) =>
        state.questionReducer.question);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (quizId !== undefined) {
          client.findAllQuestionsForQuiz(quizId)
            .then((questions) => dispatch(setQuestions(questions)));
        }
      }, [quizId]);

    return (
        <div className="list-group mb-3 me-5" style={{ borderRadius: '0' }}>
            <div className="d-flex justify-content-between align-items-center list-group-item"
                style={{ backgroundColor: 'lightgrey' }}>
                <div className="d-flex align-items-center">
                    <FaEllipsisV className="me-2" />
                    <h3 className="mb-0">Questions</h3>
                </div>
                <div>
                    <span className="border rounded px-2">10% of Total</span>
                    <button className="btn btn-light me-2"><FaEllipsisV /></button>
                </div>
            </div>
            {questionList.filter((question) => question.quiz === quizId).map((question, index) => (
                // <Link to={`/Kanbas/Courses/${courseId}/Assignments/${assignment._id}`}
                //   className="list-group-item list-group-item-action"
                //   key={assignment._id}
                //   onClick={() => dispatch(selectAssignment(assignment))}>
                //   <div className="d-flex justify-content-between align-items-center">
                //     <div className="d-flex align-items-center">
                //       <FaEllipsisV className="me-2" />
                //       <FaPencilAlt className="me-2" />
                //       <div>
                //         <h5 className="mb-1">{assignment.title}</h5>
                //         <p className="mb-0">Multiple modules | Not available yet | 100pts</p>
                //       </div>
                //     </div>
                //     <div>
                //       <FaCheckCircle className="me-2" />
                //       <FaEllipsisV className="me-2" />
                //       <button
                //         onClick={(event) => handleDelete(event, assignment._id)}
                //         className="btn btn-danger">
                //         Delete
                //       </button>
                //     </div>
                //   </div>
                // </Link>

                <div>
                    {question.title}
                </div>
            ))}
        </div>
    );
}

export default QuizQuestions;
