export const filterQuizzes = (quizzes, activeOnly, topics, searchText, searchField) => {
  return quizzes.filter(quiz => {
    if (activeOnly && quiz.question_count <= 0) {
      return false;
    }
    if (topics.length > 0 && !topics.includes(quiz.topic)) {
      return false;
    }
    if (!searchText) {
      return true;
    }
    if (searchField === "all") {
      return (
        quiz.title.toLowerCase().includes(searchText.toLowerCase()) ||
        quiz.topic.toLowerCase().includes(searchText.toLowerCase()) ||
        quiz.author.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    return (
      (topics.length === 0 || topics.includes(quiz.topic)) &&
      quiz[searchField].toLowerCase().includes(searchText.toLowerCase())
    );
  });
};

export const sortQuizzes = (quizzes, sortingMethod) => {
  return [...quizzes].sort((quizA, quizB) => {
    const field = sortingMethod.includes("votes") ? "votes" : "question_count";
    if (sortingMethod.includes("descending")) {
      if (quizA[field] < quizB[field]) return 1;
      if (quizA[field] === quizB[field]) return 0;
      return -1;
    }
    if (quizA[field] < quizB[field]) return -1;
    if (quizA[field] === quizB[field]) return 0;
    return 1;
  });
};
