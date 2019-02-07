import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Context from "@prisma-cms/context";

class TasksProjectFilter extends Component {

  static contextType = Context;

  // static propTypes = {

  // };

  render() {

    const {
      ProjectAutocomplete,
    } = this.context;

    return (
      <ProjectAutocomplete 

      />
    );
  }
}


export default TasksProjectFilter;