import React from "react";
import { Segment, Header, Grid, Icon } from "semantic-ui-react";

const QuizList = props => {
  const { quizzes, history, user } = props;
  return (
    <Grid centered container columns={2} relaxed padded="vertically">
      {quizzes.map(quiz => (
        <Grid.Column
          key={quiz.id}
          style={{ padding: "1rem", cursor: "pointer" }}
          onClick={() => history.push(`/quizzes/${quiz.id}`)}
        >
          <Grid.Row stretched={true}>
            <Segment circular floated='right'
              style={{
                width: '60px',
                padding: '5px',
                color: quiz.votes < 0 ? 'red' : 'inherit'
              }}
            >
              <i className={`thumbs ${quiz.votes < 0 ? 'down' : 'up'} outline icon`} />
              {quiz.votes}
            </Segment>
            <Header
              as="h1"
              color={user && quiz.author !== user.username ? "teal" : null}
              attached="bottom"
              dividing
            >
              {user && user.username === quiz.author && <Icon name="street view" />}
              <Header.Content>
                {quiz.title}
                <Header.Subheader>
                  <p>Topic: {quiz.topic}</p>
                  {
                    user && user.username === quiz.author
                      ? "Author: You"
                      : `Author: ${quiz.author}`
                  }
                </Header.Subheader>
              </Header.Content>
            </Header>
          </Grid.Row>
        </Grid.Column>
      ))}
    </Grid>
  );
};

export default QuizList;
