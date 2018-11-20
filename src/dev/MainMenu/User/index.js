import React, { Component } from 'react';

import PropTypes from 'prop-types';
 
import {UserLink} from '../../../components/ui';
 

export default class UserMenuItem extends Component {

  static defaultProps = {
  }


  static propTypes = {
    user: PropTypes.object.isRequired,

  }


  static contextTypes = {
    client: PropTypes.object.isRequired,
  };


  constructor(props) {

    super(props);


    this.state = {
    };

  }

  componentDidMount() {


  }


  render() {

    const {
      user,
      // isConnected,
    } = this.props;

    const {
      id,
      username,
      fullname,
      // firstname,
      // lastname,
      email,
      etherwallet,
    } = user;


    let connection;

    return <UserLink
      user={user}
      style={{
        margin: 0,
      }}
    />;

  }

}
