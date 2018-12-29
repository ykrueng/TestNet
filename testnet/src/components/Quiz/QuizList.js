import React from "react";
import { Segment, Header, Button, Grid, Icon } from "semantic-ui-react";
import ToolBar from "./ToolBar";

class QuizList extends React.Component {
  state = {
    filterText: "",
    sort: "",
    field: "title",
    selectedTopics: []
  };

  handleFilterChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  componentDidMount() {
    this.props.clearQuiz();
  }

  handleDropdownChange = (e, data) => {
    this.setState({ [data.name]: data.value });
  };

  render() {
    const { quizzes, topics, history, user, loggedIn } = this.props;
    const { filterText, field, sort, selectedTopics } = this.state;

    const filteredQuizzes = quizzes.filter(quiz => {
      if (field === "all") {
        return (
          (selectedTopics.length === 0 ||
            selectedTopics.includes(quiz.topic)) &&
          (quiz.title.toLowerCase().includes(filterText.toLowerCase()) ||
            quiz.topic.toLowerCase().includes(filterText.toLowerCase()) ||
            quiz.author.toLowerCase().includes(filterText.toLowerCase()))
        );
      }
      return (
        (selectedTopics.length === 0 || selectedTopics.includes(quiz.topic)) &&
        quiz[field].toLowerCase().includes(filterText.toLowerCase())
      );
    });

    sort &&
      filteredQuizzes.sort((quizA, quizB) => {
        if (sort === "most") {
          if (quizA.votes < quizB.votes) return 1;
          if (quizA.votes === quizB.votes) return 0;
          return -1;
        }
        if (quizA.votes < quizB.votes) return -1;
        if (quizA.votes === quizB.votes) return 0;
        return 1;
      });

    return (
      <Grid centered container columns={2} relaxed padded="vertically">
        <Grid.Row>
          <ToolBar
            history={history}
            loggedIn={loggedIn}
            filterText={filterText}
            field={field}
            topics={topics}
            selectedTopics={selectedTopics}
            handleDropdownChange={this.handleDropdownChange}
            handleFilterChange={this.handleFilterChange}
          />
        </Grid.Row>
        {filteredQuizzes.map(quiz => (
          <Grid.Column
            key={quiz.id}
            style={{ padding: "1rem", cursor: "pointer" }}
            onClick={() => history.push(`/quizzes/${quiz.id}`)}
          >
            <Grid.Row stretched>
              <Segment
                circular
                floated="right"
                style={{ width: "60px", padding: "5px" }}
              >
                <Icon
                  name={`thumbs ${quiz.votes < 0 ? "down" : "up"} outline`}
                  color={quiz.votes < 0 ? "red" : "green"}
                />
                {quiz.votes}
                <br />
                <Icon name="question circle outline" />
                {quiz.question_count}
              </Segment>
              {user && user.username === quiz.author && (
                <Button
                  circular
                  basic
                  icon="edit"
                  content="Edit"
                  color="teal"
                  floated="right"
                  style={{ width: "60px", padding: "8px" }}
                  onClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    history.push(`/quizzes/quiz/update/${quiz.id}`);
                  }}
                />
              )}
              <Header
                as="h1"
                color={user && quiz.author !== user.username ? "teal" : null}
                attached="bottom"
                dividing
              >
                {user && user.username === quiz.author && (
                  <Icon name="street view" />
                )}
                <Header.Content>
                  {quiz.title}
                  <Header.Subheader as="p">
                    {`Topic: ${quiz.topic}`}
                    <br />
                    {user && user.username === quiz.author
                      ? "Author: You"
                      : `Author: ${quiz.author}`}
                  </Header.Subheader>
                </Header.Content>
              </Header>
            </Grid.Row>
          </Grid.Column>
        ))}
      </Grid>
    );
  }
}

export default QuizList;
