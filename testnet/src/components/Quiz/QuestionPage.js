import React from "react";

class QuestionPage extends React.Component {
  state = {
    selected: ""
  };

  handleChange = e => {
    this.setState({ selected: e.target.value });
  };

  render() {
    const id = parseInt(this.props.match.params.questionId, 10);
    const title = this.props.match.params.title;

    const quiz = this.props.quizzes.find(quiz => quiz.title === title);
    const question = quiz.questions[id - 1];
    return (
      <div>
        <p>{`${question.id}.  ${question.question}`}</p>
        {question.answers.map((ans, index) => (
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
        <button
          onClick={() => this.props.history.push(`/quizzes/${title}/${id + 1}`)}
        >
          Submit and Continue
        </button>
      </div>
    );
  }
}

export default QuestionPage;
