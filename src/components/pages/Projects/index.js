import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Page from "../layout";

// import {
//   ProjectsConnector,
// } from "./query";

import View from "./View";
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


class ProjectsPage extends Page {

  static propTypes = {
    ...Page.propTypes,
    first: PropTypes.number.isRequired,
    orderBy: PropTypes.string.isRequired,
  };


  static defaultProps = {
    ...Page.defaultProps,
    first: 10,
    orderBy: "createdAt_DESC",
    View,
  }



  setPageMeta(meta = {}) {

    return super.setPageMeta({
      title: "Проекты",
      ...meta,
    });

  }


  componentWillMount() {

    const {
      query: {
        projectsConnection,
      },
    } = this.context;

    const {
      View,
    } = this.props;

    // console.log("projectsConnection", projectsConnection);

    this.Renderer = graphql(gql(projectsConnection))(View);

    super.componentWillMount && super.componentWillMount();
  }


  render() {

    const {
      Renderer,
    } = this;

    let {
      View,
      first,
      where,
      ...other
    } = this.props;

    const {
      uri,
    } = this.context;


    let {
      page,
    } = uri.query(true);

    // return null;

    let skip;

    page = page && parseInt(page) || 0;

    if (first && page > 1) {
      skip = (page - 1) * first;
    }

    return super.render(
      <Renderer
        where={where}
        first={first}
        skip={skip}
        page={page ? parseInt(page) : undefined}
        {...other}
      />
    );
  }
}


export default ProjectsPage;