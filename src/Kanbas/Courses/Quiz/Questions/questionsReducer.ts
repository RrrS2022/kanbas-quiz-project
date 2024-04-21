import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Question {
  _id?: string;
  title: string;
  questionType: string;
  points: number;
  question: string;
  options: string[];
  answers: string;
}

interface QuestionsState {
  questions: Question[];
  question: Question | null;
}

const initialState: QuestionsState = {
  questions: [],
  question: null,
};

const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    setQuestions(state, action: PayloadAction<Question[]>) {
      state.questions = action.payload;
    },
    addQuestion(state, action: PayloadAction<Question>) {
      state.questions = [ ...state.questions, action.payload];
    },
    updateQuestion(state, action: PayloadAction<Question>) {
      const index = state.questions.findIndex(q => q._id === action.payload._id);
      if (index !== -1) {
        state.questions[index] = action.payload; 
      }
    },
    deleteQuestion(state, action: PayloadAction<string>) {
      state.questions = state.questions.filter(q => q._id !== action.payload);
    },
    selectQuestion(state, action: PayloadAction<Question>) {
      state.question = action.payload;
    },
  },
});

export const { addQuestion, deleteQuestion, updateQuestion, selectQuestion, setQuestions } = questionsSlice.actions;
export default questionsSlice.reducer;
