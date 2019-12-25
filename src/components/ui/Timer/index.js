
/**
 * Можно использовать в шапке для вывода активного таймера
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

// import withStyles from 'material-ui/styles/withStyles';
import IconButton from 'material-ui/IconButton';
import PrismaComponent from '@prisma-cms/component';

import { Link } from "react-router-dom";

import moment from "moment";

import gql from 'graphql-tag';

import StopIcon from "material-ui-icons/Stop";
// import { compose, graphql } from 'react-apollo';

// import {
//   updateTimerProcessor,
// } from "query";

// const styles = {

// }

class Timer extends PrismaComponent {

  static propTypes = {
    // eslint-disable-next-line react/forbid-foreign-prop-types
    ...PrismaComponent.propTypes,
    timer: PropTypes.object.isRequired,
    show_project: PropTypes.bool.isRequired,
    iconClassName: PropTypes.string,
  };

  static defaultProps = {
    ...PrismaComponent.defaultProps,
    show_project: false,
  }

  async stop() {

    const {
      timer: {
        id,
      },
      // mutate,
    } = this.props;

    await this.mutate({
      mutation: gql`
        mutation updateTimerProcessor (
          $data: TimerUpdateInput!
          $where: TimerWhereUniqueInput!
        ){
          response: updateTimerProcessor (
            data: $data
            where: $where
          ){
            success
            message
            errors{
              key
              message
            }
            data{
              id
              createdAt
              stopedAt
            }
          }
        }
      `,
      variables: {
        data: {
          stopedAt: new Date(),
        },
        where: {
          id,
        },
      },
    });

  }


  render() {

    const {
      // classes,
      timer: activeTimer,
      show_project,
      style,
      iconClassName,
      ...other
    } = this.props;


    if (!activeTimer) {
      return null;
    }

    const {
      // id: timerId,
      createdAt,
      stopedAt,
      Task: {
        // id: taskId,
        name: taskName,
        TaskProjects,
        // Project: {
        //   id: projectId,
        //   name: projectName,
        // },
      },
    } = activeTimer;

    const [Project] = TaskProjects ? TaskProjects.map(({ Project }) => Project).filter(n => n) : [];

    const {
      id: projectId,
      name: projectName,
    } = Project || {};


    let output = null;
    let projectLink = null;

    if (show_project && projectName && projectId) {

      projectLink = <Fragment>
        <Link
          to={`/projects/${projectId}`}
        >
          {projectName}
        </Link> | {taskName} | {moment().from(moment(createdAt))}
      </Fragment>
    }

    if (createdAt && !stopedAt) {
      output = <div
        // container
        // spacing={8}
        style={{
          ...style,
          display: "inline-flex",
          flexDirection: "row",
          alignItems: "center",
        }}
        {...other}
      >

        {projectLink}

        <IconButton
          className={iconClassName}
          onClick={event => {
            this.stop();
          }}
          title={`${projectName}. ${taskName}`}
        >
          <StopIcon />
        </IconButton>
      </div>
    }

    return super.render(output);
  }
}

export default Timer;

// export default compose(
//   graphql(updateTimerProcessor)
// )(withStyles(styles)(props => <Timer 
//   {...props}
// />));