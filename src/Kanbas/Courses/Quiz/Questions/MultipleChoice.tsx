import React, { useEffect, useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import "./MultipleChoices.css";

export default function MultipleChoices() {
  return (
    <div className="quiz-question-editor">
      <div className="question-header">
        <input
          type="text"
          placeholder="Question Title"
          className="question-title-input"
        />
        <select className="question-type-select">
          <option value="multiple-choice">Multiple Choice</option>
          <option value="true-false">True/False</option>
          <option value="fill-in-the-bank">Fill In The Blank</option>
        </select>
        <div className="points-container"></div>
        <span className="points-label">pts: </span>
        <input
          type="number"
          placeholder="1"
          className="question-points-input"
        />
      </div>
      <hr />
      <div className="question-body">
        Question:
        <textarea
          placeholder="Enter your question"
          className="question-textarea"
        ></textarea>
      </div>

      <div className="answers-section">
        <label>Answers:</label>
        <div className="choice">
          <input
            type="radio"
            name="correct-answer"
            className="correct-answer-radio"
          />
          <textarea
            placeholder="Answer text"
            className="choice-textarea"
          ></textarea>

          <div className="icons-container">
            <FaRegEdit className="edit-icon" />
            <MdDelete className="delete-icon" />
          </div>
        </div>
      </div>

      <div className="question-footer">
        <button className="cancel-button">Cancel</button>
        <button className="save-update-button">Update Question</button>
      </div>
    </div>
  );
}
