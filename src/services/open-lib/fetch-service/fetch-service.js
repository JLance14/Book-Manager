import axios from 'axios';
import { url_constants, wanted_properties } from './ol-constants';

export const fetchBook = async (olid) => {

  //Open Library book URL
  //ex: https://openlibrary.org/books/ + OL10434104Z + .json
  let urlString = url_constants.worksURLPrefix + olid + url_constants.suffix;
  let fetchSuccessful = true;

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

      let bookProperties = [];

      //Get value from desired book keys (ex: title, description, authors, created)
      Object.entries(filteredData).map((property) => {
        let bookProperty = property[1];

        bookProperties.push(bookProperty);
      });

      return bookProperties;
    })
    .catch(() => {
      alert('Unable to get book information');
      fetchSuccessful = false;
    });
};

//TODO - fetch author info
export const fetchAuthor = async (url, bookProperties) => {
  //Open Library book URL
  // let urlString =
  //   openLib.worksURLPrefix + this.state.olid + openLib.suffix;

  let fetchSuccessful = true;

  //Fetch author
  await axios
    .get(url)
    .then((res) => {

    })
    .catch(() => {
      alert('Unable to get book information');
      fetchSuccessful = false;
    });
};
