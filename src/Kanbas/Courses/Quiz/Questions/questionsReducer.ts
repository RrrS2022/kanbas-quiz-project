import { createSlice } from "@reduxjs/toolkit";

interface Question {
  _id?: string;
  name: string;
  description: string;
}

interface QuestionsState {
    questions: Question[];
    question: Question;
}

const initialState:QuestionsState = {
  questions: [],
  question: { name: "New Module 123", description: "New Description" },
};

const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    setQuestions: (state, action) => {
      state.questions = action.payload;
    },
    addQuestion: (state, action) => {
      state.questions = [action.payload, ...state.questions];
    },
    deleteQuestion: (state, action) => {
      state.questions = state.questions.filter(
        (question) => question._id !== action.payload
      );
    },
    updateQuestion: (state, action) => {
      state.questions = state.questions.map((question) => {
        if (question._id === action.payload._id) {
          return action.payload;
        } else {
          return question;
        }
      });
    },
    selectQuestion: (state, action) => {
      state.question = action.payload;
    },
  },
});

export const { addQuestion, deleteQuestion,
    updateQuestion, selectQuestion, setQuestions} = questionsSlice.actions;
export default questionsSlice.reducer;