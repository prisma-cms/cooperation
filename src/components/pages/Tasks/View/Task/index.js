import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import EditableView from 'apollo-cms/lib/DataView/Object/Editable';

import withStyles from "material-ui/styles/withStyles";

import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';

import StartIcon from "material-ui-icons/PlayArrow";
import StopIcon from "material-ui-icons/Stop";
import SubdirectoryArrowRight from "material-ui-icons/SubdirectoryArrowRight";
import SubdirectoryArrowLeft from "material-ui-icons/SubdirectoryArrowLeft";
// import ArrowForward from "material-ui-icons/ArrowForward";
import CloseIcon from "material-ui-icons/Close";

import Grid from "@prisma-cms/front/lib/modules/ui/Grid";

import moment from "moment";

import Context from "@prisma-cms/context";

import TimersListView from "../../../Timers/View/List";


// import {
//   createTaskProcessor,
//   updateTaskProcessor,
// } from "../../query";

// import {
//   createTimerProcessor,
//   updateTimerProcessor,
// } from "../../../Timers/query";

import { compose, graphql } from 'react-apollo';

import TaskStatusSelect from "./Status/Select";
import ChatRooms from "./ChatRooms";

import gql from 'graphql-tag';

export const styles = theme => {

  return {
    root: {
    },
    item: {
      // flexWrap: "nowrap",
    },
    flexNoWrap: {
      flexWrap: "nowrap",
    },
    buttons: {
      display: "flex",
      alignItems: "center",

      "& button": {
        height: 24,
        width: 24,

        "& svg": {
          fontSize: 20,
        },
      },
    },
    button: {
    },
    status: {
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
  }

}

export class TaskView extends EditableView {


  static propTypes = {
    // eslint-disable-next-line react/forbid-foreign-prop-types
    ...EditableView.propTypes,
    classes: PropTypes.object.isRequired,
    showDetails: PropTypes.bool.isRequired,
    showStatus: PropTypes.bool.isRequired,
    showCreatedBy: PropTypes.bool.isRequired,
    TaskStatusSelect: PropTypes.func.isRequired,
    mutate: PropTypes.func,
    createTimer: PropTypes.func.isRequired,
    updateTimer: PropTypes.func.isRequired,
    showChat: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    ...EditableView.defaultProps,
    showDetails: false,
    showStatus: true,
    showCreatedBy: true,
    TaskStatusSelect,
    showChat: false,
    cacheKeyPrefix: 'task_',
  };

  // static contextTypes = {
  //   ...EditableView.contextTypes,
  //   UserLink: PropTypes.func.isRequired,
  //   TaskLink: PropTypes.func.isRequired,
  //   Editor: PropTypes.func.isRequired,
  //   ProjectLink: PropTypes.func.isRequired,
  //   openLoginForm: PropTypes.func.isRequired,
  // };


  // constructor(props) {
  //   super(props);

  // }


  canEdit() {

    const {
      user: currentUser,
    } = this.context;

    const {
      id: currentUserId,
      sudo,
    } = currentUser || {};


    const {
      id,
      CreatedBy,
    } = this.getObjectWithMutations() || {};


    const {
      id: createdById,
    } = CreatedBy || {}

    return !id || (createdById && createdById === currentUserId) || sudo === true;
  }


  save() {

    const {
      user: currentUser,
      openLoginForm,
    } = this.context;

    if (!currentUser) {

      return openLoginForm();
    }

    return super.save();
  }



  async saveObject(data) {

    let {
      mutate,
      createTask,
      updateTask,
    } = this.props;

    // console.log('mutate', mutate);

    // return;

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
        return await super.saveObject(data);
      }

    }

    const mutation = this.getMutation(data);

    // console.log('mutate 2', mutate);
    // console.log('mutation', mutation);

    return this.mutate({
      mutate,
      ...mutation,
    });

    // const result = await mutate(mutation).then(r => r).catch(e => {

    //   return e;
    // });

    // // this.setState({
    // //   loading: false,
    // // });

    // return result;

  }


  // async mutate(props) {


  //   const {
  //     // _dirty,
  //     loading,
  //   } = this.state;

  //   const {
  //     client,
  //   } = this.context;


  //   if (loading) {
  //     return;
  //   }

  //   let {
  //     mutate,
  //     mutation,
  //   } = {
  //     ...this.props,
  //     ...props,
  //   };


  //   console.log('mutate', mutate);

  //   return;

  //   return new Promise((resolve, reject) => {


  //     // console.log("mutate props", props);


  //     if (mutation && !props.mutation) {
  //       props.mutation = mutation;
  //     }

  //     if (!mutate) {

  //       const {
  //         client,
  //       } = this.context;

  //       mutate = client.mutate;
  //     }

  //     // console.log("mutate", mutate);

  //     if (!mutate) {
  //       throw (new Error("Mutate is not defined"));
  //     }


  //     this.setState({
  //       loading: true,
  //     }, async () => {


  //       let newState = {
  //         loading: false,
  //       };

  //       const result = await mutate(props)
  //         .then(async result => {



  //           // console.log("await this.saveObject 2", typeof result, result instanceof Error, result);

  //           if (result instanceof Error) {

  //             // console.log("await this.saveObject result", result);
  //             // reject(result);

  //           }
  //           else {

  //             const {
  //               data: resultData,
  //             } = result || {};

  //             const {
  //               response,
  //             } = resultData || {};

  //             // console.log("result", result);
  //             // console.log("resultData", resultData);

  //             let {
  //               success,
  //               message,
  //               errors = null,
  //               ...other
  //             } = response || {};


  //             Object.assign(newState, {
  //               errors,
  //             });


  //             if (success === undefined) {

  //               success = true;

  //             }

  //             if (!success) {

  //               this.addError(message || "Request error");

  //               // errors && errors.map(error => {
  //               //   this.addError(error);
  //               // });

  //               // result = new Error(message || "Request error", result);

  //               return reject(result);

  //             }
  //             else {

  //               // Object.assign(newState, {
  //               //   _dirty: null,
  //               //   inEditMode: false,
  //               // });

  //               // this.clearCache();

  //               if (!client.queryManager.fetchQueryRejectFns.size) {
  //                 await client.resetStore().catch(console.error);
  //               }

  //               // await client.cache.reset();
  //               // console.log("client.cache.clearStore");

  //               // await client.clearStore().catch(console.error);

  //               // await client.reFetchObservableQueries().catch(console.error);

  //             }


  //           }


  //           return result;
  //         })
  //         .catch(error => {

  //           const message = error.message && error.message.replace(/^GraphQL error: */, '') || "";

  //           this.addError(message);

  //           return error;
  //         });


  //       this.setState(newState, () => {

  //         return resolve(result);
  //       });

  //       return;

  //     });

  //   });

  // }



  // getCacheKey() {

  //   const {
  //     id,
  //     ...other
  //   } = this.getObject() || {};

  //   const {
  //     cacheKey,
  //   } = this.props;

  //   if(!id) {
  //     console.log('Other', other, this.props);
  //   }

  //   return cacheKey !== undefined ? cacheKey : `task_${id || "new"}`;
  // }


  getButtons() {

    let buttons = super.getButtons() || [];


    const {
      createTimer,
      updateTimer,
      classes,
    } = this.props;

    const {
      UserLink,
      //   TaskLink,
      //   Editor,
      //   ProjectLink,
    } = this.context;

    const object = this.getObjectWithMutations();

    if (object) {


      const {
        id: taskId,
        // name,
        Timers,
        CreatedBy,

        // Function
        onStartRelationTo,
        onSetRelationTo,
        relationItemTo,

        // Function
        onStartRelationFrom,
        onSetRelationFrom,
        relationItemFrom,

      } = object;

      const {
        id: createdById,
      } = CreatedBy || {};

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
            onClick={() => updateTimer({
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
            onClick={() => createTimer({
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



        if (onStartRelationTo && onSetRelationTo) {

          if (relationItemTo) {

            if (relationItemTo.id === taskId) {

              buttons.push(<IconButton
                key="cancelRelation"
                className={classes.button}
                onClick={() => {
                  return onStartRelationTo(object);
                }}
              >
                <CloseIcon

                />
              </IconButton>);

            }
            else {

              buttons.push(<IconButton
                key="startRelation"
                className={classes.button}
                onClick={() => {
                  return onSetRelationTo(object);
                }}
              >
                <SubdirectoryArrowRight
                  style={{
                    color: "green",
                  }}
                />
              </IconButton>);

            }

          }
          else if (createdById && createdById === currentUserId) {

            buttons.push(<IconButton
              key="startRelation"
              className={classes.button}
              onClick={() => {
                return onStartRelationTo(object);
              }}
            >
              <SubdirectoryArrowLeft

              />
            </IconButton>);
          }

        }

        if (onStartRelationFrom && onSetRelationFrom) {

          if (relationItemFrom) {

            if (relationItemFrom.id === taskId) {

              buttons.push(<IconButton
                key="cancelRelationFrom"
                className={classes.button}
                onClick={() => {
                  return onStartRelationFrom(object);
                }}
              >
                <CloseIcon

                />
              </IconButton>);

            }
            else {

              buttons.push(<IconButton
                key="startRelationFrom"
                className={classes.button}
                onClick={() => {
                  return onSetRelationFrom(object);
                }}
              >
                <SubdirectoryArrowLeft
                  style={{
                    color: "green",
                  }}
                />
              </IconButton>);

            }

          }
          else if (createdById && createdById === currentUserId) {

            buttons.push(<IconButton
              key="startRelationFrom"
              className={classes.button}
              onClick={() => {
                return onStartRelationFrom(object);
              }}
            >
              <SubdirectoryArrowRight

              />
            </IconButton>);
          }

        }

      }
    }

    return buttons;
  }


  renderHeader() {

    const {
      classes,
      showCreatedBy,
    } = this.props;

    const {
      UserLink,
      TaskLink,
      //   Editor,
      ProjectLink,
    } = this.context;

    const object = this.getObjectWithMutations();

    const {
      id: taskId,
      CreatedBy,
      // createdAt,
      // Project,
      TaskProjects,
    } = object || {}

    const Projects = TaskProjects ? TaskProjects.map(({ Project }) => Project).filter(n => n) : [];

    // console.log('Project', Project);


    const inEditMode = this.isInEditMode();


    return <div
      className={classes.header}
    >
      <Grid
        container
        spacing={8}
        className={classes.headerContainer}
      >

        <Grid
          item
          xs
        >

          <Grid
            container
            spacing={8}
            alignItems="center"
          // className={classes.flexNoWrap}
          >


            <Grid
              item
              // xs={inEditMode}
              style={{
                overflow: "hidden",
              }}
              xs
            >

              {inEditMode
                ?
                this.getTextField({
                  name: "name",
                  fullWidth: true,
                  label: "Название задачи"
                })
                :

                taskId ? <Fragment>
                  <TaskLink
                    object={object}
                  /> {Projects && Projects.length ?

                    Projects.map((Project, index) => <span
                      key={Project.id || index}
                    > (<ProjectLink
                        object={Project}
                      />)
                  </span>)
                    : null}
                </Fragment>
                  :
                  null
              }

            </Grid>

            <Grid
              item
              className={classes.buttons}
            >

              {this.getButtons()}

            </Grid>


            {/* <Grid
              item
              xs={!inEditMode}
            >

            </Grid> */}


            {showCreatedBy ? <Grid
              item
            >
              {CreatedBy
                ?
                <UserLink
                  user={CreatedBy}
                  showName={false}
                  size="small"
                />
                :
                null
              }
            </Grid>
              : null
            }

          </Grid>



        </Grid>


      </Grid>
    </div>

  }


  renderChat() {

    const {
      showChat,
      updateChatRoomProcessor,
    } = this.props;

    if (!showChat) {
      return null;
    }

    const object = this.getObjectWithMutations();

    // const {
    //   user: currentUser,
    // } = this.context;

    const {
      id,
    } = object || {};

    if (!id) {
      return null;
    }

    return <ChatRooms
      task={object}
      where={{
        Task: {
          id,
        },
      }}
      first={1}
      addObject={() => { }}
      updateChatRoomProcessor={updateChatRoomProcessor}
    // currentUser={currentUser}
    />
  }


  renderDefaultView() {

    const {
      classes,
      showDetails,
      showStatus,
      TaskStatusSelect,
    } = this.props;

    const {
      Editor,
      // user: currentUser,
    } = this.context;

    const object = this.getObjectWithMutations();


    if (!object) {
      return null;
    }

    const {
      content,
      Timers,
      startDatePlaning,
      endDatePlaning,
      startDate,
      endDate,
      status,
    } = object;


    const inEditMode = this.isInEditMode();
    // const allow_edit = this.canEdit();


    let details;

    if (showDetails) {

      details = <Fragment>

        {Timers && Timers.length ?
          <Grid
            item
            xs={12}
          >

            <Typography
              variant="subheading"
            >
              Таймеры в задаче
            </Typography>

            <TimersListView
              timers={Timers}
            />

          </Grid>
          : null
        }

      </Fragment>

    }

    return <Grid
      container
      // spacing={8}
      className={[classes.item, status || ""].join()}
    >

      {(showStatus || inEditMode) && status ?
        <TaskStatusSelect
          value={status}
          inEditMode={inEditMode}
          onChange={event => {
            const {
              value,
              name,
            } = event.target;
            this.updateObject({
              [name]: value,
            });
          }}
        />
        : null
      }

      {inEditMode || content ?
        <Grid
          item
          xs={12}
        >
          <Typography
            variant="subheading"
          >
            Описание задачи
          </Typography>

          <Editor
            value={content}
            readOnly={!inEditMode}
            onChange={content => this.updateObject({
              content,
            })}
          />
        </Grid>
        : null
      }

      {inEditMode || startDatePlaning ?
        <Grid
          item
          xs={12}
        >

          {this.getTextField({
            name: "startDatePlaning",
            label: "Планируемая дата начала",
            type: "date",
            value: (startDatePlaning && moment(startDatePlaning).format("YYYY-MM-DD")) || "дд.мм.гггг",
            disabled: !inEditMode,
          })}

        </Grid>
        : null
      }

      {inEditMode || endDatePlaning ?
        <Grid
          item
          xs={12}
        >

          {this.getTextField({
            name: "endDatePlaning",
            label: "Планируемая дата завершения",
            type: "date",
            value: (endDatePlaning && moment(endDatePlaning).format("YYYY-MM-DD")) || "дд.мм.гггг",
            disabled: !inEditMode,
          })}

        </Grid>
        : null
      }

      {inEditMode || startDate ?
        <Grid
          item
          xs={12}
        >

          {this.getTextField({
            name: "startDate",
            label: "Дата начала",
            type: "date",
            value: (startDate && moment(startDate).format("YYYY-MM-DD")) || "дд.мм.гггг",
            disabled: !inEditMode,
          })}

        </Grid>
        : null
      }

      {inEditMode || endDate ?
        <Grid
          item
          xs={12}
        >

          {this.getTextField({
            name: "endDate",
            label: "Дата завершения",
            type: "date",
            value: (endDate && moment(endDate).format("YYYY-MM-DD")) || "дд.мм.гггг",
            disabled: !inEditMode,
          })}

        </Grid>
        : null
      }

      {details}

      <Grid
        item
        xs={12}
      >
        {this.renderChat()}
      </Grid>

    </Grid>;
  }


  renderEditableView() {

    return this.renderDefaultView();


  }



  renderResetButton() {

    const {
      id,
    } = this.getObjectWithMutations() || {}

    return id ? super.renderResetButton() : null;
  }



  render() {

    const object = this.getObjectWithMutations();

    if (!object) {
      return null;
    }

    const {
      classes,
    } = this.props;

    return <div
      className={classes.root}
    >

      {super.render()}

    </div>

  }
}


// export default withStyles(styles)(TaskView);



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

// export default processors(withStyles(styles)(props => <TaskView 
//   {...props}
// />));



export class TaskConnector extends Component {

  static contextType = Context;

  static propTypes = {
    View: PropTypes.func.isRequired,
  }

  static defaultProps = {
    View: TaskView,
  }


  componentWillMount() {

    const {
      query: {
        createTaskProcessor,
        updateTaskProcessor,
        createTimerProcessor,
        updateTimerProcessor,
        updateChatRoomProcessor,
      },
    } = this.context;

    const {
      View,
    } = this.props;

    this.Renderer = compose(

      graphql(gql(createTaskProcessor), {
        name: "createTask",
      }),
      graphql(gql(updateTaskProcessor), {
        name: "updateTask",
      }),
      graphql(gql(createTimerProcessor), {
        name: "createTimer",
      }),
      graphql(gql(updateTimerProcessor), {
        name: "updateTimer",
      }),
      graphql(gql(updateChatRoomProcessor), {
        name: "updateChatRoomProcessor",
      }),
    )(View);

    super.componentWillMount && super.componentWillMount();
  }


  render() {

    const {
      Renderer,
    } = this;

    const {
      View,
      ...other
    } = this.props;

    return <Renderer
      {...other}
    />

  }

}

export default withStyles(styles)(props => <TaskConnector
  {...props}
/>);

