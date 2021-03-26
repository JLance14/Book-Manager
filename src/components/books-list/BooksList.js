import './style.css';
import React from 'react';
import EditBook from 'components/modals/edit-book/EditBook';

export default class BooksList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      books: this.props.books,
      currentBook: {},
      isDialogShowing: false,
    };
  }

  componentDidUpdate() {
    if (this.state.books != this.props.books) {
      this.setState({
        books: this.props.books,
      });
    }
  }

  openDialog = (currentBook) => {
    this.setState({
      currentBook: currentBook,
      isDialogShowing: true,
    });
  };

  closeDialog = () => {
    this.setState({ isDialogShowing: false });
  };

  editBookInfo = (modifiedBook) => {
    console.log('MODIFIED BOOK', modifiedBook);

    let updatedBooks = this.state.books;

    updatedBooks.map((book, index) => {
      if (book.id == modifiedBook.id) {
        updatedBooks[index] = modifiedBook;
      }
    });

    this.setState({ books: updatedBooks });
  };

  render() {
    const { currentBook } = this.state;

    return (
      <>
        {this.state.isDialogShowing ? (
          <EditBook
            closeDialog={this.closeDialog}
            bookInfo={currentBook}
            editBookInfo={this.editBookInfo}
          />
        ) : (
          ''
        )}
        {this.state.books.length > 0 &&
          this.state.books.map((book, index) => (
            <div
              className="card book_list_element text-center"
              key={index}
              onClick={() => this.openDialog(book)}
            >
              <div className="card-body">
                <div className="row">
                  <div className="col-4">
                    <h5 className="card-title">
                      {book.title} ({book.published})
                    </h5>
                  </div>
                  <div className="offset-4 col-3">
                    <h5 className="card-text">{book.author}</h5>
                  </div>
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
}
