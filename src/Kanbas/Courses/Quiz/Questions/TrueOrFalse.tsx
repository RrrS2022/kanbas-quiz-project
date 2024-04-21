import React from "react";
import "./index.css";


const TrueFalseQuestionEditor = () => {

    return (
        <div className="quiz-question-editor">
            <hr />
            <div className="question-body">
                <label className="question-label">Question:</label>
                <textarea
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
                            name="correct-answer"
                            value="true"
                            className="answer-radio"
                        />
                        True
                    </label>

                    <label className="answer-option">
                        <input
                            type="radio"
                            name="wrong-answer"
                            value="false"
                            className="answer-radio"
                        />
                        False
                    </label>
                </div>
            </div>
        </div>
    );
}
export default TrueFalseQuestionEditor;