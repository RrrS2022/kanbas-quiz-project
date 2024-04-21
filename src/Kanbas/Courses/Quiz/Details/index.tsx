import React from "react";
import { FaCheckCircle, FaPencilAlt, FaEllipsisV} from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { KanbasState } from "../../../store";

export default function QuizDetails() {
    const { courseId, quizId } = useParams();
    const navigate = useNavigate();
    const quiz = useSelector((state: KanbasState) => state.quizzesReducer.quiz)
    const handleEdit = (() => {
        navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/Editor`);
      })
    const handleQuestion = (() => {
        navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/questions`);
    }
    )

    const handlePublish = () => {}

    // fill in the path to preview page
    const handlePreview = () => {
        navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/Preview`)
    }

    return(
        <div className="flex-fill ms-5 ,me-5">
            <div className="d-flex justify-content-end">
                <span style={{ color: 'green' }}><FaCheckCircle />Published</span>
                <button 
                    className="btn btn-light"
                    style={{marginLeft:"5px", marginRight:"10px", borderRadius:"4px"}}
                    onClick={handlePreview}>
                        Preview
                </button>
                <button className="btn btn-light"
                    onClick={handleEdit}
                    style={{ marginRight:"5px", borderRadius:"4px"}}>
                    <FaPencilAlt />Edit
                </button>
                {/* <button className="btn btn-light"
                    onClick={handleQuestion}
                    style={{ marginRight:"5px", borderRadius:"4px"}}>
                    <FaPencilAlt />Questions
                </button> */}
                <button className="btn btn-light"
                    style={{borderRadius:"4px"}}>
                    <FaEllipsisV />
                </button>
            </div>
            <hr />
            <div>
                <h1>{quiz.title}</h1>
                <div style={{textAlign:"center"}}>
                    <div className="row"></div>
                    <b> Quiz Type </b>&#160; {quiz.type}
                </div>
                <div style={{textAlign:"center"}}>
                    <b> Points </b> &#160; {quiz.points}
                </div>
                <div style={{textAlign:"center"}}>
                    <b> Assignment Group </b> &#160; {quiz.group}
                </div>
                <div style={{textAlign:"center"}}>
                    <b> Shuffle Answers </b> &#160; {quiz?.shuffleAnswers === true ? "Yes" : "No"} 
                </div>
                <div style={{textAlign:"center"}}>
                    <b> Time Limit </b> &#160; {quiz.timelimit} Minutes
                </div>
                <div style={{textAlign:"center"}}>
                    <b> Multiple Attempts </b> &#160; {quiz?.multipleAttempts === true ? "Yes" : "No"} 
                </div>
                <div style={{textAlign:"center"}}>
                    <b> View Responses </b> &#160; {quiz.responses}
                </div>
                <div style={{textAlign:"center"}}>
                    <b> Show Correct Answers </b> &#160; {quiz.showAnswers}
                </div>
                <div style={{textAlign:"center"}}>
                    <b> One Question at a Time </b> &#160; {quiz?.oneQuestionataTime === true ? "Yes" : "No"} 
                </div>
                <div style={{textAlign:"center"}}>
                    <b> Require Respondus LockDown Browser </b> &#160; {quiz?.lockQuestion === true ? "Yes" : "No"} 
                </div>
                <div style={{textAlign:"center"}}>
                    <b> Required to View Quiz Results </b> &#160; {quiz?.viewResult === true ? "Yes" : "No"} 
                </div>
                <div style={{textAlign:"center"}}>
                    <b> Webcam Required </b> &#160; {quiz.webCam === true ? "Yes" : "No"}
                </div>
                <div style={{textAlign:"center"}}>
                    <b> Lock Questions After Answering </b> &#160; {quiz.lockQuestion === true ? "Yes" : "No"}
                </div>
                <br /><br />
                <div>
                    <table style={{ borderCollapse: "collapse" }}>
                    <thead>
                        <tr style={{ borderBottom: "1px solid #ccc" }}>
                        <th style={{ width: "30%", paddingBottom: "5px" }}>Due</th>
                        <th style={{ width: "30%", paddingBottom: "5px" }}>For</th>
                        <th style={{ width: "30%", paddingBottom: "5px" }}>
                            Available from
                        </th>
                        <th style={{ width: "30%", paddingBottom: "5px" }}>Until</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                        style={{
                            borderBottom: "1px solid lightgray",
                        }}
                        >
                        <td style={{ paddingTop: "8px", paddingBottom: "8px" }}>
                            {quiz?.dueDate}
                        </td>
                        <td style={{ paddingTop: "8px", paddingBottom: "8px" }}>
                            Everyone
                        </td>
                        <td style={{ paddingTop: "8px", paddingBottom: "8px" }}>
                            {quiz?.availableFromDate}
                        </td>
                        <td style={{ paddingTop: "8px", paddingBottom: "8px" }}>
                            {quiz?.availableUntilDate}
                        </td>
                        </tr>
                    </tbody>
                    </table>
                </div>


            </div>
        
        </div>
    )
}