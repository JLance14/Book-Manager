import axios from 'axios';
import { url_constants, wanted_properties } from './constants/constants';

export const fetchBookService = async (olid, authors, setAuthors) => {

    //ex: https://openlibrary.org/books/ + OL10434104Z + .json
    let urlString = url_constants.booksURLPrefix + olid + url_constants.jsonExtension;

    let bookProperties = []
    let bookData = []
    let filteredData = []
    let bookProperty = []
    let propertyName = []
    let propertyValue = []

    //Fetch book using OLID
    await axios
        .get(urlString)
        .then(async (res) => {
            bookData = res.data;

            //filter data to get key:value of desired book fields (ex: title, description, authors, created)
            filteredData = Object.entries(
                bookData,
            ).filter((property) =>
                wanted_properties.includes(property[0]),
            );

            //Get value from desired book keys (ex: title, description, authors, created)
            Object.entries(filteredData).map((property) => {
                bookProperty = property[1];
                propertyName = bookProperty[0];
                propertyValue = bookProperty[1]
                if (propertyName === "description" && propertyValue.value) {
                    bookProperty[1] = propertyValue.value
                }
                bookProperties.push(bookProperty);
            });

            bookProperties.map((bookProperty) => {
                propertyName = bookProperty[0]
                if (propertyName === "authors") {

                    let authorEndpoint = bookProperty[1][0].key
                    //Only get OLID part of string /authors/OLID

                    let authorOLID = authorEndpoint.slice(
                        url_constants.authorsStringPrefix.length,
                        authorEndpoint.length,
                    );

                    fetchAuthorService(authorOLID).then((author) => {
                        setAuthors({ ...authors, [olid]: author })
                    })
                }
            })

        })
        .catch(() => {
            alert('Unable to get book information');
        });
    bookProperties.olid = olid;
    return bookProperties;
};

export const fetchAuthorService = async (olid) => {

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
        });

    return authorName
};