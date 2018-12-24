import React from 'react';
import { Segment, Input, Dropdown } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const ToolBar = ({
  filterText,
  field,
  topics,
  selectedTopics,
  handleDropdownChange,
  handleFilterChange
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
    value: topic.name,
  }));

  return (
    <Segment style={{ width: '100%' }}>
      <Input
        name='filterText'
        value={filterText}
        placeholder='Filter quizzes by...'
        label={
          <Dropdown
            onChange={handleDropdownChange}
            defaultValue={field}
            options={options}
            name='field'
          />}
        labelPosition='right'
        onChange={handleFilterChange}
      />
      <Dropdown
        placeholder='Add topic...' fluid multiple search selection
        name='selectedTopics'
        value={selectedTopics}
        options={topicOptions}
        onChange={handleDropdownChange}
      />
    </Segment>
  );
}

ToolBar.propTypes = {
  filterText: PropTypes.string.isRequired,
  field: PropTypes.string.isRequired,
  topics: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string.isRequired,
  })).isRequired,
  selectedTopics: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleDropdownChange: PropTypes.func.isRequired,
  handleFilterChange: PropTypes.func.isRequired,
}

export default ToolBar;