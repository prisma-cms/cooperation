import React, { PureComponent } from 'react';

import "./styles/less/styles.css";

import SubscriptionProvider from "./components/SubscriptionProvider";
import ContextProvider from "./components/ContextProvider";

import ProjectsPage from "./components/pages/Projects";
import ProjectPage from "./components/pages/Projects/Project";
import ProjectCreatePage from "./components/pages/Projects/Project/Create";

import TasksPage from "./components/pages/Tasks";
import TaskPage from "./components/pages/Tasks/Task";
import TaskCreatePage from "./components/pages/Tasks/Task/Create";

import TimersPage from "./components/pages/Timers";
import TimerPage from "./components/pages/Timers/Timer";

import Timer from './components/ui/Timer';

export {
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
  Timer,
}

export default class App extends PureComponent {

  render() {

    const {
      children,
      ...other
    } = this.props;

    return (
      <div
        {...other}
      >
        <h2>
          My awesome component
        </h2>
        {children}
      </div>
    );
  }
}