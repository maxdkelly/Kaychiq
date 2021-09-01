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

import gif from '../gifs/gif1.gif'


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
    const [host, setHost] = useState(props.host)

    const [num, setNum] = useState(props.num);


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    

    useEffect(() => {
        setToken(props.token);
        setShow(props.show);
        setLoser(props.loser);
        setHost(props.host);
        setNum(props.num);
        
      
      }, [props.token, props.loser, props.show, props.host, props.num]);

    
    function handleBackToLobby(e) {

        guess.guessToLobby(token)
        .then(
            history.push({
                pathname: "/createGame" ,
                token:token
            })
        )
        
    }
    return (
      <Dialog open={show} aria-labelledby="simple-dialog-title" fullWidth maxWidth="xs" style = {{"color": "#626f87"}}>
        <DialogTitle id="simple-dialog-title" style = {{"background-color": "#626f87"}}>
        <div className="medButtonText">Drinking Time!</div> 
        </DialogTitle>

        <List>
      
            <ListItem>
                <div className = "dialogText" >
                    {loser} guessed the correct number ({num}) and must drink!
                </div> 
            
            </ListItem>
          


        
        </List>

        <img style = {{"align-self":"center", "margin-bottom":"1rem"}} src={gif}/>  
        <Button style = {host ? {"background-color": "#3D3D90","align-self":"center", "max-width": "90%", "margin-bottom":"0.4rem"} : 
            {"display":"none"}}
                variant="contained"
                color="primary"
                onClick={e => handleBackToLobby(e)} 
              >
                  <div className="smallButtonText">Back To Lobby</div> 
        </Button>
         
        
       

    </Dialog>
        
    );

}
  

export default GuessFinishedDialog
