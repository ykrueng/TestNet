import React from 'react';
import { Segment, Input, Dropdown } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const ToolBar = ({
  filterText,
  field,
  handleFieldChange,
  handleFilterChange
}) => {
  const options = [
    { key: "all", text: "all", value: "all" },
    { key: "title", text: "title", value: "title" },
    { key: "topic", text: "topic", value: "topic" },
    { key: "author", text: "author", value: "author" }
  ];
  return (
    <Segment style={{ width: '100%' }}>
      <Input
        name='filterText'
        value={filterText}
        placeholder='Filter quizzes by...'
        label={
          <Dropdown
            onChange={handleFieldChange}
            defaultValue={field}
            options={options}
            name='tag'
          />}
        labelPosition='right'
        onChange={handleFilterChange}
      />
    </Segment>
  );
}

ToolBar.propTypes = {
  filterText: PropTypes.string.isRequired,
  field: PropTypes.string.isRequired,
  handleFieldChange: PropTypes.func.isRequired,
  handleFilterChange: PropTypes.func.isRequired,
}

export default ToolBar;