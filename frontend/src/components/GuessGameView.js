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
import Slide from '@material-ui/core/Slide';
import Fade from '@material-ui/core/Fade';



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
    layout: {
      width: 'fit-content',
      maxWidth: "90%",
      marginLeft: 'auto',
      marginRight: 'auto',       
    },
    paper: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
      padding: theme.spacing(1),
      [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
        marginTop: theme.spacing(6),
        marginBottom: theme.spacing(6),
        padding: theme.spacing(3),
      },
      backgroundColor: '#C4C3D0',
      borderRadius: 10
    },
    log: {
      paddingTop: '1.5rem',
      paddingBottom: '1.5rem',
      paddingLeft: '1rem',
      paddingRight: '1rem'
    },
    logContainer: {
      marginLeft: 'auto',
      marginRight: 'auto',
      width: 'fit-content',
      paddingLeft: '1rem',
      paddingRight: '1rem',
      backgroundColor: '#93CAED',
      borderRadius: 10
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

    const [over, setOver] = useState(props.over);

    const [checked, setChecked] = useState(false);
    const [fadeChecked, setFadeChecked] = useState(false);

    const { height, width } = useWindowDimensions();

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

        setOver(props.over)
        

        console.log(players)

      }, [props.players, props.sojuMap, props.currPlayer, props.highest, props.lowest, props.over]);

    useEffect(() => {


      setFadeChecked(false);
      setChecked(false);

      setTimeout(function() { //Start the timer
        setFadeChecked(true);//After 1 second, set render to true
        setChecked(true);
      }, 1000)


      setCurrGuess(props.currGuess);

    }, [props.currGuess])

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
    
    return (
        <div>

            <main className={players.length == 0 ? "hidden" : classes.layout}>
                <Paper className={players.length == 0 ? "hidden" : classes.paper}> 
                  <div class ="paperTitleText" >
                      Guess The Soju Bottle No.
                  </div>

                  <div class ="mutedText" >
                      Lowest Guess: {lowest}<br/> Highest Guess: {highest}
                  </div>
                  <Grid container  
                    spacing={2} 
                    alignItems="center"
                    justifyContent="center" 
                    justify = "center"
                  >
                    {players.map((player) => (
                              
                      <Card className="cardContainer" style = {currPlayer == player ? {"background-color":"#b1b1af"} :  {"background-color":"#dcdcdc"}} raised = {currPlayer == player ? true : false} >
                          <CardContent className = "cardContentContainer"  alignItems="center">
                            <img src={sojuToObj[sojuMap[player]]} width={getIconSize(80)} height={getIconSize(120)} />         

                            <div style = {{
                                "max-width": getIconSize(80),
                                "font-size": getFontSize(),
                                "font-weight": "bold",
                                "text-decoration": "none",
                                "text-align" : "center", 
                                "vertical-align": "middle",
                                "color": "#293242"
                            }}>


                                {player}
                            </div>  
                                    
                          </CardContent>
                      </Card>
                          
                      ))}
                    
                
                    </Grid>
                </Paper>
            </main>
            
   
            <Fade in={fadeChecked}  timeout = {1000}>
            <Slide direction="up" in={checked} timeout = {1000}>

                <Paper className={(currGuess[0] && !over)? classes.logContainer: "hidden"} elevation={6}>                  
                  <Box fontWeight="fontWeightBold" m={1} justify = "center"alignItems="center" className = {classes.log} >
                      {currGuess[1]} guessed {currGuess[0]}, {currGuess[0] == highest ? " the number is lower": "the number is higher"}
                  </Box>
                </Paper>

                </Slide>
              
            </Fade>
            
           
                
            

            
        </div>
        
    );

}
  

export default GuessGameView
