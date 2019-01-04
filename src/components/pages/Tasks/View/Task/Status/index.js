import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui';


import {
  taskStatusesQuery,
} from "../../../query";
import { compose, graphql } from 'react-apollo';


import PrismaCmsComponent from "@prisma-cms/component";
import { Typography } from 'material-ui';


export const locales = {
  ru: {
    values: {
      "Status": "Статус",
      "New": "Новая",
      "Accepted": "Принята",
      "Rejected": "Отменена",
      "Progress": "Выполняется",
      "Paused": "Приостановлена",
      "Done": "Выполнена",
      "Discuss": "Обсуждается",
      "Approved": "Одобрена",
      "RevisionsRequired": "Требуется проверка",
      "Completed": "Завершена",
    }
  },
};

export const styles = {

  root: {},
  item: {
    cursor: "pointer",
  },
  status: {
    color: "#333",
  },
  statusNew: {
    backgroundColor: "#aa8cb9",
  },
  statusAccepted: {
    backgroundColor: "#c7ecc5",
  },
  statusRejected: {
    backgroundColor: "lightgray",
  },
  statusProgress: {
    backgroundColor: "#92f78c",
  },
  statusPaused: {
    backgroundColor: "#afecec",
  },
  statusDone: {
    backgroundColor: "#4dfb43",
  },
  statusDiscuss: {
    backgroundColor: "#f7c78c",
  },
  statusApproved: {
    backgroundColor: "#0bdc0b",
  },
  statusRevisionsRequired: {
    backgroundColor: "#8ccbf5",
  },
  statusCompleted: {
    backgroundColor: "#05c305",
  },
}


export class TaskStatus extends PrismaCmsComponent {

  static propTypes = {
    ...PrismaCmsComponent.propTypes,
    inEditMode: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    ...PrismaCmsComponent.defaultProps,
    inEditMode: false,
    locales,
  }


  render() {

    return null;
  }

}



export const processors = compose(

  graphql(taskStatusesQuery),
  // graphql(createTaskProcessor, {
  //   name: "createTask",
  // }),
  // graphql(updateTaskProcessor, {
  //   name: "updateTask",
  // }),

);


export default processors(withStyles(styles)(props => <TaskStatus 
  {...props}
/>));
