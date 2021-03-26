import React from 'react';
import './style.css';
import MainTitle from 'components/main-title/MainTitle';
import SearchMenu from 'components/search-menu/SearchMenu';
import BooksList from 'components/books-list/BooksList';
import SortBar from 'components/sort-bar/SortBar';

export const defaultBooks = [
  {
    id: 'OL10434104Z',
    title: "Harry Potter and the Philosopher's Stone",
    author: 'J.K Rowling',
    published: 2001,
    description:
      'Harry Potter, an eleven-year-old orphan, discovers that he is a wizard and is invited to study at Hogwarts. Even as he escapes a dreary life and enters a world of magic, he finds trouble awaiting him.',
    dateAdded: 1616719846821,
  },
  {
    id: 'OL10434503M',
    title: 'The Lord of the Rings: The Fellowship of the Ring',
    author: 'J. R. R. Tolkien',
    published: 2001,
    description: 'Teenage wizard in Poudlard.',
    dateAdded: 1616719908151,
  },
  {
    id: 'OL10434875U',
    title:
      "The Push: A Climber's Journey of Endurance, Risk, and Going Beyond Limits",
    author: 'Tommy Caldwell',
    published: 2017,
    description:
      'The Push is an arresting story of focus, drive, motivation, endurance, and transformation, a book that will appeal to anyone seeking to overcome fear and doubt, cultivate perseverance, turn failure into growth, and find connection with family and with the natural world.',
    dateAdded: 1616720009037,
  },
  {
    id: 'OL10434197K',
    title: 'Post Office',
    author: 'Charles Bukowski',
    published: 1971,
    description:
      "Post Office introduces Bukowski's autobiographical alter-ego, Henry Chinaski. It covers the period of Bukowski's life from about 1952 to his resignation from the United States Postal Service three years later, to his return in 1958 and then to his final resignation in 1969.",
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
        alert('This book is already in the list');
      }
    });

    if (!bookInList) {
      let updatedBooks = this.state.books.concat(newBook);
      this.setState({ books: updatedBooks });
    }

    this.sortBooks();
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
        <SearchMenu addBook={this.addBook} />
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
