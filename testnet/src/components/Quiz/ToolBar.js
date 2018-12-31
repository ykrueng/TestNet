import React from "react";
import { Segment, Input, Dropdown, Button, Checkbox } from "semantic-ui-react";
import PropTypes from "prop-types";
import _ from 'lodash';

import SignInButton from "../Login/SignInButton";

const ToolBar = ({
  history,
  loggedIn,
  filterText,
  field,
  topics,
  selectedTopics,
  handleDropdownChange,
  handleFilterChange,
  handleSliderChange,
  updateSelectedTopics,
  activeOnly,
  updateSorting,
  sortingMethod,
  quizzes
}) => {
  const searchValues = ["all", "title", "topic", "author"];
  const searchOptions = searchValues.map(value => ({
    key: value,
    text: value,
    value: value
  }));

  const sortValues = [
    "votes_ascending",
    "votes_descending",
    "questions_ascending",
    "questions_descending"
  ];
  const sortOptions = sortValues.map(value => ({
    key: value,
    text: value.replace("_", " "),
    value: value,
    icon: `sort amount ${value.split("_")[1] === "ascending" ? "up" : "down"}`
  }));

  const topicOptions = topics.map(topic => ({
    key: topic.name,
    text: topic.name,
    value: topic.name
  }));

  const randomActiveQuiz = _.sample(quizzes.filter(quiz => quiz.question_count > 0));

  return (
    <Segment secondary color="teal" style={{ width: "100%" }} textAlign="left">
      <Dropdown
        style={{ width: "10rem", marginRight: "1rem" }}
        placeholder="Sort by..."
        clearable
        value={sortingMethod}
        selection
        name="sort"
        options={sortOptions}
        onChange={(e, data) => updateSorting(data.value)}
      />
      <Input
        name="filterText"
        value={filterText}
        placeholder="Search by..."
        label={
          <Dropdown
            style={{ textAlign: "right" }}
            onChange={handleDropdownChange}
            defaultValue={field}
            options={searchOptions}
            name="field"
          />
        }
        labelPosition="right"
        onChange={handleFilterChange}
      />
      <span
        style={{
          padding: ".75rem .75rem .75rem 0rem",
          marginLeft: "1rem",
          borderRadius: ".25rem"
        }}
      >
        <Checkbox
          slider
          style={{ marginLeft: "1rem" }}
          label="Show active quizzes only"
          checked={activeOnly}
          onChange={handleSliderChange}
        />
      </span>
      <Dropdown
        style={{ marginTop: ".5rem" }}
        placeholder="Add topic..."
        fluid
        multiple
        search
        selection
        name="selectedTopics"
        value={selectedTopics}
        options={topicOptions}
        onChange={(e, data) => updateSelectedTopics(data.value)}
      />

      <div style={{ textAlign: "center", paddingTop: "1rem" }}>
        <Button
          onClick={() => history.push(`/quizzes/${randomActiveQuiz.id}`)}
          color="teal"
          icon="question"
          content="Take A Random Quiz"
        />
        {!loggedIn && <SignInButton text="Sign In to Add A New Quiz" />}

        {loggedIn && (
          <Button
            onClick={() => history.push("/quizzes/quiz/new/add")}
            color="teal"
            icon="add"
            content="Add A New Quiz"
          />
        )}
      </div>
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
  handleSliderChange: PropTypes.func.isRequired,
  updateSelectedTopics: PropTypes.func.isRequired,
  activeOnly: PropTypes.bool.isRequired,
  updateSorting: PropTypes.func.isRequired,
  sortingMethod: PropTypes.string.isRequired,
  quizzes: PropTypes.array.isRequired,
};

export default ToolBar;
