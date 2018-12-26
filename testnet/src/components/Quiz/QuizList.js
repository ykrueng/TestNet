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

  handleFilterChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleDropdownChange = (e, data) => {
    this.setState({ [data.name]: data.value });
  };

  render() {
    const { quizzes, topics, history, user } = this.props;
    const { filterText, field, sort, selectedTopics } = this.state;

    const filteredQuizzes = quizzes.filter(quiz => {
      if (field === "all") {
        return (
          (this.state.selectedTopics.length === 0 ||
            this.state.selectedTopics.includes(quiz.topic)) &&
          (quiz.title.toLowerCase().includes(filterText.toLowerCase()) ||
            quiz.topic.toLowerCase().includes(filterText.toLowerCase()) ||
            quiz.author.toLowerCase().includes(filterText.toLowerCase()))
        );
      }
      return (
        (this.state.selectedTopics.length === 0 ||
          this.state.selectedTopics.includes(quiz.topic)) &&
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
        <Grid.Row columns={2}>
          <ToolBar
            history={history}
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
            <Grid.Row stretched={true}>
              <Segment
                circular
                floated="right"
                style={{
                  width: "60px",
                  padding: "5px",
                  color: quiz.votes < 0 ? "red" : "inherit"
                }}
              >
                <i
                  className={`thumbs ${
                    quiz.votes < 0 ? "down" : "up"
                  } outline icon`}
                />
                {quiz.votes}
              </Segment>
              {user && user.username === quiz.author && (
                <Button
                  circular
                  basic
                  icon="edit icon"
                  content="Edit"
                  color="teal"
                  floated="right"
                  style={{
                    width: "60px",
                    padding: "8px"
                  }}
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
                  <Header.Subheader>
                    <p>Topic: {quiz.topic}</p>
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
