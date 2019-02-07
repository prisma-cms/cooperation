import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { graphql } from 'react-apollo';

// import {
//   // createProjectProcessor,
//   updateProjectProcessor,
// } from "../../query";

import Project from "../Project";

import Context from "@prisma-cms/context";
import gql from 'graphql-tag';

// const NewProject = graphql(createProjectProcessor)(Project);
// const UpdateProject = graphql(updateProjectProcessor)(Project);

class ProjectsList extends Component {

  static contextType = Context;

  static propTypes = {
    projects: PropTypes.array.isRequired,
  };

  static defaultProps = {
  };


  componentWillMount() {

    const {
      query: {
        updateProjectProcessor,
      },
    } = this.context;

    // this.Renderer =

    this.UpdateProject = graphql(gql(updateProjectProcessor))(Project);

    super.componentWillMount && super.componentWillMount();
  }

  render() {

    const {
      UpdateProject,
    } = this;

    const {
      projects,
    } = this.props;

    return (
      projects.map(n => {
        const {
          id,
        } = n;

        return <UpdateProject
          key={id}
          data={{
            object: n,
          }}
        />
      })
    );
  }
}


export default ProjectsList;