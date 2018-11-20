import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import EditableView from 'apollo-cms/lib/DataView/Object/Editable';

import withStyles from "material-ui/styles/withStyles";
import { Typography } from 'material-ui';

import Grid from "@prisma-cms/front/lib/modules/ui/Grid";

import moment from "moment";

import {
  UserLink,
  ProjectLink,
  Link,
} from "../../../../ui"


import TasksListView from "../../../Tasks/View/List";

const styles = theme => {

  return {

    root: {
    },
  }

}

class ProjectView extends EditableView {


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

    return `project_${id || "new"}`;
  }



  renderHeader() {

    const {
      classes,
    } = this.props;

    const object = this.getObjectWithMutations();

    const {
      id: projectId,
      CreatedBy,
      createdAt,
      Tasks,
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
              xs={inEditMode}
            >

              {inEditMode
                ?
                this.getTextField({
                  name: "name",
                  fullWidth: true,
                })
                :

                projectId ? <ProjectLink
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
              xs={!inEditMode}
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


    const project = this.getObjectWithMutations();


    if (!project) {
      return null;
    }

    const {
      id: projectId,
      content,
      Tasks,
    } = project;


    const inEditMode = this.isInEditMode();
    const allow_edit = this.canEdit();

    let details;

    if (showDetails) {

      details = <Fragment>

        <Typography
          variant="subheading"
        >
          Задачи в проекте {projectId ? <Link
            to={`/tasks/create/${projectId}`}
          >
            Добавить
          </Link>
            : null
          }
        </Typography>

        {Tasks && Tasks.length ?
          <Grid
            item
            xs={12}
          >


            <TasksListView
              tasks={Tasks}
              showDetails={showDetails}
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


export default withStyles(styles)(ProjectView);