import React, { Fragment } from 'react';
import PropTypes from 'prop-types';


// import Typography from 'material-ui/Typography';


// import TimersList from "./List";
// import Context from "@prisma-cms/context";

import {
  styles,
  TableView,
} from "apollo-cms/lib/DataView/List/Table";
import withStyles from 'material-ui/styles/withStyles';

import Filters from "@prisma-cms/filters";

import moment from "moment";
import Button from 'material-ui/Button';


class TimersView extends TableView {


  static propTypes = {
    // eslint-disable-next-line react/forbid-foreign-prop-types
    ...TableView.propTypes,
    filters: PropTypes.object,
    setFilters: PropTypes.func,
  };


  static defaultProps = {
    ...TableView.defaultProps,
    title: "",
  }



  componentWillMount() {


    this.state.columnData = this.initColumns()

    super.componentWillMount && super.componentWillMount();

  }



  renderDate(date) {

    return date ? <span
      style={{
        whiteSpace: "nowrap",
      }}
    >
      {moment(date).format("DD.MM.YYYY HH:mm:ss")}
    </span> : null;
  }


  initColumns() {


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
        hidden: false,
        renderer: (value, record) => {

          const {
            TaskProjects,
          } = (record && record.Task) || {};

          const Projects = TaskProjects ? TaskProjects.map(({ Project }) => Project).filter(n => n) : [];

          return Projects && Projects.length ? Projects.map((Project, index) => {
            return <ProjectLink
              key={Project.id || index}
              object={Project}
            />;
          }).reduce((curr, next) => [curr, ", ", next]) : [];

        },
      },
      {
        id: "Task",
        label: "Задача",
        hidden: false,
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
        hidden: false,
        renderer: (value, record) => {

          const {
            status,
          } = (record && record.Task) || {};

          return status ? <TaskStatus
            value={status}
          /> : null;
        },
      },
      {
        id: "TaskCreatedAt",
        label: "Дата постановки задачи",
        hidden: true,
        renderer: (value, record) => {

          const {
            Task,
          } = record || {};

          const {
            createdAt,
          } = Task || {}

          return this.renderDate(createdAt);
        },
      },
      {
        id: "createdAt",
        label: "Начало",
        hidden: false,
        renderer: (value, record) => {

          return this.renderDate(value);
        },
      },
      {
        id: "stopedAt",
        label: "Конец",
        hidden: false,
        renderer: (value, record) => {

          return this.renderDate(value);
        },
      },
      {
        id: "duration",
        label: "Длительность",
        hidden: false,
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
        hidden: false,
        renderer: (value, record) => {
          return value ? <UserLink
            user={value}
            size="small"
          /> : null;
        },
      },
      {
        id: "Author",
        label: "Постановщик задачи",
        hidden: true,
        renderer: (value, record) => {

          const {
            Task,
          } = record || {};

          const {
            CreatedBy,
          } = Task || {};

          return CreatedBy ? <UserLink
            user={CreatedBy}
            size="small"
          /> : null;
        },
      },
      {
        id: "RelatedTo",
        label: "Связано с",
        hidden: true,
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
    ];
  }


  getColumns() {

    return this.state.columnData;
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
      Grid,
    } = this.context;

    const {
      page,
      showAll,
      setShowAll,
      // filters,
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


export default withStyles(styles)(props => <TimersView
  {...props}
/>);