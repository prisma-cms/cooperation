import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { graphql } from 'react-apollo';

import Context from "@prisma-cms/context";

// import {
//   // createTimerProcessor,
//   updateTimerProcessor,
// } from "../../query";

import Timer from "../Timer";
import gql from 'graphql-tag';

// const NewTimer = graphql(createTimerProcessor)(Timer);
// const UpdateTimer = graphql(updateTimerProcessor)(Timer);

class TimersList extends Component {

  static contextType = Context;

  static propTypes = {
    timers: PropTypes.array.isRequired,
    View: PropTypes.func.isRequired,
  };

  static defaultProps = {
    View: Timer,
  };

  componentWillMount() {

    const {
      query: {
        updateTimerProcessor,
      },
    } = this.context;

    const {
      View,
    } = this.props;

    // return;

    this.UpdateTimer = graphql(gql(updateTimerProcessor))(View);

    super.componentWillMount && super.componentWillMount();
  }


  render() {

    const {
      UpdateTimer,
    } = this;

    const {
      timers,
      // View,
    } = this.props;

    if (!timers) {
      return null;
    }

    return (
      timers.map(n => {
        const {
          id,
        } = n;

        return <UpdateTimer
          key={id}
          data={{
            object: n,
          }}
        />
      })
    );
  }
}


export default TimersList;