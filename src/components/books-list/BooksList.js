import { useState } from "react";
import './style.css';
import EditBook from 'components/modals/edit-book/EditBook';

export const BooksList = (props) => {
    const [selectedBook, setSelectedBook] = useState({})
    const [isDialogShowing, setIsDialogShowing] = useState(false)

    let openDialog = (currentBook) => {
        setSelectedBook(currentBook);
        setIsDialogShowing(true);
    };

    let closeDialog = () => {
        setSelectedBook({});
        setIsDialogShowing(false);
    };

    //TODO - inject as a service
    let editBookInfo = (modifiedBook) => {
        let updatedBooks = books;

        updatedBooks.map((book, index) => {
            if (book.olid == modifiedBook.olid) {
                updatedBooks[index] = modifiedBook;
            }
        });

        props.setBooks(updatedBooks);
    };

    const { books, authors } = props;

    return (
        <>
            {isDialogShowing && (
                <EditBook
                    closeDialog={closeDialog}
                    bookInfo={selectedBook}
                    editBookInfo={editBookInfo}
                />
            )}
            {books.length > 0 &&
                books.map((book, index) => (
                    <div
                        className="card book_list_element text-center"
                        key={index}
                        onClick={() => openDialog(book)}
                    >
                        <div className="card-body">
                            <div className="row">
                                <div className="col-4">
                                    <h5 className="card-title">
                                        {book.title} ({book.published})
                                    </h5>
                                </div>
                                {/* display authors if exist */}
                                {authors && authors[book.olid] && (
                                    <div className="offset-2 col-3">
                                        <h5 className="card-text">{authors[book.olid]}</h5>
                                    </div>
                                )}
                            </div>

                            <div className="row">
                                <div className="col-12">
                                    <p className="card-text text-left ml-4">
                                        {book.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
        </>
    );
}

export default BooksList;