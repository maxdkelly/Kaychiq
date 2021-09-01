import React, { useEffect, useState, useRef } from 'react'
import '../StyleSheets/Title.css';
import general from '../utils/general';

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
      width: 140,
    },
    control: {
      padding: theme.spacing(2),
    },
  }));

export const GuessGameView = props => {
  
    const [players, setPlayers] = useState(props.players);
    const classes = useStyles();

    const [currPlayer, setCurrPlayer] = useState(props.currPlayer);
    const [highest, setHighest] = useState(props.highest);
    const [lowest, setLowest] = useState(props.lowest);
    const [currGuess, setCurrGuess] = useState(props.currGuess);
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
        setPlayers(props.players);
        setSojuMap(props.sojuMap);
        setCurrPlayer(props.currPlayer);

        setHighest(props.highest);
        setLowest(props.lowest);
        setCurrGuess(props.currGuess);
        

        console.log(currGuess);
      }, [props.players, props.sojuMap, props.currPlayer, props.highest, props.lowest, props.currGuess]);
    
    return (
        <div>
            <div className="homeContainer">
          

              <Grid item>
                  <Grid container justifyContent="center" justify = "center" spacing={2}>
                  {players.map((player) => (
                      
                      <Card className="cardContainer"  alignItems="center">
                          <CardContent className = "cardContentContainer"  alignItems="center">
                              <img src={sojuToObj[sojuMap[player]]} width="80" height="120"/>         

                              <Typography component="div"  justify = "center"  alignItems="center">
                                  <Box fontWeight="fontWeightBold" m={1} justify = "center"alignItems="center" >
                                      {player}
                                  </Box>
                              </Typography>
                            
                          </CardContent>
                      </Card>
                  
              ))}
                  </Grid>
              </Grid>

              <Typography  className = { currPlayer ? "" : "hidden" } component="div"  justify = "center"  alignItems="center">
                <Box fontWeight="fontWeightBold" m={1} justify = "center"alignItems="center" >
                    Current player is {currPlayer}
                </Box>
              </Typography>

              <Typography  className = { currGuess[1] ? "" : "hidden" } component="div"  justify = "center"  alignItems="center">
                <Box fontWeight="fontWeightBold" m={1} justify = "center"alignItems="center" >
                    {currGuess[1]} guessed {currGuess[0]}
                </Box>
              </Typography>

              <Typography  className = { currGuess[1] ? "" : "hidden" } component="div"  justify = "center"  alignItems="center">
                <Box fontWeight="fontWeightBold" m={1} justify = "center"alignItems="center" >
                    Lowest Guess: {lowest}<br/> Highest Guess: {highest}
                </Box>
              </Typography>
            </div> 
            
        </div>
        
    );

}
  

export default GuessGameView
