import React, { Component } from 'react';
import Utils from '../services/utils';

export default class Footer extends Component {
    render() {
        return (
            <footer className="sticky-footer">
                <div className="container">
                    <div className="text-center">
                        <small>Book Maniac - {Utils.moment().format('YYYY')}</small>
                    </div>
                </div>
            </footer>
        )
    }
};
