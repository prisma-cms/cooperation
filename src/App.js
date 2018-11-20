import React, { Component } from 'react';
import PropTypes from 'prop-types';

import "./styles/less/styles.css";

import SubscriptionProvider from "./components/SubscriptionProvider";

import ProjectsPage from "./components/pages/Projects";
import ProjectPage from "./components/pages/Projects/Project";

export {
  SubscriptionProvider,
  ProjectsPage,
  ProjectPage,
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