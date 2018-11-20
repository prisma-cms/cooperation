import React, { Component } from 'react';
import PropTypes from "prop-types";

import PrismaCmsApp from '@prisma-cms/front'
import { Renderer as PrismaCmsRenderer } from '@prisma-cms/front'

import MainMenu from './MainMenu';

import * as queryFragments from "@prisma-cms/front/lib/schema/generated/api.fragments";

// import { Grid } from 'material-ui';
// import { Typography } from 'material-ui';
// import { Button } from 'material-ui';

// import { Link } from "react-router-dom";

import App, {
  SubscriptionProvider,
  ProjectsPage,
  ProjectPage,
  TasksPage,
  TaskPage,
} from "../App";




// import { withStyles } from 'material-ui';


// class TestApp extends Component {

//   static defaultProps = {
//   }



//   constructor(props) {

//     super(props);

//     const {
//       value,
//       readOnly,
//     } = props;

//     this.state = {
//       value,
//       readOnly,
//     }

//   }


//   render() {

//     const {
//       children,
//       history,
//       location,
//       match,
//       classes,
//       ...other
//     } = this.props;

//     const {
//     } = this.state;


//     return <div
//       className={classes.root}
//     >
//       <App
//         {...other}
//       />
//     </div>
//   }

// }


// const TestRenderer = withStyles({
//   root: {
//     fontSize: 16,
//     fontFamily: "serif",
//   },
// })(TestApp)


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
      ...other
    } = this.props;


    const {
      user: currentUser,
      client,
      // loadApiData,
    } = this.context;

    return <SubscriptionProvider
      user={currentUser}
      client={client}
    // loadApiData={loadApiData}
    >
      {pure ? <App
        {...other}
      /> : super.render()}
    </SubscriptionProvider>

  }

}

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
      Renderer={DevRenderer}
      // pure={true}
      {...other}
    />
  }
}

