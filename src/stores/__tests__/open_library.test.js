
import OpenLibraryStore from '../open_library';
import OpenLibraryActions from '../../actions/open_library';

describe( 'Open Library Store', () => {
  
  it( 'Has an intial state of empty books', () => {
    expect( OpenLibraryStore.getState().openLibraryStore_Books.length ).toBe( 0 );
  } );

  it( 'Can set books', () => {
    OpenLibraryActions.setBooks( [ { key: 'mock_book' } ] );
    expect( OpenLibraryStore.getState().openLibraryStore_Books.length ).toBeGreaterThan( 0 );
  } );

  it( 'Can fetch books', async () => {
    await OpenLibraryActions.fetchBooks( 'The Lord of the Rings' );
    expect( OpenLibraryStore.getState().openLibraryStore_Books.length ).toBeGreaterThan( 10 );
  } );

} );