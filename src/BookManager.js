import React from 'react';
import './style.css';
import MainTitle from 'components/main-title/MainTitle';
import SearchMenu from 'components/search-menu/SearchMenu';
import BooksList from 'components/books-list/BooksList';
import SortBar from 'components/sort-bar/SortBar';

export const defaultBooks = [
  {
    id: 'OL10434104Z',
    title: 'Harry Potter',
    author: 'J.K Rowling',
    published: 1996,
    description: 'Young wizard going to Poudlard.',
    dateAdded: 1616719846821,
  },
  {
    id: 'OL10434503M',
    title: 'Harry Potter 2',
    author: 'J.K Rowling',
    published: 1999,
    description: 'Teenage wizard in Poudlard.',
    dateAdded: 1616719908151,
  },
  {
    id: 'OL10434875U',
    title: 'Harry Potter 3',
    author: 'J.K Rowling',
    published: 2003,
    description: 'Grown up wizard after Poudlard.',
    dateAdded: 1616720009037,
  },
  {
    id: 'OL10434197K',
    title: 'Post Office',
    author: 'Charles Bukowski',
    published: 1971,
    description: 'Story of an unconventional postman',
    dateAdded: 1616719971604,
  },
  {
    id: 'OL10434334F',
    title: 'Into The Wild',
    author: 'Sean Penn',
    published: 2007,
    description:
      'After graduating from Emory University, top student and athlete Christopher McCandless abandons his possessions, gives his entire $24,000 savings account to charity and hitchhikes to Alaska to live in the wilderness. Along the way, Christopher encounters a series of characters that shape his life.',
    dateAdded: 1616720020058,
  },
];

export const sortOptions = {
  orderAdded: 'Order added',
  titleAscending: 'Title ascending',
  titleDescending: 'Title descending',
};

export default class BookManager extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      books: defaultBooks,
      OLID: '',
      sortOptions: sortOptions,
      currentSortOption: sortOptions.orderAdded,
    };
  }

  addBook = (newBook) => {
    const { books } = this.state;
    let bookInList = false;

    books.map((book) => {
      if (book.id == newBook.id) {
        bookInList = true;
        alert('Book already in list');
      }
    });

    if (!bookInList) {
      let updatedBooks = this.state.books.concat(newBook);
      this.setState({ books: updatedBooks });
    }

    this.sortBooks();
  };

  updateBookAuthor = (bookID, author) => {
    let updatedBooks = this.state.books;

    updatedBooks.map((book) => {
      if (book.id == bookID) {
        book.author = author;
      }
    });

    this.setState({ books: updatedBooks });
  };

  updateSortOption = (option) => {
    //Wait for setState to finish and call shortList()
    this.setState(
      {
        currentSortOption: option,
      },
      () => {
        this.sortBooks();
      },
    );
  };

  componentDidMount() {
    //Sort books on Mount
    this.sortBooks();
  }

  //Update books order
  sortBooks() {
    const { books, currentSortOption } = this.state;

    let sortedBooks = books;

    //Ascending sort
    if (currentSortOption == sortOptions.titleAscending) {
      sortedBooks.sort(function (a, b) {
        return a.title.localeCompare(b.title);
      });
    }
    //Descending sort
    else if (currentSortOption == sortOptions.titleDescending) {
      sortedBooks.sort(function (a, b) {
        return b.title.localeCompare(a.title);
      });
    }
    //orderAdded sort
    else {
      sortedBooks.sort(function (a, b) {
        return b.dateAdded - a.dateAdded;
      });
    }

    this.setState({ books: sortedBooks });
  }

  render() {
    const { books, currentSortOption, sortOptions } = this.state;

    return (
      <div className="container mb-5">
        <MainTitle />
        <SearchMenu
          addBook={this.addBook}
          updateBookAuthor={this.updateBookAuthor}
        />
        <SortBar
          currentSortOption={currentSortOption}
          sortOptions={sortOptions}
          updateSortOption={this.updateSortOption}
        />
        <BooksList
          //books={books}
          books={this.state.books}
          currentSortOption={currentSortOption}
          sortOptions={sortOptions}
        />
      </div>
    );
  }
}
