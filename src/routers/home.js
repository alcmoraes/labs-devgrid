// @flow
import React, { Fragment } from 'react';
import _ from 'lodash';

import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';

import Utils from '../services/utils';

import Screen from '../components/screen';
import Layout from '../components/layout';

import Ocean from 'fusioncharts/themes/fusioncharts.theme.ocean.js';

Charts( FusionCharts );
Ocean( FusionCharts );

type Props = {};

type State = {
  bookStore_MyBooks: Array<Object>
}

export default class Home extends Screen<Props, State> {

  _generateAnnualReport: Function;
  state: any;

  constructor( props: any ) {
    super( props );

    this._generateAnnualReport = this._generateAnnualReport.bind( this );

    this.state = {
      ...super._getInitialState(),
      readedBooksByYear: {},
      booksChartData: [],
      annualReport: false
    };

  }

  componentDidMount(): void {
    super.componentDidMount();

    if ( !this.state.bookStore_MyBooks.length ) {
      super._getAction( 'Book' ).fetchMyBooks();
    }
    else {
      this._generateBookChartData();
    }

  }

  _generateBookChartData(): void {
    let booksChartData = [];
    let readedBooksByYear = {};
    readedBooksByYear = _.groupBy( _.filter( this.state.bookStore_MyBooks, ( b ) => b.read ), ( b ) => Utils.moment( b.readedAt ).format( 'YYYY' ) );
    _.each( readedBooksByYear, ( books, year ) => {
      booksChartData.push( { label: year, value: books.length } );
    } );
    this.setState( _.assign( {}, { booksChartData: booksChartData, readedBooksByYear: readedBooksByYear } ) );
  }

  _generateAnnualReport(): void {
    this.setState( _.assign( {}, { annualReport: _.groupBy( this.state.readedBooksByYear[ this.refs[ 'year-select' ].value ], ( b ) => Utils.moment( b.readedAt ).format( 'MMMM' ) ) } ) );
  }

  componentDidUpdate( prevProps: any, prevState: any ): void {
    if ( prevState.bookStore_MyBooks.length !== this.state.bookStore_MyBooks.length ){
      this._generateBookChartData();
    }
  }

  render() {
    return (
      <Layout {...this.props}>
        <div className="card mb-3">
          <div className="card-header">
            <i className="fa fa-chart-line"></i> Global report
          </div>
          <div className="card-body">
            <ReactFC {...{
              type: 'line',
              width: '100%',
              theme: 'ocean',
              height: 400,
              dataFormat: 'json',
              dataSource: {
                chart: {
                  caption: 'Books read by year',
                  theme: 'ocean',
                },
                data: this.state.booksChartData
              } }} />
          </div>
        </div>
        <div className="card mb-3">
          <div className="card-header">
            <i className="fa fa-chart-line"></i> Generate annual report
          </div>
          <div className="card-body">
            <div className="annual-report-wrapper">
              <label htmlFor="annual-year-select">Which year?</label>
              <div className="input-group">
                <select ref="year-select" onChange={this._generateAnnualReport} className="form-control" id="annual-year-select">
                  <option default value="">Choose a year</option>
                  {Object.keys( this.state.readedBooksByYear ).map( ( year, i ) => {
                    return (
                      <option key={i} value={year}>{year} ({this.state.readedBooksByYear[ year ].length}  books)</option>
                    );
                  } )}
                </select>
              </div>
              <hr/>
              {this.state.annualReport ?
                Object.keys( this.state.annualReport ).map( ( month, i ) => {
                  return (
                    <Fragment key={i}>
                      <h5>{_.capitalize( month )} ({this.state.annualReport[ month ].length} book)</h5>
                      <table className="table table-stripped">
                        <thead>
                          <tr>
                            <th>
                              Name
                            </th>
                            <th>
                              Author
                            </th>
                            <th>
                              Publish year
                            </th>
                            <th>
                              Read
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.annualReport[ month ].map( ( b, bI ) => {
                            return (
                              <tr key={bI}>
                                <td>
                                  <a href={`https://openlibrary.org${b.key}`} target="_blank">{b.title_suggest}</a>
                                </td>
                                <td>
                                  {b.author_name}
                                </td>
                                <td>
                                  {b.first_publish_year}
                                </td>
                                <td>
                                  {Utils.moment( b.readAt ).format( 'YYYY/MM/DD' )}
                                </td>
                              </tr>
                            );
                          } )}
                        </tbody>
                      </table>
                    </Fragment>
                  );
                } )
                : null}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

}
