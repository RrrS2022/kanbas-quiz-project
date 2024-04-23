import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../../../store";
import { FiAlertCircle, FiArrowRight, FiArrowLeft } from "react-icons/fi";
import { MdOutlineEdit } from "react-icons/md";
import "../../Assignments/index.css";
import { setQuestions } from "../Questions/questionsReducer";
import { findAllQuestionsForQuiz } from "../Questions/client";
import { FaRegQuestionCircle } from 'react-icons/fa';

export default function Preview() {
    const { courseId, quizId } = useParams();
    const navigate = useNavigate();
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

    const handleSelectQuestion = (index: number) => {
        setCurrentQuestionIndex(index);
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleSubmit = () => {
        navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}`)
    }

    const handleEdit = () => {
        navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/Editor`)
    }

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
                            {currentQuestion.questionType === "BLANKS" ? (
                                <div className="" style={{ margin: 0, padding: 10 }}>
                                    Please fill in the correct answer in the box below:
                                    <hr />
                                    <div style={{ padding: "10px 0" }}>
                                        <input
                                            type="text"
                                            className="form-control"
                                            style={{ width: "100%", padding: "30px", margin: "10px 0" }}
                                            placeholder="Enter your answer here"
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div style={{ padding: 0 }}>
                                    {currentQuestion.options.map((option: any, idx: any) => (
                                        <React.Fragment key={idx}>
                                            <input type="radio" name={`question_${currentQuestionIndex}`} value={option} />
                                            &#160; {option}
                                            <hr />
                                        </React.Fragment>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "20px" }}>
                        <button className="btn btn-light" onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>
                            <FiArrowLeft /> Previous
                        </button>
                        <button className="btn btn-light" onClick={handleNextQuestion} disabled={currentQuestionIndex === questions.length - 1}>
                            Next <FiArrowRight />
                        </button>
                    </div>
                </div>

            )}

            <div className="form-group d-flex"
                style={{ border: "1px solid #ccc", height: "60px", display: "flex", alignItems: "center" }}>
                <div style={{ flex: 1 }}></div>
                <p style={{ marginTop: "15px", color: "grey" }}> Quiz saved at time </p>
                <button className="btn btn-light"
                    style={{
                        height: "40px", float: "right", border: "solid #ccc",
                        marginRight: "10px", marginLeft: "10px"
                    }}
                    onClick={handleSubmit}>
                    Submit Quiz
                </button>
            </div>
            <div className="form-group d-flex"
                style={{
                    border: "1px solid #ccc", height: "30px",
                    backgroundColor: "lightgray", display: "flex", alignItems: "center",
                    margin: "20px", padding: 0, cursor: "pointer"
                }}
                onClick={handleEdit}>
                <MdOutlineEdit />&#160; Keep Editing This Quiz
            </div>

            <div>
                {questions.map((question, index) => (
                    <div key={index} onClick={() => handleSelectQuestion(index)}>
                        <FaRegQuestionCircle />&#160;<b style={{color:"#BC3518", cursor: "pointer"}}>Question {index + 1}</b><br />
                    </div>
                ))}
            </div>
        </div>
    );
}
