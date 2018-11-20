
import React, { Component, Fragment } from 'react';

import PropTypes from 'prop-types';

import PrismaCmsPageLayout from "@prisma-cms/front/lib/modules/pages/layout";


export default class PageLayout extends PrismaCmsPageLayout {


  renderRoutes(content) {

    return <div
      style={{
        // maxWidth: 1200,
        // margin: "20px auto 0",
      }}
    >
      {super.renderRoutes(content)}
    </div>

  }

}