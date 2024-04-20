import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { FaCheckCircle, FaEllipsisV, FaPlus, FaPencilAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import * as client from "./client";
import { KanbasState } from "../../../store";
import {
    setQuestions
} from "./questionsReducer";
import QuizQuestionsEditor from "./QuestionEditor";


function QuizQuestions() {
    const { quizId } = useParams();
    const [selectQuestionId, setSelectQuestionId] = useState("");
    const questionList = useSelector((state: KanbasState) =>
        state.questionReducer.questions);
    const question = useSelector((state: KanbasState) =>
        state.questionReducer.question);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (quizId !== undefined) {
            client.findAllQuestionsForQuiz(quizId)
                .then((questions) => dispatch(setQuestions(questions)));
        }
    }, [quizId]);

    return (

        <div className="list-group mb-3 me-5" style={{ borderRadius: '0' }}>
            {questionList.filter((question) => question.quiz === quizId).map((question, index) => (
                <div>
                    {question.title}
                </div>
            ))}
        </div>
    );
}

export default QuizQuestions;
