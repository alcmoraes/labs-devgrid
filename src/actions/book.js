// @flow

import { Alt, Dispatcher } from '../services/alt';
import NProgress from 'nprogress/nprogress';

import PouchDB from 'pouchdb';

class BookActions {
    
    db: any;

    constructor() {
        this.db = {
            myBooks: new PouchDB('my-books')
        }
    }

    fetchMyBooks(): Alt.dispatch {
        return async (dispatch) => {
            dispatch();
            let books = await this.db.myBooks.allDocs( { include_docs: true } );
            this.setMyBooks(books);
        }            
    }

    setMyBooks( books: Array<Object> ): Alt.dispatch {
        return Dispatcher( books );
    }

}

export default Alt.createActions( BookActions );