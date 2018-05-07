// @flow

import PouchDB from 'pouchdb';

class Database {

    db: any;

    constructor( database: string ){
      this.db = new PouchDB( database );
    }

    fetch(): Promise<any> {
      return new Promise( async ( resolve, reject ) => {
        try {
          let entities;
          entities = await this.db.allDocs( { include_docs: true } );
          resolve( entities );
        }
        catch ( ERR ){
          console.error( ERR );
          reject( ERR );
        }
      } );
    }

    put( doc: Object ): Promise<any> {
      return new Promise( async ( resolve, reject ) => {
        try {
          resolve( this.db.put( doc ) );
        }
        catch ( ERR ){
          console.error( ERR );
          reject( ERR );
        }
      } );
    }

    get( id: string ): Promise<any> {
      return new Promise( async ( resolve, reject ) => {
        try {
          let entity;
          entity = await this.db.get( id );
          if ( !entity ) throw new Error( 'Not found' );
          resolve( entity );
        }
        catch ( ERR ){
          console.error( ERR );
          reject( ERR );
        }
      } );
    }

}

export default Database;