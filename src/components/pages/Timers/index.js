import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Page from "../layout";

// import {
//   TimersConnector,
// } from "./query";

import View from "./View";
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


class TimersPage extends Page {

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
      title: "Таймеры",
      ...meta,
    });

  }


  componentWillMount() {

    const {
      query: {
        timersConnection,
      },
    } = this.context;

    const {
      View,
    } = this.props;

    // return;

    this.Renderer = graphql(gql(timersConnection))(View);

    super.componentWillMount && super.componentWillMount();
  }



  setFilters(filters) {

    const {
      uri,
      router: {
        history,
      },
    } = this.context;

    // console.log("setFilters", filters);

    let newUri = uri.clone();

    // let filters = {
    //   ...this.getFilters(),
    //   ...newFilters,
    // };

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


    const url = newUri.resource();

    // console.log("setFilters uri", newUri, url);

    history.push(url);

  }


  getFilters() {

    const {
      uri,
    } = this.context;

    let {
      filters,
    } = uri.query(true);


    try {
      filters = filters && JSON.parse(filters) || null;
    }
    catch (error) {
      console.error(console.error(error));
    }

    return filters;
  }


  render() {

    const {
      Renderer,
    } = this;

    let {
      first,
      where: propsWhere,
      View,
      ...other
    } = this.props;


    const {
      showAll,
      ...filters
    } = this.getFilters() || {};

    // console.log("this.getFilters", filters);

    const {
      uri,
    } = this.context;


    let {
      page,
    } = uri.query(true);

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


    let skip;

    page = page && parseInt(page) || 0;

    if (first && page > 1) {
      skip = (page - 1) * first;
    }

    return super.render(
      <Renderer
        where={where}
        first={showAll ? undefined : first}
        skip={skip}
        page={page ? parseInt(page) : undefined}
        filters={filters || {}}
        setFilters={filters => this.setFilters(filters)}
        showAll={showAll}
        setShowAll={(showAll) => {

          this.setFilters({
            ...filters,
            showAll: showAll ? true : undefined,
          });
        }}
        {...other}
      />
    );
  }
}


export default TimersPage;