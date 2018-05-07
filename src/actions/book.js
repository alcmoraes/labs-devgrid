// @flow

import _ from 'lodash';
import {
  Alt,
  dispatcher
} from '../services/alt';
import Utils from '../services/utils';
import Toastr from 'toastr';

import PouchDB from 'pouchdb';
import MemoryAdapter from 'pouchdb-adapter-memory';
PouchDB.plugin( MemoryAdapter );

import LayerActions from './layer';

Toastr.options = {
  'positionClass': 'toast-bottom-left'
};

class BookActions {

  db: any;

  constructor() {
    this.db = { myBooks: new PouchDB( 'my-books' ) };
  }

  /**
   * Fetch the books from local storage (PouchDB)
   * @param {boolean} include_docs If should bring the docs on query
   * @return {Alt.dispatch}
   */
  fetchMyBooks( include_docs: boolean = true ): Alt.dispatch {
    return ( dispatch ) => {
      dispatch();
      return new Promise( async ( resolve, reject ) => {
        try {
          if ( typeof include_docs !== 'boolean' ) throw new Error( 'Invalid "include_docs" parameter' );
          console.info( 'Fetching my books...' );
          let books = await this.db.myBooks.allDocs( { include_docs: include_docs } );
          console.info( `Found ${books.rows.length}` );
          resolve( this.setMyBooks( books.rows.map( ( b ) => b.doc ) || [] ) );
        }
        catch ( ERR ){
          LayerActions.throwError( ERR );
          reject( ERR );
        }
      } );
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
      try {
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
          console.info( 'Removing book ...' );
          let dbaseBook = await this.db.myBooks.get( book.key );
          console.info( `Removing book #${dbaseBook.key} REV:${dbaseBook._rev}` );
          await this.db.myBooks.remove( dbaseBook._id, dbaseBook._rev );
        }

        console.info( 'Done!' );
        Toastr.info( `#${book.key.split( '/' ).pop()} ${onLibrary ? 'added!' : 'removed!'}` );
        dispatch( _.merge( book, {
          onLibrary: onLibrary
        } ) );
      }
      catch ( ERR ) {
        throw new Error( ERR );
      }
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
        if ( _.has( additionalChanges, 'readedAt' ) && !Utils.moment( additionalChanges.readedAt ).isValid() ){
          throw new Error( 'Invalid date' );
        }
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