import React, { Component } from 'react';
import PropTypes from "prop-types";

import PrismaCmsApp from '@prisma-cms/front'
import { Renderer as PrismaCmsRenderer } from '@prisma-cms/front'

import { withStyles } from 'material-ui';

import MainMenu from './MainMenu';

import * as queryFragments from "@prisma-cms/front/lib/schema/generated/api.fragments";


import App, {
  SubscriptionProvider,
  ProjectsPage,
  ProjectPage,
  ProjectCreatePage,
  TasksPage,
  TaskPage,
  TaskCreatePage,
  TimersPage,
  TimerPage,
} from "../App";

import "moment/locale/ru";

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

  static contextTypes = {
    ...PrismaCmsRenderer.contextTypes,
    client: PropTypes.object.isRequired,
    // loadApiData: PropTypes.func.isRequired,
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


  renderMenu() {

    return <MainMenu />
  }



  // renderRoutes() {

  //   return <div
  //     style={{
  //       // maxWidth: 1200,
  //       // margin: "20px auto 0",
  //     }}
  //   >
  //     {super.renderRoutes()}
  //   </div>

  // }


  render() {

    const {
      pure,
      classes,
      ...other
    } = this.props;


    const {
      user: currentUser,
      client,
      // loadApiData,
    } = this.context;

    return <div
      className={classes.root}
    >
      <SubscriptionProvider
        user={currentUser}
        client={client}
      // loadApiData={loadApiData}
      >
        {pure ? <App
          {...other}
        /> : super.render()}
      </SubscriptionProvider>
    </div>

  }

}



const DevRendererWithStyles = withStyles(styles)(DevRenderer)

export default class DevApp extends Component {

  static propTypes = {
    queryFragments: PropTypes.object.isRequired,
  }

  static defaultProps = {
    queryFragments,
    lang: "ru",
  }

  render() {

    const {
      queryFragments,
      ...other
    } = this.props;

    return <PrismaCmsApp
      queryFragments={queryFragments}
      Renderer={DevRendererWithStyles}
      // pure={true}
      {...other}
    />
  }
}

