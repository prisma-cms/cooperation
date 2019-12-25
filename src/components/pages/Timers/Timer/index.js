import React, { Component } from 'react';
// import PropTypes from 'prop-types';

import Page from "../../layout";

import PageNotFound from "../../404";
import { graphql } from 'react-apollo';

// import {
//   Timer as TimerQuery,
//   updateTimerProcessor,
// } from "../query";


import TimerView from "../View/Timer";

// import Typography from 'material-ui/Typography';
import gql from 'graphql-tag';

import Context from "@prisma-cms/context";

// import {
//   Link,
// } from "../../../../components/ui";

// const UpdateTimer = graphql(updateTimerProcessor)(TimerView);


class TimerPage extends Page {

  // static propTypes = {
  //   ...Page.propTypes,
  // };


  static defaultProps = {
    ...Page.defaultProps,
  }


  componentWillMount() {

    const {
      query: {
        updateTimerProcessor,
      },
    } = this.context;

    this.UpdateTimer = graphql(gql(updateTimerProcessor))(TimerView);

    super.componentWillMount && super.componentWillMount();
  }


  setPageMeta(meta = {}) {

    const {
      data: {
        object: timer,
      },
    } = this.props;


    if (!timer) {
      return;
    }

    const {
      Task,
    } = timer;

    const {
      name,
    } = Task || {};

    return super.setPageMeta({
      title: `Таймер к задаче ${name}`,
      ...meta,
    });

  }


  render() {

    const {
      UpdateTimer,
    } = this;

    const {
      data,
      ...other
    } = this.props;

    const {
      object: timer,
      loading,
    } = data;

    if (!timer) {

      if (loading) {
        return null;
      }
      else {
        return <PageNotFound />
      }
    }

    return super.render(
      <div>
        <UpdateTimer
          data={data}
          linkType="target"
          {...other}
        />
      </div>
    );
  }
}


// export default (props) => {

//   return <TimerQuery
//     View={TimerPage}
//     {...props}
//   />
// };



export default class TimerPageConnector extends Component {


  static contextType = Context;

  componentWillMount() {

    const {
      query: {
        timer,
      },
    } = this.context;

    this.Renderer = graphql(gql(timer))(TimerPage);

    super.componentWillMount && super.componentWillMount();
  }


  render() {

    const {
      Renderer,
    } = this;

    return <Renderer
      {...this.props}
    />

  }

}

