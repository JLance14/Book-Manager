import { useEffect, useState } from "react";
import './style.css';
import MainTitle from 'components/main-title/MainTitle';
import SearchMenu from 'components/search-menu/SearchMenu';
// import BooksList from 'components/books-list/BooksList';
// import SortBar from 'components/sort-bar/SortBar';
//import {sortOptions} from 'constants/constants.js';


const BookManager = () => {

  const [books, setBooks] = useState([]);
  const [olid, setOlid] = useState("");
  const [sortOptions, setSortOptions] = useState({});
  const [sortOption, setSortOption] = useState("");

  let addBook = (newBook) => {

    console.log("Inside addBook")

    let bookInList = false;

    books.map((book) => {
      if (book.id == newBook.id) {
        bookInList = true;
        alert('This book is already in the list');
      }
    });

    if (!bookInList) {
      console.log("NEW BOOK")
      console.log(newBook)
      setBooks(books => [...books, newBook]);
      console.log("BOOKSSS")
      console.log(books)
      //TODO - remove setstate
      //this.setState({ books: updatedBooks });
    }

    //TODO - implement sort
    //this.sortBooks();
  };

  return (
    <div className="container mb-5">
      <MainTitle />
      <SearchMenu addBook={addBook} />
      {/* <SortBar
        currentSortOption={currentSortOption}
        sortOptions={sortOptions}
        updateSortOption={this.updateSortOption}
      />
      <BooksList
        //books={books}
        books={this.state.books}
        currentSortOption={currentSortOption}
        sortOptions={sortOptions}
      /> */}
    </div>
  );
}

export default BookManager;
