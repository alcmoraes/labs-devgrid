import React, { Fragment, Component } from 'react';

import _ from 'lodash';

import Utils from '../services/utils';

import InfiniteCalendar from 'react-infinite-calendar';
import enUS from 'date-fns/locale/en';

import BookActions from '../actions/book';

import PropTypes from 'prop-types';

class BookCard extends Component {

  constructor(props){
    super(props);
    this._toggleBook = this._toggleBook.bind( this );
    this._toggleBookStatus = this._toggleBookStatus.bind( this );
    this._triggerDateSelect = this._triggerDateSelect.bind( this );
    this._toggleBookReadStatusChange = this._toggleBookReadStatusChange.bind( this );
    this._attachInputMasks = this._attachInputMasks.bind( this );
    this._closePicker = this._closePicker.bind(this);
    
    this.state = {
      isReadedChangeToggled: false,
      chosenDate: new Date(),
      datePicker: false,
    }

    this.infiniteCalendarProps = {
      rowHeight: 70,
      theme: {
          selectionColor: '#378BCA',
          textColor: {
              default: '#6c6c6c',
              active: '#FFF'
          },
          weekdayColor: '#525252',
          headerColor: '#292929',
          floatingNav: {
              background: '#242424',
              color: '#FFF',
              chevron: '#378BCA'
          }
      }
    };

  }

  _closePicker(e) {
    if(e.target && e.target.classList.contains('picker-wrapper' ) ) {
      return this.setState({ datePicker: false });
    }
    if(e.target && e.target.classList.contains('Cal__Day__root', 'Cal__Day__enabled')){
      this.refs['date'].value = Utils.moment(e.target.dataset.date).format('YYYY/MM/DD');
      this.setState({ datePicker: false, chosenDate: new Date(e.target.dataset.date) });
    }
  }

  _toggleBook(book: Object): void {
    console.log(`Toggling ${book.key}. On library: ${!this.props.onLibrary}`);
    BookActions.toggleBook( book, !this.props.onLibrary );
  }

  _toggleBookReadStatusChange(): void {
    this.setState( { isReadedChangeToggled: !this.state.isReadedChangeToggled } );
  }

  _toggleBookStatus(book: Object): void {
    if(!this.props.read) {
      if(Utils.moment(this.refs['date'].value).isValid()) {
        book.readedAt = this.refs['date'].value;
      }
      else {
        return Utils.Alerty('Choose a valid date');
      }
    }

    this.setState( { isReadedChangeToggled: false, datePicker: false, chosenDate: new Date() } );

    BookActions.toggleBookStatus( book.key, !this.props.read, !this.props.read ? { readedAt: this.refs['date'].value } : {} );
  }

  _attachInputMasks(): void {
    if(this.refs['date'] && !Utils.isMobile()){
      let dateEl = this.refs['date'];
      new window.IMask(dateEl, {
          mask: Date,
          pattern: 'YYYY/MM/DD',
          groups: {
              DD: new window.IMask.MaskedPattern.Group.Range([1, 31]),
              MM: new window.IMask.MaskedPattern.Group.Range([1, 12]),
              YYYY: new window.IMask.MaskedPattern.Group.Range([1900, 2018])
          },
          format: function (date) {
              return Utils.moment(date).format('YYYY/MM/DD');
          },
          parse: function (str) {
              return Utils.moment(str, 'YYYY/MM/DD');
          },
          min: new Date(1900, 1, 1),
          max: new Date(),
          lazy: false
      });
    }
  }

  componentDidUpdate(prevProps, prevState): void {
    if(!prevState.isReadedChangeToggled && this.state.isReadedChangeToggled){
      this._attachInputMasks();      
    }
  }

  _triggerDateSelect(): void {
    if (!Utils.isMobile()) this.setState({ datePicker: !this.state.datePicker });
  }

  render() {
    return (
      <div className="book-card-wrapper clearfix">
        <div className="cover-wrapper" style={{backgroundImage: `url(/assets/images/100x120.png)`}}>
            <img ref="image" onError={(image) => { image.target.remove() } } src={`http://covers.openlibrary.org/b/olid/${this.props.book.cover_edition_key}-M.jpg`}/>
        </div>
        <div className="info-wrapper">
          {this.state.datePicker ? (
            <div ref="picker-wrapper" onClick={this._closePicker.bind(this)} className="picker-wrapper">
                <InfiniteCalendar selected={this.state.chosenDate} {...this.infiniteCalendarProps} />
            </div>
          ) : null}
          {this.state.isReadedChangeToggled ? (
            <Fragment>
              <span className="title">
                When did you readed?
              </span>
              { Utils.isMobile() ? (
                  <div className="year-input">
                    <input ref="date" type="date" placeholder={Utils.moment().format('YYYY/MM/DD')}  className="form-control" />
                  </div>
              ) : (
                  <Fragment>
                    <div className="input-group">
                        <input required ref="date" type="text" placeholder={Utils.moment().format('YYYY/MM/DD')} className="form-control" />
                        <span className="input-group-btn">
                            <button onClick={this._triggerDateSelect} className="btn btn-secondary" type="button">
                                <i className="fa fa-calendar"></i>
                            </button>
                        </span>
                    </div>
                  </Fragment>
              ) }
              <div className="options">
                <button className={`bg-red`} onClick={this._toggleBookReadStatusChange.bind(this)}>
                  <i className={`fa fa-times`}></i> Cancel
                </button>
                <button className={`bg-green`} onClick={this._toggleBookStatus.bind(this, this.props.book)}>
                  <i className={`fa fa-check`}></i> Save
                </button>
              </div>
            </Fragment>
          ) : (
            <Fragment>
              <span className="title">
                <a href={`https://openlibrary.org${this.props.book.key}`} target="_blank">{this.props.book.title_suggest} {this.props.book.first_publish_year ? `(${this.props.book.first_publish_year})` : null}</a>
              </span>
              <span className="author">
                  {this.props.book.author_name ? this.props.book.author_name[0] : null}
              </span>
              <div className="options">
                <button className={`bg-${this.props.onLibrary ? 'red' : 'green'}`} onClick={this._toggleBook.bind(this, this.props.book)}>
                  <i className={`fa fa-${this.props.onLibrary ? 'minus' : 'plus'}`}></i> {this.props.onLibrary ? 'remove' : 'add'}
                </button>
                { this.props.onLibrary ? (
                  <button className={`bg-${this.props.read ? 'red' : 'green'}`} onClick={this.props.read ? this._toggleBookStatus.bind(this, this.props.book) : this._toggleBookReadStatusChange.bind(this)}>
                    <i className={`fa fa-${this.props.read ? 'minus' : 'plus'}`}></i> {this.props.read ? 'Mark unreaded' : 'Mark readed'}
                  </button>
                ) : null}
              </div>
            </Fragment>
          )}
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