import React, { Component } from 'react';
import PropTypes from 'prop-types';

import withStyles from 'material-ui/styles/withStyles';
import IconButton from 'material-ui/IconButton';

import { Link } from "react-router-dom";

import moment from "moment";

import StopIcon from "material-ui-icons/Stop";
import { compose, graphql } from 'react-apollo';

import {
  updateTimerProcessor,
} from "query";

const styles = {

}

class Timer extends Component {

  static propTypes = {
    timer: PropTypes.object.isRequired,
  };


  async stop() {

    const {
      timer: {
        id,
      },
      mutate,
    } = this.props;

    await mutate({
      variables: {
        data: {
          stoped: true,
        },
        where: {
          id,
        },
      },
    });

  }


  render() {

    const {
      classes,
      timer: activeTimer,
    } = this.props;


    if (!activeTimer) {
      return null;
    }


    const {
      id: timerId,
      createdAt,
      stopedAt,
      Task: {
        id: taskId,
        name: taskName,
        Project: {
          id: projectId,
          name: projectName,
        },
      },
    } = activeTimer;


    let output = null;

    if (createdAt && !stopedAt) {
      output =
        <div
          // container
          // spacing={8}
          style={{
            display: "inline-flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >



          <Link
            to={`/projects/${projectId}`}
          >
            {projectName}
          </Link> | {taskName} | {moment().from(moment(createdAt))}
          <IconButton
            onClick={event => {
              this.stop();
            }}
          >
            <StopIcon />
          </IconButton>
        </div>
    }

    return output;
  }
}


export default compose(
  graphql(updateTimerProcessor)
)(withStyles(styles)(props => <Timer 
  {...props}
/>));