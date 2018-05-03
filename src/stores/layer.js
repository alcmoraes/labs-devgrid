// @flow

import _ from 'lodash';
import Alt from '../vendors/alt';
import LayerActions from '../actions/layer';
import Alerty from '../vendors/alerty.js';

class LayerStore {

    layerStore_Error: ?string;
    bindListeners: function;

    constructor() {

        this.layerStore_Error = null;

        this.bindListeners({
            handleThrowError: LayerActions.THROW_ERROR,
        });

    }

    handleThrowError( error: string ) {
        this.layerStore_Error = error;
    }
}

export default Alt.createStore(LayerStore, 'LayerStore');