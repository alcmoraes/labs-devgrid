import React, { Component } from 'react';

import _ from 'lodash';

import BookActions from '../actions/book';

import PropTypes from 'prop-types';

class BookCard extends Component {

  constructor(props){
    super(props);
    this._toggleBook = this._toggleBook.bind( this );
    this._toggleBookStatus = this._toggleBookStatus.bind( this );

  }

  _toggleBook(book: Object): void {
    console.log(`Toggling ${book.key}. On library: ${!this.props.onLibrary}`);
    BookActions.toggleBook( book, !this.props.onLibrary );
  }

  _toggleBookStatus(book: Object): void {
    console.log(`Toggling status of ${book.key} to ${!this.props.read}`);
    BookActions.toggleBookStatus( book.key, !this.props.read );
  }

  render() {
    return (
      <div className="book-card-wrapper clearfix">
        <div className="cover-wrapper" style={{backgroundImage: `url(http://via.placeholder.com/100x120)`}}>
            <img src={`http://covers.openlibrary.org/b/olid/${this.props.book.cover_edition_key}-M.jpg`}/>
        </div>
        <span className="title">
            {this.props.book.title_suggest} {this.props.book.first_publish_year ? `(${this.props.book.first_publish_year})` : null}
        </span>
        <span className="author">
            {this.props.book.author_name ? this.props.book.author_name[0] : null}
        </span>
        <div className="options">
          <button className={`bg-${this.props.onLibrary ? 'red' : 'green'}`} onClick={this._toggleBook.bind(this, this.props.book)}>
            <i className={`fa fa-${this.props.onLibrary ? 'minus' : 'plus'}`}></i> {this.props.onLibrary ? 'remove' : 'add'}
          </button>
          { this.props.onLibrary ? (
            <button className={`bg-${this.props.read ? 'red' : 'green'}`} onClick={this._toggleBookStatus.bind(this, this.props.book)}>
              <i className={`fa fa-${this.props.read ? 'minus' : 'plus'}`}></i> {this.props.read ? 'Mark unreaded' : 'Mark readed'}
            </button>
          ) : null}
        </div>
      </div>
    )
  }
};

BookCard.defaultProps = {
  onChange: () => console.log('tick')
}

BookCard.propTypes = {
    onChange: PropTypes.func,
    onLibrary: PropTypes.bool,
    book: PropTypes.object.isRequired
}

export default BookCard;