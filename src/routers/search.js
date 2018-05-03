//@flow 

import React from 'react';

import Screen from '../components/screen';

import Layout from '../components/layout';

import BookCard from '../components/book_card';

export default class Search extends Screen {

  constructor( props: any ){
    super( props );

    this.state = super.state;

  }

  componentDidMount(): void {
    super.componentDidMount();
    super._getAction( 'OpenLibrary' ).fetchBooks( this.props.match.params.book );
  }

  componentWillUpdate(nextProps: any, nextState: any): void {
    if( nextProps.match.params.book !== this.props.match.params.book ){
      super._getAction( 'OpenLibrary' ).fetchBooks( nextProps.match.params.book );
    }
  }

  render() {
    return (
      <Layout { ...this.props }>
        <section className="books-shelf">
          {this.state && this.state.openLibraryStore_Books ? (
            this.state.openLibraryStore_Books.map((b, i) => {
              return (
                  <BookCard key={i} book={b} />
              )
            })
          ) : null}
        </section>
      </Layout>
    );
  }

}
