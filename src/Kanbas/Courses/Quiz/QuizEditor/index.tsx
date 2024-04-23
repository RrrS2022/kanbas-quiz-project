import React, { useState } from "react";
import { useDispatch, useSelector, } from "react-redux";
import { KanbasState } from "../../../store";
import { FaBan, FaCheckCircle, FaEllipsisV } from "react-icons/fa";
import { Link, useParams, useLocation, Route, Routes, useNavigate } from "react-router-dom";
import QuizDetailsEditor from "./DetailsEditor";
import * as quizClient from "../client";
import { addQuiz, selectQuiz, updateQuiz } from "../quizzesReducer";
import QuizQuestions from "../Questions";

export default function QuizEditor() {
    const quiz = useSelector((state: KanbasState) =>
        state.quizzesReducer.quiz);
    const { courseId, quizId } = useParams();
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [view, setView] = useState('details');


    const handleSave = async () => {
        console.log("save", quiz)
        if (quizId) {
            const status = await quizClient.updateQuiz(quiz);
            dispatch(updateQuiz(quiz));
        } else {
            console.error("cannot find quiz")
        }
        
        navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/`);
    };

    const handleSaveAndPublish = async () => {
        if (typeof courseId === 'string') {
            if (quizId) {
                if (!quiz.published) {
                    // If quiz is not published, then publish it
                    const updatedQuiz = { ...quiz, published: true };
                    const status = await quizClient.updateQuiz(updatedQuiz);
                    dispatch(updateQuiz(updatedQuiz));
                } else {
                    console.log('Quiz is already published');
                    const status = await quizClient.updateQuiz(quiz);
                    dispatch(updateQuiz(quiz));
                }
                
            } else {
                const newQuiz = await quizClient.createQuiz(courseId, quiz);
                dispatch(addQuiz(newQuiz));
            }
            navigate(`/Kanbas/Courses/${courseId}/Quizzes/`);
        } else {
            console.error('courseId is undefined');
        }
    };
    

    // const handleSaveAndPublish = () => {
    //     if (typeof courseId === 'string') {
    //         quizClient.createQuiz(courseId, quiz).then((quiz) => {
    //             dispatch(addQuiz(quiz));
    //         });
    //     } else {
    //         console.error('courseId is undefined');
    //     };
    //     navigate(`/Kanbas/Courses/${courseId}/Quizzes/`);
    // };

    return (
        <div>
            <h1>Editor</h1>
            <div className="flex-column flex-fill">
                {/* top part  */}
                <div className="d-flex justify-content-end">
                    <h5 style={{ marginRight: "10px" }}>Points {quiz.points}</h5>
                    {quiz.published ? (
                        <p style={{ color: "green" }}><FaCheckCircle /> published</p>
                    ) : (<p style={{ color: "grey" }}><FaBan />Not Published</p>)}
                    <button className="top-buttons"
                        style={{ marginLeft: 10, height: "20%" }}>
                        <FaEllipsisV />
                    </button>
                </div>
                <hr />
                {/** tab section */}
                <div className="nav nav-tabs">
                    <button onClick={() => setView('details')} className="btn btn-primary">
                        Details
                    </button>
                    <button onClick={() => setView('questions')} className="btn btn-secondary">
                        Questions
                    </button>
                </div>
                {/* Content Section */}
                {view === 'details' ? <QuizDetailsEditor /> : <QuizQuestions />}
                <hr />
                <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                        <input className="form-check-input" type="checkbox" value="" id="defaultCheck1"
                            style={{ marginRight: "5px" }} />
                        <label className="form-check-label" htmlFor="defaultCheck1"
                            style={{ marginRight: "30x" }}>
                            Notify users this quiz has changed
                        </label>
                    </div>
                    <span className="float-right">
                        <Link to={`/Kanbas/Courses/${courseId}/Quizzes`}
                            className="btn btn-light"
                            style={{ marginRight: "5px" }}>
                            Cancel
                        </Link>
                        <button className="btn btn-light"
                            style={{ marginRight: "5px" }}
                            onClick={handleSaveAndPublish}>
                            Save&Publish
                        </button>
                        <button className="btn btn-danger"
                            onClick={handleSave}>
                            Save
                        </button>
                    </span>

                </div>

            </div>
        </div>
    )
}