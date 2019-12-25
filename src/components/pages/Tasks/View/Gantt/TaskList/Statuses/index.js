import React from 'react';
import PropTypes from 'prop-types';

import {
  styles as defaultStyles,
  // processors,
  TaskStatusConnector,
  TaskStatus,
} from "../../../Task/Status";

import withStyles from 'material-ui/styles/withStyles';

import Chip from 'material-ui/Chip';

import DoneIcon from "material-ui-icons/Done";

const styles = theme => {

  const {
    root,
    chip,
    avatar,
    ...other
  } = defaultStyles;

  return {
    root: {
      ...root,
      display: "flex",
      flexWrap: "wrap",
    },
    chip: {
      ...chip,
      margin: 3,
      height: 24,
    },
    avatar: {
      ...avatar,
      height: 20,
      width: 20,
      marginLeft: 5,
    },
    ...other
  }

}

class TaskStatusesFilter extends TaskStatus {


  static propTypes = {
    ...TaskStatus.propTypes,
    active: PropTypes.array.isRequired,
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
      onClick,
      active,
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

    let output = values.map(n => {

      const {
        name: value,
      } = n;

      let name = this.lexicon(value);

      const isActive = active.indexOf(value) !== -1;

      return <Chip
        key={name}
        label={this.lexicon(value)}
        value={value}
        className={[classes.chip, classes.status, classes[`status${value}`]].join(" ")}
        size="small"
        onClick={() => {

          return onClick && onClick(value);
        }}
        // onDelete={() => {

        //  }}
        // deleteIcon={<DoneIcon />}
        avatar={isActive ? <DoneIcon
          className={classes.avatar}
        /> : undefined}
        {...other}
      />

    });


    return <div
      className={classes.root}
    >
      {output}
    </div>;
  }

}


// export default processors(withStyles(styles)(props => <TaskStatusesFilter 
//   {...props}
// />));

export default withStyles(styles)(props => <TaskStatusConnector
  {...props}
  View={TaskStatusesFilter}
/>);