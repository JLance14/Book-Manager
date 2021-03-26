import React from 'react';
import axios from 'axios';

export const openLibUrl = {
  prefix: 'https://openlibrary.org/works/',
  suffix: '.json',
};

export default class SearchMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = { olid: '' };

    this.handleUserInput = this.handleUserInput.bind(this);
    this.fetchBookInfo = this.fetchBookInfo.bind(this);
  }

  handleUserInput(event) {
    this.setState({ olid: event.target.value });
  }

  fetchBookInfo() {
    let urlString =
      openLibUrl.prefix + this.state.olid + openLibUrl.suffix;

    console.log(urlString);

    axios
      .get(urlString)
      .then((res) => {
        let bookData = res.data;

        const requiredInfo = [
          'title',
          'description',
          'authors',
          'created',
        ];

        let filteredData = Object.entries(
          bookData,
        ).filter((property) => requiredInfo.includes(property[0]));

        //title =
        //publishingYear =
        //author =
        //description =

        let newBook = {
          title: '',
          publishingYear: 0,
          author: '',
          description: '',
        };

        let bookProperties = [];

        Object.entries(filteredData).map((property) => {
          let bookProperty = property[1];

          bookProperties.push(bookProperty);
        });

        let newData = this.formatPropertyValues(filteredData);

        console.log('NEW FILTER', newData);

        this.props.addBook(filteredData);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  formatPropertyValues(bookProperties) {
    bookProperties.map((bookProperty) => {
      let propertyName = bookProperty[0];
      let propertyData = bookProperty[1];

      if (propertyName == 'created') {
        bookProperty[1] = propertyData.value;
      } else if (propertyName == 'authors') {
        let bookKey = propertyData[0].author.key;

        let authorsStringPrefix = '/authors/';
        let OLID = bookKey.slice(
          authorsStringPrefix.length,
          bookKey.length,
        );

        console.log('FETCHING AUTHOR NAME');

        let test = this.fetchAuthorName(OLID);

        console.log('FETCHED AUTHOR NAME', test);
      } else if (propertyName == 'description') {
      }
    });

    console.log(bookProperties);

    return bookProperties;
  }

  fetchAuthorName(OLID) {
    let urlString = openLibUrl.prefix + OLID + openLibUrl.suffix;

    //TODO - replace by urlString
    axios
      .get('https://openlibrary.org/works/OL10434636W.json')
      .then((res) => {
        console.log('res', res);
        return res;
      })
      .catch((error) => {
        console.log(error);
      });
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
