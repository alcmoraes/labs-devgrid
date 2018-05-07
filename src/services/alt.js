// @flow

import AltFlux from 'alt';

export let Alt = new AltFlux();

// Prevent dispatcher to dispatch during a dispatch ( some weird shit )
// https://github.com/goatslacker/alt/issues/428
export let dispatcher = ( data: any, cb ? : ? Function = null ) => {

  return ( dispatch: Alt.dispatch ) => {

    let yell = () => {
      if ( !cb ) return dispatch( data );
      dispatch();
      return cb( data );
    };

    if ( !Alt.dispatcher.isDispatching() ) return yell();

    setTimeout( () => {
      yell();
    } );

  };

};