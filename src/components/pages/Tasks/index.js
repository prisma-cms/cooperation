import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Page from "../layout";

// import {
//   TasksConnector,
// } from "./query";

import View from "./View";
// import View from "./View/Gantt";
import { graphql, compose } from 'react-apollo';
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
    first: 10,
    orderBy: "createdAt_DESC",
    View,
    // TasksConnector,
  }


  componentWillMount() {

    const {
      query: {
        tasksConnection,
        createTaskProcessor,
        updateTaskProcessor,
        createTimerProcessor,
        updateTimerProcessor,
        // createTaskReactionProcessor,
        deleteTaskReaction,
      },
    } = this.context;

    const {
      View,
    } = this.props;

    // return;

    this.Renderer = compose(
      graphql(gql(tasksConnection)),
      graphql(gql(createTaskProcessor), {
        name: "createTaskProcessor",
      }),
      graphql(gql(updateTaskProcessor), {
        name: "updateTaskProcessor",
      }),
      graphql(gql(createTimerProcessor), {
        name: "createTimerProcessor",
      }),
      graphql(gql(updateTimerProcessor), {
        name: "updateTimerProcessor",
      }),
      // graphql(gql(createTaskReactionProcessor), {
      //   name: "createTaskReactionProcessor",
      // }),
      graphql(gql(deleteTaskReaction), {
        name: "deleteTaskReaction",
      }),
    )(View);

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
      filters,
    } = uri.query(true);

    if (status_in && !Array.isArray(status_in)) {
      status_in = [status_in];
    }


    try {
      filters = filters && JSON.parse(filters) || null;
    }
    catch (error) {
      console.error(console.error(error));
    }


    let result = {
      // status_in,
      // projectId,
      ...filters,
    };

    if (status_in !== undefined) {
      result.status_in = status_in;
    }

    if (projectId !== undefined) {
      result.projectId = projectId;
    }

    return result;
  }


  // setFilters(filters) {



  //   const {
  //     uri,
  //     router: {
  //       history,
  //     },
  //   } = this.context;

  //   let newUri = uri.clone();

  //   let query = newUri.query(true);

  //   Object.assign(query, {
  //     ...filters,
  //   });

  //   newUri.query(query);

  //   history.push(newUri.resource());
  // }


  setFilters(filters) {

    const {
      uri,
      router: {
        history,
      },
    } = this.context;

    // console.log("setFilters", filters);

    let newUri = uri.clone();

    try {

      filters = filters ? JSON.stringify(filters) : undefined;
    }
    catch (error) {
      console.error(error);
    }

    if (filters) {

      if (newUri.hasQuery) {
        newUri = newUri.setQuery({
          filters,
        });
      }
      else {
        newUri = newUri.addQuery({
          filters,
        });
      }

    }
    else {

      newUri.removeQuery("filters");

    }

    newUri.removeQuery("page");
    newUri.removeQuery("status_in");


    const url = newUri.resource();

    // console.log("setFilters uri", newUri, url);

    history.push(url);

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
      where: propsWhere,
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

    let AND = [];

    if (propsWhere) {
      AND.push(propsWhere);
    }

    if (filters) {
      AND.push(filters);
    }

    let where = {
      AND,
    }

    if (projectId) {
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
        filters={filters || {}}
        setFilters={filters => this.setFilters(filters)}
        {...other}
      />
    );
  }

  // render() {

  //   // return null;

  //   const {
  //     Renderer,
  //   } = this;

  //   let {
  //     View,
  //     first,
  //     // where,
  //     ...other
  //   } = this.props;

  //   const {
  //     uri,
  //   } = this.context;


  //   let {
  //     page,
  //   } = uri.query(true);



  //   let skip;

  //   page = page && parseInt(page) || 0;

  //   if (first && page > 1) {
  //     skip = (page - 1) * first;
  //   }

  //   const {
  //     projectId,
  //     ...filters
  //   } = this.getFilters();

  //   let where = {
  //     ...filters,
  //   }

  //   if(projectId) {
  //     where.Project = {
  //       id: projectId,
  //     }
  //   }


  //   return super.render(
  //     <Renderer
  //       where={where}
  //       first={first}
  //       skip={skip}
  //       page={page ? parseInt(page) : undefined}
  //       setFilters={filters => this.setFilters(filters)}
  //       getFilters={() => this.getFilters()}
  //       {...other}
  //     />
  //   );
  // }
}


export default TasksPage;