export const TOGGLE_ACTIVE_QUIZZES = "TOGGLE_ACTIVE_QUIZZES";
export const UPDATE_SELECTED_TOPICS = "UPDATE_SELECTED_TOPICS";
export const UPDATE_SORTING = "UPDATE_SORTING";

export const toggleActiveQuizzes = () => ({
  type: TOGGLE_ACTIVE_QUIZZES,
})

export const updateSelectedTopics = (topics) => ({
  type: UPDATE_SELECTED_TOPICS,
  payload: topics,
})

export const updateSorting = (method) => ({
  type: UPDATE_SORTING,
  payload: method
})