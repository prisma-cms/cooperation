import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Select } from 'material-ui';


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

}

export class TaskStatus extends PrismaCmsComponent {

  static propTypes = {
    ...PrismaCmsComponent.propTypes,
    inEditMode: PropTypes.bool.isRequired,
    value: PropTypes.string.isRequired,
    defaultValue: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    ...PrismaCmsComponent.defaultProps,
    inEditMode: false,
    defaultValue: "New",
    name: "status",
    locales,
  }




  render() {


    const {
      value,
      data,
      classes,
      defaultValue,
      name,
      inEditMode,
      inputProps,
      ...other
    } = this.props;

    const {
      taskStatuses,
      loading,
    } = data;

    if (!taskStatuses) {
      return null;
    }

    const values = taskStatuses.values;

    let output = null;

    if (inEditMode) {

      output = <Select
        value={value || ""}
        // defaultValue={defaultValue}
        inputProps={{
          name,
          label: "Статус",
          ...inputProps,
        }}
        {...other}
      >
        {values.map(n => {

          const {
            name: value,
          } = n;

          let name = this.lexicon(value);


          return <option
            key={name}
            value={value}
          >
            {name}
          </option>

        })}
      </Select>;

    }
    else {
      output = <div>
        <Typography
          variant="caption"
        >
          {this.lexicon("Status")}
        </Typography>
        <Typography>
          {this.lexicon(value)}
        </Typography>
      </div>
    }

    return output;
  }
}



const processors = compose(

  graphql(taskStatusesQuery),
  // graphql(createTaskProcessor, {
  //   name: "createTask",
  // }),
  // graphql(updateTaskProcessor, {
  //   name: "updateTask",
  // }),

);

export {
  processors,
}

export default processors(withStyles(styles)(TaskStatus));
