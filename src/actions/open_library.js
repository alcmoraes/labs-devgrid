// @flow

import {
  Alt,
  dispatcher
} from '../services/alt';
import NProgress from 'nprogress/nprogress';
import _ from 'lodash';
import LayerActions from './layer';
import Api from '../services/api';

class OpenLibraryActions {

  constructor() {
    Api.setMode( 'cors' );
  }

  fetchBooks( query: string ): Alt.dispatch {
    let books;
    let queryTemplate = _.template( '?q=<%= BOOK %>' );

    return ( dispatch: Alt.dispatch ) => {
      dispatch();
      return new Promise( async ( resolve, reject ) => {
        try {
          NProgress.start();
          Api.setEndpoint( 'https://openlibrary.org/search.json' );
          console.info( `Fetching Open Library on ${queryTemplate( { BOOK: decodeURI( query ) } )}.` );
          books = await Api.get( queryTemplate( { BOOK: decodeURI( query ) } ) );
          NProgress.done();
          resolve( this.setBooks( books.docs || [] ) );
        }
        catch ( ERR ) {
          NProgress.done();
          reject( LayerActions.throwError( ERR ) );
        }
      } );
    };
  }

  setBooks( data: Array < Object > ): Alt.dispatch {
    return dispatcher( data );
  }

}

export default Alt.createActions( OpenLibraryActions );