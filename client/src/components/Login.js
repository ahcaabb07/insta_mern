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
import VpnKey from "@material-ui/icons/VpnKey";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
// @CSS STYLE
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
}));

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const handleClose = () => {
    open ? setOpen(false) : setOpen(true);
  };
  const history = useHistory();

  // @LOGIN HANDLER
  const loginHandler = () => {
    fetch("/login", {
      method: "post",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((user) => user.json())
      .then((data) => {
        if (data.err) {
          setOpen(true);
          setError(data.err);
        } else {
          localStorage.setItem("jwt", data.user.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          history.push("/");
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
              <VpnKey />
            </Avatar>
          }
          title={<h3>Login</h3>}
        />
        <CardContent className={classes.CradContent}>
          <form className='' noValidate autoComplete='off'>
            <TextField
              className={classes.Input}
              id='standard-basic'
              label='Email'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              className={classes.Input}
              id='standard-basic'
              label='Password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </form>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton className={classes.expand} onClick={loginHandler}>
            <Send className={classes.signupBtn} />
          </IconButton>
        </CardActions>
        <Link className={classes.Link} to='/Signup'>
          <p>Doesn't have account?</p>
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
