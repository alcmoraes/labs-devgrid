// @flow

import {
  Alt,
  dispatcher
} from '../services/alt';

class LayerActions {

  throwError( error: string ): Alt.dispatch {
    return dispatcher( error );
  }

}

export default Alt.createActions( LayerActions );