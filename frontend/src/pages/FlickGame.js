import React, { useEffect, useState, useRef } from 'react'
import { useHistory } from "react-router-dom";

import { Redirect } from "react-router";
import { Link } from "react-router-dom";


import Header from "../components/Header"
import flick from '../utils/flick';
import general from '../utils/general';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Grid from '@material-ui/core/Grid';

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import FlickGameView from '../components/FlickGameView';
import FlickAnimationView from '../components/FlickAnimationView';
import FlickFinishedDialog from '../components/FlickFinishedDialog';

export const FlickGame = props => {

    const history = useHistory();

    const [token, setToken] = useState(props.location.token);

    const [currHit, setCurrHit] = useState([-1,  ""]);
    const [currPlayer, setCurrPlayer] = useState("");

    const [hitRange, setHitRange] = useState(100);
    const [maxHitPos, setMaxHitPos] = useState(0);

    const [tick, setTick] = useState(false);
    const [players, setPlayers] = useState([]);
    const [start, setStart] = useState(true);


    const [show, setShow] = useState(false);
    const [loserShow, setLoserShow] = useState(false);
    const [losers, setLosers] = useState(["",""]);

    const [stage, setStage] = useState(0);
    const [host, setHost] = useState(false);

    const [name, setName] = useState(""); 
    const [sojuMap, setSojuMap] = useState({});


    const [recentlyClosed, setRecClosed] = useState(false);
   
    const handleShow = () => setShow(true);

    const handleClose = () => {


        setShow(false);
        setRecClosed(true);
        setTimeout(() => { setRecClosed(false);}, 4000);
        
    }

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
    }, 1000);   
  
    const checkGame = () => {
       
        flick.getFlickState(token)
            .then(data => {
                console.log(data)

                if(data) {

                    if(data.tick != tick) {
                        console.log([data.currHitPos, hitRange, currPlayer])
                        setStart(false);
                        setCurrHit([data.currHitPos, currPlayer]);
                        setTick(data.tick);
                    }

                    setStage(data.stage);

                    setMaxHitPos(data.maxHitPos);
                    setHitRange(data.hitRange);
         
                    setPlayers(data.players);
                   
                    
                    setCurrPlayer(data.currPlayer);

                    setSojuMap(data.sojuMap);
                    if(data.yourTurn && !data.gameOver) {
                        setShow(true);
                    } else {
                        setShow(false);
                    }

                    if(data.gameOver) {

                        setTimeout(() => {
                            setLosers(data.drinkingPlayers);
                            setLoserShow(true);

                        }, 4000);
                        
                    }

                    if(data.link) {
                        history.push({
                            pathname: "/" + data.link,
                            token:token
                        });

                    }
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



    
    return(
        <body>
            <Header/> 
            
            <Grid container spacing={3}  alignItems="center"
                    justifyContent="center" 
                    justify = "center">

                <Grid item >
                    <FlickGameView players = {players} sojuMap = {sojuMap} currPlayer = {currPlayer} currHit = {currHit} over = {loserShow} show={show}/>

                </Grid>

                <Grid item>
                     <FlickAnimationView tick = {tick} stage = {stage} start = {start} token = {token} show = {show} currHit = {currHit} newMaxHit = {maxHitPos}/>

                </Grid>
            </Grid>
           
            <FlickFinishedDialog show = {loserShow} losers = {losers} token = {token} host = {host}/>
        </body>
    )
        
    
}
