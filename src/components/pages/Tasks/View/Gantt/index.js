import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui';


import moment from "moment";

import TimeLine from "@prisma-cms/react-timeline-gantt";
import TaskList from "./TaskList";
import DataTask from "./DataTask";

import { graphql, compose } from 'react-apollo';

import PrismaCmsComponent from '@prisma-cms/component';

import {
  Task as TaskQuery,
  createTaskProcessor,
  updateTaskProcessor,
} from "../../query";

// const UpdateTask = graphql(updateTaskProcessor)(TaskView);
// const CreateTask = graphql(createTaskProcessor)(TaskView);

export const styles = {
  root: {
    "fontFamily": "Helvetica, Arial, sans-serif",
    "height": "100%",
    "margin": "0",
    // border: "1px solid green",

    "& canvas": {
      "fontFamily": "Helvetica, Arial, sans-serif",
      "height": "100%",
      "margin": "0"
    },
    "& #routeContainer": {
      "fontFamily": "Helvetica, Arial, sans-serif",
      "height": "100%",
      "margin": "0"
    },
    "& .app-container": {
      "display": "flex",
      "flexDirection": "column",
      "justifyContent": "flex-start",
      "alignItems": "center",
      "width": "100%",
      "height": "100%"
    },
    "& .time-line-container": {
      "display": "flex",
      "flexDirection": "column",
      "justifyContent": "flex-start",
      "alignItems": "center",
      "width": "100%",
      "height": "100%",
      // "margin": "10px"
    }
  },
}


export class GanttView extends PrismaCmsComponent {

  // static propTypes = {

  // }

  static defaultProps = {
    createTaskProcessor,
    updateTaskProcessor,
  }

  // static contextTypes = {
  //   // client: PropTypes.object.isRequired,
  //   user: PropTypes.object,
  // }

  state = {
    // daysWidth: 1,
    // itemheight: 1,
    ...super.state,
    relationItemTo: null,
    relationItemFrom: null,
  }



  onSelectItem = (item) => {
    this.setState({ selectedItem: item })
  }

  onUpdateTask = async (item, props) => {

    let {
      start,
      end,
    } = props;

    const {
      id,
      CreatedBy: {
        id: createdById,
      },
    } = item;


    let {
      updateTask,
    } = this.props;

    const {
      // client,
      user: currentUser,
    } = this.context;

    const {
      id: currentUserId,
    } = currentUser || {};

    if (currentUserId !== createdById) {
      return;
    }


    let startDatePlaning = moment(start);
    let endDatePlaning = moment(end);

    let data = {
      startDatePlaning,
    };

    if (endDatePlaning > startDatePlaning) {
      data.endDatePlaning = endDatePlaning;
    }

    await updateTask({
      variables: {
        data,
        where: {
          id,
        },
      },
    });

  }

  onCreateLink = (item) => {

  }


  onStartRelationTo(item) {

    const {
      relationItemTo,
    } = this.state;

    if (relationItemTo && relationItemTo.id === item.id) {

      this.setState({
        relationItemTo: null,
      });

      return;

    }

    this.setState({
      relationItemTo: item,
    });

    return;

  }


  async onSetRelationTo(item) {

    const {
      relationItemTo,
    } = this.state;

    await this.mutate({
      mutation: updateTaskProcessor,
      variables: {
        where: {
          id: relationItemTo.id,
        },
        data: {
          RelatedFrom: {
            connect: {
              id: item.id,
            },
          },
        },
      },
    })
      .then(r => {
        this.setState({
          relationItemTo: null,
        });

        return r;
      });

    return;

  }


  onStartRelationFrom(item) {

    const {
      relationItemFrom,
    } = this.state;

    if (relationItemFrom && relationItemFrom.id === item.id) {

      this.setState({
        relationItemFrom: null,
      });

      return;

    }

    this.setState({
      relationItemFrom: item,
    });

    return;

  }


  async onSetRelationFrom(item) {

    const {
      relationItemFrom,
    } = this.state;

    await this.mutate({
      mutation: updateTaskProcessor,
      variables: {
        where: {
          id: relationItemFrom.id,
        },
        data: {
          RelatedTo: {
            connect: {
              id: item.id,
            },
          },
        },
      },
    })
      .then(r => {
        this.setState({
          relationItemFrom: null,
        });

        return r;
      });

    return;

  }


  render() {

    const {
      classes,
      data: {
        objectsConnection,
      },
    } = this.props;

    const {
      selectedItem,
      relationItemTo,
      relationItemFrom,
    } = this.state;

    // let d1 = new Date();
    // let d2 = new Date();
    // d2.setDate(d2.getDate() + 5);
    // let d3 = new Date();
    // d3.setDate(d3.getDate() + 8);
    // let d4 = new Date();
    // d4.setDate(d4.getDate() + 20);

    // let data = [
    //   {
    //     id: 1,
    //     start: d1,
    //     end: d2,
    //     name: "Demo Task 1"
    //   },
    //   {
    //     id: 2,
    //     start: d3,
    //     end: d4,
    //     name: "Demo Task 2",
    //     color: "orange",
    //     label: "sdfsdf",
    //     showLabel: true
    //   }
    // ];

    let tasks = objectsConnection && objectsConnection.edges.map(({ node }) => node) || [];

    let tasksData = tasks.map(n => {

      let {
        id,
        name,
        createdAt,
        startDatePlaning,
        endDatePlaning,
        startDate,
        endDate,
        status,
      } = n;

      let start = moment(startDate || startDatePlaning || createdAt).toDate();
      // // let end = moment(endDate || endDatePlaning || createdAt).toDate();
      let end = endDate || endDatePlaning;

      if (!end) {
        // end = moment(start.getDate() + 5).toDate();
        // end = start.getDate() + 5;
        // end.setDate(end.getDate() + 5);
        // end = new Date()
        // end = moment();
      }
      else {
        end = moment(end).toDate();
      }


      // let start = new Date();
      // let end = new Date();
      // end.setDate(start.getDate() + 5);

      return {
        ...n,
        id,
        name,
        start,
        end,
        onStartRelationTo: (item) => {
          // console.log("startRelation item", item);
          this.onStartRelationTo(item);
        },
        onSetRelationTo: (item) => {
          this.onSetRelationTo(item);
        },
        relationItemTo,
        onStartRelationFrom: (item) => {
          // console.log("startRelation item", item);
          this.onStartRelationFrom(item);
        },
        onSetRelationFrom: (item) => {
          this.onSetRelationFrom(item);
        },
        relationItemFrom,
      }

    });

    // let links = [{ id: 1, start: 1, end: 2 }];

    let links = [];

    tasksData.map(n => {
      const {
        id: start,
        RelatedTo,
      } = n;

      RelatedTo && RelatedTo.map(({
        id: end,
      }) => {

        links.push({
          start,
          end,
        });

      });

    })

    // links = [{ "id": "21c3f718-e89a-4219-9cc4-51ccf0366d3a", "start": "cjopiax4v01er09606cweyk08", "startPosition": 0, "end": "cjopiana701eg0960uopuhen9", "endPosition": 0 }, { "id": "98e514bf-99ab-41fb-895b-252da37e1bb5", "start": "cjopi9ank01dt0960cj3rfoin", "startPosition": 0, "end": "cjopi3ee301cq0960xsgy1wz2", "endPosition": 0 }];



    const config = {
      // header: {
      //   month: {
      //     dateFormat: 'MMMM  YYYY',
      //     style: {
      //       background: "linear-gradient( grey, black)",
      //       textShadow: '0.5px 0.5px black',
      //       fontSize: 12
      //     }
      //   },
      //   dayOfWeek: {
      //     style: {
      //       background: "linear-gradient( orange, grey)",
      //       fontSize: 9
      //     }
      //   },
      //   dayTime: {
      //     style: {
      //       background: "linear-gradient( grey, black)",
      //       fontSize: 9,
      //       color: "orange"
      //     },
      //     selectedStyle: {
      //       background: "linear-gradient( #d011dd ,#d011dd)",
      //       fontWeight: 'bold',
      //       color: 'white'
      //     }
      //   }
      // },
      taskList: {
        title: {
          label: "Задачи",
          // style: {
          //   background: "linear-gradient( grey, black)"
          // }
        },
        // task: {
        //   style: {
        //     backgroundColor: 'grey',
        //     color: 'white'
        //   }
        // },
        // verticalSeparator: {
        //   style: {
        //     backgroundColor: '#fbf9f9',
        //   },
        //   grip: {
        //     style: {
        //       backgroundColor: 'red',
        //     }
        //   }
        // }
      },
      dataViewPort: {
        // rows: {
        //   style: {
        //     backgroundColor: "white",
        //     borderBottom: 'solid 0.5px silver'
        //   }
        // },
        task: {
          showLabel: true,
          style: {
            // borderRadius: 1,
            // boxShadow: '2px 2px 8px #888888',
            paddingLeft: 3,
            paddingRight: 3,
            cursor: "pointer",
          }
        }
      }
    }

    return super.render(<div
      className={classes.root}
    >

      <style
        dangerouslySetInnerHTML={{
          __html: `
            html{
              height: 100%;
            }
            body{
              height: 100%;
            }
            #root {
              height: 100%;
            }
          `,
        }}
      />

      {/* DayWidth <input type="range" min="30" max="500" value={this.state.daysWidth} onChange={this.handleDayWidth} step="1" />
      Item Height <input type="range" min="30" max="500" value={this.state.itemheight} onChange={this.handleItemHeight} step="1" /> */}

      <div className="time-line-container">
        <TimeLine
          TaskList={TaskList}
          DataTask={DataTask}
          data={tasksData}
          links={links}
          config={config}
          onUpdateTask={this.onUpdateTask}
          onCreateLink={this.onCreateLink}
          onSelectItem={this.onSelectItem}
          selectedItem={selectedItem ? tasksData && tasksData.find(n => n.id === selectedItem.id) : null}
        />
      </div>
    </div>)
      ;
  }
}

export const processors = compose(

  graphql(createTaskProcessor, {
    name: "createTask",
  }),
  graphql(updateTaskProcessor, {
    name: "updateTask",
  }),

)

export default processors(withStyles(styles)(GanttView));
