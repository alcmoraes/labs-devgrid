//@flow 
import React from 'react';
import _ from 'lodash';

import Screen from '../components/screen';

import Layout from '../components/layout';

export default class Home extends Screen {

  constructor( props: any ){
    super( props );
  }

  render() {
    return (
      <Layout { ...this.props }>
      </Layout>
    );
  }

}
