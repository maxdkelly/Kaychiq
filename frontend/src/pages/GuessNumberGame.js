import React, { useEffect, useState, useRef } from 'react'
import { useHistory } from "react-router-dom";

import { Redirect } from "react-router";
import { Link } from "react-router-dom";


import Header from "../components/Header"
import guess from '../utils/guess';
import general from '../utils/general';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import GuessGameView from '../components/GuessGameView';
import GuessDialog from '../components/GuessDialog';
import GuessFinishedDialog from '../components/GuessFinishedDialog';


export const GuessNumberGame = props => {

    const history = useHistory();

    const [token, setToken] = useState(props.location.token);
    const [show, setShow] = useState(false);
    const [loserShow, setLoserShow] = useState(false);
    const [loser, setLoser] = useState("");

    const [host, setHost] = useState(false);

    const [name, setName] = useState("");

    const [highest, setHighest] = useState(100);
    const [lowest, setLowest] = useState(0);
  
    const [currGuess, setCurrGuess] = useState([0, ""]);

    const [players, setPlayers] = useState([]);
    const [sojuMap, setSojuMap] = useState({});
    const [currPlayer, setCurrPlayer] = useState("");

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
       
        guess.getGuessState(token)
            .then(data => {
                console.log(data)

                if(data) {

                    if(data.currGuess != currGuess[0]) {
                        setCurrGuess([data.currGuess, currPlayer]);
                    }

                    console.log(currGuess);
                    setHighest(data.highestGuess);
                    setLowest(data.lowestGuess);

                    setPlayers(data.players);
                   
                    
                    setCurrPlayer(data.currPlayer);

                    setSojuMap(data.sojuMap);
                    if(data.yourTurn && !data.gameOver && !recentlyClosed) {
                        console.log("hey");
                        handleShow();
                    } else {
                        setShow(false);
                    }

                    if(data.gameOver) {
                        setLoser(data.currPlayer);
                        setLoserShow(true);
                    }

                    if(data.link) {
                        general.removeRules();

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
            

            <GuessGameView players = {players} sojuMap = {sojuMap} currPlayer = {currPlayer} highest = {highest} lowest = {lowest} currGuess = {currGuess} over = {loserShow} show={show}/>
            <GuessDialog show = {show} token = {token} highest = {highest} lowest = {lowest} setClosed = {handleClose}/>
            <GuessFinishedDialog show = {loserShow} loser = {loser} num = {currGuess[0]} host = {host} token = {token} />

           
        </body>
    )
        
    
}
