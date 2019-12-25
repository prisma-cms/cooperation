import React, { Component } from 'react';
// import PropTypes from 'prop-types';


import Typography from 'material-ui/Typography';

// import Grid from "../../../ui/Grid"
// import {
//   Pagination,
//   Link,
// } from "../../../ui"

import ProjectsList from "./List";
import Context from "@prisma-cms/context";

class ProjectsView extends Component {

  static contextType = Context;

  render() {

    const {
      Pagination,
      Link,
      Grid,
    } = this.context;

    const {
      page,
    } = this.props;

    const {
      objectsConnection,
      loading,
      variables: {
        first: limit,
      },
    } = this.props.data;


    const {
      edges,
      aggregate,
    } = objectsConnection || {};

    const {
      count = 0,
    } = aggregate || {};


    let output;

    if (!edges || !edges.length) {

      if (loading) {
        output = null;
      }
      else {
        output = <Typography
          variant="title"
        >
          Данные не были получены
        </Typography>
      }

    }
    else {

      let projects = edges.map(n => n.node);

      output = <Grid
        item
        xs={12}

      >

        <ProjectsList
          projects={projects}
        />

        <Pagination
          limit={limit}
          total={count}
          page={page || 1}
          style={{
            marginTop: 20,
          }}
        />
      </Grid>

    }




    let content = <Grid
      container
      spacing={0}
    >
      <Grid
        item
        xs={12}

      >
        <Link
          to="/projects/create"
        >
          <Typography

          >
            Добавить проект
          </Typography>
        </Link>
      </Grid>

      {output}

    </Grid>


    return (content);
  }
}


export default ProjectsView;