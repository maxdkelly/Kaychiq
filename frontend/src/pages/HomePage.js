  
import React from "react";
import kchicken from "../StyleSheets/koreanchicken.jpg"
import Header from "../components/Header.js"
import home from "../StyleSheets/HomePage.css"
import { Link } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
    appBar: {
      position: 'relative',
    },
    layout: {
      width: 'auto',
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
        width: 600,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
      
     
    },
    paper: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
      padding: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
        marginTop: theme.spacing(6),
        marginBottom: theme.spacing(6),
        padding: theme.spacing(3),
      },
      backgroundColor: '#C4C3D0',
      borderRadius: 10
    },
    stepper: {
      padding: theme.spacing(3, 0, 5),
    },
    buttons: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    button: {
      marginTop: theme.spacing(3),
      marginLeft: theme.spacing(1),
    },
  }));

export const HomePage = props => {

    const classes = useStyles();

    return (
        <div>
            <Header />

            <main className={classes.layout}>
                <Paper className={classes.paper}> 

                    <Grid 
                        container 
                        spacing={6}
                    >

                        <Grid item xs={12} style={{textAlign: "center"}}>
                            <img className= "pic" src={kchicken} style={{"align-self":"center", "max-width": "90%", "max-height": "100%", "border-radius": "15px"}}/> 
                        </Grid>

                        <Grid item xs={12} style={{textAlign: "center"}}>
                            <Link to="/createGame" className="link">
                                <Button
                                
                                    variant="contained"
                                    color="primary"
                                >
                                    <div className="buttonText">Create Game </div> 
                                </Button>                                                      
                            </Link>
                        </Grid>

                        <Grid item xs={12} style={{textAlign: "center"}}>
                            <Link to="/lobby" className="link">
                                <Button
                                    variant="contained"
                                    color="primary"
                                >
                                    <div className="buttonText">Join Lobby</div> 
                                </Button>                                                      
                            </Link>
                        </Grid>
                    </Grid>
                </Paper>
            </main>
        </div>
    )
}