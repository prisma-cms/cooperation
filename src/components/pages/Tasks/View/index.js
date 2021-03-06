import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

// import Context from "@prisma-cms/context";

import Filters from "@prisma-cms/filters";
import Timeline from "@prisma-cms/timeline";

// import Typography from 'material-ui/Typography';

// import TasksList from "./List";


import {
  styles,
  TableView,
} from "apollo-cms/lib/DataView/List/Table";

import withStyles from 'material-ui/styles/withStyles';

// import TaskStatusSelect from "./Task/Status/Select";

import moment from "moment";
import IconButton from 'material-ui/IconButton';

import StartIcon from "material-ui-icons/PlayArrow";
import StopIcon from "material-ui-icons/Stop";
// import FavoritedIcon from "material-ui-icons/Favorite";
import FavoriteIcon from "material-ui-icons/ThumbUp";
import { TaskView } from './Task';
import gql from 'graphql-tag';
import Button from 'material-ui/Button';


export class TasksView extends TableView {

  static propTypes = {
    // eslint-disable-next-line react/forbid-foreign-prop-types
    ...TableView.propTypes,
    filters: PropTypes.object,
    setFilters: PropTypes.func,
    createTaskProcessor: PropTypes.func.isRequired,
    updateTaskProcessor: PropTypes.func.isRequired,
    createTimerProcessor: PropTypes.func.isRequired,
    updateTimerProcessor: PropTypes.func.isRequired,
    // createTaskReactionProcessor: PropTypes.func.isRequired,
    deleteTaskReaction: PropTypes.func.isRequired,
  };

  static defaultProps = {
    ...TableView.defaultProps,
    title: "",
  }


  // constructor(props) {

  //   super(props);


  //   this.state = {
  //     ...this.state,
  //   }

  // }


  componentWillMount() {


    this.state.columnData = this.initColumns()

    super.componentWillMount && super.componentWillMount();

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
        // name,
        Timers,
        // CreatedBy,

      } = object;

      // const {
      //   id: createdById,
      // } = CreatedBy || {};

      const {
        user: currentUser,
      } = this.context;

      let activeTimers = Timers ? Timers.filter(n => n.stopedAt === null) : []


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

          return null;
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


  initColumns() {


    const {
      Grid,
      ProjectLink,
      UserLink,
      TaskLink,
      TaskStatus,
      user: currentUser,
      query: {
        createTaskReactionProcessor,
      },
    } = this.context;

    const {
      id: currentUserId,
    } = currentUser || {}

    const {
      classes,
      updateTaskProcessor,
      createTimerProcessor,
      updateTimerProcessor,
      deleteTaskReaction,
      // createTaskReactionProcessor
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
        hidden: false,
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
        id: "name",
        label: "Задача",
        hidden: true,
        renderer: (value, record) => {

          return record ? <TaskLink
            object={record}
          /> : null;
        },
      },
      {
        id: "Project",
        label: "Проект",
        hidden: true,
        renderer: (value, record) => {

          return value ? <ProjectLink
            object={value}
          /> : null;
        },
      },
      {
        id: "id",
        label: "Подробности задачи",
        hidden: false,
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
        label: "Дата постановки",
        hidden: false,
        renderer: (value, record) => {

          return this.renderDate(value);
        },
      },
      {
        id: "startDatePlaning",
        label: "Планируемая дата начала",
        hidden: true,
        renderer: (value, record) => {

          return this.renderDate(value);
        },
      },
      {
        id: "endDatePlaning",
        label: "Планируемая дата завершения",
        hidden: true,
        renderer: (value, record) => {

          return this.renderDate(value);
        },
      },
      {
        id: "startDate",
        label: "Дата начала",
        hidden: true,
        renderer: (value, record) => {

          return this.renderDate(value);
        },
      },
      {
        id: "endDate",
        label: "Дата завершения",
        hidden: true,
        renderer: (value, record) => {

          return this.renderDate(value);
        },
      },
      {
        id: "planes",
        label: "Плановые сроки",
        hidden: false,
        renderer: (value, record) => {

          // const date = value ? moment(value).format("lll") : null;

          let dates = [];

          const {
            createdAt,
            startDatePlaning,
            startDate,
            endDatePlaning,
            endDate,
          } = record;

          let min = moment(startDate || startDatePlaning || createdAt);
          let max = (endDate || endDatePlaning) ? moment(endDate || endDatePlaning) : null;

          // console.log("startDate", min);
          // console.log("endDate", endDate);

          if (min && max) {

            const startTime = min.toDate().getTime();
            const endTime = max.toDate().getTime();

            dates.push({
              startDate: startTime,
              endDate: endTime,
            });

          }


          return dates.length ? this.renderTimeline(dates, {

          }) : null;
        },
      },
      {
        id: "CreatedBy",
        label: "Постановщик",
        hidden: false,
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
      //     // console.log("status", TaskLink);

      //     // return value ? <TaskStatus
      //     //   value={value}
      //     // /> : null;

      //     return value && value.length ? value.map(n => <TaskLink
      //       key={n.id}
      //       object={n}
      //     />).reduce((a, b) => [a, ", ", b]) : null;
      //   },
      // },
      {
        id: "Reactions",
        label: "Нравится",
        hidden: false,
        renderer: (value, record) => {

          if (!value) {
            return null;
          }

          const {
            id: taskId,
          } = record;


          const users = value && value.length ? value.filter(n => n.CreatedBy && n.CreatedBy.id !== currentUserId) : [];

          let like;

          const liked = (currentUserId && value && value.find(n => n.CreatedBy && n.CreatedBy.id === currentUserId)) || null;

          if (liked) {

            const {
              id: likedId,
            } = liked;

            like = <IconButton
              onClick={event => {

                deleteTaskReaction({
                  variables: {
                    where: {
                      id: likedId,
                    },
                  },
                });

              }}
            >
              <FavoriteIcon
                color="primary"
              />
            </IconButton>
          }
          else {
            like = <IconButton
              onClick={event => {

                // createTaskReactionProcessor({
                // });

                this.mutate({
                  mutation: gql(createTaskReactionProcessor),
                  variables: {
                    data: {
                      type: "UpVote",
                      Task: {
                        connect: {
                          id: taskId,
                        },
                      },
                    },
                  },
                });

              }}
            >
              <FavoriteIcon
                color="action"
              />
            </IconButton>
          }

          return <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >

            <Grid
              container
              spacing={8}
            >
              {users.length ? users.map(n => <Grid
                key={n.id}
                item
              >
                <UserLink
                  user={n.CreatedBy}
                  size="small"
                  showName={false}
                />
              </Grid>)
                : null}
            </Grid>

            {like}
          </div>
        },
      },
      // {
      //   id: "status",
      //   label: "Статус",
      // },
    ];
  }


  renderDate(date) {

    return date ? moment(date).format("lll") : null;
  }

  getColumns() {


    const {
      columnData,
    } = this.state;

    return columnData;
  }


  renderFilters() {

    const {
      filters,
      setFilters,
    } = this.props;

    return <Fragment>

      {filters && setFilters ? <Filters
        queryName="tasks"
        filters={filters}
        setFilters={setFilters}
      /> : null}

      {this.renderTimeline()}

    </Fragment>;
  }


  renderTimeline(defaultDates, options) {

    const {
      Grid,
      theme,
    } = this.context;

    // console.log(this.context);

    const {
      typography: {
        caption,
      },
    } = theme;

    const {
      data: {
        objectsConnection,
      },
      // classes,
    } = this.props;

    const tasks = objectsConnection ? objectsConnection.edges.map(n => n.node) : [];

    let minDate = 0;
    let maxDate = 0;


    let dates = [];

    tasks.map(n => {

      const {
        createdAt,
        startDatePlaning,
        startDate,
        endDatePlaning,
        endDate,
      } = n;

      let min = moment(startDate || startDatePlaning || createdAt);
      let max = (endDate || endDatePlaning) ? moment(endDate || endDatePlaning) : null;

      // console.log("startDate", min);
      // console.log("endDate", endDate);

      if (min && max) {

        const startTime = min.toDate().getTime();
        const endTime = max.toDate().getTime();

        dates.push({
          startDate: startTime,
          endDate: endTime,
        });

        if (!minDate || minDate > startTime) {
          minDate = startTime;
        }

        if (!maxDate || maxDate < endTime) {
          maxDate = endTime;
        }

      }

      return null;
    });

    const showDates = defaultDates ? defaultDates : dates;

    // console.log("dates", dates);
    // console.log("tasks", tasks);
    // console.log("minDate", minDate);
    // console.log("maxDate", maxDate);

    let timeline;

    if (minDate && maxDate && showDates && showDates.length) {
      timeline = <Grid
        container
      >

        <Grid
          item
        >
          <span
            style={{
              ...caption,
              padding: 5,
            }}
          >
            {moment(minDate).format("DD.MM.YYYY")}
          </span>
        </Grid>

        <Grid
          item
          xs
        >
          <Timeline
            minDate={minDate}
            maxDate={maxDate}
            dates={showDates}
            onStartDateChange={() => { }}
            onEndDateChange={() => { }}
            {...options}
          />
        </Grid>

        <Grid
          item
        >
          <Grid
            item
          >
            <span
              style={{
                ...caption,
                padding: 5,
              }}
            >
              {moment(maxDate).format("DD.MM.YYYY")}
            </span>
          </Grid>
        </Grid>

      </Grid>
    }

    return timeline;

  }


  render() {

    const {
      Pagination,
      Grid,
    } = this.context;

    const {
      page,
      setShowAll,
      showAll,
    } = this.props;


    const {
      objectsConnection,
      // loading,
      variables: {
        first: limit,
      },
    } = this.props.data;


    const {
      // edges,
      aggregate,
    } = objectsConnection || {};

    const {
      count = 0,
    } = aggregate || {};


    let showAllButton;

    if (showAll) {
      showAllButton = <Button
        onClick={event => setShowAll(false)}
      >
        Скрыть
      </Button>
    }
    else if (limit && count && count > limit && setShowAll) {

      showAllButton = <Button
        onClick={event => setShowAll(true)}
      >
        Показать все ({count})
      </Button>

    }


    let content = <Fragment>

      {super.render()}

      <div
        style={{
          textAlign: "center"
        }}
      >
        <Grid
          container
          style={{
            display: "inline-flex",
            alignItems: "center",
            width: "auto",
          }}
        >


          <Grid
            item
          >
            <Pagination
              limit={limit}
              total={count}
              page={page || 1}
              style={{
                marginTop: 20,
              }}
            />
          </Grid>

          <Grid
            item
          >
            {showAllButton}
          </Grid>

        </Grid>
      </div>

    </Fragment>

    return content;
  }

}


export default withStyles(styles)(props => <TasksView
  {...props}
/>);