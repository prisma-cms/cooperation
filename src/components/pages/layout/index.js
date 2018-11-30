
import React, { Component, Fragment } from 'react';

import PropTypes from 'prop-types';

import PrismaCmsPageLayout from "@prisma-cms/front/lib/modules/pages/layout";

import {
  UserLink,
  TaskLink,
  Editor,
  ProjectLink,
} from "../../ui"

export default class PageLayout extends PrismaCmsPageLayout {

  static propTypes = {
    ...PrismaCmsPageLayout.propTypes,
    UserLink: PropTypes.func.isRequired,
    TaskLink: PropTypes.func.isRequired,
    Editor: PropTypes.func.isRequired,
    ProjectLink: PropTypes.func.isRequired,
  }

  static childContextTypes = {
    ...PrismaCmsPageLayout.childContextTypes,
    UserLink: PropTypes.func,
    TaskLink: PropTypes.func,
    Editor: PropTypes.func,
    ProjectLink: PropTypes.func,
  }

  static defaultProps = {
    UserLink,
    TaskLink,
    Editor,
    ProjectLink,
  }

  getChildContext() {

    const context = super.getChildContext && super.getChildContext() || undefined;

    const {
      UserLink,
      TaskLink,
      Editor,
      ProjectLink,
    } = this.props;

    return {
      ...context,
      UserLink,
      TaskLink,
      Editor,
      ProjectLink,
    }

  }

}