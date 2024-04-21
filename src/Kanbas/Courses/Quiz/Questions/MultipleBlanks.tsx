import React from "react";
import { IoIosAdd } from "react-icons/io";
import { MdDelete, MdEdit } from "react-icons/md";
import "./index.css";

export default function MultipleBlanks() {
  return (
    <div className="quiz-question-editor">
      <div className="question-header">
        <input
          type="text"
          placeholder="Question Title"
          className="question-title-input"
        />
        <select className="question-type-select">
          <option value="fill-in-the-bank">Fill In The Blank</option>
          <option value="multiple-choice">Multiple Choice</option>
          <option value="true-false">True/False</option>
        </select>
        <label className="points-label">pts:</label>
        <input
          type="number"
          placeholder="1"
          className="question-points-input"
        />
      </div>
      <hr />
      <div className="question-body">
        <label className="question-label">Question:</label>
        <textarea
          placeholder="Enter your question"
          className="question-textarea"
        ></textarea>
      </div>

      <div className="answers-section">
        <div className="answer correct-answer">
          <label className="answer-label">Correct Answer</label>
          <textarea
            placeholder="Answer text"
            className="answer-textarea"
          ></textarea>
          <div className="icons-container">
            <MdEdit className="edit-icon" />
            <MdDelete className="delete-icon" />
          </div>
        </div>

        <div className="answer possible-answer">
          <label className="answer-label">Possible Answer</label>
          <textarea
            placeholder="Answer text"
            className="answer-textarea"
          ></textarea>
          <div className="icons-container">
            <MdEdit className="edit-icon" />
            <MdDelete className="delete-icon" />
          </div>
        </div>
        <button className="add-answer-button">
          <IoIosAdd /> Add Another Answer
        </button>
      </div>

      <div className="question-footer">
        <button className="cancel-button">Cancel</button>
        <button className="update-question-button">Update Question</button>
      </div>
    </div>
  );
}
