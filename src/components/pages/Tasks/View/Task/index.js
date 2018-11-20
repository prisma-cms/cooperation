import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import EditableView from 'apollo-cms/lib/DataView/Object/Editable';

import withStyles from "material-ui/styles/withStyles";
import { Typography } from 'material-ui';

import Grid from "@prisma-cms/front/lib/modules/ui/Grid";

import moment from "moment";

import {
  UserLink,
  TaskLink,
} from "../../../../ui"


import TimersListView from "../../../Timers/View/List";

const styles = theme => {

  return {

    root: {
    },
  }

}

class TaskView extends EditableView {


  static propTypes = {
    ...EditableView.propTypes,
    classes: PropTypes.object.isRequired,
    showDetails: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    ...EditableView.defaultProps,
    showDetails: false,
  };

  static contextTypes = {
    ...EditableView.contextTypes,
    openLoginForm: PropTypes.func.isRequired,
  };


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


  getCacheKey() {

    const {
      id,
    } = this.getObject() || {};

    return `task_${id || "new"}`;
  }



  renderHeader() {

    const {
      classes,
    } = this.props;

    const object = this.getObjectWithMutations();

    const {
      id: taskId,
      CreatedBy,
      createdAt,
    } = object || {}



    const inEditMode = this.isInEditMode();


    return <div
      className={classes.header}
    >
      <Grid
        container
        spacing={16}
      >

        <Grid
          item
          xs
        >

          <Grid
            container
            alignItems="center"
          >


            <Grid
              item
            >

              {inEditMode
                ?
                this.getTextField({
                  name: "name",
                  fullWidth: true,
                })
                :

                taskId ? <TaskLink
                  object={object}
                />
                  :
                  null
              }

            </Grid>

            <Grid
              item
            >


              {this.getButtons()}

            </Grid>


            <Grid
              item
              xs
            >

            </Grid>


            <Grid
              item
            >
              {CreatedBy
                ?
                <UserLink
                  user={CreatedBy}
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
    } = this.props;


    const task = this.getObjectWithMutations();


    if (!task) {
      return null;
    }

    const {
      content,
      Timers,
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
    >

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


export default withStyles(styles)(TaskView);