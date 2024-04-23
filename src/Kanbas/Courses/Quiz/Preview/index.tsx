import React from "react";
import { useSelector } from "react-redux";
import { KanbasState } from "../../../store";
import { FiAlertCircle, FiArrowRight } from "react-icons/fi";
import { MdOutlineEdit } from "react-icons/md";
import "../../Assignments/index.css";

export default function Preview() {
  const quiz = useSelector((state: KanbasState) => state.quizzesReducer.quiz);
  return (
    <div>
      <h1>Quiz Preview Screen</h1>
      <h2>{quiz.title}</h2>
      {/* this is a placeholder for quiz title */}
      <h2>Quiz Title</h2>
      <div
        style={{
          color: "#BC3518",
          backgroundColor: "#F6CEC5",
          height: "35px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <p style={{ marginTop: "15px" }}>
          <FiAlertCircle /> This is a preview of the publishd version of the
          quiz
        </p>
      </div>
      <br />
      <div>
        {/** should create the getTime const later, placeholder for now */}
        <p>Started: time</p>
      </div>
      <h1>Quiz Instructions</h1>
      <hr />
      <div
        className="container"
        style={{ border: "1px solid #ccc", margin: 0, padding: 0 }}
      >
        <div
          className=""
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "lightgrey",
            margin: 0,
            padding: 10,
          }}
        >
          <b> Question 3 </b> {/* placeholder for actual question number */}
          <p style={{ float: "right", margin: 0 }}> 10 pts </p>
        </div>
        <div className="" style={{ margin: 0, padding: 10 }}>
          {/** This is the placeholder for the actual question display */}
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
      </div>
      <div style={{ padding: 0 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <button
            className="btn btn-light"
            style={{ float: "right", margin: "20px", border: "solid #ccc" }}
          >
            Next <FiArrowRight />
          </button>
        </div>

        <div
          className="form-group d-flex"
          style={{
            border: "1px solid #ccc",
            height: "60px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div style={{ flex: 1 }}></div>
          <p style={{ marginTop: "15px", color: "grey" }}>
            {" "}
            Quiz saved at time{" "}
          </p>
          <button
            className="btn btn-light"
            style={{
              height: "40px",
              float: "right",
              border: "solid #ccc",
              marginRight: "10px",
              marginLeft: "10px",
            }}
          >
            Submit Quiz
          </button>
        </div>
        <div
          className="form-group d-flex"
          style={{
            border: "1px solid #ccc",
            height: "30px",
            backgroundColor: "lightgray",
            display: "flex",
            alignItems: "center",
            margin: "20px",
            padding: 0,
          }}
        >
          <MdOutlineEdit />
          &#160; Keep Editing This Quiz
        </div>
      </div>
    </div>
  );
}
