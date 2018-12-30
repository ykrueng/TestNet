// import from libraries
import React from "react";
import { Segment, Header, Button, Grid, Icon, Loader } from "semantic-ui-react";
import { connect } from "react-redux";

// import helper functions to filter and sort quizzes
import { filterQuizzes, sortQuizzes } from "../../helper";

// import action creators from Store
import {
  toggleActiveQuizzes,
  updateSelectedTopics,
  updateSorting
} from "../../store/actions";

// import component
import ToolBar from "./ToolBar";

class QuizList extends React.Component {
  state = {
    filterText: "",
    field: "title"
  };

  componentDidMount() {
    this.props.clearQuiz();
  }

  handleFilterChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleDropdownChange = (e, data) => {
    this.setState({ [data.name]: data.value });
  };

  render() {
    const {
      quizzes,
      topics,
      history,
      user,
      loggedIn,
      fetchingQuizzes,
      activeOnly,
      selectedTopics,
      toggleActiveQuizzes,
      updateSelectedTopics,
      updateSorting,
      sortingMethod
    } = this.props;
    const { filterText, field } = this.state;

    let displayQuizzes = sortQuizzes(filterQuizzes(
      quizzes,
      activeOnly,
      selectedTopics,
      filterText,
      field
    ), sortingMethod);

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
            handleSliderChange={toggleActiveQuizzes}
            updateSelectedTopics={updateSelectedTopics}
            activeOnly={activeOnly}
            updateSorting={updateSorting}
            sortingMethod={sortingMethod}
          />
        </Grid.Row>
        <Grid.Row>
          {fetchingQuizzes && (
            <Loader active inline>
              Loading
            </Loader>
          )}
        </Grid.Row>
        {displayQuizzes.map(quiz => (
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

export default connect(
  state => ({
    activeOnly: state.toolReducer.activeOnly,
    selectedTopics: state.toolReducer.selectedTopics,
    sortingMethod: state.toolReducer.sortingMethod
  }),
  { toggleActiveQuizzes, updateSelectedTopics, updateSorting }
)(QuizList);
