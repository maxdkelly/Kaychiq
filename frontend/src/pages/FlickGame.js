import React, { useEffect, useState, useRef } from 'react'
import { useHistory } from "react-router-dom";

import { Redirect } from "react-router";
import { Link } from "react-router-dom";


import Header from "../components/Header"
import flick from '../utils/flick';
import general from '../utils/general';
import Paper from '@material-ui/core/Paper';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Grid from '@material-ui/core/Grid';

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import FlickGameView from '../components/FlickGameView';
import FlickAnimationView from '../components/FlickAnimationView';
import FlickFinishedDialog from '../components/FlickFinishedDialog';

import flickGif from '../flicks/flick.gif'

import gif from '../gifs/gif2.gif'
import roger from '../gifs/roger.gif'
import wow from '../gifs/wow.gif'



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
      display : "flex",
    },
    paper: {
      height: 140,
      width: 100,
    },
    control: {
      padding: theme.spacing(2),
    },
  }));

export const FlickGame = props => {

    const history = useHistory();
    const classes = useStyles();

    const flickGifLoaded = (new Image().src = flickGif)
    const finishedGif = (new Image().src = gif)
    const rogerGif = (new Image().src = roger)
    const wowGif = (new Image().src = wow)

    const [token, setToken] = useState(props.location.token);

    const [currHit, setCurrHit] = useState([-1,  ""]);
    const [currPlayer, setCurrPlayer] = useState("");

    const [hitRange, setHitRange] = useState(100);
    const [maxHitPos, setMaxHitPos] = useState(0);

    const [open, setOpen] = useState(false);

    const handleClose = () => setOpen(false);

    
    const [weakOpen, setWeak] = useState(false);

    const handleWeakClose = () => setWeak(false);

    
    const [wowOpen, setWow] = useState(false);

    const handleWowClose = () => setWow(false);

    const [tick, setTick] = useState(false);
    const [players, setPlayers] = useState([]);
    const [start, setStart] = useState(true);

    const [gameStarted, setStarted] = useState(false);
    const [show, setShow] = useState(false);
    const [loserShow, setLoserShow] = useState(false);
    const [losers, setLosers] = useState(["",""]);

    const [stage, setStage] = useState(0);
    const [host, setHost] = useState(false);

    const [name, setName] = useState(""); 
    const [sojuMap, setSojuMap] = useState({});

    const [msg, setMsg] = useState("");

    const [healthMsg, setHealthMsg] = useState("");

    const [health, setHealth] = useState("100");

  const { height, width } = useWindowDimensions();


    useEffect(() => {

        if(token) {
            setName(token.split("_")[1])
        } else if(general.hasToken()) {
            setToken(general.getToken());
        } else {
            history.push("/");
        }

        general.isHost(token) 
        .then(data => {

            if(data) {
                if(data.isHost) {
                    setHost(true);
                }
            } else {
                console.log("error pinging api")
            }
            
        })
      }, []);

    useInterval(() => {
        checkGame()
    }, 500);   
  
    const checkGame = () => {
       
        flick.getFlickState(token)
            .then(data => {
                if(data) {
                    setStage(data.stage);
                    if(data.tick != tick) {
                        console.log(currPlayer, " hit ", data.currHitPos, maxHitPos)

                        let hitDiff = Math.abs(data.currHitPos - maxHitPos)

                        if (hitDiff <= 10) {
                            setMsg(currPlayer + " powerfully flicked the tail")
                        } else if (hitDiff <= 20) {
                            setMsg(currPlayer + " flicked the tail")
                        } else {

                            setTimeout(() => {
                                setWeak(true);

                            }, 5000);
                            setMsg(currPlayer + " made a shite attempt at flicking the tail")
                        }
                        
                        setStart(false);
                        setCurrHit([data.currHitPos, currPlayer]);
                        setTick(data.tick);

                        if(data.health != health && !data.gameOver) {

                            if(data.health == 75) {
                                setHealthMsg("Soju Bottle tail taking some damage");
                            }

                            if(data.health == 50) {
                                setHealthMsg("Soju Bottle tail not looking so hot");

                            }

                            if(data.health == 25) {
                                setHealthMsg("Soju Bottle tail almost gone");

                            }

                            setHealth(data.health)
                            handleClose();
                            setTimeout(() => {
                                setOpen(true);
    
                            }, 5000);
    
                        } else if (hitDiff <= 10  && !data.gameOver) {
                            setTimeout(() => {
                                setWow(true);
    
                            }, 5000);

                        }
                    }

                    
                    setMaxHitPos(data.maxHitPos);
                    setHitRange(data.hitRange);
         
                    setPlayers(data.players);
                   
                    
                    setCurrPlayer(data.currPlayer);

                    setSojuMap(data.sojuMap);

                    if(data.yourTurn && !data.gameOver) {
                        // console.log("your turn")
                        setShow(true);
                    } else {
                        setShow(false);
                    }

                    if(data.gameOver) {

                        setTimeout(() => {
                            setLosers(data.drinkingPlayers);
                            setLoserShow(true);

                        }, 4700);
                        
                    }

                    if(data.link) {
                        general.removeRules();

                        history.push({
                            pathname: "/" + data.link,
                            token:token
                        });

                    }

                    setStarted(true);
                } else {
                    console.log("error pinging api")
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


    const section = {
        height: "100%"
      };

    const getFontSize = () => {

        if(width > 1000) {
            return "large"
        }

        if(width > 600) {
            return "medium"
        }

       
        return "small"
        
    }

    const getIconSize = relSize => {

        return Math.max(relSize/1.7, relSize * width/1920 )
  
    }
    
    return(
        <body>
            <Header/> 
            
            <Grid 
                container 
                spacing={width > 850 ? 3 : 1}  
                alignItems="center"
                justifyContent="center" 
                justify = "center"
              
                
                className={classes.root} 
            >

                <Grid item style = {section}>
                    <FlickGameView players = {players} sojuMap = {sojuMap} currPlayer = {currPlayer} currHit = {currHit} over = {loserShow} show={show}/>

                </Grid>

                <Grid item style = {section}>
                     <FlickAnimationView 
                        tick = {tick} 
                        stage = {stage} 
                        start = {start} 
                        token = {token} 
                        show = {show} 
                        currHit = {currHit} 
                        newMaxHit = {maxHitPos} 
                        gameStarted = {gameStarted}
                        msg = {msg}
                        over = {loserShow}
                    />

                </Grid>
            </Grid>
           
            <FlickFinishedDialog show = {loserShow} losers = {losers} token = {token} host = {host} gif = {finishedGif}/>

            
            <div className = {msg != "" ? "" : "hidden"}>

            <Snackbar
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                message= {"Soju bottle tail at " + health + "% health"}
                action={
                  <React.Fragment>
                    
                  </React.Fragment>
                }
              >
                <main>
                    <Paper style = {{
                         "background-color": '#EEDFDE',
                         "border-radius": "6"
                    }}> 
                    <div style = {{
                        "padding" : "10px",
                        
                        "width": getIconSize(270),
                        "font-size": getFontSize(),
                        "font-weight": "bold",
                        "text-decoration": "none",
                        "text-align" : "center", 
                        "vertical-align": "middle",
                        "color": "#293242",
                        "line-height": "110%"
                    }}>

                        {healthMsg}
                    </div>  
                   
                    <img src = {flickGifLoaded} width={getIconSize(270)} height={getIconSize(480)} />

                  </Paper>
                </main>
            </Snackbar>

            <Snackbar
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={weakOpen}
                autoHideDuration={3000}
                onClose={handleWeakClose}
                action={
                  <React.Fragment>
                    
                  </React.Fragment>
                }
              >
                <main>
                    <Paper style = {{
                         "background-color": '#EEDFDE',
                         "border-radius": "6"
                    }}> 
                  
                   
                    <img src = {rogerGif} width={getIconSize(498)} height={getIconSize(277)} />

                  </Paper>
                </main>
            </Snackbar>

            <Snackbar
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={wowOpen}
                autoHideDuration={2500}
                onClose={handleWowClose}
                action={
                  <React.Fragment>
                    
                  </React.Fragment>
                }
              >
                <main>
                    <Paper style = {{
                         "background-color": '#EEDFDE',
                         "border-radius": "6"
                    }}> 
                  
                   
                    <img src = {wowGif} width={getIconSize(500)} height={getIconSize(374)} />

                  </Paper>
                </main>
            </Snackbar>

            </div>
        </body>
    )
        
    
}
