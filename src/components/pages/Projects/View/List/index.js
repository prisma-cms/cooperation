import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { graphql } from 'react-apollo';

import {
  // createProjectProcessor,
  updateProjectProcessor,
} from "../../query";

import Project from "../Project";

// const NewProject = graphql(createProjectProcessor)(Project);
const UpdateProject = graphql(updateProjectProcessor)(Project);

class ProjectsList extends Component {

  static propTypes = {
    projects: PropTypes.array.isRequired,
  };

  static defaultProps = {
  };

  render() {

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