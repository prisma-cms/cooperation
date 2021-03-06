import React from 'react';

import {
  TaskView as BaseTaskView,
  styles,
  TaskConnector,
  // processors,
} from "../../../../../Tasks/View/Task";

import withStyles from 'material-ui/styles/withStyles';


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


// export default processors(withStyles(styles)(props => <TaskView
//   {...props}
// />));

export default withStyles(styles)(props => <TaskConnector
  {...props}
  View={TaskView}
/>);
