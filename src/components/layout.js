// @flow
import React, { Fragment } from 'react';
import Nav from './nav';
import Screen from './screen';
import Footer from './footer';

class Layout extends Screen {

    render() {
        return (
            <Fragment>
                <Nav {...this.props }/>
                <div className="content-wrapper">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                {this.props.children}
                            </div>
                        </div>
                    </div>
                    <Footer />
                    <a className="scroll-to-top rounded" href="#page-top">
                        <i className="fa fa-angle-up"></i>
                    </a>
                </div>
            </Fragment>
        )
    }
}

export default Layout;