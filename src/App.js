import React, { Component } from 'react';
import PropTypes from 'prop-types';

import "./styles/less/styles.css";

import SubscriptionProvider from "./components/SubscriptionProvider";

import ProjectsPage from "./components/pages/Projects";
import ProjectPage from "./components/pages/Projects/Project";
import ProjectCreatePage from "./components/pages/Projects/Project/Create";

import TasksPage from "./components/pages/Tasks";
import TaskPage from "./components/pages/Tasks/Task";

import TimersPage from "./components/pages/Timers";
import TimerPage from "./components/pages/Timers/Timer";

export {
  SubscriptionProvider,
  ProjectsPage,
  ProjectPage,
  ProjectCreatePage,
  TimersPage,
  TimerPage,
  TasksPage,
  TaskPage,
}


class App extends Component {

  static propTypes = {

  };

  render() {
    return (
      <div>
        My awesome component
      </div>
    );
  }
}

export default App;