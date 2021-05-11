import axios from 'axios';
import { url_constants, wanted_properties } from './ol-constants';

export const fetchBook = async (olid) => {

  //Open Library book URL
  //ex: https://openlibrary.org/books/ + OL10434104Z + .json
  let urlString = url_constants.booksURLPrefix + olid + url_constants.jsonExtension;

  let bookProperties = []

  //Fetch book using OLID
  await axios
    .get(urlString)
    .then((res) => {
      let bookData = res.data;

      //filter data to get key:value of desired book fields (ex: title, description, authors, created)
      let filteredData = Object.entries(
        bookData,
      ).filter((property) =>
        wanted_properties.includes(property[0]),
      );

      //Get value from desired book keys (ex: title, description, authors, created)
      Object.entries(filteredData).map((property) => {
        let bookProperty = property[1];

        bookProperties.push(bookProperty);
      });
    })
    .catch(() => {
      alert('Unable to get book information');
    });
  bookProperties.olid = olid;
  return bookProperties;
};

export const fetchAuthor = async (olid) => {

  //Open Library author URL
  //ex: https://openlibrary.org/authors/ + OL6548935A + .json
  let urlString =
    url_constants.authorsURLPrefix + olid + url_constants.jsonExtension;

  let authorName = ''

  //Fetch author
  await axios
    .get(urlString)
    .then((res) => {
      let authorInfo = res.data;
      if (authorInfo.name) {
        authorName = authorInfo.name;
      }
    })
    .catch(() => {
      alert('Unable to get book information');
      fetchSuccessful = false;
    });

  return authorName
};
