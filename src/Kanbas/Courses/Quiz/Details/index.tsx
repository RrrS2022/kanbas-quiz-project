import React from "react";
import { FaCheckCircle, FaPencilAlt, FaEllipsisV} from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { KanbasState } from "../../../store";

export default function QuizDetails() {
    const courseId = useParams();
    const navigate = useNavigate();
    const quiz = useSelector((state: KanbasState) => state.quizzesReducer.quiz)
    const handleEdit = (() => {
        navigate(`/Kanbas/Courses/${courseId}/Quizzes/Editor/${quiz._id}/Details`);
      })

    return(
        <div className="ms-5 ,me-5">
            <div className="d-flex justify-content-end">
                <span style={{ color: 'green' }}><FaCheckCircle />Published</span>
                <button 
                    className="btn btn-light"
                    style={{marginLeft:"5px", marginRight:"10px", borderRadius:"4px"}}>
                        Preview
                </button>
                <button className="btn btn-light"
                    onClick={handleEdit}
                    style={{ marginRight:"5px", borderRadius:"4px"}}>
                    <FaPencilAlt />Edit
                </button>
                <button className="btn btn-light"
                    style={{borderRadius:"4px"}}>
                    <FaEllipsisV />
                </button>
            </div>
            <hr />
            <div>
                <h1>Q1-HTML</h1>
                <div style={{textAlign:"center"}}>
                    Quiz Type  Graded Quiz 
                </div>
                <div style={{textAlign:"center"}}>
                    Points  the sum of the points of all questions in the quiz
                </div>
                <div style={{textAlign:"center"}}>
                    Assignment Group  Quizzes
                </div>
                <div style={{textAlign:"center"}}>
                    Shuffle Answers No
                </div>
                <div style={{textAlign:"center"}}>
                    Time Limit 30 Minutes
                </div>

                <div style={{textAlign:"center"}}>
                    Multiple Attempts No
                </div>
                <div style={{textAlign:"center"}}>
                    View Responses Always
                </div>
                <div style={{textAlign:"center"}}>
                    Show Correct Answers Immediately
                </div>
                <div style={{textAlign:"center"}}>
                    One Question at a Time Yes
                </div>
                <div style={{textAlign:"center"}}>
                    Require Respondus LockDown Browser No
                </div>
                <div style={{textAlign:"center"}}>
                    Required to View Quiz Results No
                </div>
                <div style={{textAlign:"center"}}>
                    Webcam Required No
                </div>
                <div style={{textAlign:"center"}}>
                    Lock Questions After Answering No
                </div>

                <div className="d-flex">
                    

                </div>

            </div>
        
        </div>
    )
}