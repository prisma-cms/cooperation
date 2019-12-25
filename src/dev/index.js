
import './index.css';

import React, { PureComponent } from 'react';
import PrismaCmsApp from '@prisma-cms/front'
import DevRenderer from "./Renderer";

import * as queryFragments from '../schema/generated/api.fragments';

const {
  UserNoNestingFragment,
  TimerNoNestingFragment,
  ProjectTaskNoNestingFragment,
  TaskNoNestingFragment,
  ProjectNoNestingFragment,
} = queryFragments;

export default class DevAppRenderer extends PureComponent {

  static defaultProps = {
  }

  render() {

    const {
      apolloOptions,
      ...other
    } = this.props;

    return <PrismaCmsApp
      Renderer={DevRenderer}
      queryFragments={queryFragments}
      // pure={true}
      apolloOptions={{
        ...apolloOptions,
        // endpoint: "https://api.prisma-cms.com/",
        apiQuery: `{
          user:me{
            ...UserNoNesting
            EthAccounts {
              id
              address
              balance(convert:ether)
            }
            Timers (
              first: 1
              where:{
                stopedAt: null
              }
            ){
              ...TimerNoNesting
              Task{
                ...TaskNoNesting
                TaskProjects{
                  ...ProjectTaskNoNesting
                  Project{
                    ...ProjectNoNesting
                  }
                }
              }
            }
          } 
        }
        ${UserNoNestingFragment}
        ${TimerNoNestingFragment}
        ${ProjectTaskNoNestingFragment}
        ${TaskNoNestingFragment}
        ${ProjectNoNestingFragment}
        `,
      }}
      {...other}
    />
  }
}



