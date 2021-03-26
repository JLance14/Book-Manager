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

  openDialog = (currentBook) => {
    this.setState({
      currentBook: currentBook,
      isDialogShowing: true,
    });
  };

  closeDialog = () => {
    this.setState({ isDialogShowing: false });
  };

  render() {
    const { currentBook } = this.state;

    return (
      this.state.books.length > 0 &&
      this.state.books.map((book, index) => {
        return (
          <div
            className="card book_list_element text-center"
            key={index}
            onClick={() => this.openDialog(book)}
          >
            <div className="card-body">
              <div className="row">
                {this.state.isDialogShowing ? (
                  <EditBook
                    closeDialog={this.closeDialog}
                    bookInfo={currentBook}
                  />
                ) : (
                  ''
                )}
                <div className="col-4">
                  <h5 className="card-title">{book.title}</h5>
                </div>
                <div className="offset-4 col-3">
                  <h5 className="card-text">Author</h5>
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
        );
      })
    );
  }
}
