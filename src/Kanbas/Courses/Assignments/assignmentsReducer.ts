import { createSlice } from "@reduxjs/toolkit";
import { assignments } from "../../Database";

interface Assignment {
  _id?: string;
  title: string;
  description: string;
  points: string;
  dueDate: string;
  availableFromDate: string;
  availableUntilDate: string;
}

interface AssignmentsState {
  assignments: Assignment[];
  assignment: Assignment;
}

const initialState: AssignmentsState = {
    assignments: [],
    assignment: { title: "New Assignment", description: "this is the new assignment", 
    points: "100", dueDate: "03/15/2024", 
    availableFromDate: "02/15/2024",  availableUntilDate: "03/15/2024"},
  };

  const assignmentsSlice = createSlice({
    name: "assignments",
    initialState,
    reducers: {
      addAssignment: (state, action) => {
        state.assignments = [action.payload, ...state.assignments];
      },
  
      deleteAssignment: (state, action) => {
        state.assignments = state.assignments.filter(
          (assignment) => assignment._id !== action.payload
        );
      },
      updateAssignment: (state, action) => {
        state.assignments = state.assignments.map((assignment) => {
          if (assignment._id === action.payload._id) {
            return action.payload;
          } else {
            return assignment;
          }
        });
      },
      selectAssignment: (state, action) => {
        state.assignment = action.payload;
      },
      setAssignments: (state, action) => {
        state.assignments = action.payload;
      },
  
    },
  });

  export const { addAssignment, deleteAssignment,
    updateAssignment, selectAssignment, setAssignments } = assignmentsSlice.actions;
  export default assignmentsSlice.reducer;



