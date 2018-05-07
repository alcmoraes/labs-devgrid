// @flow

import React from 'react';
import _ from 'lodash';

import Screen from '../components/screen';

import Layout from '../components/layout';

import BookCard from '../components/book_card';

type Props = {}

type State = {}
export default class Search extends Screen<Props, State> {

  state: any;

  constructor( props: any ){
    super( props );
    this.state = super.state;
  }

  componentDidMount(): void {
    super.componentDidMount();
    super._getAction( 'OpenLibrary' ).fetchBooks( this.props.match.params.book );
    super._getAction( 'Book' ).fetchMyBooks();
  }

  componentWillUpdate( nextProps: any, nextState: any ): void {
    if ( nextProps.match.params.book !== this.props.match.params.book ){
      super._getAction( 'OpenLibrary' ).fetchBooks( nextProps.match.params.book );
    }
  }

  render() {
    return (
      <Layout { ...this.props }>
        <div className="card mb-3">
          <div className="card-header">
            <i className="fa fa-book"></i> Book search
          </div>
          <div className="card-body">
            <section className="books-shelf">
              { this.state ? (
                this.state.openLibraryStore_Books.map( ( b, i ) => {
                  let maBook = _.find( this.state.bookStore_MyBooks, ( mB ) => mB.key === b.key );
                  if ( maBook ) console.log( `${maBook.key} found!` );
                  return (
                    <BookCard key={i} read={maBook ? maBook.read : false} onLibrary={Boolean( maBook )} book={b} />
                  );
                } )
              ) : null }
            </section>
          </div>
        </div>
      </Layout>
    );
  }

}
