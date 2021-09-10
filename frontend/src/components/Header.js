import React, {useState, useRef} from 'react'
import '../StyleSheets/Title.css';
import ReactDOM from "react-dom";
import { useHistory } from 'react-router-dom';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import general from '../utils/general';

import Rules from './Rules';

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
  const [rulesShow, setRulesShow] = useState(false);
  const handleRulesClose = () => setRulesShow(false);

  const [body, setBody] = useState([]);
  const [title, setTitle] = useState("");


  const rulesDialog = useRef(<div></div>);
  const handleClick = () => {

    general.removeRules();
    general.leaveGame(general.getToken());
    console.log('hey')
   
    general.removeToken();
    window.location.reload();
  }

  const handleRulesClick = () => {

    setBody(general.getBody());
    setTitle(general.getTitle());
    
    setRulesShow(true);
  }


  return (
    // <div className="Title">
    //   <h1>Kaychiq</h1>
    // </div>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h5" className={classes.title} onClick = {() => {general.removeRules();history.push("/")}}>
          Kaychiq
        </Typography>
        <div className = {general.hasRules() ? "" : "hidden"}>
          <Button  color="inherit" onClick = {() => handleRulesClick()}>Rules</Button>

        </div>
        <div className = {general.hasToken() ? "" : "hidden"}>
          <Button  color="inherit" onClick = {() => handleClick()}>Leave Game</Button>

        </div>

    
      </Toolbar>
      <Rules body = {body} title = {title} show = {rulesShow} handleClose = {handleRulesClose}/>
    </AppBar>
  )
}

export default Header
