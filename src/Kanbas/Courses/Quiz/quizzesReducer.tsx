import { createSlice } from "@reduxjs/toolkit";
import { quizzes } from "../../Database";

interface Quiz {
  _id?: string;
  title: string;
  description: string;
  points: string;
  dueDate: string;
  availableFromDate: string;
  availableUntilDate: string;
}

interface QuizzesState {
  quizzes: Quiz[];
  quiz: Quiz;
}

const initialState: QuizzesState = {
    quizzes: [],
    quiz: { title: "New Quiz", description: "this is the new quiz", 
    points: "100", dueDate: "03/15/2024", 
    availableFromDate: "02/15/2024",  availableUntilDate: "03/15/2024"},
  };

  const quizzesSlice = createSlice({
    name: "quizzes",
    initialState,
    reducers: {
      addQuiz: (state, action) => {
        state.quizzes = [action.payload, ...state.quizzes];
      },
  
    deleteQuiz: (state, action) => {
        state.quizzes = state.quizzes.filter(
          (quiz) => quiz._id !== action.payload
        );
      },
      updateQuiz: (state, action) => {
        state.quizzes = state.quizzes.map((quiz) => {
          if (quiz._id === action.payload._id) {
            return action.payload;
          } else {
            return quiz;
          }
        });
      },
      selectQuiz: (state, action) => {
        state.quiz = action.payload;
      },
      setQuiz: (state, action) => {
        state.quizzes = action.payload;
      },
  
    },
  });

  export const { addQuiz, deleteQuiz,
    updateQuiz, selectQuiz, setQuiz } = quizzesSlice.actions;
  export default quizzesSlice.reducer;



