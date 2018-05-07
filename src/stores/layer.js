// @flow

import { Alt } from '../services/alt';
import LayerActions from '../actions/layer';
import Utils from '../services/utils';

class LayerStore {

    layerStore_Error: ?string;
    bindListeners: Function;

    constructor() {

      this.layerStore_Error = null;

      this.bindListeners( {
        handleThrowError: LayerActions.THROW_ERROR,
      } );

    }

    handleThrowError( error: any ) {
      console.error( error );
      error = error.message || error;
      Utils.Alerty( error );
      this.layerStore_Error = error;
    }
}

export default Alt.createStore( LayerStore, 'LayerStore' );