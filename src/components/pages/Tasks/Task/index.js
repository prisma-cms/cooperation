import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Page from "../../layout";

import PageNotFound from "../../404";
import { graphql } from 'react-apollo';

// import {
//   Task as TaskQuery,
//   createTaskProcessor,
//   updateTaskProcessor,
// } from "../query";


import TaskView from "../View/Task";

import { Typography } from 'material-ui';
import gql from 'graphql-tag';

import Context from "@prisma-cms/context";

// import {
//   Link,
// } from "../../../../components/ui";

// const UpdateTask = graphql(updateTaskProcessor)(TaskView);
// const CreateTask = graphql(createTaskProcessor)(TaskView);


export class TaskPage extends Page {

  static propTypes = {
    ...Page.propTypes,
  };


  static defaultProps = {
    ...Page.defaultProps,
  }



  setPageMeta(meta = {}) {

    const {
      data: {
        object: task,
      },
    } = this.props;


    if (!task) {
      return;
    }

    const {
      name,
    } = task;


    return super.setPageMeta({
      title: `Задача ${name}`,
      ...meta,
    });

  }


  componentWillMount() {

    const {
      query: {
        createTaskProcessor,
        updateTaskProcessor,
      },
    } = this.context;

    // this.Renderer =

    this.UpdateTask = graphql(gql(updateTaskProcessor))(TaskView);
    this.CreateTask = graphql(gql(createTaskProcessor))(TaskView);

    super.componentWillMount && super.componentWillMount();
  }


  render() {

    const {
      UpdateTask,
      CreateTask,
    } = this;

    const {
      data,
      ...other
    } = this.props;

    const {
      object: task,
      loading,
    } = data;

    if (!task) {

      if (loading) {
        return null;
      }
      else {
        return <PageNotFound />
      }
    }


    const {
      id: taskId,
    } = task;

    let Mutation;

    if (taskId) {
      Mutation = UpdateTask;
    }
    else {
      Mutation = CreateTask;
    }

    return super.render(
      <div>
        <Mutation
          data={data}
          linkType="target"
          showDetails={true}
          {...other}
        />
      </div>
    );
  }
}


// export default (props) => {

//   return <TaskQuery
//     View={TaskPage}
//     {...props}
//   />
// };



export default class TaskConnector extends Component {


  static contextType = Context;

  componentWillMount() {

    const {
      query: {
        task,
      },
    } = this.context;

    this.Renderer = graphql(gql(task))(TaskView);

    super.componentWillMount && super.componentWillMount();
  }


  render() {

    const {
      Renderer,
    } = this;

    return <Renderer
      {...this.props}
    />

  }

}
