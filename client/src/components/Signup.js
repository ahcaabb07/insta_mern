import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import TextField from "@material-ui/core/TextField";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Send from "@material-ui/icons/Send";
import AddUser from "@material-ui/icons/PersonAdd";
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
  Link: {
    color: "black",
    fontWeight: "500",
    textDecoration: "none",
    textAlign: "center",
  },
  errToast: {
    "& > .MuiSnackbarContent-root": {
      background: "red",
    },
  },
}));

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [succErr, setSuccErr] = useState("");
  const history = useHistory();
  const handleClose = () => {
    open ? setOpen(false) : setOpen(true);
  };
  const signupHandler = () => {
    fetch("/insert", {
      method: "post",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    })
      .then((user) => user.json())
      .then((data) => {
        if (data.err) {
          console.log();
          setOpen(true);
          setSuccErr(data.err);
        } else {
          history.push("/login");
          setName("");
          setEmail("");
          setPassword("");
        }
      })
      .catch((err) => console.log(err));
  };

  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label='recipe' className={classes.avatar}>
              <AddUser />
            </Avatar>
          }
          title={<h3>Signup</h3>}
        />
        <CardContent className={classes.CradContent}>
          <form className='' noValidate autoComplete='off'>
            <TextField
              className={classes.Input}
              label='Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <TextField
              className={classes.Input}
              type='text'
              label='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              className={classes.Input}
              label='Password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </form>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton className={classes.expand} onClick={signupHandler}>
            <Send className={classes.signupBtn} />
          </IconButton>
        </CardActions>
        <Link className={classes.Link} to='/Login'>
          <p>Already have account?</p>
        </Link>
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
          message={succErr}
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
