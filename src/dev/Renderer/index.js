import React, { Component } from 'react';
import PropTypes from "prop-types";

import {
  ContextProvider,
  SubscriptionProvider,
  ProjectsPage,
  ProjectPage,
  ProjectCreatePage,
  TasksPage,
  TaskPage,
  TaskCreatePage,
  TimersPage,
  TimerPage,
} from "../../App";

import { Renderer as PrismaCmsRenderer } from '@prisma-cms/front'
import { withStyles } from 'material-ui';

import MainMenu from './MainMenu';


export const styles = {
  root: {
    fontSize: 16,
    fontFamily: "serif",
    height: "100%",
    // border: "1px solid red",
    display: "flex",
    flexDirection: "column",

    "& #Renderer--body": {
      flex: 1,
      // border: "1px solid blue",

      "& a": {
        "&, & span": {
          color: "#0369ce",
        },
      },
    },
  },
}

class DevRenderer extends PrismaCmsRenderer {


  static propTypes = {
    ...PrismaCmsRenderer.propTypes,
    pure: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    ...PrismaCmsRenderer.defaultProps,
    pure: false,
  }

  
  renderMenu() {

    return <MainMenu />
  }

  getRoutes() {

    let routes = [
      // {
      //   exact: true,
      //   path: "/",
      //   component: TestRenderer,
      // },
      {
        exact: true,
        path: "/projects",
        component: ProjectsPage,
      },
      {
        exact: true,
        path: "/projects/create",
        component: ProjectCreatePage,
      },
      {
        exact: true,
        path: "/projects/:projectId",
        render: (props) => {
          const {
            params,
          } = props.match;

          const {
            projectId,
          } = params || {};

          return <ProjectPage
            key={projectId}
            where={{
              id: projectId,
            }}
            {...props}
          />
        }
      },
      {
        exact: true,
        path: "/tasks",
        component: TasksPage,
      },
      {
        exact: false,
        path: [
          "/tasks/create/:projectId",
          // "/tasks/create",
        ],
        component: TaskCreatePage,
      },
      {
        exact: true,
        path: "/tasks/:taskId",
        render: (props) => {
          const {
            params,
          } = props.match;

          const {
            taskId,
          } = params || {};

          return <TaskPage
            key={taskId}
            where={{
              id: taskId,
            }}
            {...props}
          />
        }
      },
      {
        exact: true,
        path: "/timers",
        component: TimersPage,
      },
      {
        exact: true,
        path: "/timers/:timerId",
        render: (props) => {
          const {
            params,
          } = props.match;

          const {
            timerId,
          } = params || {};

          return <TimerPage
            key={timerId}
            where={{
              id: timerId,
            }}
            {...props}
          />
        }
      },
      // {
      //   path: "*",
      //   render: props => this.renderOtherPages(props),
      // },
    ].concat(super.getRoutes());

    return routes;

  }


  renderWrapper() {

    return <ContextProvider>
      <SubscriptionProvider>
        {super.renderWrapper()}
      </SubscriptionProvider>
    </ContextProvider>;

  }


  render() {

    const {
      pure,
      classes,
      ...other
    } = this.props;

    return <div
      className={classes.root}
    >
      {pure ? null : super.render()}
    </div>

  }

}

// export default DevRenderer;

export default withStyles(styles)(props => <DevRenderer
  {...props}
/>)