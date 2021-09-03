import React from 'react'
import '../StyleSheets/Title.css';
import { useHistory } from 'react-router-dom';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import general from '../utils/general';


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

  const handleClick = () => {

    
    general.leaveGame(general.getToken());
    console.log('hey')
   
    general.removeToken();
    window.location.reload();
  }


  return (
    // <div className="Title">
    //   <h1>Kaychiq</h1>
    // </div>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h5" className={classes.title} onClick = {() => history.push("/")}>
          Kaychiq
        </Typography>
        <div className = {general.hasToken() ? "" : "hidden"}>
          <Button  color="inherit" onClick = {() => handleClick()}>Leave Game</Button>

        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Header
