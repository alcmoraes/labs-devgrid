// @flow

import Alt from 'alt';

export let Alt = new Alt();

export let Dispatcher = ( data ) => {

    return ( dispatch ) => {
        if(Alt.dispatcher.isDispatching()){
            setTimeout(() => {
                dispatch( data );
            })
        }
        else {
            dispatch( data );
        }
    }

}