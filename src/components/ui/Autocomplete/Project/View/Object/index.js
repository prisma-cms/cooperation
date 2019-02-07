import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

import Context from "@prisma-cms/context";
import gql from 'graphql-tag';

class AutocompleteObject extends Component {

  static contextType = Context;

  // static propTypes = {

  // };


  // componentWillMount() {

  //   const {
  //     query: {
  //       project,
  //     },
  //   } = this.context;

  //   this.projectQuery = gql(project);

  //   super.componentWillMount && super.componentWillMount();
  // }


  render() {


    const {
      query: {
        project,
      },
      ProjectLink,
    } = this.context;


    const {
      where,
    } = this.props;

    return <Query
      query={gql(project)}
      variables={{
        where,
      }}
    >
      {({ loading, error, data }) => {
        if (loading) return 'Загрузка...';
        if (error) return `Ошибка! ${error.message}`;

        const {
          object,
        } = data;

        return <ProjectLink
          object={object}
        />;
      }}
    </Query>
  }
}


export default AutocompleteObject;