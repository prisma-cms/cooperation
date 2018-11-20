import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Page from "../../layout";

import PageNotFound from "../../404";
import { graphql } from 'react-apollo';

import {
  Project as ProjectQuery,
  createProjectProcessor,
  updateProjectProcessor,
} from "../query";


import ProjectView from "../View/Project";

import { Typography } from 'material-ui';

// import {
//   Link,
// } from "../../../../components/ui";

const UpdateProject = graphql(updateProjectProcessor)(ProjectView);
const CreateProject = graphql(createProjectProcessor)(ProjectView);


export class ProjectPage extends Page {

  static propTypes = {
    ...Page.propTypes,
    showDetails: PropTypes.bool.isRequired,
  };


  static defaultProps = {
    ...Page.defaultProps,
    showDetails: true,
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
      name,
    } = project;

    return super.setPageMeta({
      title: `Проект ${name}`,
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


    const {
      id: projectId,
    } = project;

    let Mutation;

    if (projectId) {
      Mutation = UpdateProject;
    }
    else {
      Mutation = CreateProject;
    }

    return super.render(
      <div>
        <Mutation
          data={data}
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