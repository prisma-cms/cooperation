
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import gql from "graphql-tag";


export default class SubscriptionProvider extends Component {

  static propTypes = {
    client: PropTypes.object.isRequired,
    user: PropTypes.object,
  }


  static contextTypes = { 
  };
 

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
    } = this.props;
 

    const {
      localStorage,
    } = this.context;
 

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

          await client.reFetchObservableQueries();

        },
        error(error) {
          console.error('subscribeCalls callback with error: ', error)
        },
      });

    subscriptions.push(projectSub);

 

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

          await client.reFetchObservableQueries();

        },
        error(error) {
          console.error('subscribeCalls callback with error: ', error)
        },
      });

    subscriptions.push(taskSub);

 

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

          await client.reFetchObservableQueries();

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

  
  render() {

    const {
      children,
      user,
      client,
      loadApiData,
      ...other
    } = this.props;

    return children ? <children.type
      {...children.props}
      {...other}
    /> : null;

  }

}