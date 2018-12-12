import React from "react";
import { Button, Form, Grid } from "semantic-ui-react";
import { connect } from "react-redux";

class QuestionPage extends React.Component {
  state = {
    answers: [],
    value: ""
  };

  handleChange = (e, { value }) => this.setState({ value });

  nextQuestion = id => {
    id = parseInt(id, 10);
    let quiz = this.props.match.params.id;
    if (id + 1 > this.props.questions.length) {
      this.props.history.push(`/quizzes/${quiz}/review`);
    }
    this.setState({ value: "" });
    this.props.history.push(`/quizzes/${quiz}/${id}`);
  };

  render() {
    const id = parseInt(this.props.match.params.questionId, 10);
    const question = this.props.questions[id];
    if (!question || id > this.props.questions.length) {
      return <h1>There aren't any questions!</h1>;
    }
    console.log(this.state);
    return (
      <Grid centered columns={5}>
        <Grid.Column>
          <Form>
            <p>{`${id + 1}.  ${question.question}`}</p>
            {question.options.map((ans, index) => (
              <Form.Radio
                key={index}
                label={ans}
                value={index}
                onChange={this.handleChange}
                checked={this.state.value === index}
              />
            ))}
            <Button
              basic
              color="black"
              content={`Submit & Continue`}
              onClick={() => this.nextQuestion(id + 1)}
            />
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  const { quizzReducer } = state;
  return {
    questions: quizzReducer.questions
  };
};

export default connect(mapStateToProps)(QuestionPage);
