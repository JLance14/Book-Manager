import React from 'react';
import axios from 'axios';

export const openLib = {
  worksURLPrefix: 'https://openlibrary.org/works/',
  authorsURLPrefix: 'https://openlibrary.org/authors/',
  authorsStringPrefix: '/authors/',
  suffix: '.json',
};

export default class SearchMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      olid: '',
      title: 'No title available',
      author: 'No author available',
      published: 0,
      description: 'No description available',
      dateAdded: Date.now(),
    };
  }

  handleUserInput = (event) => {
    this.setState({ olid: event.target.value });
  };

  fetchBookInfo = async () => {
    //Open Library book URL
    let urlString =
      openLib.worksURLPrefix + this.state.olid + openLib.suffix;

    let fetchSuccessful = true;

    //Fetch book using OLID
    await axios
      .get(urlString)
      .then((res) => {
        let bookData = res.data;

        const wantedProperties = [
          'title',
          'authors',
          'description',
          'created',
        ];

        let filteredData = Object.entries(
          bookData,
        ).filter((property) =>
          wantedProperties.includes(property[0]),
        );

        let bookProperties = [];

        Object.entries(filteredData).map((property) => {
          let bookProperty = property[1];

          bookProperties.push(bookProperty);
        });

        this.updatePropertyValues(filteredData);
      })
      .catch(() => {
        alert('Unable to get book information');
        fetchSuccessful = false;
      });

    if (fetchSuccessful) {
      const {
        olid,
        title,
        author,
        published,
        description,
        dateAdded,
      } = this.state;

      let newBook = {
        id: olid,
        title: title,
        author: author,
        published: published,
        description: description,
        dateAdded: dateAdded,
      };

      this.props.addBook(newBook);
    }
  };

  updatePropertyValues = async (bookProperties) => {
    let title = this.state.title;
    let author = this.state.author;
    let published = this.state.published;
    let description = this.state.description;

    bookProperties.map(async (bookProperty) => {
      let propertyName = bookProperty[0];
      let propertyData = bookProperty[1];

      //Get book title
      if (propertyName == 'title') {
        title = propertyData;
      }
      //Get book publishing year
      else if (propertyName == 'created') {
        published = propertyData.value.substring(0, 4);
      }
      //Get authors
      else if (propertyName == 'authors') {
        let bookKey = propertyData[0].author.key;
        let authorOLID = bookKey.slice(
          openLib.authorsStringPrefix.length,
          bookKey.length,
        );

        this.fetchAuthorName(authorOLID),
          (authorName) => {
            this.props.updateBookAuthor(this.state.olid, authorName);
          };
      }
      //Get description
      else {
        description = propertyData.value;
      }
    });

    this.setState({
      title: title,
      author: author,
      published: published,
      description: description,
      dateAdded: Date.now(),
    });
  };

  async fetchAuthorName(authorOLID) {
    let urlString =
      openLib.authorsURLPrefix + authorOLID + openLib.suffix;

    axios
      .get(urlString)
      .then((res) => {
        let authorName = res.data.name;
        this.setState({ author: authorName }),
          () => {
            return authorName;
          };
      })
      .catch(() => {});
  }

  render() {
    return (
      <>
        <div className="row">
          <div className="col-9 mb-2 text-center">
            <h3>Add a book by Open Library ID Number</h3>
          </div>
        </div>

        <div className="row">
          <div className="col-9">
            <input
              type="text"
              className="form-control text-center"
              id="add_book_input"
              aria-describedby="OLID"
              placeholder="OLID"
              value={this.state.olid}
              onChange={this.handleUserInput}
            />
          </div>
          <div
            className="col-3 d-flex align-items-center"
            id="add_book"
          >
            <button
              type="button"
              className="btn btn-primary px-5 offset-2 rounded-lg"
              id="add_book_btn"
              onClick={this.fetchBookInfo}
            >
              Add
            </button>
          </div>
        </div>
      </>
    );
  }
}
