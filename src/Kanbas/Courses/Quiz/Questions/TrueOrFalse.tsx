import React from "react";
import "./index.css";

export default function TrueFalseQuestionEditor() {
  return (
    <div className="quiz-question-editor">
      <div className="question-header">
        <input
          type="text"
          placeholder="Question Title"
          className="question-title-input"
        />
        <select className="question-type-select">
          <option value="true-false">True/False</option>
        </select>
        <span className="points-label">pts</span>
        <input
          type="number"
          placeholder="1"
          className="question-points-input"
        />
      </div>
      <hr />
      <div className="question-body">
        <label>Question:</label>
        <textarea
          placeholder="Enter your question text"
          className="question-textarea"
        ></textarea>
      </div>

      <div className="answers-section">
        <label>Answers:</label>
        <br />
        <label className="answer-option">
          <input
            type="radio"
            name="correct-answer"
            value="true"
            className="true-false-radio"
          />
          True
        </label>
        <br />
        <label className="answer-option">
          <input
            type="radio"
            name="correct-answer"
            value="false"
            className="true-false-radio"
          />
          False
        </label>
      </div>

      <div className="question-footer">
        <button className="cancel-button">Cancel</button>
        <button className="save-update-button">Update Question</button>
      </div>
    </div>
  );
}
