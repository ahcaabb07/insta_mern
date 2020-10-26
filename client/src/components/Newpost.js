import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import CardHeader from "@material-ui/core/CardHeader";
import TextField from "@material-ui/core/TextField";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Send from "@material-ui/icons/Send";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles(() => ({
  container: {
    margin: "0 auto",
    paddingTop: "20px",
    width: "90vw",
    height: "80vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  root: {
    width: "30%",
    minWidth: 345,
    minHeight: 400,
    boxShadow: "0px 0px 6px 0px rgba(0,0,0,0.2) !important",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    color: "blue",
    marginTop: "-40px",
    marginBottom: "20px",
    padding: "20px",
    margin: "auto",
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: "blue",
  },
  CradContent: {
    display: "flex",
    alignItems: "center",
    height: "250px",
  },
  Input: {
    marginBottom: 20,
    width: "90%",
  },
  signupBtn: {
    fontSize: 35,
  },
  errToast: {
    "& > .MuiSnackbarContent-root": {
      background: "red",
    },
  },
}));

export default function Newpost() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const handleClose = () => {
    open ? setOpen(false) : setOpen(true);
  };
  const postHandler = () => {
    fetch("/newPost", {
      method: "post",
      headers: {
        "Content-Type": "Application/json",
        Authorization: localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        title: title,
        body: body,
      }),
    })
      .then((res) => res.json())
      .then((post) => {
        if (post.err) {
          setOpen(true);
          setError(post.err);
        }
      });
  };
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Card className={classes.root}>
        <CardHeader title={<h3>Create New Post</h3>} />
        <CardContent className={classes.CradContent}>
          <form className='' noValidate autoComplete='off'>
            <TextField
              className={classes.Input}
              id='standard-basic'
              label='Ttile'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <TextField
              className={classes.Input}
              id='standard-basic'
              label='Body'
              multiline
              rows={4}
              placeholder="what's in your mind"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
            />

            <Button color='primary' variant='contained' component='label'>
              File
              <input type='file' style={{ visibility: "hidden" }} />
            </Button>
          </form>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton className={classes.expand} onClick={postHandler}>
            <Send className={classes.signupBtn} />
          </IconButton>
        </CardActions>
      </Card>
      <div>
        <Snackbar
          className={classes.errToast}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={open}
          autoHideDuration={4000}
          onClose={handleClose}
          message={error}
          action={
            <React.Fragment>
              <IconButton
                size='small'
                aria-label='close'
                color='inherit'
                onClick={handleClose}>
                <CloseIcon fontSize='small' />
              </IconButton>
            </React.Fragment>
          }
        />
      </div>
    </div>
  );
}
