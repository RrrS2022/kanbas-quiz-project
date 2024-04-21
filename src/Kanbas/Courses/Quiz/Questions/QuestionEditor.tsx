import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import "./QuizEditor.css";
import { IoMdAdd, IoMdMore, IoIosSearch } from "react-icons/io";
import { FaCheckCircle, FaEllipsisV, FaPlus, FaPencilAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import * as client from "./client";
import { KanbasState } from "../../../store";
import {
    addQuestion, setQuestions, updateQuestion
} from "./questionsReducer";
import MultipleChoices from "./MultipleChoice";
import MultipleBlanks from "./MultipleBlanks";
import TrueFalseQuestionEditor from "./TrueOrFalse";

export default function QuestionEditor() {
    const { quizId } = useParams();
    const [selectQuestionId, setSelectQuestionId] = useState("");
    const questionList = useSelector((state: KanbasState) =>
        state.questionReducer.questions);
    const question = useSelector((state: KanbasState) =>
        state.questionReducer.question);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [questionType, setQuestionType] = useState('multiple-choice');

    // interface Choice {
    //     text: string;
    //     isCorrect: boolean;
    //   }

    //   interface Question {
    //     _id?: string;
    //     title: string;
    //     type: string;
    //     points: number;
    //     question: string;
    //     choices: Choice[];
    //   }

    const renderQuestionEditor = () => {
        switch (questionType) {
            case 'multiple-choice':
                return <MultipleChoices />;
            case 'fill-in-the-bank':
                return <MultipleBlanks />;
            case 'true-false':
                return <TrueFalseQuestionEditor />;
            default:
                return null;
        }
    };


    useEffect(() => {
        if (quizId !== undefined) {
            client.findAllQuestionsForQuiz(quizId)
                .then((questions) => dispatch(setQuestions(questions)));
        }
    }, [quizId, dispatch]);

    const handleAddQuestion = () => {
        if (typeof quizId === 'string') {
            client.createQuestion(quizId, question).then((question) => {
                dispatch(addQuestion(question));
            });
        } else {
            console.error('courseId is undefined');
        }
    };


    // const handleEditQuestion = (questionId) => {
    //     // Set question to edit mode
    //     // depends on question type to render the editor 
    // };

    // const handleSaveQuestion = (questionId) => {
    //     const questionToSave = questionList.find(q => q._id === questionId);
    //     if (questionToSave) {
    //         dispatch(updateQuestion(questionToSave));
    //         // Optionally send the updated question to the backend via client API
    //     }
    // };




    return (
        <div className="quiz-question-editor">
            <div className="question-header">
                <input
                    type="text"
                    placeholder="Question Title"
                    className="question-title-input"
                />
                <select
                    className="question-type-select"
                    value={questionType}
                    onChange={(e) => setQuestionType(e.target.value)}
                >
                    <option value="multiple-choice">Multiple Choice</option>
                    <option value="true-false">True/False</option>
                    <option value="fill-in-the-bank">Fill In The Blank</option>
                </select>
                <label className="points-label">pts:</label>
                <input
                    type="number"
                    placeholder="1"
                    className="question-points-input"
                />
            </div>
            <hr />
            {renderQuestionEditor()}
        </div>
    );
};


    // return (
    //     <div className="quiz-container">
    //         <div className="header">
    //             <div className="spacer"></div>

    //             <span className="points">Points 0</span>
    //             <span className="status">Not Published</span>
    //             <button className="menu">
    //                 <IoMdMore />
    //             </button>
    //         </div>
    //         <hr />
    //         <div className="tabs">
    //             <button className="tab">Details</button>
    //             <button className="tab active">Questions</button>
    //         </div>

    //         {/* Question List */}
    //         <div>
    //             <table className="table">
    //                 <thead>
    //                     <tr>
    //                         <th scope="col">#</th>
    //                         <th scope="col">Title</th>
    //                         <th scope="col">Points</th>
    //                         <th scope="col">Question</th>
    //                         <th scope="col">Type</th>
    //                         <th scope="col">Choices</th>
    //                     </tr>
    //                 </thead>
    //                 <tbody>
    //                     {questionList.filter(question => question.quiz === quizId).map((question, index) => (
    //                         <tr key={question._id}>
    //                             <th scope="row">{index + 1}</th>
    //                             <td>{question.title}</td>
    //                             <td>{question.points}</td>
    //                             <td>{question.question}</td>
    //                             <td>{question.questionType}</td>
    //                             <td>
    //                                 <div className="choices-list">
    //                                     {question.choices.map((choice: Choice, index: number) => (
    //                                         <div key={index}>
    //                                             {choice.text} {choice.isCorrect ? '(Correct)' : ''}
    //                                         </div>
    //                                     ))}
    //                                 </div>
    //                             </td>
    //                         </tr>
    //                     ))}
    //                 </tbody>
    //             </table>
    //         </div>



    //         <div className="actions">
    //             <div className="spacer"></div>
    //             <button className="action-button" onClick={handleAddQuestion}>
    //                 <IoMdAdd /> New Question
    //             </button>
    //             <button className="action-button">
    //                 <IoMdAdd /> New Question Group
    //             </button>

    //             <button className="action-button">
    //                 <IoIosSearch />
    //                 Find Questions
    //             </button>
    //         </div>

    //         <hr />
    //         <div className="footer">
    //             <label className="notify-label">
    //                 <input type="checkbox" id="notify" />
    //                 <span>Notify users this quiz has changed</span>
    //             </label>
    //             <div className="footer-buttons">
    //                 <button className="cancel-button">Cancel</button>
    //                 <button className="save-publish-button">Save & Publish</button>
    //                 <button className="btn btn-danger">Save</button>
    //             </div>
    //         </div>
    //     </div>
    // );




