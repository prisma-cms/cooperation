import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  TaskView as BaseTaskView,
  styles,
  processors,
} from "../../../../../Tasks/View/Task";

import { withStyles } from 'material-ui';


export {
  styles,
}

export class TaskView extends BaseTaskView {

  renderDefaultView() {
    return null;
  }

  renderEditableView() {
    return this.renderDefaultView();
  }

}


export default processors(withStyles(styles)(TaskView));