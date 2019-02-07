import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Page from "../../layout";

import PageNotFound from "../../404";
import { graphql } from 'react-apollo';

import Context from "@prisma-cms/context";

// import {
//   Project as ProjectQuery,
//   createProjectProcessor,
//   updateProjectProcessor,
// } from "../query";


import ProjectView from "../View/Project";
import gql from 'graphql-tag';


// const UpdateProject = graphql(updateProjectProcessor)(ProjectView);
// const CreateProject = graphql(createProjectProcessor)(ProjectView);


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


  componentWillMount() {

    const {
      query: {
        createProjectProcessor,
        updateProjectProcessor,
      },
    } = this.context;

    // this.Renderer =

    this.CreateProject = graphql(gql(createProjectProcessor))(ProjectView);
    this.UpdateProject = graphql(gql(updateProjectProcessor))(ProjectView);

    super.componentWillMount && super.componentWillMount();
  }


  render() {

    const {
      CreateProject,
      UpdateProject,
    } = this;

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


// export default (props) => {

//   return <ProjectQuery
//     View={ProjectPage}
//     {...props}
//   />
// };


export default class ProjectPageConnector extends Component {


  static contextType = Context;

  componentWillMount() {

    const {
      query: {
        project,
      },
    } = this.context;

    this.Renderer = graphql(gql(project))(ProjectPage);

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
