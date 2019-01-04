import React, { Component } from 'react';
import PropTypes from 'prop-types';

import "./styles/less/styles.css";

import Context from "@prisma-cms/context";

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

export {
  Context,
  SubscriptionProvider,
  ContextProvider,
  ProjectsPage,
  ProjectPage,
  ProjectCreatePage,
  TasksPage,
  TaskPage,
  TaskCreatePage,
  TimersPage,
  TimerPage,
}

