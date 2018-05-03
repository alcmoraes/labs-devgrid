import React, { Component } from 'react';

import PropTypes from 'prop-types';

class BookCard extends Component {
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
      </div>
    )
  }
};

BookCard.propTypes = {
    book: PropTypes.object.isRequired
}

export default BookCard;