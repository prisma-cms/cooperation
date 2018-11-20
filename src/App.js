import React, { Component } from 'react';
import PropTypes from 'prop-types';

import "./styles/less/styles.css";

import SubscriptionProvider from "./components/SubscriptionProvider";

import ProjectsPage from "./components/pages/Projects";
import ProjectPage from "./components/pages/Projects/Project";

import TasksPage from "./components/pages/Tasks";
import TaskPage from "./components/pages/Tasks/Task";

export {
  SubscriptionProvider,
  ProjectsPage,
  ProjectPage,
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