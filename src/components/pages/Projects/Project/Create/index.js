import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  ProjectPage,
} from "../";

class CreateProjectPage extends Component {


  onSave(result) {

    if (result) {

      const {
        data: object,
      } = result.data && result.data.response || {}


      const {
        id,
      } = object || {};

      if (id) {

        const {
          history,
        } = this.props;

        history.push(`/projects/${id}`);
      }

    }

  }


  render() {

    return <ProjectPage
      data={{
        object: {}
      }}
      _dirty={{
        name: "",
      }}
      onSave={result => this.onSave(result)}
    />
  }
}


export default CreateProjectPage;