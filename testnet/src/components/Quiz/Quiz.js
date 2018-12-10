import React from "react";

class Quiz extends React.Component {
  state = {
    selected: ""
  };

  handleChange = e => {
    this.setState({ selected: e.target.value });
  };
  render() {
    const title = this.props.match.params.title;
    const quiz = this.props.quizzes.find(quiz => quiz.title === title);

    return (
      <div className="quiz">
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
    );
  }
}

export default Quiz;
