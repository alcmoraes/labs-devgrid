// @flow

import { Alt, Dispatcher } from '../services/alt';
import NProgress from 'nprogress/nprogress';
import _ from 'lodash';
import LayerActions from './layer';
import Api from '../services/api';
import Alerty from '../vendors/alerty.js';

class OpenLibraryActions {
    
    constructor(){
        Api.setMode( 'cors' );
    }

    fetchBooks( query: string ): Alt.dispatch {
        
        let books;
        let queryTemplate = _.template('?q=<%= BOOK %>');

        return async (dispatch: Alt.dispatch) => {
            dispatch();
            try {
                NProgress.start();
                Api.setEndpoint('https://openlibrary.org/search.json');
                console.info(`Fetching Open Library on ${queryTemplate( { BOOK: decodeURI( query ) } )}...`);
                books = await Api.get( queryTemplate( { BOOK: decodeURI( query ) } ) );
                NProgress.done();
                this.setBooks( books.docs || [] );
            }
            catch( ERR ){
                NProgress.done();
                LayerActions.throwError( ERR );
            }   
        }
    }

    setBooks( data: Array<Object> ): Alt.dispatch {
        return Dispatcher( data );
    }

}

export default Alt.createActions( OpenLibraryActions );