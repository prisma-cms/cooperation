import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  TaskList,
} from "@prisma-cms/react-timeline-gantt";
import { withStyles } from 'material-ui';

// import Row from "./Row";

import TaskView from "../../../../Tasks/View/Task";


import StatusesList from "./Statuses";
import { Button } from 'material-ui';

const styles = {
}


class TaskListCustom extends TaskList {

  static propTypes = {
    ...TaskList.propTypes,
    taskStatuses: PropTypes.object,
    getFilters: PropTypes.func.isRequired,
    setFilters: PropTypes.func.isRequired,
  };


  constructor(props) {
    super(props);

  }

  // render() {
  //   return null;
  // }


  // renderTaskRow(data) {

  //   const {
  //     mutate,
  //     selectedItem,
  //   } = this.props;


  //   let rows = data.map(n => {

  //     const {
  //       id,
  //     } = n;

  //     return <Row
  //       key={id}
  //       data={{
  //         object: n,
  //       }}
  //       mutate={mutate}
  //     />

  //   });


  //   return rows;
  // }


  renderTaskRow(data) {

    let output = null;

    const {
      selectedItem,
      mutate,
      // taskStatuses,
      getFilters,
      setFilters,
    } = this.props;


    if (selectedItem) {
      // output = <Row
      output = <TaskView
        data={{
          object: selectedItem,
        }}
        mutate={mutate}
      />
    }

    const {
      status_in,
    } = getFilters();

    let statuses = status_in || [];

    let statusesFilter = <div>
      <div>
        <Button
          onClick={event => {
            setFilters({
              status_in: undefined,
            });
          }}
          size="small"
          disabled={!statuses.length ? true : false}
        >
          Все
        </Button>
        <Button
          onClick={event => {
            setFilters({
              status_in: ["New", "Accepted", "Progress", "Paused", "RevisionsRequired", "Discuss", "Approved", "Done"],
            });
          }}
          size="small"
        >
          Активные
        </Button>
        <Button
          onClick={event => {
            setFilters({
              status_in: ["Progress", "Discuss"],
            });
          }}
          size="small"
        >
          В работе
        </Button>
      </div>
      <StatusesList
        // data={taskStatuses}
        // mutate={() => {}}
        active={statuses}
        onClick={status => {

          const index = statuses.indexOf(status);

          if (index !== -1) {
            statuses.splice(index, 1);
          }
          else {
            statuses.push(status);
          }

          setFilters({
            status_in: statuses,
          });

        }}
      />
    </div>

    return <div>

      {statusesFilter}

      {output}
    </div>
  }
}


export default withStyles(styles)(props => <TaskListCustom 
  {...props}
/>);

