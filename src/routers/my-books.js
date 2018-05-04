//@flow 
import React from 'react';
import _ from 'lodash';

import Screen from '../components/screen';

import Layout from '../components/layout';

import BookCard from '../components/book_card';

export default class MyBooks extends Screen {

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
        <div className="row">
          <div className="col-lg-6">
            <h1 className="text-center">Books I should read</h1>
            <section className="books-shelf">
              {this.state ? (
                _.filter(this.state.bookStore_MyBooks, (b) => !b.read ).map((b, i) => {
                  return (
                      <BookCard key={i} read={b.read} onLibrary={true} book={b} />
                  )
                })
              ) : null}
            </section>
          </div>
          <div className="col-lg-6">
            <h1 className="text-center">Books I've already readed</h1>
            <section className="books-shelf">
              {this.state ? (
                _.filter(this.state.bookStore_MyBooks, (b) => b.read ).map((b, i) => {
                  return (
                      <BookCard key={i} read={b.read} onLibrary={true} book={b} />
                  )
                })
              ) : null}
            </section>
          </div>
        </div>
      </Layout>
    );
  }

}
