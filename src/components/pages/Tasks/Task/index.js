import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Page from "../../layout";

import PageNotFound from "../../404";
import { graphql } from 'react-apollo';

import {
  Task as TaskQuery,
  updateTaskProcessor,
} from "../query";


import TaskView from "../View/Task";

import { Typography } from 'material-ui';

// import {
//   Link,
// } from "../../../../components/ui";

const UpdateTask = graphql(updateTaskProcessor)(TaskView);


class TaskPage extends Page {

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
      TaskTarget: Topic,
    } = task;

    const {
      name,
      longtitle,
    } = Topic || {};

    return super.setPageMeta({
      title: `Комментарий к топику ${longtitle || name}`,
      ...meta,
    });

  }


  render() {

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

    return super.render(
      <div>
        <UpdateTask
          data={data}
          linkType="target"
          {...other}
        />
      </div>
    );
  }
}


export default (props) => {

  return <TaskQuery
    View={TaskPage}
    {...props}
  />
};