import {
  UPDATE_SELECTED_TOPICS,
  TOGGLE_ACTIVE_QUIZZES,
  UPDATE_SORTING
} from "../actions";

const initialState = {
  activeOnly: false,
  selectedTopics: [],
  sortingMethod: ""
};

export const toolReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SELECTED_TOPICS:
      return {
        ...state,
        selectedTopics: action.payload
      };
    case TOGGLE_ACTIVE_QUIZZES:
      return {
        ...state,
        activeOnly: !state.activeOnly
      };
    case UPDATE_SORTING:
      return {
        ...state,
        sortingMethod: action.payload
      };
    default:
      return state;
  }
};
