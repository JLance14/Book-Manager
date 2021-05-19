
import { useState } from "react";
import { fetchBookService, fetchAuthorService } from 'services/open-lib/fetch-service/fetch-service';
import { url_constants } from 'services/open-lib/fetch-service/constants/constants';

const SearchMenu = (props) => {

    const [olid, setOlid] = useState('');

    let getBook = async (olid) => {
        let bookData = await fetchBookService(olid, props.authors, props.setAuthors)
        let bookProperties = await getBookProperties(bookData)
        props.addBook(bookProperties);
    }

    let getBookPropertyData = async (bookProperty, book) => {
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

        else if (propertyName == 'authors') {
            book.author = await fetchPropertyData(bookProperty, book)
        }

        //Get description
        else if (propertyName == 'description') {
            book.description = propertyData;
        }
        return book;
    }

    let fetchPropertyData = async (bookProperty, book) => {
        //Get author
        let propertyData = bookProperty[1];
        let authorEndpoint = propertyData[0].key;

        //Only get OLID part of string /authors/OLID
        let authorOLID = authorEndpoint.slice(
            url_constants.authorsStringPrefix.length,
            authorEndpoint.length,
        );
        fetchAuthorService(authorOLID).then((res) => {
            book.author = res;
        })
        return book.author;
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
            getBookPropertyData(bookProperty, book)

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