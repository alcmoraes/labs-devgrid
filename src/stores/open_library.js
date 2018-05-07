// @flow

import {
  Alt
} from '../services/alt';
import OpenLibraryActions from '../actions/open_library';

class OpenLibrarySTore {

  openLibraryStore_Books: ? Array < Object > ;
  bindListeners: Function;

  constructor() {

    this.openLibraryStore_Books = [];

    this.bindListeners( {
      handleFetchBooks: OpenLibraryActions.FETCH_BOOKS,
      handleSetBooks: OpenLibraryActions.SET_BOOKS,
    } );

  }

  handleFetchBooks(): void {
    this.openLibraryStore_Books = [];
  }

  handleSetBooks( books: Array < Object > ): void {
    this.openLibraryStore_Books = books;
  }
}

export default Alt.createStore( OpenLibrarySTore, 'OpenLibrarySTore' );