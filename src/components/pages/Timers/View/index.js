import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';


import { Typography } from 'material-ui';


import TimersList from "./List";
// import Context from "@prisma-cms/context";

import {
  styles,
  TableView,
} from "apollo-cms/lib/DataView/List/Table";
import { withStyles } from 'material-ui';

import Filters from "@prisma-cms/filters";

import moment from "moment";


class TimersView extends TableView {


  static propTypes = {
    ...TableView.propTypes,
    filters: PropTypes.object,
    setFilters: PropTypes.func,
  };


  static defaultProps = {
    ...TableView.defaultProps,
    title: "",
  }


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

          const {
            Project,
          } = record && record.Task || {};

          return Project ? <ProjectLink
            object={Project}
          /> : null;
        },
      },
      {
        id: "Task",
        label: "Задача",
        renderer: (value, record) => {

          // console.log(record);

          return value ? <TaskLink
            object={value}
          /> : null;
        },
      },
      {
        id: "status",
        label: "Статус",
        renderer: (value, record) => {

          const {
            status,
          } = record && record.Task || {};

          return status ? <TaskStatus
            value={status}
          /> : null;
        },
      },
      {
        id: "createdAt",
        label: "Начало",
        renderer: (value, record) => {

          return value ? moment(value).format("lll") : null;
        },
      },
      {
        id: "stopedAt",
        label: "Конец",
        renderer: (value, record) => {

          return value ? moment(value).format("lll") : null;
        },
      },
      {
        id: "duration",
        label: "Длительность",
        renderer: (value, record) => {

          let output = null;

          const {
            createdAt,
            stopedAt,
          } = record || {};


          if (createdAt && stopedAt) {
            const start = moment(createdAt);
            const end = moment(stopedAt);
            const diff = end.diff(start);

            output = moment.utc(diff).format("HH:mm:ss");
          }

          return output;
        },
      },
      {
        id: "CreatedBy",
        label: "Исполнитель",
        renderer: (value, record) => {
          return value ? <UserLink
            user={value}
            size="small"
          /> : null;
        },
      },
      // {
      //   id: "RelatedTo",
      //   label: "Связано с",
      //   renderer: (value, record) => {
      //     console.log("status", TaskLink);

      //     // return value ? <TaskStatus
      //     //   value={value}
      //     // /> : null;

      //     return value && value.length ? value.map(n => <TaskLink
      //       key={n.id}
      //       object={n}
      //     />).reduce((a, b) => [a, ", ", b]) : null;
      //   },
      // },
    ];
  }



  renderFilters() {

    const {
      filters,
      setFilters,
    } = this.props;

    return filters && setFilters ? <Filters
      queryName="timers"
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


    let timers = edges.map(n => n.node);


    let content = <Grid
      container
      spacing={0}
    >

      {edges && edges.length ? <Grid
        item
        xs={12}

      >

        <TimersList
          timers={timers}
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


export default withStyles(styles)(props => <TimersView
  {...props}
/>);