import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import "./QuizEditor.css";
import { IoMdAdd, IoMdMore, IoIosSearch } from "react-icons/io";
import {
  FaCheckCircle,
  FaEllipsisV,
  FaPlus,
  FaPencilAlt,
} from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import * as client from "./client";
import { KanbasState } from "../../../store";
import { addQuestion, setQuestions, updateQuestion } from "./questionsReducer";
import { IoIosAdd } from "react-icons/io";
import { MdDelete, MdEdit } from "react-icons/md";
import "./index.css";
import * as quizClient from "../client";
import { updateQuiz } from "../quizzesReducer";

interface Question {
  _id?: string;
  title: string;
  questionType: string;
  points: number;
  question: string;
  options: string[];
  answers: string[];
}

interface QuestionEditorProps {
  question: Question;
  setQuestion: (question: Question) => void;
}

interface QuestionEditorProps {
  question: Question;
  setQuestion: (question: Question) => void;
}

const TrueFalseQuestionEditor: React.FC<QuestionEditorProps> = ({
  question,
  setQuestion,
}) => {
  const handleInputChange = (e: any) => {
    setQuestion({
      ...question,
      options: ["True", "False"],
      answers: [e.target.value],
    });
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion({ ...question, title: e.target.value });
  };

  return (
    <div className="quiz-question-editor">
      <div className="question-header">
        <input
          type="text"
          placeholder="Question Title"
          className="question-title-input"
          onChange={handleTitleChange}
          value={question.title}
        />
      </div>
      <div className="question-body">
        <label className="question-label">Question:</label>
        <textarea
          name="question"
          value={question.question}
          onChange={(e) =>
            setQuestion({
              ...question,
              question: e.target.value,
              questionType: "TF",
            })
          }
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
              defaultChecked={question.answers[0] == "True"}
              onChange={handleInputChange}
            />{" "}
            True
          </label>
          <label className="answer-option">
            <input
              type="radio"
              name="answers"
              value="False"
              defaultChecked={question.answers[0] == "False"}
              onChange={handleInputChange}
            />{" "}
            False
          </label>
        </div>
      </div>
    </div>
  );
};

const MultipleChoices: React.FC<QuestionEditorProps> = ({
  question,
  setQuestion,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuestion({ ...question, question: e.target.value });
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...question.options];
    newOptions[index] = value;
    setQuestion({ ...question, options: newOptions });
    if (question.answers[0] === question.options[index]) {
      setQuestion({ ...question, answers: [value] });
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion({ ...question, title: e.target.value });
  };

  const handleAddOption = () => {
    setQuestion({ ...question, options: [...question.options, ""] });
  };

  const handleDeleteOption = (index: number) => {
    const newOptions = [...question.options];
    if (question.answers[0] === newOptions[index]) {
      setQuestion({ ...question, answers: [""] });
    }
    newOptions.splice(index, 1);
    setQuestion({ ...question, options: newOptions });
  };

  const handleCorrectAnswerChange = (value: string) => {
    setQuestion({ ...question, answers: [value] });
  };

  return (
    <div className="quiz-question-editor">
      <div className="question-header">
        <input
          type="text"
          value={question.title}
          placeholder="Question Title"
          className="question-title-input"
          onChange={handleTitleChange}
        />
      </div>
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
        <div key={index} className="answer possible-answer">
          <label className="answer-label">Possible Answer</label>
          <textarea
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
            placeholder="Answer text"
            className="answer-textarea"
          ></textarea>
          <div className="icons-container">
            <label className="correct-answer">Correct</label>
            <input
              type="radio"
              name="correct-answer"
              checked={question.answers[0] == option}
              onChange={() => handleCorrectAnswerChange(option)}
              className="correct-answer-radio"
            />
            <MdEdit className="edit-icon" />
            <MdDelete
              className="delete-icon"
              onClick={() => handleDeleteOption(index)}
            />
          </div>
        </div>
      ))}
      <button onClick={handleAddOption} className="add-answer-button">
        <IoIosAdd /> Add Option
      </button>
    </div>
  );
};

const MultipleBlanks: React.FC<QuestionEditorProps> = ({
  question,
  setQuestion,
}) => {
  const handleInputChange = (e: any) => {
    setQuestion({ ...question, question: e.target.value });
  };

  const handleBlankChange = (index: any, value: any) => {
    const newBlanks = [...question.answers];
    newBlanks[index] = value;
    setQuestion({ ...question, answers: newBlanks });
  };

  const handleAddBlank = () => {
    setQuestion({
      ...question,
      answers: [...question.answers, ""],
      questionType: "BLANKS",
    });
    console.log(question.answers);
  };

  const handleDeleteBlank = (index: number) => {
    const newBlanks = [...question.answers];
    newBlanks.splice(index, 1);
    setQuestion({ ...question, answers: newBlanks });
  };

  const handleTitleChange = (e: any) => {
    setQuestion({ ...question, title: e.target.value });
  };

  return (
    <div className="quiz-question-editor">
      <div className="question-header">
        <input
          type="text"
          value={question.title}
          placeholder="Question Title"
          className="question-title-input"
          onChange={handleTitleChange}
        />
      </div>
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
      {question.answers.map((blank: any, index: any) => (
        <div key={index} className="answer possible-answer">
          <label className="answer-label">Possible Answer</label>

          <textarea
            value={blank}
            onChange={(e) => handleBlankChange(index, e.target.value)}
            placeholder="Answer text"
            className="answer-textarea"
          ></textarea>
          <div className="icons-container">
            <MdDelete
              className="delete-icon"
              onClick={() => handleDeleteBlank(index)}
            />
          </div>
        </div>
      ))}
      <button className="add-answer-button" onClick={handleAddBlank}>
        <IoIosAdd /> Add Another Answer
      </button>
    </div>
  );
};

export default function QuizQuestions() {
  const defaultQuestion = {
    title: "",
    type: "MC",
    points: 1,
    question: "",
    options: [],
    answers: [],
  };

  const { courseId, quizId } = useParams();
  const [selectQuestionId, setSelectQuestionId] = useState("");
  const questionList = useSelector(
    (state: KanbasState) => state.questionReducer.questions
  );
  const [showEditor, setShowEditor] = useState(false);
  const navigate = useNavigate();
  const [questionType, setQuestionType] = useState("MC");
  const dispatch = useDispatch();
  const question =
    useSelector((state: KanbasState) => state.questionReducer.question) ||
    defaultQuestion;

  const [currentQuestion, setCurrentQuestion] = useState(question);

  // Update quiz without publishing
  const handleSave = async () => {
    try {
      const updatedQuiz = await quizClient.updateQuiz(quizId);
      dispatch(updateQuiz(updatedQuiz));
      navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}`);
    } catch (error) {
      console.error("Failed to save the quiz:", error);
    }
  };

  // Update quiz and publish it
  const handleSaveAndPublish = async () => {
    try {
      const updatedQuiz = await quizClient.updateQuiz(quizId);
      dispatch(updateQuiz(updatedQuiz));
      navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}`);
    } catch (error) {
      console.error("Failed to save and publish the quiz:", error);
    }
  };

  const handleQuestionSave = async () => {
    if (currentQuestion._id && quizId) {
      console.log("currentQuestion._id", currentQuestion._id);
      console.log("quizId", quizId);
      // console.log(currentQuestion)
      await client.updateQuestion(quizId, currentQuestion._id, currentQuestion);
      dispatch(updateQuestion(currentQuestion));
    } else {
      if (quizId) {
        const added = await client.createQuestion(quizId, currentQuestion);
        dispatch(addQuestion(added));
      } else {
        console.error("Quiz ID is undefined");
      }
    }
    setShowEditor(false);
    setQuestionType("MC");
  };

  const cancelEdit = () => {
    setShowEditor(false);
  };

  const renderQuestionEditor = () => {
    switch (questionType) {
      case "MC":
        return (
          <MultipleChoices
            question={currentQuestion}
            setQuestion={setCurrentQuestion}
          />
        );
      case "BLANKS":
        return (
          <MultipleBlanks
            question={currentQuestion}
            setQuestion={setCurrentQuestion}
          />
        );
      case "TF":
        return (
          <TrueFalseQuestionEditor
            question={currentQuestion}
            setQuestion={setCurrentQuestion}
          />
        );
      default:
        return null;
    }
  };

  const handleEditQuestion = (question: Question) => {
    setCurrentQuestion(question);
    console.log(question);
    setQuestionType(question.questionType);
    console.log(question.questionType);
    setShowEditor(true);
  };

  const handleAddQuestion = () => {
    const newQuestion = {
      ...defaultQuestion,
      questionType: questionType,
    };
    setCurrentQuestion(newQuestion);
    setShowEditor(true);
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      if (quizId) {
        const questions = await client.findAllQuestionsForQuiz(quizId);
        dispatch(setQuestions(questions));
      }
    };

    fetchQuestions();
  }, [quizId, dispatch]);

  return (
    <div className="quiz-container">
      {/* Question List */}
      <div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">ID</th>
              <th scope="col">Title</th>
              <th scope="col">Points</th>
              <th scope="col">Question</th>
              <th scope="col">Type</th>
              <th scope="col">Options</th>
              <th scope="col">Answers</th>
              <th scope="col">Edit</th>
            </tr>
          </thead>
          <tbody>
            {questionList
              .filter((question) => question.quiz === quizId)
              .map((question, index) => (
                <tr key={question._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{question._id}</td>
                  <td>{question.title}</td>
                  <td>{question.points}</td>
                  <td>{question.question}</td>
                  <td>{question.questionType}</td>
                  <td>
                    <div className="choices-list">
                      {question.options.map((option: string, index: number) => (
                        <div key={index}>{option}</div>
                      ))}
                    </div>
                  </td>
                  <td>
                    <div className="answers-list">
                      {question.answers && question.answers.map((answer: any, index: any) => (
                        <div key={index}>{answer}</div>
                      ))}
                    </div>
                  </td>
                  <td>
                    <MdEdit
                      className="edit-icon"
                      onClick={() => handleEditQuestion(question)}
                    />
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
            <select
              className="question-type-select"
              value={questionType}
              onChange={(e) => setQuestionType(e.target.value)}
            >
              <option value="MC">Multiple Choice</option>
              <option value="TF">True/False</option>
              <option value="BLANKS">Fill In The Blank</option>
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
            <button className="cancel-button" onClick={cancelEdit}>
              Cancel
            </button>
            <button
              className="update-question-button"
              onClick={handleQuestionSave}
            >
              Update Question
            </button>
          </div>
        </div>
      )}

      <hr />
      {/* <div className="footer">
                <label className="notify-label">
                    <input type="checkbox" id="notify" />
                    <span>Notify users this quiz has changed</span>
                </label>
                <div className="footer-buttons">
                    <Link to={`/Kanbas/Courses/${courseId}/Quizzes/${quizId}`}
                        className="btn btn-light"
                        style={{ marginRight: "5px" }}>
                        Cancel
                    </Link>
                        <button className="btn btn-light"
                            style={{marginRight:"5px"}}
                            onClick={handleSaveAndPublish}>
                            Save&Publish
                        </button>
                        <button className="btn btn-danger"
                            onClick={handleSave}>
                            Save
                        </button>
                </div>
            </div> */}
    </div>
  );
}
