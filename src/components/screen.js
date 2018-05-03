//@flow

import React, { Component, Fragment } from 'react';

import LayerStore from '../stores/layer';
import OpenLibraryStore from '../stores/open_library';
import BookStore from '../stores/book';

import LayerActions from '../actions/layer';
import OpenLibraryActions from '../actions/open_library';
import BookActions from '../actions/book';

class Screen extends Component {

    _getInitialState: Function;
    _onChange: Function;

    constructor( props: any ): void {
        super(props);

        this._onChange = this._onChange.bind( this );
        this._getInitialState = this._getInitialState.bind( this );

        this.state = this._getInitialState();
    }

    componentDidMount(): void {
        LayerStore.listen( this._onChange );
        OpenLibraryStore.listen( this._onChange );
        BookStore.listen( this._onChange );
    }

    componentWillUnmount(): void {
        LayerStore.unlisten( this._onChange );
        OpenLibraryStore.unlisten( this._onChange );
        BookStore.unlisten( this._onChange );
    }

    _onChange( state: any ): void {
        this.setState(state);
    }
    
    _getInitialState(): Object {
		return {
            ...LayerStore.getState(),
            ...OpenLibraryStore.getState(),
            ...BookStore.getState()
		}
    }

    _getAction( action: string ) {
        return {
            Layer: LayerActions,
            OpenLibrary: OpenLibraryActions,
            Book: BookActions
        }[ action ];
    }
    
} 

export default Screen;