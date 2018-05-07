// @flow

import { Alt } from '../services/alt';
import _ from 'lodash';
import BookActions from '../actions/book';

class BookStore {

    bookStore_MyBooks: ?Array<Object>;
    bindListeners: Function;

    constructor() {

        this.bookStore_MyBooks = [];

        this.bindListeners( {
            handleToggleBookStatus: BookActions.TOGGLE_BOOK_STATUS,
            handleToggleBook: BookActions.TOGGLE_BOOK,
            handleFetchMyBooks: BookActions.FETCH_MY_BOOKS,
            handleSetMyBooks: BookActions.SET_MY_BOOKS
        } );

    }

    handleToggleBookStatus(book: Object): void {
        this.bookStore_MyBooks = this.bookStore_MyBooks.map((b) => {
            if(b.key !== book.key) return b;
            return book;
        });
    }

    handleToggleBook(book: Object): void {
        if(!book.onLibrary) return _.remove( this.bookStore_MyBooks, (b) => b.key === book.key );
        this.bookStore_MyBooks.push( book );
    }

    handleFetchMyBooks(): void {
        return;
    }

    handleSetMyBooks( books: Array<Object> ): void {
        this.bookStore_MyBooks = books;
    }
}

export default Alt.createStore( BookStore, 'BookStore');