import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import Typography from "material-ui/Typography";


import Link from '../';

import { withStyles } from 'material-ui/styles';

const styles = {
};


export class ProjectLink extends Component {

  render() {

    const {
      object,
      children,
      ...other
    } = this.props;


    if (!object) {
      return null;
    }

    const {
      id,
      name,
    } = object;


    if (!name || !id) {
      return null;
    }

    return <Link
      to={`/projects/${id}`}
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


export default withStyles(styles)(props => <ProjectLink 
  {...props}
/>);