import { createSlice } from "@reduxjs/toolkit";
import { quizzes } from "../../Database";

interface Quiz {
  _id?: string;
  title: string;
  description: string;
  points: number;
  questionNumber: number;
  dueDate: string;
  availableFromDate: string;
  availableUntilDate: string;
  published: boolean
}

interface QuizzesState {
  quizzes: Quiz[];
  quiz: Quiz;
}

const initialState: QuizzesState = {
  quizzes: [],
  quiz: {
    title: "New Quiz", description: "this is the new quiz",
    points: 100, questionNumber: 10, dueDate: "2024-05-10",
    availableFromDate: "2024-02-15", availableUntilDate: "2024-05-15",
    published: true
},
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
      const index = state.quizzes.findIndex(quiz => quiz._id === action.payload._id);
      if (index !== -1) {
        state.quizzes[index] = {
          ...state.quizzes[index],
          ...action.payload.changes,
        };
      }
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



