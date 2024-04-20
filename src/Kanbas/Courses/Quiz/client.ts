import axios from "axios";
const API_BASE = process.env.REACT_APP_API_BASE;

const COURSES_API =  `${API_BASE}/api/courses`;
const QUIZZES_API = `${API_BASE}/api/quizzes`;

export const updateQuiz = async (quiz: any) => {
    const response = await axios.
      put(`${QUIZZES_API}/${quiz._id}`, quiz);
    return response.data;
  };
  

export const deleteQuiz = async (quizId: string) => {
  const response = await axios
    .delete(`${QUIZZES_API}/${quizId}`);
  return response.data;
};


export const createQuiz = async (course: string, quiz: string) => {
    const response = await axios.post(
      `${COURSES_API}/${course}/quizzes`,
      quiz
    );
    return response.data;
  };

export const findQuizzesForCourse = async (course: string) => {
    const response = await axios
      .get(`${COURSES_API}/${course}/quizzes`);
    return response.data;
  };

  export const findQuizById = async (quizId: string) => {
    const response = await axios.get(`${QUIZZES_API}/${quizId}`);
    return response.data;
}