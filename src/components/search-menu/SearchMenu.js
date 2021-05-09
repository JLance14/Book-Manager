
import { useState } from "react";
import { fetchBook } from 'services/open-lib/fetch-service/fetch-service.js';
import { url_constants } from 'services/open-lib/fetch-service/ol-constants';


const SearchMenu = (props) => {

    const [olid, setOlid] = useState('');
    const [title, setTitle] = useState('No title available');
    const [author, setAuthor] = useState('No author available');
    const [published, setPublished] = useState(0);
    const [description, setDescription] = useState('No description available');
    const [dateAdded, setDateAdded] = useState(Date.now());

    let getBook = async (olid) => {
        let bookData = await fetchBook(olid)
        console.log(bookData)

        if (bookData) {
            updateBookProperties(bookData)
        }

        let newBook = {
            id: olid,
            title: title,
            author: author,
            published: published,
            description: description,
            dateAdded: dateAdded,
        };


        props.addBook(newBook);
    }

    let updateBookProperties = async (bookProperties) => {

        bookProperties.map(async (bookProperty) => {
            let propertyName = bookProperty[0];
            let propertyData = bookProperty[1];

            //Get book title
            if (propertyName == 'title') {
                setTitle(propertyData);
            }
            //Get book publishing year
            else if (propertyName == 'created') {
                let publishingYear = propertyData.value.substring(0, 4)
                setPublished(publishingYear);
            }
            //Get authors
            else if (propertyName == 'authors') {
                let bookKey = propertyData[0].key[0];

                //Only get OLID part of string
                let authorOLID = bookKey.slice(
                    url_constants.authorsStringPrefix.length,
                    bookKey.length,
                );
                //TODO - SET AUTHOR
            }
            //Get description
            else {
                setDescription(propertyData.value);
            }
        });

        setDateAdded(Date.now())
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