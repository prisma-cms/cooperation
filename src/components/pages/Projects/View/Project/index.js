import React, { Component } from 'react';
import PropTypes from 'prop-types';

import EditableView from 'apollo-cms/lib/DataView/Object/Editable';

import withStyles from "material-ui/styles/withStyles";
import { Typography } from 'material-ui';

import Grid from "@prisma-cms/front/lib/modules/ui/Grid";

import moment from "moment";

import {
  UserLink,
  ProjectLink,
} from "../../../../ui"

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
  };

  static defaultProps = {
    ...EditableView.defaultProps,
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
    } = object || {}



    const inEditMode = this.isInEditMode();

    if (!projectId) {

      return <Typography
        variant="subheading"
        className={classes.addProjectTitle}
      >
        Добавить проект
      </Typography>;
    }

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
    } = this.props;


    const project = this.getObjectWithMutations();


    if (!project) {
      return null;
    }

    const {
      content,
    } = project;


    const inEditMode = this.isInEditMode();
    const allow_edit = this.canEdit();


    return <Grid
      container
    >

      <Grid
        item
      >



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


export default withStyles(styles)(ProjectView);