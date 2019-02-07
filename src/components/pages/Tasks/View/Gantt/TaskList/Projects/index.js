import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Context from "@prisma-cms/context";

import {
  ProjectAutocomplete as ProjectAutocompleteProto,
} from "../../../../../../ui";


export class ProjectAutocomplete extends ProjectAutocompleteProto {

  static propTypes = {
    ...ProjectAutocompleteProto.propTypes,
    getFilters: PropTypes.func.isRequired,
    setFilters: PropTypes.func.isRequired,
  };


  // setFilters(filters) {

  //   const {
  //     setFilters,
  //   } = this.props;

  //   // return setFilters(filters);

  //   return super.setFilters(filters);

  // }


  // getFilters() {

  //   const {
  //     getFilters,
  //   } = this.props;

  //   const filters = getFilters();

  //   console.log("filters", filters);

  //   const {
  //     projectQuery,
  //   } = filters || {};

  //   // return {
  //   //   projectQuery,
  //   // }

  //   return super.getFilters();

  // }

  cleanFilters() {

    super.cleanFilters();

    this.setObjectId();
  }


  setObjectId(objectId) {

    // this.setState({
    //   objectId,
    // });

    const {
      setFilters,
    } = this.props;

    return setFilters({
      projectId: objectId,
    });

  }


  getObjectId() {

    const {
      getFilters,
    } = this.props;

    const {
      projectId: objectId,
    } = getFilters() || {};

    return objectId;

  }


  // onSelect = (value, item) => {

  //   this.setState({
  //     item,
  //   });
  // }


  // onChange(event) {

  //   const {
  //     value,
  //   } = event.target;

  //   // this.setState({
  //   //   value,
  //   // }, () => this.loadData());

  //   // this.setFilters({
  //   //   name_contains: value,
  //   // });

  // }

}


export default ProjectAutocomplete;

// export class TasksProjectFilter extends Component {

//   static contextType = Context;

//   // static propTypes = {

//   // };

//   render() {

//     // const {
//     //   ProjectAutocomplete,
//     // } = this.context;



//     return (
//       <ProjectAutocomplete

//       />
//     );
//   }
// }


// export default TasksProjectFilter;