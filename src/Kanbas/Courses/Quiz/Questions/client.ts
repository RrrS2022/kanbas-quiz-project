import axios from "axios";
const API_BASE = process.env.REACT_APP_API_BASE;

const COURSES_API =  `${API_BASE}/api/courses`;
const QUIZZES_API = `${API_BASE}/api/quizzes`;
const QUESTIONS_API =  `${API_BASE}/api/questions`;


export const updateQuestion = async (question: any) => {
    const response = await axios.
      put(`${QUESTIONS_API}/${question._id}`, question);
    return response.data;
  };
  
export const deleteQuestion = async (questionId: string) => {
  const response = await axios
    .delete(`${QUESTIONS_API}/${questionId}`);
  return response.data;
};

// export const createModule = async (courseId: string, module: string) => {
//     const response = await axios.post(
//       `${COURSES_API}/${courseId}/quizzes`,
//       module
//     );
//     return response.data;
//   };
  
// export const findModulesForCourse = async (courseId: string) => {
//   const response = await axios
//     .get(`${COURSES_API}/${courseId}/modules`);
//   return response.data;
// };
