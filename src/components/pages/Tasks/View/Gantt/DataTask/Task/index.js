import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  styles,
  TaskView,
  // processors,
  TaskConnector,
} from "../../../../../Tasks/View/Task";

import { withStyles, IconButton } from 'material-ui';


class GanttTaskView extends TaskView {




  renderDefaultView() {
    return null;
  }

  // getButtons() {

  //   let buttons = super.getButtons() || [];

  //   const object = this.getObjectWithMutations();

  //   const {
  //     classes,
  //   } = this.props;

  //   const {
  //     user: currentUser,
  //   } = this.context;

  //   const {
  //     id: currentUserId,
  //   } = currentUser || {};

  //   if (object) {

  //     const {
  //       id: taskId,
  //       CreatedBy,
  //     } = object;

  //     const {
  //       id: createdById,
  //     } = CreatedBy || {};

  //     if (currentUserId && currentUserId === createdById) {

  //       buttons.push(<IconButton
  //         className={classes.button}
  //       >
  //         <SubdirectoryArrowRight

  //         />
  //       </IconButton>);

  //     }

  //   }


  //   return buttons

  // }


  // render() {
  //   return null;
  // }
}


// export default withStyles(styles)(GanttTaskView);
// export default processors(withStyles(styles)(props => <GanttTaskView
//   {...props}
// />));

export default withStyles(styles)(props => <TaskConnector
  {...props}
  View={GanttTaskView}
/>);