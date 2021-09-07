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

export const FlickGameRules = props => {
  
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
                   <div className="medButtonText">Flick the Soju Bottle Cap Game</div>
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
             In 'Flick the Soju Bottle Cap Game' you take turns tring to flick the XXXXXX off the virtual soju bottle cap, by pressing the hit button.
             <br/> <br/>
             The closer the slider is to the red area, the harder your flick is.
             <br/> <br/>
             If you flick the XXXX off the virtual soju bottle cap, the people before and after you drink!
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
  

export default FlickGameRules
