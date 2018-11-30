import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Page from "../layout";

import {
  TasksConnector,
} from "./query";

// import View from "./View";
import View from "./View/Gantt";


class TasksPage extends Page {

  static propTypes = {
    ...Page.propTypes,
    first: PropTypes.number.isRequired,
    orderBy: PropTypes.string.isRequired,
  };


  static defaultProps = {
    ...Page.defaultProps,
    first: 1000,
    orderBy: "createdAt_ASC",
    View,
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
    } = uri.query(true);

    if(status_in && !Array.isArray(status_in)){
      status_in = [status_in];
    }



    let filters = {
      status_in,
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

    history.push(newUri.toString());
  }


  render() {

    let {
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

    const where = this.getFilters();



    return super.render(
      <TasksConnector
        where={where}
        first={first}
        skip={skip}
        page={page ? parseInt(page) : undefined}
        setFilters={filters => this.setFilters(filters)}
        getFilters={filters => this.getFilters()}
        {...other}
      />
    );
  }
}


export default TasksPage;