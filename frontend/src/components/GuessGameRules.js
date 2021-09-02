import React, { useEffect, useState, useRef } from 'react'
import '../StyleSheets/Title.css';
import general from '../utils/general';

import { makeStyles } from '@material-ui/core/styles';

import guess from '../utils/guess';



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

export const GuessGameRules = props => {
  
    const classes = useStyles();

   
    const [show, setShow] = useState(props.show);

    const handleClose = () => {
        props.handleClose();
        setShow(false);
    }
    const handleShow = () => setShow(true);
    const [guessError, setGuessError] = useState(false);

  

    useEffect(() => {
        
        setShow(props.show);
       
        
      
      }, [props.show]);

   
    
    return (
      <Dialog open={show} aria-labelledby="simple-dialog-title" fullWidth maxWidth="xs" style = {{"color": "#626f87"}}>
        <DialogTitle id="simple-dialog-title" style = {{"background-color": "#626f87"}}>
          
        <Grid style={{"max-height":"10%"}} container spacing={3} justifyContent = "flex-end">
                  <Grid item xs style = {{"max-width" : "100%"}}>
                   <div className="medButtonText">Guess The Soju Bottle No. Rules</div>
                  </Grid>

        </Grid>
        
        </DialogTitle>

        <List>
      
          <ListItem>
           
            <Typography variant = "h5">
              Rules
            </Typography>
          </ListItem>
          <ListItem>
          <Typography variant = "body2">
             In 'Guess The Soju Bottle No.' you take turns to guess what the number under the virutal Soju bottle cap is. The number under the virutal Soju bottle cap is between 0 and 100.
             <br/> <br/>
             Each guess you make must be within the previous highest and lowest guesses. If you make an incorrect guess the computer will tell you whether the number is higher or lower and update the previous higher or lower guess.
             <br/> <br/>
             If you make a correct guess you drink!
            </Typography>
          </ListItem>

          
          
        </List>

         
          <Button style = {{"background-color": "#3D3D90","align-self":"center", "max-width": "90%", "margin-bottom":"0.2rem"}}
                variant="contained"
                color="primary"
                onClick={() => handleClose()} 
              >
                  <div className="smallButtonText">Close</div> 
            </Button>
          
        

    </Dialog>
        
    );

}
  

export default GuessGameRules
