// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams, Link } from "react-router-dom";
// import "./QuizEditor.css";
// import { IoMdAdd, IoMdMore, IoIosSearch } from "react-icons/io";
// import { FaCheckCircle, FaEllipsisV, FaPlus, FaPencilAlt } from "react-icons/fa";
// import { useSelector, useDispatch } from "react-redux";
// import * as client from "./client";
// import { KanbasState } from "../../../store";
// import {
//     addQuestion, setQuestions, updateQuestion
// } from "./questionsReducer";
// import MultipleChoices from "./MultipleChoice";
// import MultipleBlanks from "./MultipleBlanks";
// import TrueFalseQuestionEditor from "./TrueOrFalse";



// interface QuestionEditorProps {
//     onCancel: () => void;
//     onSave: () => void;
// }

const QuestionEditor = () => {
//     const { quizId } = useParams();
//     const [selectQuestionId, setSelectQuestionId] = useState("");
//     const questionList = useSelector((state: KanbasState) =>
//         state.questionReducer.questions);
//     const question = useSelector((state: KanbasState) =>
//         state.questionReducer.question);
//     const navigate = useNavigate();
//     const [questionType, setQuestionType] = useState('multiple-choice');
//     const dispatch = useDispatch();

//     // interface Choice {
//     //     text: string;
//     //     isCorrect: boolean;
//     //   }

//     //   interface Question {
//     //     _id?: string;
//     //     title: string;
//     //     type: string;
//     //     points: number;
//     //     question: string;
//     //     choices: Choice[];
//     //   }

//     const renderQuestionEditor = () => {
//         switch (questionType) {
//             case 'multiple-choice':
//                 return <MultipleChoices onCancel={onCancel} onSave={onSave} />;
//             case 'fill-in-the-bank':
//                 return <MultipleBlanks onCancel={onCancel} onSave={onSave} />;
//             case 'true-false':
//                 return <TrueFalseQuestionEditor onCancel={onCancel} onSave={onSave} />;
//             default:
//                 return null;
//         }
//     };


//     useEffect(() => {
//         if (quizId !== undefined) {
//             client.findAllQuestionsForQuiz(quizId)
//                 .then((questions) => dispatch(setQuestions(questions)));
//         }
//     }, [quizId, dispatch]);

//     const handleAddQuestion = () => {
//         if (typeof quizId === 'string') {
//             client.createQuestion(quizId, question).then((question) => {
//                 dispatch(addQuestion(question));
//             });
//         } else {
//             console.error('courseId is undefined');
//         }
//     };

//     return (
//         <div className="quiz-question-editor">
//             <div className="question-header">
//                 <input
//                     type="text"
//                     placeholder="Question Title"
//                     className="question-title-input"
//                 />
//                 <select
//                     className="question-type-select"
//                     value={questionType}
//                     onChange={(e) => setQuestionType(e.target.value)}
//                 >
//                     <option value="multiple-choice">Multiple Choice</option>
//                     <option value="true-false">True/False</option>
//                     <option value="fill-in-the-bank">Fill In The Blank</option>
//                 </select>
//                 <label className="points-label">pts:</label>
//                 <input
//                     type="number"
//                     placeholder="1"
//                     className="question-points-input"
//                 />
//             </div>
//             <hr />
//             {renderQuestionEditor()}
//             <div className="question-footer">
//                 <button className="cancel-button">Cancel</button>
//                 <button className="update-question-button">Update Question</button>
//             </div>
//         </div>
//     );
};

export default QuestionEditor;