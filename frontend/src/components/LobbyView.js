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



function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }
  
  function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  
    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }
  
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  
    return windowDimensions;
  }

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
    image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain'
    },
    cardText: {
        "max-width": "80",
        "font-size": "medium",
        "font-weight": "bold",
        "text-decoration": "none",
        "text-align" : "center",
        "word-wrap": "break-word",
    
        "margin": "0.1rem",
        "color": "#293242"
    }
  }));

export const LobbyView = props => {
  
    const [players, setPlayers] = useState([]);
    const [token, setToken] = useState(props.token)
    const history = useHistory();

    const [spacing, setSpacing] = React.useState(2);
    const classes = useStyles();
    
    const { height, width } = useWindowDimensions();

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

    useEffect(() => {
        checkGame();
    }
    ,[])

    
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

        console.log(width)
       
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

    const getIconSize = relSize => {

        return Math.max(relSize/2.3, relSize * width/1920 )

    }

    const getFontSize = () => {

        if(width > 1400) {
            return "medium"
        }

        if(width > 1000) {
            return "small"
        }

        if(width > 700) {
            return "x-small"
        }

        return "xx-small"
    }

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
        <Grid 
            container 
            justifyContent="center" 
            justify = "center" 
            alignItems="center"
            spacing={5}
            marginTop={50}
            marginBottom={50}
            paddingTop = '1.5rem'
        >
            {players.map((player) => (
                
                    <Card className = "cardContainer">
                        <CardContent className = "cardContentContainer"  alignItems="center">
                            <img src={sojuToObj[sojuMap[player]]} width={getIconSize(80)} height={getIconSize(120)} />         

                            <div style = {{
                                "max-width": getIconSize(80),
                                "font-size": getFontSize(),
                                "font-weight": "bold",
                                "text-decoration": "none",
                                "text-align" : "center", 
                                "vertical-align": "middle",
                                "color": "#293242",
                                "word-wrap": "break-word"
                            }}>


                                {player}
                            </div>  
                        
                        </CardContent>
                    </Card>
                
            ))}
        </Grid>
         
      
        
    );

}
  

export default LobbyView
