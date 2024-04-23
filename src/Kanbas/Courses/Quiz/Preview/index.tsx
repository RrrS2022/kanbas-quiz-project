import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../../../store";
import { FiAlertCircle, FiArrowRight, FiArrowLeft } from "react-icons/fi";
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
        state.questionReducer.questions);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

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

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const currentQuestion = questions[currentQuestionIndex];

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
            {currentQuestion && (
                <div className="container" style={{ border: "1px solid #ccc", margin: 0, padding: 0 }}>
                    <div
                        style={{
                            display: "flex", justifyContent: "space-between", alignItems: "center",
                            backgroundColor: "lightgrey", margin: 0, padding: 10
                        }}>
                        <b> Question {currentQuestionIndex + 1} </b>
                        <p style={{ float: "right", margin: 0 }}> {currentQuestion.points} pts </p>
                    </div>
                    <div style={{ margin: 0, padding: 10 }}>
                        {currentQuestion.question}
                        <hr />
                        <div style={{ padding: 0 }}>
                            {currentQuestion.options.map((option: any, idx:any) => (
                                <React.Fragment key={idx}>
                                    <input type="radio" name={`question_${currentQuestionIndex}`} value={option} />
                                    &#160; {option}
                                    <hr />
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "20px" }}>
                <button className="btn btn-light" onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>
                    <FiArrowLeft /> Previous
                </button>
                <button className="btn btn-light" onClick={handleNextQuestion} disabled={currentQuestionIndex === questions.length - 1}>
                    Next <FiArrowRight />
                </button>
            </div>
        </div>
    );
}
