// @flow

import _ from 'lodash';
import { Alt, Dispatcher } from '../services/alt';
import NProgress from 'nprogress/nprogress';
import Utils from '../services/utils';

import PouchDB from 'pouchdb';

class BookActions {
    
    db: any;

    constructor() {
        this.db = {
            myBooks: new PouchDB('my-books')
        };
    }

    fetchMyBooks(): Alt.dispatch {
        return async (dispatch) => {
            dispatch();
            console.log(`Fetching my books...`);
            let books = await this.db.myBooks.allDocs( { include_docs: true } );
            console.log( `Found ${books.rows.length} ` );
            this.setMyBooks( books.rows.map((b) => b.doc) || [] );
        }            
    }

    toggleBook(book: Object, onLibrary: boolean = false): Alt.dispatch {
        return async ( dispatch ) => {

                if(onLibrary){
                    console.log(`Adding ${book.key} to library...`);
                    book = _.merge( book, { _id: book.key, read: false, updatedAt: Utils.moment().format('YYYY-MM-DD HH:mm:SS'), createdAt: Utils.moment().format('YYYY-MM-DD HH:mm:SS') } );
                    await this.db.myBooks.put( book );
                }
                else{
                    try {
                        let dbaseBook = await this.db.myBooks.get( book.key );
                        console.log(`Removing book #${dbaseBook.key} REV:${dbaseBook._rev}`);
                        await this.db.myBooks.remove( dbaseBook._id, dbaseBook._rev )
                    } catch ( ERR ){
                        console.log( ERR );
                    }

                }
                
                console.log('Done!');
                return dispatch(_.merge( book, { onLibrary: onLibrary } ));
        }
    }

    toggleBookStatus(id: string, read: boolean = false): Alt.dispatch {
        return async ( dispatch ) => {
            try {
                let book = await this.db.myBooks.get( id );
                console.log( book );
                await this.db.myBooks.put( _.merge( book, { read: read, updatedAt: Utils.moment().format('YYYY-MM-DD HH:mm:SS') } ) );
                return dispatch(_.merge( book, { read: read } ));
            }
            catch( ERR ){
                throw new Error( ERR );
            }
        }
    }

    setMyBooks( books: Array<Object> ): Alt.dispatch {
        return Dispatcher( books );
    }

}

export default Alt.createActions( BookActions );