import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import Typography from "material-ui/Typography";


import Link from '../';

import { withStyles } from 'material-ui/styles';

const styles = {
};


export class ProjectMemberLink extends Component {

  render() {

    const {
      object,
      children,
      ...other
    } = this.props;


    if (!object) {
      return null;
    }

    let {
      id,
      name,
    } = object;

    if (!id) {
      return null;
    }

    name = name || id;

    return <Link
      to={`/project-members/${id}`}
      title={name}
      {...other}
    >
      {children || <Typography
        component="span"
      >
        {name}
      </Typography>}
    </Link>
  }
}


export default withStyles(styles)(props => <ProjectMemberLink 
  {...props}
/>);