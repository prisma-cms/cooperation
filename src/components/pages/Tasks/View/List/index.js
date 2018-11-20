import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { graphql } from 'react-apollo';

import {
  // createTaskProcessor,
  updateTaskProcessor,
} from "../../query";

import Task from "../Task";

// const NewTask = graphql(createTaskProcessor)(Task);
const UpdateTask = graphql(updateTaskProcessor)(Task);

class TasksList extends Component {

  static propTypes = {
    tasks: PropTypes.array.isRequired,
  };

  static defaultProps = {
  };

  render() {

    const {
      tasks,
    } = this.props;

    return (
      tasks.map(n => {
        const {
          id,
        } = n;

        return <UpdateTask
          key={id}
          data={{
            object: n,
          }}
        />
      })
    );
  }
}


export default TasksList;