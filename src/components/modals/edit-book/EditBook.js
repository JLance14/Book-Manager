import React from 'react';
import './style.css';
import { Fragment } from 'react';
import { Dialog, Button } from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

export default class EditBook extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.bookInfo.id,
      title: props.bookInfo.title,
      published: props.bookInfo.published,
      author: props.bookInfo.author,
      description: props.bookInfo.description,
      dateAdded: props.bookInfo.dateAdded,
    };
  }

  //Assign new values for book properties
  handleUserInput = (event, field) => {
    this.setState({ [field]: event.target.value });
  };

  saveBookInfoModification = () => {
    const {
      id,
      title,
      author,
      published,
      description,
      dateAdded,
    } = this.state;

    //Book after user modifications
    let updatedBook = {
      id: id,
      title: title,
      author: author,
      published: published,
      description: description,
      dateAdded: dateAdded,
    };

    this.props.editBookInfo(updatedBook);
    this.props.closeDialog();
  };

  render() {
    const { id, title, author, published, description } = this.state;

    return (
      <Fragment>
        <Dialog
          open={true}
          id="addWalletDialog"
          fullWidth={true}
          maxWidth={'md'}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle className="text-center" id="form-dialog-title">
            Book Info
          </DialogTitle>
          <DialogContent>
            <h5>ID: {id}</h5>
            <TextField
              autoFocus
              margin="dense"
              id="title"
              label="Title"
              value={title}
              onChange={(e) => this.handleUserInput(e, 'title')}
              fullWidth
            />

            <TextField
              autoFocus
              margin="dense"
              id="author"
              label="Author"
              value={author}
              onChange={(e) => this.handleUserInput(e, 'author')}
              fullWidth
            />

            <TextField
              autoFocus
              margin="dense"
              id="published"
              label="published"
              value={published}
              onChange={(e) => this.handleUserInput(e, 'published')}
              fullWidth
            />

            <TextField
              autoFocus
              margin="dense"
              id="description"
              label="Description"
              rowsMax={Infinity}
              multiline={true}
              value={description}
              onChange={(e) => this.handleUserInput(e, 'description')}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.saveBookInfoModification}
              color="primary"
            >
              Save
            </Button>
            <Button
              onClick={this.props.closeDialog}
              color={'secondary'}
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}
