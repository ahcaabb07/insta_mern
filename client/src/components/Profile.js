import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
const useStyle = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  headerWrappper: {
    display: "flex",
    alignItems: "center",
    minHeight: 300,
    padding: "0 50px 0 50px",
    boxShadow: "0 0 10px 0px rgba(0,0,0,0.2) !important",
  },
  avatar: {
    width: 100,
    height: 100,
  },
  rightHeaderSide: {
    marginLeft: 90,
    flex: 1,
  },
  userStat: {
    "& > span": {
      paddingRight: 20,
      fontWeight: "bold",
    },
  },
  profileBody: {
    "& > .MuiGrid-spacing-xs-3 > .MuiGrid-item": {
      padding: 2,
    },
    width: "99%",
    margin: "0 auto",
    marginTop: 50,
    // maxWidth: "100vw",
  },
  paper: {
    "& > img": {
      maxHeight: 350,
    },
    borderRadius: 0,
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    // boxShadow: "none !important",
  },
}));
export default function Profile() {
  const classes = useStyle();
  return (
    <div className={classes.root}>
      <div className={classes.headerWrappper}>
        <div className={classes.avtar}>
          <Avatar src='/Purpal.png' style={{ width: 200, height: 200 }} />
        </div>
        <div className={classes.rightHeaderSide}>
          <div className={classes.userStat}>
            <h1>Youssef Achaab</h1>
            <span>80 Posts</span>
            <span>11 Followers</span>
            <span>100 Following</span>
          </div>
          <div className={classes.userInfo}>
            <p>Somthing goes here</p>
            <p>www.achaab.com</p>
          </div>
        </div>
      </div>
      <div className={classes.profileBody}>
        <Grid container spacing={3}>
          <Grid item xs>
            <Paper className={classes.paper}>
              <img src='/FB_IMG_15913950995292511.jpg' alt='' />
            </Paper>
          </Grid>
          <Grid item xs>
            <Paper className={classes.paper}>
              <img src='/FB_IMG_15913950995292511.jpg' alt='' />
            </Paper>
          </Grid>
          <Grid item xs>
            <Paper className={classes.paper}>
              <img src='/FB_IMG_15913950995292511.jpg' alt='' />
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
