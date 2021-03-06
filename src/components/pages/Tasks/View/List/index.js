import React from 'react';
import PropTypes from 'prop-types';

import { graphql } from 'react-apollo';

// import {
//   createTaskProcessor,
//   updateTaskProcessor,
// } from "../../query";

import TaskView from "../Task";


import PrismaCmsComponent from "@prisma-cms/component";
import gql from 'graphql-tag';

// const NewTask = graphql(createTaskProcessor)(Task);

class TasksList extends PrismaCmsComponent {

  static propTypes = {
    // eslint-disable-next-line react/forbid-foreign-prop-types
    ...PrismaCmsComponent.propTypes,
    tasks: PropTypes.array.isRequired,
    showDetails: PropTypes.bool.isRequired,
    TaskView: PropTypes.func.isRequired,
  };

  static defaultProps = {
    ...PrismaCmsComponent.defaultProps,
    showDetails: false,
    // createTaskProcessorQuery: createTaskProcessor,
    // updateTaskProcessorQuery: updateTaskProcessor,
    TaskView,
  };


  // static contextTypes = {
  //   ...PrismaCmsComponent.contextTypes,
  //   ProjectLink: PropTypes.func.isRequired,
  // }


  // constructor(props) {

  //   super(props);

  //   this.initProcessors();

  // }


  componentWillMount() {

    this.initProcessors();

    super.componentWillMount && super.componentWillMount();
  }


  initProcessors() {

    const {
      TaskView,
    } = this.props;

    const {
      query: {
        createTaskProcessor,
        updateTaskProcessor,
      },
    } = this.context;

    const UpdateTask = graphql(gql(updateTaskProcessor))(TaskView);
    const CreateTask = graphql(gql(createTaskProcessor))(TaskView);

    Object.assign(this.state, {
      UpdateTask,
      CreateTask,
    });

  }


  renderItems() {

    const {
      tasks,
    } = this.props;


    if (!tasks) {
      return null;
    }

    return tasks.map(n => this.renderItem(n))

  }


  renderItem(task, props) {

    // console.log("renderItem", task, props);

    const {
      showDetails,
    } = this.props;

    const {
      CreateTask,
      UpdateTask,
    } = this.state;

    const {
      id,
    } = task;


    let Renderer;

    if (id) {
      Renderer = UpdateTask;
    }
    else {
      Renderer = CreateTask;
    }

    return <Renderer
      key={id}
      data={{
        object: task,
      }}
      showDetails={showDetails}
      {...props}
    />
  }


  render() {

    return super.render(
      this.renderItems()
    );

  }
}


export default TasksList;