// @flow

import _ from 'lodash';
import {
  Alt,
  dispatcher
} from '../services/alt';
import Utils from '../services/utils';
import Toastr from 'toastr';

import PouchDB from 'pouchdb';

Toastr.options = {
  'positionClass': 'toast-bottom-left'
};

class BookActions {

  db: any;

  constructor() {
    this.db = {
      myBooks: new PouchDB( 'my-books' )
    };
  }

  /**
   * Fetch the books from local storage (PouchDB)
   * @return {Alt.dispatch}
   */
  fetchMyBooks(): Alt.dispatch {
    return async ( dispatch ) => {
      dispatch();
      console.info( 'Fetching my books...' );
      let books = await this.db.myBooks.allDocs( { include_docs: true } );
      console.info( `Found ${books.rows.length}` );
      this.setMyBooks( books.rows.map( ( b ) => b.doc ) || [] );
    };
  }

  /**
   * Toggle a book status between in/out of the library
   * @param {Object} book The book object to toggle
   * @param {boolean} onLibrary The book status
   * @return {Alt.dispatch}
   */
  toggleBook( book: Object, onLibrary: boolean = false ): Alt.dispatch {
    return async ( dispatch ) => {

      if ( onLibrary ) {
        console.info( `Adding ${book.key} to library...` );
        book = _.merge( book, {
          _id: book.key,
          read: false,
          updatedAt: Utils.moment().format( 'YYYY-MM-DD HH:mm:SS' ),
          createdAt: Utils.moment().format( 'YYYY-MM-DD HH:mm:SS' )
        } );
        await this.db.myBooks.put( book );
      }
      else {
        try {
          let dbaseBook = await this.db.myBooks.get( book.key );
          console.info( `Removing book #${dbaseBook.key} REV:${dbaseBook._rev}` );
          await this.db.myBooks.remove( dbaseBook._id, dbaseBook._rev );
        }
        catch ( ERR ) {
          Toastr.error( ERR.message );
          throw new Error( ERR );
        }

      }

      console.info( 'Done!' );
      Toastr.info( `#${book.key.split( '/' ).pop()} ${onLibrary ? 'added!' : 'removed!'}` );
      return dispatch( _.merge( book, {
        onLibrary: onLibrary
      } ) );
    };
  }

  /**
   * Toggle a book read status between read/unread
   * @param {string} id The _id on PouchDB (book's key property)
   * @param {boolean} read The book read status
   * @param {Object} additionalChanges Additional changes to merge with the current book
   * @return {Alt.dispatch}
   */
  toggleBookStatus( id: string, read: boolean = false, additionalChanges: Object = {} ): Alt.dispatch {
    return async ( dispatch ) => {
      try {
        let book = await this.db.myBooks.get( id );
        await this.db.myBooks.put( _.merge( book, {
          read: read,
          updatedAt: Utils.moment().format( 'YYYY-MM-DD HH:mm:SS' ),
          ...additionalChanges
        } ) );
        Toastr.info( `#${book.key.split( '/' ).pop()} ${read ? 'marked readed!' : 'marked unreaded!'}` );
        return dispatch( _.merge( book, {
          read: read
        } ) );
      }
      catch ( ERR ) {
        Toastr.error( ERR.message );
        throw new Error( ERR );
      }
    };
  }

  /**
   * Set the bookStore_MyBooks state
   * @param {Array<Object>} books The array of books to set
   * @return {Alt.dispatch}
   */
  setMyBooks( books: Array < Object > ): Alt.dispatch {
    return dispatcher( books );
  }

}

export default Alt.createActions( BookActions );