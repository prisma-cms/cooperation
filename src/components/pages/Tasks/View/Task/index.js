import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import EditableView from 'apollo-cms/lib/DataView/Object/Editable';

import withStyles from "material-ui/styles/withStyles";
import { Typography, IconButton } from 'material-ui';
import StartIcon from "material-ui-icons/PlayArrow";
import StopIcon from "material-ui-icons/Stop";
import SubdirectoryArrowRight from "material-ui-icons/SubdirectoryArrowRight";
import SubdirectoryArrowLeft from "material-ui-icons/SubdirectoryArrowLeft";
// import ArrowForward from "material-ui-icons/ArrowForward";
import CloseIcon from "material-ui-icons/Close";

import Grid from "@prisma-cms/front/lib/modules/ui/Grid";

import moment from "moment";



import TimersListView from "../../../Timers/View/List";


import {
  createTaskProcessor,
  updateTaskProcessor,
} from "../../query";

import {
  createTimerProcessor,
  updateTimerProcessor,
} from "../../../Timers/query";

import { compose, graphql } from 'react-apollo';

import TaskStatusSelect from "./Status/Select";

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
  }

}

export class TaskView extends EditableView {


  static propTypes = {
    ...EditableView.propTypes,
    classes: PropTypes.object.isRequired,
    showDetails: PropTypes.bool.isRequired,
    TaskStatusSelect: PropTypes.func.isRequired,
    mutate: PropTypes.func,
  };

  static defaultProps = {
    ...EditableView.defaultProps,
    showDetails: false,
    TaskStatusSelect,
  };

  static contextTypes = {
    ...EditableView.contextTypes,
    UserLink: PropTypes.func.isRequired,
    TaskLink: PropTypes.func.isRequired,
    Editor: PropTypes.func.isRequired,
    ProjectLink: PropTypes.func.isRequired,
    openLoginForm: PropTypes.func.isRequired,
  };


  constructor(props) {
    super(props);

  }


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

    return mutate(mutation);

    // const result = await mutate(mutation).then(r => r).catch(e => {

    //   return e;
    // });

    // // this.setState({
    // //   loading: false,
    // // });

    // return result;

  }



  getCacheKey() {

    const {
      id,
    } = this.getObject() || {};

    return `task_${id || "new"}`;
  }


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
        name,
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
      createdAt,
      Project,
    } = object || {}



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
                  /> {Project ? <span> (<ProjectLink
                    object={Project}
                  />)
                  </span> : null}
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


            <Grid
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

          </Grid>



        </Grid>


      </Grid>
    </div>

  }


  renderDefaultView() {

    const {
      classes,
      showDetails,
      TaskStatusSelect,
    } = this.props;

    const {
      Editor,
    } = this.context;

    const task = this.getObjectWithMutations();


    if (!task) {
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
    } = task;


    const inEditMode = this.isInEditMode();
    const allow_edit = this.canEdit();


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

      {status ?
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
            value: startDatePlaning && moment(startDatePlaning).format("YYYY-MM-DD") || "дд.мм.гггг",
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
            value: endDatePlaning && moment(endDatePlaning).format("YYYY-MM-DD") || "дд.мм.гггг",
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
            value: startDate && moment(startDate).format("YYYY-MM-DD") || "дд.мм.гггг",
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
            value: endDate && moment(endDate).format("YYYY-MM-DD") || "дд.мм.гггг",
            disabled: !inEditMode,
          })}

        </Grid>
        : null
      }

      {details}

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



const processors = compose(

  graphql(createTaskProcessor, {
    name: "createTask",
  }),
  graphql(updateTaskProcessor, {
    name: "updateTask",
  }),
  graphql(createTimerProcessor, {
    name: "createTimer",
  }),
  graphql(updateTimerProcessor, {
    name: "updateTimer",
  }),
  // graphql(taskQuery, {
  //   name: "getTask",
  // }),

);

export {
  processors,
}

export default processors(withStyles(styles)(TaskView));

