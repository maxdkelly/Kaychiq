import React, { useEffect, useState, useRef } from 'react'
import { useHistory } from "react-router-dom";

import { Redirect } from "react-router";
import { Link } from "react-router-dom";


import Header from "../components/Header"
import guess from '../utils/guess';
import general from '../utils/general';

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import GuessGameView from '../components/GuessGameView';

import gif from '../gifs/gif1.gif'

  

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
    const [numGuess, setNumGuess] = useState(0);
    const [currGuess, setCurrGuess] = useState([0, ""]);
    const [guessError, setGuessError] = useState(false);

    const [players, setPlayers] = useState([]);
    const [sojuMap, setSojuMap] = useState({});
    const [currPlayer, setCurrPlayer] = useState("");

    
   

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const closeGif = () => setLoserShow(false);

    useEffect(() => {

        if(token) {
            setName(token.split("_")[1])
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
    }, 2000);   
  
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
                    if(data.yourTurn && !data.gameOver) {
                        handleShow();
                    }

                    if(data.gameOver) {
                        setLoser(data.currPlayer);
                        setLoserShow(true);
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

    function handleGuess(e) {
        e.preventDefault();
        
        console.log(numGuess);

        if(numGuess >= highest || numGuess <= lowest) {
            setGuessError(true);
        } else {
            handleClose();
            guess.guess(token, numGuess)
            .then(data => {
            })
            
        }
    }

    function handleBackToLobby(e) {

        guess.guessToLobby(token);
        
    }

    
    return(
        <body>
            <Header> </Header>
            <div className="textLARG"> Guess Number Game </div>

            <div className="textLARG"> Hello {name} </div>

            <GuessGameView players = {players} sojuMap = {sojuMap} currPlayer = {currPlayer} highest = {highest} lowest = {lowest} currGuess = {currGuess}/>


            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>Enter Guess</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    

                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail" hasValidation>
                            <Form.Label>Enter your number guess</Form.Label>
                            <Form.Control type="number" placeholder="Enter number" value ={numGuess} onChange={e => setNumGuess(e.target.value)} />
                            <div className = { guessError ? "errorInput" : "hidden"} >
                                Please choose a number in between the lowest and highest guesses<br/>
                            </div>
                            <Form.Text className="text-muted">
                               Lowest Guess: {lowest}<br/> Highest Guess: {highest}
                            </Form.Text>
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={(e) => handleGuess(e)}>
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
               
                </Modal.Footer>
            </Modal>


            <Modal
                show={loserShow}
                backdrop="static"    
            >
                <Modal.Header>
                    <Modal.Title>DRINKING TIME</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <div className = "center">
                        <div className = "textSMOL" >
                            {loser} guessed {currGuess[0]} <br/>
                            {loser} drinks!
                        </div> 

                        <img src={gif}/>         
                    </div>          
                   
                    <div className = {host ? "center" : "hidden"}>
                        <Link to={{pathname: "/createGame", token: token}} className="userContainer" onClick={(e) => handleBackToLobby(e)}>
                            <div className="textLARG">Back to Lobby </div>       
                        </Link>

                    </div>
                            
                    
                    
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        </body>
    )
        
    
}
