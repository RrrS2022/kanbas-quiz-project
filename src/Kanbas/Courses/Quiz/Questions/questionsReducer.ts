import { createSlice } from "@reduxjs/toolkit";

interface Choice {
  option: string;
  isCorrect: boolean;
}

interface Question {
  _id?: string;
  title: string;
  type: string;
  points: number;
  question: string;
  choices: Choice[];
}

interface QuestionsState {
  questions: Question[];
  question: Question;
}

const initialState: QuestionsState = {
  questions: [],
  question: {
    title: "New Module 123",
    type: "MC",
    points: 10,
    question: "What is 3 + 3",
    choices: [
      { option: "6", isCorrect: true },
      { option: "5", isCorrect: false },
      { option: "7", isCorrect: false },     
    ],
  },
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

export const {
  addQuestion,
  deleteQuestion,
  updateQuestion,
  selectQuestion,
  setQuestions,
} = questionsSlice.actions;
export default questionsSlice.reducer;
