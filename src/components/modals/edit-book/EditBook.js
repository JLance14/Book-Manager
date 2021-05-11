import './style.css';
import { useState } from "react";
import { Fragment } from 'react';
import { Dialog } from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';

export const EditBook = (props) => {
  // const [olid, setOlid] = useState('');
  // const [title, setTitle] = useState('');
  // const [author, setAuthor] = useState('');
  // const [published, setPublished] = useState('');
  // const [description, setDescription] = useState('');
  // const [dateAdded, setDateAdded] = useState('');
  const [olid, setOlid] = useState(props.bookInfo.olid);
  const [title, setTitle] = useState(props.bookInfo.title);
  const [author, setAuthor] = useState(props.bookInfo.author);
  const [published, setPublished] = useState(props.bookInfo.published);
  const [description, setDescription] = useState(props.bookInfo.description);
  const [dateAdded, setDateAdded] = useState(props.bookInfo.dateAdded);

  let saveBookInfoModification = () => {

    //Book info after user modifications
    let updatedBook = {
      olid: olid,
      title: title,
      author: author,
      published: published,
      description: description,
      dateAdded: dateAdded,
    };

    props.editBookInfo(updatedBook);
    props.closeDialog();
  };

  return (
    <Fragment>
      <Dialog
        open={true}
        id="addBookDialog"
        fullWidth={true}
        maxWidth={'md'}
        aria-labelledby="form-dialog-title"
      >
        <h2 className="text-center mt-5 font-weight-bold">
          EDIT BOOK
          </h2>
        <DialogContent>
          <h5>ID: {olid}</h5>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            fullWidth
          />

          <TextField
            autoFocus
            margin="dense"
            id="author"
            label="Author"
            value={author}
            onChange={e => setAuthor(e.target.value)}
            fullWidth
          />

          <TextField
            autoFocus
            margin="dense"
            id="published"
            label="published"
            value={published}
            onChange={e => setPublished(e.target.value)}
            fullWidth
          />

          <TextField
            autoFocus
            margin="dense"
            id="description"
            className="mb-5"
            label="Description"
            rowsMax={Infinity}
            multiline={true}
            value={description}
            onChange={e => setDescription(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <button
            className="btn btn-primary mr-2"
            onClick={saveBookInfoModification}
          >
            Save
            </button>
          <button
            className="btn btn-danger"
            onClick={props.closeDialog}
          >
            Cancel
            </button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

export default EditBook;