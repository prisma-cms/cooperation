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

import TaskStatusSelect from "./Task/Status/Select";

import moment from "moment";
import { IconButton } from 'material-ui';

import StartIcon from "material-ui-icons/PlayArrow";
import StopIcon from "material-ui-icons/Stop";
import { TaskView } from './Task';


export class TasksView extends TableView {

  static propTypes = {
    ...TableView.propTypes,
    filters: PropTypes.object,
    setFilters: PropTypes.func,
    createTaskProcessor: PropTypes.func.isRequired,
    updateTaskProcessor: PropTypes.func.isRequired,
    createTimerProcessor: PropTypes.func.isRequired,
    updateTimerProcessor: PropTypes.func.isRequired,
  };

  static defaultProps = {
    ...TableView.defaultProps,
    title: "",
  }



  getButtons(object) {

    let buttons = [];


    const {
      createTimerProcessor,
      updateTimerProcessor,
      classes,
    } = this.props;

    const {
      UserLink,
      //   TaskLink,
      //   Editor,
      //   ProjectLink,
    } = this.context;


    if (object) {


      const {
        id: taskId,
        name,
        Timers,
        CreatedBy,

      } = object;

      const {
        id: createdById,
      } = CreatedBy || {};

      const {
        user: currentUser,
      } = this.context;

      let activeTimers = Timers && Timers.filter(n => n.stopedAt === null) || []


      if (activeTimers.length) {

        activeTimers.map(n => {
          const {
            id,
            CreatedBy,
          } = n;

          buttons.push(<UserLink
            key={id}
            user={CreatedBy}
            size="small"
            showName={false}
          />);
        });

      }


      if (currentUser) {

        const {
          id: currentUserId,
        } = currentUser;

        const activeTimer = activeTimers.find(n => n.CreatedBy.id === currentUserId);

        if (activeTimer) {

          const {
            id: timerId,
          } = activeTimer;

          buttons.push(<IconButton
            key="stop"
            onClick={() => updateTimerProcessor({
              variables: {
                data: {
                  stopedAt: new Date(),
                },
                where: {
                  id: timerId,
                },
              },
            })}
            className={classes.button}
          >
            <StopIcon />
          </IconButton>);
        }
        else {
          buttons.push(<IconButton
            key="start"
            onClick={() => createTimerProcessor({
              variables: {
                data: {
                  Task: {
                    connect: {
                      id: taskId,
                    },
                  },
                },
              },
            })}
            className={classes.button}
          >
            <StartIcon />
          </IconButton>);
        }


      }
    }

    return buttons;
  }


  getColumns() {


    const {
      Grid,
      ProjectLink,
      UserLink,
      TaskLink,
      TaskStatus,
    } = this.context;

    const {
      classes,
      updateTaskProcessor,
      createTimerProcessor,
      updateTimerProcessor,
    } = this.props;

    return [
      // {
      //   id: "Project",
      //   label: "Проект",
      //   renderer: (value, record) => {
      //     return value ? <ProjectLink
      //       object={value}
      //     /> : null;
      //   },
      // },
      // {
      //   id: "id",
      //   label: "Задача",
      //   renderer: (value, record) => {

      //     return record ? <TaskLink
      //       object={record}
      //     /> : null;
      //   },
      // },
      {
        id: "status",
        label: "Статус",
        renderer: (value, record) => {
          // console.log("status", record);

          return value ? <Grid
            container
            spacing={8}
            alignItems="center"
          >
            <Grid
              item
            >
              <TaskStatus
                value={value}
              />
              {/* <TaskStatusSelect
                value={value}
                inEditMode={true}
                onChange={event => {
                  // const {
                  //   value,
                  //   name,
                  // } = event.target;
                  // this.updateObject({
                  //   [name]: value,
                  // });
                }}
              /> */}
            </Grid>
            {/* <Grid
              item
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              {this.getButtons(record)}
            </Grid> */}
          </Grid> : null;
        },
      },
      {
        id: "id",
        label: "Задача",
        renderer: (value, record) => {

          return record ? <TaskView
            data={{
              object: record,
            }}
            classes={classes}
            mutate={updateTaskProcessor}
            createTimer={createTimerProcessor}
            updateTimer={updateTimerProcessor}
            showStatus={false}
            showCreatedBy={false}
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
        id: "RelatedTo",
        label: "Связано с",
        renderer: (value, record) => {
          // console.log("status", TaskLink);

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