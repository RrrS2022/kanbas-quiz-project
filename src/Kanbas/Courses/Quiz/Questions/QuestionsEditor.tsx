import React from "react";
import "./QuizEditor.css";
import { IoMdAdd, IoMdMore, IoIosSearch } from "react-icons/io";

export default function QuizQuestionsEditor() {
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

      <div className="actions">
        <div className="spacer"></div>
        <button className="action-button">
          <IoMdAdd /> New Question
        </button>
        <button className="action-button">
          <IoMdAdd /> New Question Group
        </button>

        <button className="action-button">
          <IoIosSearch />
          Find Questions
        </button>
      </div>

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
