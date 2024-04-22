import React from "react";
import { useSelector } from "react-redux";
import { KanbasState } from "../../../store";
import { FiAlertCircle , FiArrowRight } from "react-icons/fi";
import { MdOutlineEdit } from "react-icons/md";
import "../../Assignments/index.css"

export default function Preview () {
    const quiz = useSelector((state: KanbasState) => 
        state.quizzesReducer.quiz);
    const questionItem = useSelector((state: KanbasState) =>
        state.questionReducer.question);
    return (
        <div>
            <h1>Quiz Preview Screen</h1>
            <h2>{quiz.title}</h2>
            <div style={{color:"#BC3518", backgroundColor: "#F6CEC5", height: "35px",
                display: "flex", alignItems: "center", }}>
                <p style={{marginTop: "15px"}}>
                    <FiAlertCircle /> This is a preview of the publishd version of the quiz
                </p>
            </div>
            <br />
            <div>
                {/** should create the getTime const later, placeholder for now */}
                <p>Started: time</p>
            </div>
            <h1>Quiz Instructions</h1>
            <hr />
            <div className="container" style={{border: "1px solid #ccc", margin: 0, padding: 0}}>
                <div 
                    style={{ display: "flex", justifyContent: "space-between", alignItems: "center", 
                    backgroundColor: "lightgrey", margin: 0, padding: 10}}>
                    <b> Question 1 </b> {/* placeholder for actual question number */}
                    <p style={{ float: "right", margin: 0 }}> 1 pts </p>
                </div>
                <div style={{margin:0, padding: 10}}>
                    {/** This is the placeholder for the actual question display */}
                    An HTML label element can be associated with an HTML input element by setting their id 
                    attributes to the same value. The resulting effect is that when you click on the label 
                    text, the input element receives focus as if you had click on the input element itself
                    {questionItem && <div>{questionItem.question}</div>}

                    <hr />
                    <div style={{padding:0}}>
                        <input  type="radio" 
                                />
                        &#160;possible choice1<hr /> 
                        <input type="radio" 
                                />
                        &#160;possible choice2<hr />
                        <input type="radio" 
                                />
                        &#160;possible choice3<hr />
                        <input type="radio" 
                                />
                        &#160;possible choice4<hr />
                        <input type="radio" 
                                />
                        &#160;possible choice5<br />
                    </div>    
                </div>
            </div>
            <div style={{padding: 0}}>
                <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                    <button className="btn btn-light" style={{ float: "right", margin: "20px", border: "solid #ccc" }}>
                        Next <FiArrowRight />
                    </button>
                
                </div>

                <div className="form-group d-flex" 
                    style={{  border: "1px solid #ccc", height: "60px", display: "flex",  alignItems: "center" }}>
                    <div style={{ flex: 1 }}></div> 
                    <p style={{marginTop: "15px", color: "grey"}}> Quiz saved at time </p>
                    <button className="btn btn-light" 
                        style={{height: "40px", float: "right", border: "solid #ccc",
                            marginRight: "10px", marginLeft: "10px"}}>
                        Submit Quiz
                    </button>
                </div>
                <div className="form-group d-flex" 
                    style={{  border: "1px solid #ccc", height: "30px",  
                        backgroundColor: "lightgray", display: "flex",  alignItems: "center",
                        margin: "20px", padding: 0}}>
                    <MdOutlineEdit />&#160; Keep Editing This Quiz
                </div>
            </div>
            

        </div>
    )
}