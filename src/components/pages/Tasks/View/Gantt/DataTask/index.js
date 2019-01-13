import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  DataTask,
} from "@prisma-cms/react-timeline-gantt";

import { withStyles, IconButton } from 'material-ui';
// import StartIcon from "material-ui-icons/PlayArrow";
// import StopIcon from "material-ui-icons/Stop";

// import {
//   Grid,
//   UserLink,
// } from "../../../../../ui";

// import {
//   // taskQuery,
//   createTaskProcessor,
//   updateTaskProcessor,
// } from "../../../query";

// import {
//   createTimerProcessor,
//   updateTimerProcessor,
// } from "../../../../Timers/query";

// import { compose, graphql } from 'react-apollo';

import TaskView from "./Task";



const {
  styles: PrismaCmsDataTaskStyles,
  DataTask: PrismaCmsDataTask,
} = DataTask;


const styles = theme => {

  const {
    root,
    name,
    button,
    ...other
  } = PrismaCmsDataTaskStyles;

  return {
    root: {
      ...root,
      flexWrap: "nowrap",

      "&.New": {
        backgroundColor: "#aa8cb9",
      },
      "&.Accepted": {
        backgroundColor: "#c7ecc5",
      },
      "&.Rejected": {
        backgroundColor: "lightgray",
      },
      "&.Progress": {
        backgroundColor: "#92f78c",
      },
      "&.Paused": {
        backgroundColor: "#afecec",
      },
      "&.Done": {
        backgroundColor: "#4dfb43",
      },
      "&.Discuss": {
        backgroundColor: "#f7c78c",
      },
      "&.Approved": {
        backgroundColor: "#0bdc0b",
      },
      "&.RevisionsRequired": {
        backgroundColor: "#8ccbf5",
      },
      "&.Completed": {
        backgroundColor: "#05c305",
      },
    },
    name: {
      ...name,
      overflow: "hidden",
    },
    button: {
      ...button,
      height: 24,
      width: 24,
    },
    ...other
  };

}


class DataTaskCustom extends PrismaCmsDataTask {


  static contextTypes = {
    user: PropTypes.object,
  }




  async saveObject(data) {

    let {
      mutate,
      createTask,
      updateTask,
    } = this.props;

    if (!mutate) {

      const {
        id,
      } = this.getObjectWithMutations() || {};

      if (id && updateTask) {
        mutate = updateTask;
      }
      else if (!id && createTask) {
        mutate = createTask;
      }
      else {
        // throw (new Error("Mutate not defined"));
        return super.saveObject(data);
      }

    }

    const mutation = this.getMutation(data);

    const result = await mutate(mutation).then(r => r).catch(e => {

      return e;
    });

    return result;

  }


  getRootClasses() {

    const {
      item,
    } = this.props;

    let rootClasses = super.getRootClasses();

    const {
      status,
    } = item;

    return rootClasses.concat([status]);
  }


  renderInner() {

    const {
      item,
      createTimer,
      updateTimer,
      classes,
    } = this.props;

    const {
      id: taskId,
      name,
      Timers,
    } = item;


    return <TaskView
      data={{
        object: item,
      }}
    />


    // const {
    //   user: currentUser,
    // } = this.context;

    // let activeTimers = Timers && Timers.filter(n => n.stopedAt === null) || []

    // let buttons = [];


    // if (activeTimers.length) {

    //   activeTimers.map(n => {
    //     const {
    //       id,
    //       CreatedBy,
    //     } = n;

    //     buttons.push(<UserLink
    //       key={id}
    //       user={CreatedBy}
    //       size="small"
    //       showName={false}
    //     />);
    //   });

    // }


    // if (currentUser) {

    //   const {
    //     id: currentUserId,
    //   } = currentUser;

    //   const activeTimer = activeTimers.find(n => n.CreatedBy.id === currentUserId);

    //   if (activeTimer) {

    //     const {
    //       id: timerId,
    //     } = activeTimer;

    //     buttons.push(<IconButton
    //       key="stop"
    //       onClick={() => updateTimer({
    //         variables: {
    //           data: {
    //             stopedAt: new Date(),
    //           },
    //           where: {
    //             id: timerId,
    //           },
    //         },
    //       })}
    //       className={classes.button}
    //     >
    //       <StopIcon />
    //     </IconButton>);
    //   }
    //   else {
    //     buttons.push(<IconButton
    //       key="start"
    //       onClick={() => createTimer({
    //         variables: {
    //           data: {
    //             Task: {
    //               connect: {
    //                 id: taskId,
    //               },
    //             },
    //           },
    //         },
    //       })}
    //       className={classes.button}
    //     >
    //       <StartIcon />
    //     </IconButton>);
    //   }


    // }

    // return <Grid
    //   container
    //   spacing={8}
    //   alignItems="center"
    //   className={classes.root}
    // >
    //   <Grid
    //     item
    //     xs
    //     className={classes.name}
    //   >
    //     {name}
    //   </Grid>

    //   {buttons.map((n, index) => {

    //     return <Grid
    //       item
    //       key={index}
    //     >
    //       {n}
    //     </Grid>
    //   })}

    // </Grid>;
  }

}


// export default compose(

//   // graphql(createTaskProcessor, {
//   //   name: "createTask",
//   // }),
//   graphql(updateTaskProcessor, {
//     // name: "updateTask",
//   }),
//   graphql(createTimerProcessor, {
//     name: "createTimer",
//   }),
//   graphql(updateTimerProcessor, {
//     name: "updateTimer",
//   }),

// )(withStyles(styles)(DataTaskCustom));



// const processors = compose(

//   graphql(createTaskProcessor, {
//     name: "createTask",
//   }),
//   graphql(updateTaskProcessor, {
//     name: "updateTask",
//   }),
//   graphql(createTimerProcessor, {
//     name: "createTimer",
//   }),
//   graphql(updateTimerProcessor, {
//     name: "updateTimer",
//   }),
//   // graphql(taskQuery, {
//   //   name: "getTask",
//   // }),

// );

// export {
//   processors,
// }

// export default processors(withStyles(styles)(DataTaskCustom));
export default withStyles(styles)(props => <DataTaskCustom 
  {...props}
/>);
