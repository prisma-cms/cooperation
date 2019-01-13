import React, { Component, Fragment } from 'react';

import PropTypes from 'prop-types';
import Context from "@prisma-cms/context";


// import { Timer } from "../../../components/ui";

export default class UserMenuItem extends Component {

  static defaultProps = {
  }


  static propTypes = {
    user: PropTypes.object.isRequired,

  }


  static contextType = Context;

  state = {
  };




  render() {

    const {
      user,
      // isConnected,
    } = this.props;

    const {
      UserLink,
    } = this.context;


    return <Fragment>
      {/* <Timer /> */}
      <UserLink
        user={user}
        style={{
          margin: 0,
        }}
      />
    </Fragment>
      ;

  }

}
