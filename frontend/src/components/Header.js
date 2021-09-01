import React from 'react'
import '../StyleSheets/Title.css';
import { useHistory } from 'react-router';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);

export const Header = props =>  {

  const history = useHistory();

  const classes = useStyles();
  return (
    // <div className="Title">
    //   <h1>Kaychiq</h1>
    // </div>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h5" className={classes.title} onClick = {() => history.push("/")}>
          Kaychiq
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Header
