import React, { useEffect, useState, useRef } from 'react'
import '../StyleSheets/Title.css';
import general from '../utils/general';

import { makeStyles } from '@material-ui/core/styles';

import guess from '../utils/guess';
import { useHistory } from "react-router-dom";




import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';

import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';



import apple from '../soju/apple.png'
import grapefruit from '../soju/grapefruit.png'
import original from '../soju/original.png'
import peach from '../soju/peach.png'
import plum from '../soju/plum.png'
import strawberry from '../soju/strawberry.png'
import watermelon from '../soju/watermelon.png'
import lychee from '../soju/lychee.png'

import Dialog from '@material-ui/core/Dialog';

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'



const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      height: 100,
      width: 140,
    },
    control: {
      padding: theme.spacing(2),
    },
  }));

export const GuessFinishedDialog = props => {
  
    const classes = useStyles();
    const history = useHistory();


    const [token, setToken] = useState(props.token);
    const [show, setShow] = useState(props.show);
    const [loser, setLoser] = useState(props.loser);
    const [host, setHost] = useState(props.host);

    const [gif, setGif] = useState(props.gif)

    const [num, setNum] = useState(props.num);


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    useEffect(() => {
      setGif(props.gif)
    }, [props.gif])
    
    useEffect(() => {
        setToken(props.token);
        setShow(props.show);
        setLoser(props.loser);
        setHost(props.host);
        setNum(props.num);
        
      
      }, [props.token, props.loser, props.show, props.host, props.num]);

    
    function handleBackToLobby(e) {
        general.removeRules();

        guess.guessToLobby(token)
        .then(
            history.push({
                pathname: "/createGame" ,
                token:token
            })
        )
        
    }
    return (
      <Dialog open={show} aria-labelledby="simple-dialog-title" fullWidth maxWidth="xs" style = {{"color": "#D2D2CF"}}>
        <DialogTitle id="simple-dialog-title" style = {{"background-color": "#626f87"}}>
        <div className="medButtonText">Drinking Time!</div> 
        </DialogTitle>

        <div style = {{"background-color": "#D2D2CF",  "vertical-align": "middle",
                                "color": "#293242"}}>

          <List>
      
              <ListItem>
                  <div className = "dialogText" >
                      {loser} guessed the correct number ({num}) and must drink!
                  </div> 
              
              </ListItem>
            


          
          </List>

          <img style = {{
            "display" : "block",
            "align-self":"center", 
            "margin-bottom":"1rem",
            "margin-left": "auto",
            "margin-right": "auto",

          }} src={gif}/>  
          <Button style = {host ? {"background-color": "#3D3D90", "max-width": "90%", "display" : "block",
            "align-self":"center", 
            "margin-bottom":"1rem",
            "margin-left": "auto",
            "margin-right": "auto"} : 
              {"display":"none"}}
                  variant="contained"
                  color="primary"
                  onClick={e => handleBackToLobby(e)} 
                >
                    <div className="smallButtonText">Back To Lobby</div> 
          </Button>
          
          
          
        </div> 
        
         
        
       

    </Dialog>
        
    );

}
  

export default GuessFinishedDialog
