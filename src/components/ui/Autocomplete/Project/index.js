import React, { Component } from 'react';
import PropTypes from 'prop-types';

import PrismaCmsComponent from "@prisma-cms/component";
import { graphql } from 'react-apollo';

import View from "./View";
import gql from 'graphql-tag';

class ProjectAutocomplete extends PrismaCmsComponent {


  static propTypes = {
    ...PrismaCmsComponent.propTypes,
    View: PropTypes.func.isRequired,
  }


  static defaultProps = {
    ...PrismaCmsComponent.defaultProps,
    View,
    first: 10,
    orderBy: "name_ASC",
    label: "Проект",
  }


  componentWillMount() {

    const {
      query: {
        projects,
      },
    } = this.context;

    const {
      View,
    } = this.props;

    this.Renderer = graphql(gql(projects))(View);

    super.componentWillMount && super.componentWillMount();
  }


  onChange(event) {

    const {
      value,
    } = event.target;

    // this.setState({
    //   value,
    // }, () => this.loadData());

    this.setFilters({
      projectQuery: value,
    });

  }


  onSelect = (value, item) => {

    this.setObjectId(item.id);
  }


  resetData = () => {

    this.setState({
      // item: null,
      objectId: null,
    });

    this.cleanFilters();

  }

  setObjectId(objectId) {

    this.setState({
      objectId,
    });
  }

  getObjectId() {

    const {
      // item,
      objectId,
    } = this.state;

    return objectId;

  }


  render() {

    const {
      Renderer,
    } = this;

    const {
      View,
      label,
      helperText,
      error,
      inputProps,
      ...other
    } = this.props;

    const {
      // item,
      // objectId,
    } = this.state;

    const objectId = this.getObjectId();

    const filters = this.getFilters();

    // console.log("filters", filters);

    const {
      projectQuery: name_contains,
    } = filters || {};

    return super.render(
      <Renderer
        {...other}
        onChange={event => this.onChange(event)}
        onSelect={(value, item) => this.onSelect(value, item)}
        resetData={() => this.resetData()}
        value={name_contains || ""}
        where={{
          name_contains,
        }}
        // item={item}
        objectId={objectId}
        inputProps={{
          label,
          helperText,
          error,
          ...inputProps,
        }}
      />
    );
  }

}


export default ProjectAutocomplete;