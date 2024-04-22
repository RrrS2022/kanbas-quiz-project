import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../../../store";
import { FiAlertCircle, FiArrowRight } from "react-icons/fi";
import { MdOutlineEdit } from "react-icons/md";
import "../../Assignments/index.css";
import { setQuestions } from "../Questions/questionsReducer";
import { findAllQuestionsForQuiz } from "../Questions/client";

export default function Preview() {
    const { quizId } = useParams();
    const dispatch = useDispatch();
    const quiz = useSelector((state: KanbasState) => 
        state.quizzesReducer.quiz);
    const questions = useSelector((state: KanbasState) =>
        state.questionReducer.questions); // This should be 'questions', not 'question'

    useEffect(() => {
        if (quizId) {
            findAllQuestionsForQuiz(quizId)
                .then(questions => {
                    dispatch(setQuestions(questions)); // Update the Redux store with the fetched questions
                })
                .catch(error => {
                    console.error("Failed to fetch questions", error);
                });
        }
    }, [quizId, dispatch]);

    return (
        <div>
            <h1>Quiz Preview Screen</h1>
            <h2>{quiz.title}</h2>
            <div style={{
                color: "#BC3518", backgroundColor: "#F6CEC5", height: "35px",
                display: "flex", alignItems: "center",
            }}>
                <p style={{ marginTop: "15px" }}>
                    <FiAlertCircle /> This is a preview of the published version of the quiz
                </p>
            </div>
            <br />
            <div>
                <p>Started: time</p> {/* Placeholder for actual time */}
            </div>
            <h1>Quiz Instructions</h1>
            <hr />
            {questions.map((question, index) => (
                <div key={question._id} className="container" style={{ border: "1px solid #ccc", margin: 0, padding: 0 }}>
                    <div style={{
                        display: "flex", justifyContent: "space-between", alignItems: "center",
                        backgroundColor: "lightgrey", margin: 0, padding: 10
                    }}>
                        <b> Question {index + 1} </b>
                        <p style={{ float: "right", margin: 0 }}> {question.points} pts </p>
                    </div>
                    <div style={{ margin: 0, padding: 10 }}>
                        {question.question}
                        <hr />
                        <div style={{ padding: 0 }}>
                            {question.options.map((option: any, idx: any) => (
                                <React.Fragment key={idx}>
                                    <input type="radio" name={`question_${index}`} value={option} />
                                    &#160; {option}
                                    <hr />
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
            <div style={{ padding: 0 }}>
                <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                    <button className="btn btn-light" style={{ float: "right", margin: "20px", border: "solid #ccc" }}>
                        Next <FiArrowRight />
                    </button>
                </div>
                <div className="form-group d-flex" style={{ border: "1px solid #ccc", height: "60px", display: "flex", alignItems: "center" }}>
                    <div style={{ flex: 1 }}></div>
                    <p style={{ marginTop: "15px", color: "grey" }}> Quiz saved at time </p>
                    <button className="btn btn-light" style={{
                        height: "40px", float: "right", border: "solid #ccc",
                        marginRight: "10px", marginLeft: "10px"
                    }}>
                        Submit Quiz
                    </button>
                </div>
            </div>
        </div>
    );
}
