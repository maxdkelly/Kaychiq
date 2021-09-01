import React, { useEffect, useState, useRef } from 'react'
import '../StyleSheets/Title.css';
import general from '../utils/general';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';

import apple from '../soju/apple.png'
import grapefruit from '../soju/grapefruit.png'
import original from '../soju/original.png'
import peach from '../soju/peach.png'
import plum from '../soju/plum.png'
import strawberry from '../soju/strawberry.png'
import watermelon from '../soju/watermelon.png'
import lychee from '../soju/lychee.png'




const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      height: 100,
      width: 100,
    },
    control: {
      padding: theme.spacing(2),
    },
  }));

export const LobbyView = props => {
  
    const [players, setPlayers] = useState([]);
    const [token, setToken] = useState(props.token)
    const history = useHistory();

    const [spacing, setSpacing] = React.useState(2);
    const classes = useStyles();

    const [sojuMap, setSojuMap] = useState({});
    const [sojuToObj, setSojuToObj] = useState({
        'apple': apple,
        'grapefruit': grapefruit,
        'original': original,
        'peach': peach,
        'plum': plum,
        'strawberry': strawberry,
        'watermelon': watermelon,
        'lychee': lychee
    })

    useEffect(() => {

        if (props.token !== token) {
            setToken(props.token);        
        }
    });

    
    const startGame = link => {
        history.push({
            pathname: "/" + link,
            token:token
        });
    }

    useInterval(() => {
        checkGame()
    }, 2000);   
  
    const soju = name => {
        if(name == "Akshin") {
            return lychee;
        }

        return apple;
    }
    const checkGame = () => {
       
        general.checkGameStarted(token)
            .then(data => {
                console.log(data)

                if(data) {
                    if(data.gameStarted) {
                        startGame(data.gameLink)
                    }
                    setPlayers(data.players)
                    setSojuMap(data.sojuMap)
                } else {
                    console.log("Error pinging api")
                }
                
            })
    };

    function useInterval(callback, delay) {
        const savedCallback = useRef();
      
        // Remember the latest callback.
        useEffect(() => {
          savedCallback.current = callback;
        }, [callback]);
      
        // Set up the interval.
        useEffect(() => {
          function tick() {
            savedCallback.current();
          }
          if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
          }
        }, [delay]);
      }

    return (
       
            
            <React.Fragment  >
                <Grid container spacing={3}>

                  <Grid item xs={12}>
                  <div className="titleText">Lobby </div> 

                  </Grid>
                  <Grid item>
                    <Grid 
                        container 
                        justifyContent="center" 
                        justify = "center" 
                        alignItems="center"
                        spacing={spacing}
                    >
                        {players.map((player) => (
                            
                                <Card className="cardContainer"  alignItems="center">
                                    <CardContent className = "cardContentContainer"  alignItems="center">
                                        <img src={sojuToObj[sojuMap[player]]} width="80" height="120"/>         

                                        <Typography component="div"  justify = "center"  alignItems="center">
                                            <Box fontWeight="fontWeightBold" m={1} style ={{"text-align": "center"}} >
                                                {player}
                                            </Box>
                                        </Typography>
                                    
                                    </CardContent>
                                </Card>
                            
                        ))}
                    </Grid>
                    </Grid>
                </Grid>
            </React.Fragment>
      
        
    );

}
  

export default LobbyView
