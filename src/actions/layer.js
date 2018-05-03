// @flow

import { Alt, Dispatcher } from '../vendors/alt';
import NProgress from 'nprogress/nprogress';
import Alerty from '../vendors/alerty.js';

class LayerActions {
    
    throwError( error: string ): Alt.dispatch {
        return Dispatcher( error );
    }

}

export default Alt.createActions( LayerActions );