// @flow

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Link } from 'react-router-dom';

type Props = {
  history: Object,
  match: any
};

class Nav extends Component<Props> {

  _searchBook: Function;

  constructor( props: any ) {
    super( props );
    this._searchBook = this._searchBook.bind( this );
  }

  componentDidMount() {

    if ( document.body && !document.body.classList.contains( 'fixed-nav' ) ) {
      document.body.classList.add( 'fixed-nav', 'sticky-footer', 'bg-dark' );
    }

    window.$( '#sidenavToggler' ).click( function( e ) {
      e.preventDefault();
      window.$( 'body' ).toggleClass( 'sidenav-toggled' );
      window.$( '.navbar-sidenav .nav-link-collapse' ).addClass( 'collapsed' );
      window.$( '.navbar-sidenav .sidenav-second-level, .navbar-sidenav .sidenav-third-level' ).removeClass( 'show' );
    } );

    window.$( '.navbar-sidenav .nav-link-collapse' ).click( function( e ) {
      e.preventDefault();
      window.$( 'body' ).removeClass( 'sidenav-toggled' );
    } );

  }

  _searchBook( e: Event ): void {
    if ( e ) e.preventDefault();

    let bookToSearch = this.refs[ 'book-search' ].value;
    if ( bookToSearch ) {
      this.props.history.push( `/search/${encodeURIComponent( bookToSearch.replace( /\s/g, '+' ) )}` );
    }

  }


  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id="mainNav">
        <Link className="navbar-brand" to="/">Book Maniac</Link>
        <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav navbar-sidenav" id="exampleAccordion">
            <li className="nav-item" data-toggle="tooltip" data-placement="right" title="Dashboard">
              <Link className="nav-link" to="/">
                <i className="fa fa-fw fa-chart-line"></i>
                <span className="nav-link-text">Dashboard</span>
              </Link>
            </li>
            <li className="nav-item" data-toggle="tooltip" data-placement="right" title="Dashboard">
              <Link className="nav-link" to="/search">
                <i className="fa fa-fw fa-search"></i>
                <span className="nav-link-text">Search</span>
              </Link>
            </li>
            <li className="nav-item" data-toggle="tooltip" data-placement="right" title="Charts">
              <Link className="nav-link" to="/my-books">
                <i className="fa fa-fw fa-book"></i>
                <span className="nav-link-text">My Books</span>
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav sidenav-toggler">
            <li className="nav-item">
              <a className="nav-link text-center" id="sidenavToggler">
                <i className="fa fa-fw fa-angle-left"></i>
              </a>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <form onSubmit={this._searchBook} className="form-inline my-2 my-lg-0 mr-lg-2">
                <div className="input-group">
                  <input ref="book-search" className="form-control" type="text" defaultValue={this.props.match.params.book ? decodeURIComponent( this.props.match.params.book ).replace( /\+/g, ' ' ) : ''} placeholder="Search books" />
                  <span className="input-group-append">
                    <button onClick={this._searchBook} className="btn btn-primary" type="button">
                      <i className="fa fa-search"></i>
                    </button>
                  </span>
                </div>
              </form>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Nav;