import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Page from "../../layout";

import PageNotFound from "../../404";
import { graphql } from 'react-apollo';

import {
  Project as ProjectQuery,
  updateProjectProcessor,
} from "../query";


import ProjectView from "../View/Project";

import { Typography } from 'material-ui';

// import {
//   Link,
// } from "../../../../components/ui";

const UpdateProject = graphql(updateProjectProcessor)(ProjectView);


class ProjectPage extends Page {

  static propTypes = {
    ...Page.propTypes,
  };


  static defaultProps = {
    ...Page.defaultProps,
  }



  setPageMeta(meta = {}) {

    const {
      data: {
        object: project,
      },
    } = this.props;


    if (!project) {
      return;
    }

    const {
      ProjectTarget: Topic,
    } = project;

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
      object: project,
      loading,
    } = data;

    if (!project) {

      if (loading) {
        return null;
      }
      else {
        return <PageNotFound />
      }
    }

    return super.render(
      <div>
        <UpdateProject
          data={data}
          linkType="target"
          {...other}
        />
      </div>
    );
  }
}


export default (props) => {

  return <ProjectQuery
    View={ProjectPage}
    {...props}
  />
};