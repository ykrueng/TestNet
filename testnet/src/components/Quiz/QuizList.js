import React from "react";
import { Segment, Header, Button, Grid, Icon, Loader } from "semantic-ui-react";
import ToolBar from "./ToolBar";

class QuizList extends React.Component {
  state = {
    activeOnly: false,
    filterText: "",
    sort: "",
    field: "title",
    selectedTopics: []
  };

  handleFilterChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleSliderChange = () => {
    this.setState(state => ({ activeOnly: !state.activeOnly }));
  }

  componentDidMount() {
    this.props.clearQuiz();
  }

  handleDropdownChange = (e, data) => {
    this.setState({ [data.name]: data.value });
  };

  render() {
    const { quizzes, topics, history, user, loggedIn, fetchingQuizzes } = this.props;
    const { filterText, field, sort, selectedTopics, activeOnly } = this.state;

    let filteredQuizzes = quizzes.filter(quiz => {
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

    if (activeOnly) {
      filteredQuizzes = filteredQuizzes.filter(quiz => quiz.question_count > 0)
    }

    sort &&
      filteredQuizzes.sort((quizA, quizB) => {
        const field = sort.includes('votes') ? "votes" : "question_count";
        if (sort.includes("descending")) {
          if (quizA[field] < quizB[field]) return 1;
          if (quizA[field] === quizB[field]) return 0;
          return -1;
        }
        if (quizA[field] < quizB[field]) return -1;
        if (quizA[field] === quizB[field]) return 0;
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
            handleSliderChange={this.handleSliderChange}
          />
        </Grid.Row>
        <Grid.Row>
          {fetchingQuizzes && <Loader active inline>Loading</Loader>
          }
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
