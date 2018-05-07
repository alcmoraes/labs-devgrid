// @flow
import React, { Fragment } from 'react';
import _ from 'lodash';

import Screen from '../components/screen';

import Utils from '../services/utils';

import Layout from '../components/layout';

import BookCard from '../components/book_card';

type Props = {

}

type State = {

}
export default class MyBooks extends Screen<Props, State> {

  state: any;

  constructor( props: any ){
    super( props );

    this.state = super.state;
  }

  componentDidMount(): void {
    super.componentDidMount();
    super._getAction( 'Book' ).fetchMyBooks();
  }

  render() {
    let unreaded = [];
    let readed = {};

    if ( this.state ){
      unreaded = _.filter( this.state.bookStore_MyBooks, ( b ) => !b.read );
      readed = _.groupBy( _.filter( this.state.bookStore_MyBooks, ( b ) => b.read ), ( b ) => Utils.moment( b.readedAt ).format( 'YYYY' ) );
    }

    return (
      <Layout { ...this.props }>
        <div className="row">
          <div className="col-lg-6">
            <div className="card mb-3">
              <div className="card-header">
                <i className="fa fa-book"></i> Unreaded ({unreaded.length})
              </div>
              <div className="card-body">
                <section className="books-shelf">
                  {unreaded.map( ( b, i ) => {
                    return (
                      <BookCard key={i} read={b.read} onLibrary={true} book={b} />
                    );
                  } )}
                </section>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="card mb-3">
              <div className="card-header">
                <i className="fa fa-book"></i> Readed
              </div>
              <div className="card-body">
                { Object.keys( readed ).map( ( year, i ) => {
                  return (
                    <Fragment key={i}>
                      <h6 className="text-center">{ year } ({readed[ year ].length})</h6>
                      <section className="books-shelf">
                        {readed[ year ].map( ( b, ind ) => {
                          return (
                            <BookCard key={ind} read={b.read} onLibrary={true} book={b} />
                          );
                        } )}
                      </section>
                    </Fragment>
                  );
                } ) }
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

}
