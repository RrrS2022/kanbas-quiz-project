import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../../../../store";
import { setQuiz } from "../../quizzesReducer";

export default function QuizDetailsEditor () {
    const quiz = useSelector((state: KanbasState) => state.quizzesReducer.quiz);
    const dispatch = useDispatch();

    return (
        <div className="container-fluid">
        

        <h2>Quiz Name</h2>
        <input value={quiz.title}
            type="text"
            className="form-control mb-2" 
            placeholder="unnamed quiz"
            onChange={(e) => 
                dispatch(setQuiz({ ...quiz, name: e.target.value }))}/>
        <div className="mb-3">
            <textarea 
            className="form-control"
            placeholder="This should be instruction of the quiz."
            rows={3}></textarea>
        </div>  
        <div className="container">
            <div className="mb-3 row justify-content-center">
                <label htmlFor="points" className="col-sm-3 col-form-label" style={{ paddingLeft: "200px", paddingRight: "50px" }}>
                    Points
                </label>
                <div className="col-sm-7">
                    <input type="number" className="form-control" id="points" />
                </div>
            </div>
            <div className="mb-3 row justify-content-center">
                <label htmlFor="group" className="col-sm-4 col-form-label" style={{ paddingLeft: "50px", paddingRight: "50px" }}>
                    Quiz Type
                </label>
                <select id="group" className="form-select col-sm-8" style={{ width: "400px", marginLeft: "20px" }}>
                    <option selected>Graded Quiz</option>
                    <option value="quiz">Practice Quiz</option>
                    <option value="exam">Graded Survey</option>
                    <option value="project">Ungraded Survey</option>
                </select>
            </div>
            <div className="mb-3 row justify-content-center">
                <label htmlFor="group" className="col-sm-4 col-form-label" style={{ paddingLeft: "50px", paddingRight: "50px" }}>
                    Assignment Group
                </label>
                <select id="group" className="form-select col-sm-8" style={{ width: "400px", marginLeft: "20px" }}>
                    <option selected>ASSIGNMENT</option>
                    <option value="quiz">QUIZ</option>
                    <option value="exam">EXAM</option>
                    <option value="project">PROJECT</option>
                </select>
            </div>
            <div className="mb-3 row justify-content-center">
            <label htmlFor="display_grade-as" className="col-sm-4 col-form-label" style={{ paddingLeft: "50px", paddingRight: "50px" }}>
                Display Grade as
            </label>
            <select id="display_grade-as" className="form-select col-sm-8" style={{ width: "400px", marginLeft: "20px" }}>
                <option selected>Percentage</option>
            </select>
            </div>
            <div className="mb-3 row justify-content-center">
            <label htmlFor="submission_type" className="col-sm-4 col-form-label" style={{ paddingLeft: "50px", paddingRight: "50px" }}>
                Submission Type
            </label>
            <select id="submission_type" className="form-select col-sm-8" style={{ width: "400px", marginLeft: "20px" }}>
                <option selected>Online</option>
            </select>
            </div>
            <div className="row mb-3">
                <div className="col-sm-8 offset-sm-4">
                    <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="r6" />
                    <label className="form-check-label" htmlFor="r6">
                        Do not count this assignment towards the final grade
                    </label>
                    </div>
                </div>
            </div>
        </div>
        <div className="d-flex">
        <div>
          <label className="col-sm-3 col-form-label" style={{ paddingLeft: "200px", paddingRight: "50px" }}>Assign</label>
        </div>
        <div className="container" style={{ border: "1px solid lightgray" }}>
          <div className="mb-3">
            <label htmlFor="assign_to" className="form-label"><h4>Assign to</h4></label>
            <input className="form-control" id="assign_to" placeholder="Everyone" />
          </div>
          <div className="mb-3">
            <label htmlFor="due" className="form-label"><h4>Due</h4></label>
            <input type="date" className="form-control" id="due" />
          </div>
          <div className="mb-3 row">
            <div className="col">
              <h4>Available from</h4>
              <input type="date" className="form-control" />
            </div>
            <div className="col">
              <h4>Until</h4>
              <input type="date" className="form-control" />
            </div>
          </div>
          <div className="row" style={{ paddingBottom: "15px", paddingTop: "10px", backgroundColor: "#F5F5F5" }}>
            <div className="col text-center">
              <i className="fa fa-plus" aria-hidden="true"></i>Add
            </div>
          </div>
        </div>
      </div>
      <hr />
    </div>
    );
    
}

