import React from "react";
import { useSelector } from "react-redux";
import { KanbasState } from "../../../store";
import { FaBan, FaCheckCircle, FaEllipsisV } from "react-icons/fa";
import { Link, useParams, useLocation, Route, Routes } from "react-router-dom";
import QuizDetailsEditor from "./DetailsEditor";
import QuestionEditor from "./QuestionsEditor";

export default function QuizEditor () {
    const quiz = useSelector((state: KanbasState) => 
        state.quizzesReducer.quiz);
    const { courseId, quizId } = useParams();
    const location = useLocation();

    return (
        <div>
            <h1>Editor</h1>
            <div className="flex-column flex-fill">
                {/* top part  */}
                <div className="d-flex justify-content-end">
                    <h5 style={{marginRight:"10px"}}>Points {quiz.points}</h5>
                    {quiz.published ? (
                        <p style={{color:"green"}}><FaCheckCircle/> published</p>
                    ) : (<p style={{color:"grey"}}><FaBan />Not Published</p>)}
                    <button className="top-buttons"
                        style={{marginLeft:10, height:"20%"}}>
                        <FaEllipsisV />
                    </button>
                </div>
                <hr />
                {/** tab section */}
                <div className="nav nav-tabs">
                    <Link className={`nav-item nav-link ${location.pathname.includes('Details') ? 'active' : ''}`}
                        to={`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/Editor/Details`}
                        style={{ color: location.pathname.includes('Details') ? 'black' : 'red' }}>
                        Details
                    </Link>
                    <Link className="nav-item nav-link"
                        to={`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/Editor/Questions`}
                        style={{ color: location.pathname.includes('Questions') ? 'black' : 'red' }}>
                        Questions
                    </Link>
                </div>
                <Routes>
                    <Route path="/" element={<QuizDetailsEditor />} />
                    {/* <Route path="/Details" element={<QuizDetailsEditor />} />
                    <Route path="/Question" element={<QuestionEditor />} /> */}
                </Routes>
                <hr />
                <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                        <input className="form-check-input" type="checkbox" value="" id="defaultCheck1"
                            style={{marginRight:"5px"}} />
                        <label className="form-check-label" htmlFor="defaultCheck1"
                            style={{marginRight:"30x"}}>
                                Notify users this quiz has changed
                        </label>
                    </div>
                    <span className="float-right">
                        <Link to={`/Kanbas/Courses/${courseId}/Quizzes`}
                            className="btn btn-light"
                            style={{marginRight:"5px"}}>
                            Cancel
                        </Link>
                        <button className="btn btn-light"
                            style={{marginRight:"5px"}}>
                            Save&Publish
                        </button>
                        <button className="btn btn-danger">
                            Save
                        </button>
                    </span>

                </div>

            </div>
        </div>
    )
}