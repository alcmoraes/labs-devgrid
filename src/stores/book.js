// @flow

import { Alt } from '../services/alt';
import BookActions from '../actions/book';

class BookStore {

    bookStore_MyBooks: ?Array<Object>;
    bindListeners: Function;

    constructor() {

        this.bookStore_MyBooks = null;

        this.bindListeners( {
            handleFetchMyBooks: BookActions.FETCH_MY_BOOKS,
            handleSetMyBooks: BookActions.SET_MY_BOOKS
        } );

    }

    handleFetchMyBooks(): void {
        return;
    }

    handleSetMyBooks( books: Array<Object> ): void {
        this.bookStore_MyBooks = books;
    }
}

export default Alt.createStore(BookStore, 'BookStore');