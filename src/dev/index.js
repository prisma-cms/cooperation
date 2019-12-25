
import './index.css';

import React, { PureComponent } from 'react';
import PrismaCmsApp from '@prisma-cms/front'
import DevRenderer from "./Renderer";

import * as queryFragments from '../schema/generated/api.fragments';

export default class DevAppRenderer extends PureComponent {

  static defaultProps = {
  }

  render() {

    const {
      ...other
    } = this.props;

    return <PrismaCmsApp
      Renderer={DevRenderer}
      queryFragments={queryFragments}
      // pure={true}
      {...other}
    />
  }
}



