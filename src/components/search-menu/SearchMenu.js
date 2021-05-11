
import { useState } from "react";
import { fetchBook, fetchAuthor } from 'services/open-lib/fetch-service/fetch-service.js';
import { url_constants } from 'services/open-lib/fetch-service/ol-constants';

const SearchMenu = (props) => {

    const [olid, setOlid] = useState('');

    let getBook = async (olid) => {
        let bookData = await fetchBook(olid)
        let bookProperties = await getBookProperties(bookData)
        props.addBook(bookProperties);
    }

    let getBookProperties = async (bookProperties) => {

        let book = {
            title: '',
            published: '',
            author: '',
            description: '',
            dateAdded: ''
        }

        await bookProperties.map(async (bookProperty) => {
            let propertyName = bookProperty[0];
            let propertyData = bookProperty[1];

            //Get book title
            if (propertyName == 'title') {
                book.title = propertyData
            }
            //Get book publishing year
            else if (propertyName == 'created') {
                let publishingYear = propertyData.value.substring(0, 4)
                book.published = publishingYear;
            }
            //Get author
            else if (propertyName == 'authors') {
                let authorEndpoint = propertyData[0].key;

                //Only get OLID part of string /authors/OLID
                let authorOLID = authorEndpoint.slice(
                    url_constants.authorsStringPrefix.length,
                    authorEndpoint.length,
                );
                book.author = await fetchAuthor(authorOLID);
            }
            //Get description
            else {
                book.description = propertyData;
            }
        });

        book.dateAdded = Date.now()
        book.olid = bookProperties.olid
        return book;
    };

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
                        onClick={() => getBook(olid)}
                    >
                        Add
                  </button>
                </div>
            </div>
        </div>
    );
}

export default SearchMenu;