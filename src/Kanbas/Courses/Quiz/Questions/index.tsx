import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import "./QuizEditor.css";
import { IoMdAdd, IoMdMore, IoIosSearch } from "react-icons/io";
import { FaCheckCircle, FaEllipsisV, FaPlus, FaPencilAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import * as client from "./client";
import { KanbasState } from "../../../store";
import {
    addQuestion, setQuestions, updateQuestion,
} from "./questionsReducer";
import { IoIosAdd } from "react-icons/io";
import { MdDelete, MdEdit } from "react-icons/md";
import "./index.css";


interface Question {
    _id?: string;
    title: string;
    type: string;
    points: number;
    question: string;
    options: string[]; 
    answers: string; 
}

interface QuestionEditorProps {
    question: Question;
    setQuestion: (question: Question) => void;
}

interface QuestionEditorProps {
    question: Question;
    setQuestion: (question: Question) => void;
}


const TrueFalseQuestionEditor: React.FC<QuestionEditorProps> = ({ question, setQuestion }) => {
    const handleInputChange = (e: any) => {
        setQuestion({ ...question, answers: e.target.value });
    };

    return (
        <div className="quiz-question-editor">
            <div className="question-body">
                <label className="question-label">Question:</label>
                <textarea
                    name="question"
                    value={question.question}
                    onChange={(e) => setQuestion({ ...question, question: e.target.value })}
                    placeholder="Enter your question"
                    className="question-textarea"
                ></textarea>
            </div>
            <div className="answers-section">
                <label className="answers-label">Answers:</label>
                <div className="answer-options">
                    <label className="answer-option">
                        <input
                            type="radio"
                            name="answers"
                            value="True"
                            defaultChecked={question.answers[0] === "True"}
                            onChange={handleInputChange}
                        /> True
                    </label>
                    <label className="answer-option">
                        <input
                            type="radio"
                            name="answers"
                            value="False"
                            defaultChecked={question.answers[0] === "False"}
                            onChange={handleInputChange}
                        /> False
                    </label>
                </div>
            </div>
        </div>
    );
};


const MultipleChoices: React.FC<QuestionEditorProps> = ({ question, setQuestion }) => {
    const handleInputChange = (e: any) => {
        setQuestion({ ...question, [e.target.name]: e.target.value });
    };

    const handleOptionChange = (index: any, value: any) => {
        const newOptions = [...question.options];
        newOptions[index] = value;
        setQuestion({ ...question, options: newOptions });
    };

    return (
        <div className="quiz-question-editor">
            <div className="question-body">
                <label className="question-label">Question:</label>
                <textarea
                    name="question"
                    value={question.question}
                    onChange={handleInputChange}
                    placeholder="Enter your question"
                    className="question-textarea"
                ></textarea>
            </div>
            {question.options.map((option, index) => (
                <div key={index}>
                    <input
                        type="text"
                        value={option}
                        onChange={(e) => handleOptionChange(index, e.target.value)}
                        className="option-input"
                    />
                </div>
            ))}
            <button onClick={() => setQuestion({
                ...question,
                options: [...question.options, '']
            })}>Add Option</button>
        </div>
    );
};


const MultipleBlanks: React.FC<QuestionEditorProps> = ({ question, setQuestion }) => {
    const handleInputChange = (e: any) => {
        setQuestion({ ...question, [e.target.name]: e.target.value });
    };

    const handleBlankChange = (index: any, value: any) => {
        const newBlanks = [...question.options];
        newBlanks[index] = value;
        setQuestion({ ...question, options: newBlanks });
    };

    return (
        <div className="quiz-question-editor">
            <div className="question-body">
                <label className="question-label">Question:</label>
                <textarea
                    name="question"
                    value={question.question}
                    onChange={handleInputChange}
                    placeholder="Enter your question"
                    className="question-textarea"
                ></textarea>
            </div>
            {question.options.map((blank, index) => (
                <div key={index}>
                    <input
                        type="text"
                        value={blank}
                        onChange={(e) => handleBlankChange(index, e.target.value)}
                        className="blank-input"
                    />
                </div>
            ))}
            <button onClick={() => setQuestion({
                ...question,
                options: [...question.options, '']
            })}>Add Blank</button>
        </div>
    );
};


export default function QuizQuestions() {

    const defaultQuestion = {
        title: '',
        type: 'multiple-choice',
        points: 1,
        question: '',
        options: [],
        answers: [],
    };

    const { quizId } = useParams();
    const [selectQuestionId, setSelectQuestionId] = useState("");
    const questionList = useSelector((state: KanbasState) =>
        state.questionReducer.questions);
    const [showEditor, setShowEditor] = useState(false);
    const navigate = useNavigate();
    const [questionType, setQuestionType] = useState('multiple-choice');
    const dispatch = useDispatch();
    const question = useSelector((state: KanbasState) =>
        state.questionReducer.question) || defaultQuestion;

    const [currentQuestion, setCurrentQuestion] = useState(question);

    const editQuestion = (questionToEdit = defaultQuestion) => {
        setCurrentQuestion(questionToEdit);
        setShowEditor(true);
    };


    const handleQuestionSave = async () => {
        if (currentQuestion._id) {
            dispatch(updateQuestion({ ...currentQuestion }));
        } else {
            if (quizId) { 
                const added = await client.createQuestion(quizId, currentQuestion);
                dispatch(addQuestion(added));
            } else {
                console.error('Quiz ID is undefined');
            }
        }
        setShowEditor(false);
    };
    


    interface Question {
        _id?: string;
        title: string;
        type: string;
        points: number;
        question: string;
        options: string[];
        answers: string[];
    }


    const cancelEdit = () => {
        setShowEditor(false);
    };

    const renderQuestionEditor = () => {
        switch (questionType) {
            case 'multiple-choice':
                return <MultipleChoices question={currentQuestion} setQuestion={setCurrentQuestion} />;
            case 'fill-in-the-bank':
                return <MultipleBlanks question={currentQuestion} setQuestion={setCurrentQuestion} />;
            case 'true-false':
                return <TrueFalseQuestionEditor question={currentQuestion} setQuestion={setCurrentQuestion} />;
            default:
                return null;
        }
    };
    

    const handleAddQuestion = () => {
        editQuestion();
    };

    useEffect(() => {
        const fetchQuestions = async () => {
            if (quizId) {  // Ensure quizId is not undefined
                const questions = await client.findAllQuestionsForQuiz(quizId);
                dispatch(setQuestions(questions));
            }
        };
    
        fetchQuestions();
    }, [quizId, dispatch]);
    

    return (
        <div className="quiz-container">
            <div className="header">
                <div className="spacer"></div>

                <span className="points">Points 0</span>
                <span className="status">Not Published</span>
                <button className="menu">
                    <IoMdMore />
                </button>
            </div>
            <hr />
            <div className="tabs">
                <button className="tab">Details</button>
                <button className="tab active">Questions</button>
            </div>

            {/* Question List */}
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Title</th>
                            <th scope="col">Points</th>
                            <th scope="col">Question</th>
                            <th scope="col">Type</th>
                            <th scope="col">Options</th>
                            <th scope="col">Answers</th>
                        </tr>
                    </thead>
                    <tbody>
                        {questionList.filter(question => question.quiz === quizId).map((question, index) => (
                            <tr key={question._id}>
                                <th scope="row">{index + 1}</th>
                                <td>{question.title}</td>
                                <td>{question.points}</td>
                                <td>{question.question}</td>
                                <td>{question.questionType}</td>
                                <td>
                                    <div className="choices-list">
                                        {question.options.map((option: string, index: number) => (
                                            <div key={index}>
                                                {option}
                                            </div>
                                        ))}
                                    </div>
                                </td>
                                <td>
                                    <div className="answers-list">
                                        {question.answers}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


            <div className="actions">
                <div className="spacer"></div>
                {!showEditor && (
                    <button className="action-button" onClick={handleAddQuestion}>
                        <IoMdAdd /> New Question
                    </button>
                )}
                <button className="action-button">
                    <IoMdAdd /> New Question Group
                </button>

                <button className="action-button">
                    <IoIosSearch />
                    Find Questions
                </button>
            </div>

            {showEditor && (
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
                    <div className="question-footer">
                        <button className="cancel-button" onClick={cancelEdit}>Cancel</button>
                        <button className="update-question-button" onClick={handleQuestionSave}>Update Question</button>
                    </div>
                </div>
            )}

            <hr />
            <div className="footer">
                <label className="notify-label">
                    <input type="checkbox" id="notify" />
                    <span>Notify users this quiz has changed</span>
                </label>
                <div className="footer-buttons">
                    <button className="cancel-button">Cancel</button>
                    <button className="save-publish-button">Save & Publish</button>
                    <button className="btn btn-danger">Save</button>
                </div>
            </div>
        </div>
    );
}



