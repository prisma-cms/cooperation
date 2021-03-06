import React, { Component } from 'react';
import PropTypes from "prop-types";

import App, {
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
import withStyles from 'material-ui/styles/withStyles';

import MainMenu from './MainMenu';
import DevMainPage from './pages/MainPage';


import {
  ContextProvider as SocietyContextProvider,
  SubscriptionProvider as SocietySubscriptionProvider,
} from "@prisma-cms/society";

import Context from '@prisma-cms/context';

import * as queryFragments from '../../schema/generated/api.fragments';

export const styles = {

  root: {
    // border: "1px solid blue",
    height: "100%",
    display: "flex",
    flexDirection: "column",

    "& #Renderer--body": {
      // border: "1px solid green",
      flex: 1,
      overflow: "auto",
      display: "flex",
      flexDirection: "column",
    },
  },
}



// export const styles = {
//   root: {
//     fontSize: 16,
//     fontFamily: "serif",
//     height: "100%",
//     // border: "1px solid red",
//     display: "flex",
//     flexDirection: "column",

//     "& #Renderer--body": {
//       flex: 1,
//       // border: "1px solid blue",

//       "& a": {
//         "&, & span": {
//           color: "#0369ce",
//         },
//       },
//     },
//   },
// }

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
        path: "/tasks/create/:projectId",
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
        },
      },
      {
        exact: false,
        path: "/",
        // component: DevMainPage,
        render: props => {
          // console.log("props", { ...props });
          return <DevMainPage
          >
          </DevMainPage>;
        }
        // render: props => {
        //   console.log("props", { ...props });
        //   return null;
        // }
      },
      // {
      //   path: "*",
      //   component: DevMainPage,
      // },
    ].concat(super.getRoutes());

    return routes;

  }


  renderWrapper() {


    if (!queryFragments) {
      return null;
    }


    return <Context.Consumer>
      {context => {

        const {
          schema,
        } = context;

        if (!schema || !queryFragments) {
          return null;
        }

        return <Context.Provider
          value={Object.assign(context, {
            queryFragments,
          })}
        >

          <SocietyContextProvider>
            <SocietySubscriptionProvider>
              <ContextProvider>
                <SubscriptionProvider>
                  {this.renderMenu()}
                  {super.renderWrapper()}
                </SubscriptionProvider>
              </ContextProvider>
            </SocietySubscriptionProvider>
          </SocietyContextProvider>


        </Context.Provider>
      }}
    </Context.Consumer>



  }


  render() {

    const {
      pure,
      classes,
      ...other
    } = this.props;

    return pure ? <App
      {...other}
    /> :
      <div
        className={classes.root}
      >
        <style
          dangerouslySetInnerHTML={{
            __html: `
            body, html, #root{
              height: 100%;
            }
          `,
          }}
        />
        {super.render()}
      </div>;

  }

}

export default withStyles(styles)(props => <DevRenderer
  {...props}
/>);
