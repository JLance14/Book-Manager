import { useState } from "react";
import './style.css';
import MainTitle from 'components/main-title/MainTitle';
import SearchMenu from 'components/search-menu/SearchMenu';
import BooksList from 'components/books-list/BooksList';
import { orderObjectsService } from 'services/global/order-objects';
import { sortOptions } from 'constants/constants';
// import SortBar from 'components/sort-bar/SortBar';


const BookManager = () => {

  const [books, setBooks] = useState([]);
  //const [olid, setOlid] = useState("");
  //const [sortOptions, setSortOptions] = useState({});
  //const [sortOption, setSortOption] = useState("");

  let addBook = (newBook) => {

    let bookInList = false;
    let bookIsValid = newBook && newBook.olid && newBook.olid !== undefined

    //Verifies that book isn't already in books array
    books.map((book) => {
      if (book.olid == newBook.olid) {
        bookInList = true;
      }
    });

    //Add book if not already in list
    if (!bookInList) {
      bookIsValid && setBooks(books => [...books, newBook]);
    } else {
      alert('This book is already in the list');
    }

    //TODO - implement sort
    //this.sortBooks();
  };

  return (
    <div className="container mb-5">
      <MainTitle />
      <SearchMenu addBook={addBook} />
      {/* <SortBar
        currentSortOption={sortOption}
        updateSortOption={setSortOption}
      /> */}
      <BooksList
        books={books}
      //currentSortOption={currentSortOption}
      //sortOptions={sortOptions}
      />
    </div>
  );
}

export default BookManager;
