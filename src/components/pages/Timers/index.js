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


  render() {

    const {
      Renderer,
    } = this;

    let {
      first,
      where,
      View,
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


export default TimersPage;