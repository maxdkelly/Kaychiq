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

import flick from '../utils/flick';

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

import gif from '../gifs/gif2.gif'


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

export const FlickFinishedDialog = props => {
  
    const classes = useStyles();
    const history = useHistory();


    const [token, setToken] = useState(props.token);
    const [show, setShow] = useState(props.show);
    const [losers, setLosers] = useState(props.losers);
    const [host, setHost] = useState(props.host)


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    

    useEffect(() => {
        setToken(props.token);
        setShow(props.show);
        setLosers(props.losers);
        setHost(props.host);
    
        
      
      }, [props.token, props.losers, props.show, props.host]);

    
    function handleBackToLobby(e) {

        flick.flickToLobby(token)
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
                     {losers[0]} and {losers[1]} must drink!
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
  

export default FlickFinishedDialog
