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

import GuessGameRules from './GuessGameRules';

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

export const GuessDialog = props => {
  
    const classes = useStyles();

    const [token, setToken] = useState(props.token);
    const [show, setShow] = useState(props.show);
    const [rulesShow, setRulesShow] = useState(false);


    
    const handleRulesClose = () => setRulesShow(false);
    

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [guessError, setGuessError] = useState(false);


    const [highest, setHighest] = useState(props.highest);
    const [lowest, setLowest] = useState(props.lowest);
    const [numGuess, setNumGuess] = useState(0);
  

    useEffect(() => {
        setToken(props.token);
        setShow(props.show);
        setHighest(props.highest);
        setLowest(props.lowest);
        
      
      }, [props.token, props.highest, props.lowest, props.show]);

    function handleGuess(e) {
        e.preventDefault();
        
        console.log(numGuess);

        if(numGuess >= highest || numGuess <= lowest) {
            setGuessError(true);
        } else {
            setGuessError(false);
            props.setClosed();
            setNumGuess(null)
            handleClose();
            guess.guess(token, numGuess)
            .then(data => {
            })
            
        }
    }
    
    return (
      <Dialog open={show} aria-labelledby="simple-dialog-title" fullWidth maxWidth="xs" style = {{"color": "#626f87"}}>
        <DialogTitle id="simple-dialog-title" style = {{"background-color": "#626f87"}}>
          
        <Grid style={{"max-height":"10%"}} container spacing={3} justifyContent = "flex-end">
                  <Grid item xs style = {{"max-width" : "80%"}}>
                   <div className="medButtonText">Enter your Guess</div>
                  </Grid>

                  <Grid item xs style = {{"max-width" : "28%"}}>
                    <Button variant="contained" color="primary" style = 
                          {{"background-color": "#3D3D90", "max-width": "90%", "display" : "block",
                          "align-self":"center", 
                          "margin-bottom":"1rem",
                          "margin-left": "auto",
                          "margin-right": "auto"}} 
                          onClick = {() => setRulesShow(true)}
                         
                        >
                              <div className = "smallText">
                               Rules

                              </div>
                          
                         
                        </Button>
                    </Grid>
                  </Grid>
        
        </DialogTitle>

        <List>
      
          <ListItem>
            <TextField 
              id={guessError ? "standard-error-helper-text" : "standard-basic"} 
              value ={numGuess} 
              onChange={e => setNumGuess(e.target.value)} 
              label={guessError ? "Error" : "Guess"} 
              defaultValue=""
              helperText={guessError ? "Please pick a number in between the lowest and highest guesses" : ""}
            />
          </ListItem>

          <ListItem>
            <Typography variant = "caption">
              Lowest Guess: {lowest}<br/> Highest Guess: {highest}
            </Typography>
          </ListItem>

          
          
        </List>
          <Button style = {{"background-color": "#3D3D90","align-self":"center", "max-width": "90%", "margin-bottom":"0.2rem"}}
                variant="contained"
                color="primary"
                onClick={e => handleGuess(e)} 
              >
                  <div className="smallButtonText">Submit</div> 
        </Button>
        
        <GuessGameRules show = {rulesShow} handleClose = {handleRulesClose}/>
    </Dialog>
        
    );

}
  

export default GuessDialog
