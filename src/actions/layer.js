// @flow

import { Alt, Dispatcher } from '../services/alt';
import NProgress from 'nprogress/nprogress';

class LayerActions {
    
    throwError( error: string ): Alt.dispatch {
        return Dispatcher( error );
    }

}

export default Alt.createActions( LayerActions );