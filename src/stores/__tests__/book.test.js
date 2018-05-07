
import BookStore from '../book';
import BookActions from '../../actions/book';

describe( 'Book Store', () => {
  
  it( 'Has an intial state of empty books', () => {
    expect( BookStore.getState().bookStore_MyBooks.length ).toBe( 0 );
  } );

  it( 'Can set books', async () => {
    await BookActions.toggleBook( { key: 'mock_book' }, true );
    expect( BookStore.getState().bookStore_MyBooks.length ).toBeGreaterThan( 0 );
  } );

  it( 'Can update book read status to Read', async () => {
    await BookActions.toggleBookStatus( 'mock_book', true, { readedAt: '2018-04-03 23:59:59' } );
    expect( BookStore.getState().bookStore_MyBooks[ 0 ].read ).toBe( true );
  } );

  it( 'Can update book read status to Unreaded', async () => {
    await BookActions.toggleBookStatus( 'mock_book', false );
    expect( BookStore.getState().bookStore_MyBooks[ 0 ].read ).toBe( false );
  } );

  it( 'Throw error on invalid book update', async () => {
    try {
      await BookActions.toggleBookStatus( 'mock_book', true, { readedAt: 'foobar' } );
    }
    catch ( ERR ) {
      expect( ERR.message ).toMatch( 'Invalid date' );
    }
  } );

  it( 'Throw error when fetching PouchDB with wrong parameters', async () => {
    try {
      await BookActions.fetchMyBooks( [ { foo: Math.PI } ] );
    }
    catch ( ERR ){
      expect( ERR.message ).toMatch( 'Invalid "include_docs" parameter' );
    }
  } );

  it( 'Can fetch my books', async () => {
    await BookActions.fetchMyBooks();
    expect( BookStore.getState().bookStore_MyBooks.length ).toBeGreaterThan( 0 );
  } );

  it( 'Can remove a book', async () => {
    await BookActions.toggleBook( { key: 'mock_book' }, false );
    expect( BookStore.getState().bookStore_MyBooks.length ).toBe( 0 );
  } );

  it( 'Throw error on invalid book id', async () => {
    try {
      await BookActions.toggleBook( { key: 'invalid_book_id' }, false );
    }
    catch ( ERR ) {
      expect( JSON.parse( ERR.message ).name ).toMatch( 'not_found' );
    }
  } );

} );