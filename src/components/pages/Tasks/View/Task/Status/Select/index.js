import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  styles,
  // processors,
  TaskStatusConnector,
  TaskStatus,
} from "../";
import { withStyles, Select, Typography } from 'material-ui';


class TaskStatusSelect extends TaskStatus {


  static propTypes = {
    ...TaskStatus.propTypes,
    value: PropTypes.string.isRequired,
    defaultValue: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    ...TaskStatus.defaultProps,
    defaultValue: "New",
    name: "status",
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
      objects,
      loading,
    } = data;

    if (!objects) {
      return null;
    }

    const values = objects.values;

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
            className={[classes.status, classes.item, classes[`status${value}`]].join(" ")}
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


// export default processors(withStyles(styles)(props => <TaskStatusSelect
//   {...props}
// />));

export default withStyles(styles)(props => <TaskStatusConnector
  {...props}
  View={TaskStatusSelect}
/>);