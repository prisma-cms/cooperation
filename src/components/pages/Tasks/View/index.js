import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

// import Context from "@prisma-cms/context";

import Filters from "@prisma-cms/filters";

import { Typography } from 'material-ui';

import TasksList from "./List";


import {
  styles,
  TableView,
} from "apollo-cms/lib/DataView/List/Table";
import { withStyles } from 'material-ui';

// import TaskStatus from "./Task/Status";

import moment from "moment";


export class TasksView extends TableView {

  static propTypes = {
    ...TableView.propTypes,
    filters: PropTypes.object,
    setFilters: PropTypes.func,
  };


  getColumns() {


    const {
      ProjectLink,
      UserLink,
      TaskLink,
      TaskStatus,
    } = this.context;

    return [
      {
        id: "Project",
        label: "Проект",
        renderer: (value, record) => {
          return value ? <ProjectLink
            object={value}
          /> : null;
        },
      },
      {
        id: "id",
        label: "Задача",
        renderer: (value, record) => {

          return record ? <TaskLink
            object={record}
          /> : null;
        },
      },
      {
        id: "createdAt",
        label: "Дата",
        renderer: (value, record) => {

          return value ? moment(value).format("lll") : null;
        },
      },
      {
        id: "CreatedBy",
        label: "Постановщик",
        renderer: (value, record) => {
          return value ? <UserLink
            user={value}
            size="small"
          /> : null;
        },
      },
      {
        id: "status",
        label: "Статус",
        renderer: (value, record) => {
          console.log("status", record);

          return value ? <TaskStatus
            value={value}
          /> : null;
        },
      },
      {
        id: "RelatedTo",
        label: "Связано с",
        renderer: (value, record) => {
          console.log("status", TaskLink);

          // return value ? <TaskStatus
          //   value={value}
          // /> : null;

          return value && value.length ? value.map(n => <TaskLink
            key={n.id}
            object={n}
          />).reduce((a, b) => [a, ", ", b]) : null;
        },
      },
      // {
      //   id: "status",
      //   label: "Статус",
      // },
    ];
  }



  renderFilters() {

    const {
      filters,
      setFilters,
    } = this.props;

    return filters && setFilters ? <Filters
      queryName="tasks"
      filters={filters}
      setFilters={setFilters}
    /> : null;
  }


  render() {

    const {
      Pagination,
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


    let content = <Fragment>

      {super.render()}

      <Pagination
        limit={limit}
        total={count}
        page={page || 1}
        style={{
          marginTop: 20,
        }}
      />

    </Fragment>

    return content;
  }

  render__() {

    const {
      Grid,
      Pagination,
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

    if (!edges || !edges.length) {

      if (loading) {
        return null;
      }
      else {
        return <Typography>
          Данные не были получены
        </Typography>
      }

    }


    let tasks = edges.map(n => n.node);


    let content = <Grid
      container
      spacing={0}
    >

      {edges && edges.length ? <Grid
        item
        xs={12}

      >

        <TasksList
          tasks={tasks}
        />

        <Pagination
          limit={limit}
          total={count}
          page={page || 1}
          style={{
            marginTop: 20,
          }}
        />
      </Grid> : null
      }

    </Grid>


    return (content);
  }
}


export default withStyles(styles)(props => <TasksView
  {...props}
/>);