const dummydata = {
  quizzes: [
    {
      id: 0,
      title: "Is this a test?",
      author: "Holden",
      time_limit_seconds: 100,
      votes: 0,
      // topic_id: "test",
      questions: [
        {
          question: "Is this a test question?",
          answers: ["true", "false", "Idk stop yelling at me"]
        }
      ]
    },
    {
      id: 1,
      title: "ES6",
      votes: 0,
      author: "lauren",
      topic: "JavaScript"
    }
  ]
};

export default dummydata;
