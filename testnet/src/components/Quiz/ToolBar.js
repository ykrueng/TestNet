import React from "react";
import { Segment, Input, Dropdown, Button } from "semantic-ui-react";
import PropTypes from "prop-types";

import SignInButton from '../Login/SignInButton';

const ToolBar = ({
  history,
  loggedIn,
  filterText,
  field,
  topics,
  selectedTopics,
  handleDropdownChange,
  handleFilterChange,
}) => {
  const options = [
    { key: "all", text: "all", value: "all" },
    { key: "title", text: "title", value: "title" },
    { key: "topic", text: "topic", value: "topic" },
    { key: "author", text: "author", value: "author" }
  ];
  const topicOptions = topics.map(topic => ({
    key: topic.name,
    text: topic.name,
    value: topic.name
  }));

  return (
    <Segment style={{ width: "100%" }} textAlign="left">
      <Dropdown
        style={{
          width: "10rem",
          marginRight: "1rem"
        }}
        placeholder="Sort by..."
        clearable
        selection
        name="sort"
        options={[
          { key: "most", value: "most", text: "Sort by: most votes" },
          { key: "least", value: "leat", text: "Sort by: least votes" }
        ]}
        onChange={handleDropdownChange}
      />
      <Input
        style={{
          width: "15rem"
        }}
        name="filterText"
        value={filterText}
        placeholder="Search quiz by..."
        label={
          <Dropdown
            style={{
              textAlign: "right"
            }}
            onChange={handleDropdownChange}
            defaultValue={field}
            options={options}
            name="field"
          />
        }
        labelPosition="right"
        onChange={handleFilterChange}
      />
      <Dropdown
        style={{
          marginTop: ".5rem"
        }}
        placeholder="Add topic..."
        fluid
        multiple
        search
        selection
        name="selectedTopics"
        value={selectedTopics}
        options={topicOptions}
        onChange={handleDropdownChange}
      />
      <Segment
        textAlign="center"
        style={{
          margin: "0 auto",
          border: "none",
          boxShadow: "none"
        }}
      >
        {
          !loggedIn && <SignInButton text="Sign In to Add New Quiz" />
        }
        {
          loggedIn && <Button
            onClick={() => history.push("/quizzes/quiz/new/add")}
            color="teal"
            icon="add"
            content="Add New Quiz"
          />
        }
      </Segment>
    </Segment>
  );
};

ToolBar.propTypes = {
  filterText: PropTypes.string.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  field: PropTypes.string.isRequired,
  topics: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string.isRequired
    })
  ).isRequired,
  selectedTopics: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleDropdownChange: PropTypes.func.isRequired,
  handleFilterChange: PropTypes.func.isRequired,
};

export default ToolBar;
