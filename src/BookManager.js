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

  return (
    <div className="container mb-5">
      <MainTitle />
      <SearchMenu />
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
