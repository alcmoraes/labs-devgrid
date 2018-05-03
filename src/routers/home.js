//@flow 

import React from 'react';

import Screen from '../components/screen';

import Layout from '../components/layout';

export default class Home extends Screen {

  constructor( props: any ){
    super( props );

    this.state = super.state;

  }

  componentDidMount(): void {
    super.componentDidMount();
    super._getAction('Book').fetchMyBooks();
  }

  render() {
    return (
      <Layout { ...this.props }>
        {JSON.stringify( this.state )}
      </Layout>
    );
  }

}
