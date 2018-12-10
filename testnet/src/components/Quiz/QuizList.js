import React from "react";

class QuizList extends React.Component {
  // console.log(props.quizzes[0].id);
  state = {
    selected: ""
  };

  handleChange = e => {
    this.setState({ answer: e.target.value });
  };
  render() {
    const { quizzes } = this.props;
    return (
      <div className="quiz-list">
        {quizzes.map(quiz => (
          <div className="quiz-card" key={quiz.id}>
            <h1>{quiz.title}</h1>
            <p>{quiz.author}</p>
            <ul>
              {quiz.questions.map(q => (
                <div key={q.question}>
                  <li>{q.question}</li>
                  {q.answers.map((ans, index) => (
                    <label key={ans + index}>
                      <input
                        type="radio"
                        value={`option${index}`}
                        onChange={this.handleChange}
                        checked={this.state.selected === `option${index}`}
                      />
                      {ans}
                    </label>
                  ))}
                </div>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  }
}

export default QuizList;
