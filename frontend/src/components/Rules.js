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

export const Rules = props => {
  
    const classes = useStyles();
    const [body, setBody] = useState([]);
    const [title, setTitle] = useState(props.title);
   
    const [show, setShow] = useState(props.show);

    const handleClose = () => {
        props.handleClose();
        setShow(false);
    }
    const handleShow = () => setShow(true);
    const [guessError, setGuessError] = useState(false);

    useEffect(() => {
        setBody(props.body);
        setTitle(props.title);
    }, [props.body, props.title]);

    useEffect(() => {
        
        setShow(props.show);   
      }, [props.show]);

   
    
    return (
      <Dialog open={show} aria-labelledby="simple-dialog-title" fullWidth maxWidth="xs" style = {{"color": "#626f87"}}>
        <DialogTitle id="simple-dialog-title" style = {{"background-color": "#626f87"}}>
          
        <Grid style={{"max-height":"10%"}} container spacing={3} justifyContent = "flex-end">
                  <Grid item xs style = {{"max-width" : "100%"}}>
                   <div className="medButtonText">{title}</div>
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

            {
                body
                .map(item => <div>{item}</div>)
                .reduce((acc, x) => acc === null ? [x] : [acc, <React.Fragment><br/> <br/> </React.Fragment>, x], null)
            }

         

          
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
  

export default Rules
