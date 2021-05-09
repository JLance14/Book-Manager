
import { useState } from "react";
import { fetchBook } from 'services/open-lib/fetch-service/fetch-service.js';


const SearchMenu = () => {

    const [olid, setOlid] = useState('');
    const [title, setTitle] = useState('No title available');
    const [author, setAuthor] = useState('No author available');
    const [published, setPublished] = useState(0);
    const [description, setDescription] = useState('No description available');
    const [dateAdded, setDateAdded] = useState(Date.now());

    let getBookInfo = async (olid) => {
        let bookData = await fetchBook(olid)
        console.log(bookData)

        //CALL all the setstate methods
    }

    return (
        <div className="search-menu">
            <div className="row">
                <div className="col-9 mb-2 text-center">
                    <h3>Add a book by Open Library ID Number</h3>
                </div>
            </div>

            <div className="row">
                <div className="col-9">
                    <input
                        type="text"
                        name="olid"
                        className="search-menu__add-book-input form-control text-center"
                        id="add_book_input"
                        aria-describedby="OLID"
                        placeholder="OLID"
                        value={olid}
                        onChange={e => setOlid(e.target.value)}
                    />
                </div>
                <div
                    className="search-menu__add-book-div col-3 d-flex align-items-center"
                >
                    <button
                        type="button"
                        className="search-menu__add-book-btn btn btn-primary px-5 offset-2 rounded-lg"
                        //TODO MANAGE FETCH
                        onClick={() => getBookInfo(olid)}
                    >
                        Add
                  </button>
                </div>
            </div>
        </div>
    );
}

export default SearchMenu;