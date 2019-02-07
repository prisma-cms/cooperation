import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Page from "../layout";

// import {
//   TasksConnector,
// } from "./query";

// import View from "./View";
import View from "./View/Gantt";
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


class TasksPage extends Page {

  static propTypes = {
    ...Page.propTypes,
    first: PropTypes.number.isRequired,
    orderBy: PropTypes.string.isRequired,
    // TasksConnector: PropTypes.func.isRequired,
  };


  static defaultProps = {
    ...Page.defaultProps,
    first: 1000,
    orderBy: "createdAt_ASC",
    View,
    // TasksConnector,
  }


  componentWillMount() {

    const {
      query: {
        tasksConnection,
      },
    } = this.context;

    const {
      View,
    } = this.props;

    // return;

    this.Renderer = graphql(gql(tasksConnection))(View);

    super.componentWillMount && super.componentWillMount();
  }


  setPageMeta(meta = {}) {

    return super.setPageMeta({
      title: "Задачи",
      ...meta,
    });

  }


  getFilters() {

    const {
      uri,
    } = this.context;


    let {
      status_in,
      projectId,
    } = uri.query(true);

    if (status_in && !Array.isArray(status_in)) {
      status_in = [status_in];
    }



    let filters = {
      status_in,
      projectId,
    };

    return filters;
  }


  setFilters(filters) {



    const {
      uri,
      router: {
        history,
      },
    } = this.context;

    let newUri = uri.clone();

    let query = newUri.query(true);

    Object.assign(query, {
      ...filters,
    });

    newUri.query(query);

    history.push(newUri.resource());
  }


  render() {

    // return null;

    const {
      Renderer,
    } = this;

    let {
      View,
      first,
      // where,
      ...other
    } = this.props;

    const {
      uri,
    } = this.context;


    let {
      page,
    } = uri.query(true);



    let skip;

    page = page && parseInt(page) || 0;

    if (first && page > 1) {
      skip = (page - 1) * first;
    }

    const {
      projectId,
      ...filters
    } = this.getFilters();

    let where = {
      ...filters,
    }

    if(projectId) {
      where.Project = {
        id: projectId,
      }
    }


    return super.render(
      <Renderer
        where={where}
        first={first}
        skip={skip}
        page={page ? parseInt(page) : undefined}
        setFilters={filters => this.setFilters(filters)}
        getFilters={() => this.getFilters()}
        {...other}
      />
    );
  }
}


export default TasksPage;