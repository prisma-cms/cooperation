
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import gql from "graphql-tag";

import Context from '@prisma-cms/context';


export default class SubscriptionProvider extends Component {


  static contextType = Context;


  state = {
    subscriptions: [],
  }


  componentDidMount() {

    this.subscribe();

  }

  componentWillUnmount() {

    this.unsubscribe();

  }


  async subscribe() {

    const {
      client,
    } = this.context;


    if (!client) {
      console.error("client is empty");
      return;
    }

    await this.unsubscribe();


    let {
      subscriptions,
    } = this.state;


    const subscribeProject = gql`
      subscription project{
        project{
          mutation
          node{
            id
          }
        }
      }
    `;

    const projectSub = await client
      .subscribe({
        query: subscribeProject,
        variables: {
        },
      })
      .subscribe({
        next: async (data) => {

          this.reloadData();

        },
        error(error) {
          console.error('subscribeCalls callback with error: ', error)
        },
      });

    subscriptions.push(projectSub);


    const subscribeProjectMember = gql`
      subscription projectMember{
        projectMember{
          mutation
          node{
            id
          }
        }
      }
    `;

    const projectMemberSub = await client
      .subscribe({
        query: subscribeProjectMember,
        variables: {
        },
      })
      .subscribe({
        next: async (data) => {

          this.reloadData();

        },
        error(error) {
          console.error('subscribeCalls callback with error: ', error)
        },
      });

    subscriptions.push(projectMemberSub);



    const subscribeTeam = gql`
      subscription team{
        team{
          mutation
          node{
            id
          }
        }
      }
    `;

    const teamSub = await client
      .subscribe({
        query: subscribeTeam,
        variables: {
        },
      })
      .subscribe({
        next: async (data) => {

          this.reloadData();

        },
        error(error) {
          console.error('subscribeCalls callback with error: ', error)
        },
      });

    subscriptions.push(teamSub);


    const subscribeTeamMember = gql`
      subscription teamMember{
        teamMember{
          mutation
          node{
            id
          }
        }
      }
    `;

    const teamMemberSub = await client
      .subscribe({
        query: subscribeTeamMember,
        variables: {
        },
      })
      .subscribe({
        next: async (data) => {

          this.reloadData();

        },
        error(error) {
          console.error('subscribeCalls callback with error: ', error)
        },
      });

    subscriptions.push(teamMemberSub);


    const subscribePosition = gql`
      subscription position{
        position{
          mutation
          node{
            id
          }
        }
      }
    `;

    const positionSub = await client
      .subscribe({
        query: subscribePosition,
        variables: {
        },
      })
      .subscribe({
        next: async (data) => {

          this.reloadData();

        },
        error(error) {
          console.error('subscribeCalls callback with error: ', error)
        },
      });

    subscriptions.push(positionSub);



    const subscribeTask = gql`
      subscription task{
        task{
          mutation
          node{
            id
          }
        }
      }
    `;

    const taskSub = await client
      .subscribe({
        query: subscribeTask,
        variables: {
        },
      })
      .subscribe({
        next: async (data) => {

          this.reloadData();

        },
        error(error) {
          console.error('subscribeCalls callback with error: ', error)
        },
      });

    subscriptions.push(taskSub);


    const subscribeTaskReaction = gql`
      subscription taskReaction{
        taskReaction{
          mutation
          node{
            id
          }
        }
      }
    `;

    const taskReactionSub = await client
      .subscribe({
        query: subscribeTaskReaction,
        variables: {
        },
      })
      .subscribe({
        next: async (data) => {

          this.reloadData();

        },
        error(error) {
          console.error('subscribeCalls callback with error: ', error)
        },
      });

    subscriptions.push(taskReactionSub);


    const subscribeService = gql`
      subscription service{
        service{
          mutation
          node{
            id
          }
        }
      }
    `;

    const serviceSub = await client
      .subscribe({
        query: subscribeService,
        variables: {
        },
      })
      .subscribe({
        next: async (data) => {

          this.reloadData();

        },
        error(error) {
          console.error('subscribeCalls callback with error: ', error)
        },
      });

    subscriptions.push(serviceSub);



    const subscribeTimer = gql`
      subscription timer{
        timer{
          mutation
          node{
            id
          }
        }
      }
    `;

    const timerSub = await client
      .subscribe({
        query: subscribeTimer,
        variables: {
        },
      })
      .subscribe({
        next: async (data) => {

          this.reloadData();

        },
        error(error) {
          console.error('subscribeCalls callback with error: ', error)
        },
      });

    subscriptions.push(timerSub);


    this.setState({
      subscriptions,
    });

  }


  unsubscribe() {


    return new Promise((resolve) => {

      const {
        subscriptions,
      } = this.state;

      if (subscriptions && subscriptions.length) {


        subscriptions.map(n => {
          n.unsubscribe();
        });

        Object.assign(this.state, {
          subscriptions: [],
        });

      }

      resolve();

    });

  }


  async reloadData() {

    const {
      client,
      loadApiData,
    } = this.context;

    await loadApiData();

    // await client.resetStore();

  }


  render() {

    const {
      children,
      // user,
      // client,
      // loadApiData,
      // ...other
    } = this.props;

    return children;

    // return children ? <children.type
    //   {...children.props}
    //   {...other}
    // /> : null;

  }

}