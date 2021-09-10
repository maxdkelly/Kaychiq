import React, { useEffect, useState, useRef } from 'react'
import '../StyleSheets/Title.css';
import general from '../utils/general';
import flick from '../utils/flick';

import { makeStyles, withStyles } from '@material-ui/core/styles';


import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';
import Slider from '@material-ui/core/Slider';
import Fade from '@material-ui/core/Fade';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';

import GuessGameRules from './GuessGameRules';
import GifPlayer from 'react-gif-player'


import apple from '../soju/apple.png'
import grapefruit from '../soju/grapefruit.png'
import original from '../soju/original.png'
import peach from '../soju/peach.png'
import plum from '../soju/plum.png'
import strawberry from '../soju/strawberry.png'
import watermelon from '../soju/watermelon.png'
import lychee from '../soju/lychee.png'
import chicken from '../soju/chicken.png'

import stage1 from '../flicks/stage1.gif'
import stage2 from '../flicks/stage2.gif'
import stage3 from '../flicks/stage3.gif'

import vid1 from '../flicks/vid1.gif'
import vid2 from '../flicks/vid2.gif'
import vid3 from '../flicks/vid3.gif'
import vid4 from '../flicks/vid4.gif'






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
      // marginTop: theme.spacing(3),
      // height: 'fit-content',
      // width: 'fit-content',
      paddingTop: "7px",
      paddingBottom: "7px",
      paddingLeft: "20px",
      paddingRight: "20px",
      marginBottom: theme.spacing(3),
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
      maxWidth: "90%",
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



export const FlickAnimationView = props => {


  const vid = useRef(stage1)
  const paperRef = useRef(null);

  const [sliderValue, setSlider] = useState(5);
  const [slideDir, setDir] = useState(true);

  const stages = [stage1, stage2, stage3]
  const vids = [vid1, vid2, vid3, vid4]
  const [gifs, setGifs] = useState([]);
  const [vidIndex, setIndex] = useState(0);
  const [stageIndex, setStageIndex] = useState(0);

  const [stage, setStage] = useState(0);
  const [tick, setTick] = useState(props.tick);

  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  const [stop, setStop] = useState(false);

  const [hit, setHit] = useState(-10);
  const token = useState(props.token);
  const [show, setShow] = useState(null);
  const [currHit, setCurrHit] = useState([-1,  ""]);
  const [go, setGo] = useState(false);

  const [stopNum, setStopNum] = useState(-10);
  
  const [maxHit, setMax] = useState(70);
  const [newMax, setNewMax] = useState(70);
  const [gameStarted, setStarted] = useState(false);
  const [msg, setMsg] = useState(props.msg);

  const [over, setOver] = useState(false);
  const { height, width } = useWindowDimensions();
  
  const [changed, setChanged] = useState(false);
  const classes = useStyles();
  const [hitDisabled, setDisabled] = useState(false);

  useEffect(() => {

    let imgList = vids
    imgList.forEach((image) => {
      new Image().src = image
    });

    setGifs(imgList);

  },[])
  useEffect(() => {

    console.log(gameStarted)

    if(props.show == false) {
      setShow(props.show)

    } else {

      if(!gameStarted) {

        setTimeout(() => {
          setShow(props.show)
        }, 1000);
      } else {
        setTimeout(() => {
          setShow(props.show)
    
        }, 6500);
  
      }

    }
   
    
    
  },[props.show])


    useEffect(() => {

      setMsg(props.msg)
     }, [props.msg])
   

 useEffect(() => {

  setNewMax(props.newMaxHit)
 }, [props.newMaxHit])

 useEffect(() => {

  setStarted(props.gameStarted)
 }, [props.gameStarted])

 useEffect(() => {
   setOver(props.over)
 }, [props.over])


  
  useEffect(() => {
    console.log("something happened, stage:",props.stage)
    console.log(props.stage)

    

    handleSliderStop(props.currHit[0]);

    setCurrHit(props.currHit)
    setGo(true);

    if( props.stage != stage) {
      setChanged(true);
    }
    

    setStage(props.stage);
    setTick(props.tick);

  }, [props.tick]);

  
    const getIconSize = relSize => {

      return Math.max(relSize/1.7, relSize * 1.4 * width/1920 )

    }

    

    useInterval(() => {
      changeSlider()
    }, 20);   

  function changeSlider() {

    if((sliderValue == stopNum && go) || (go && hit != -10)) {

      setGo(false);
      if(!changed) {
        repeat();
       
      } else {
        setChanged(false);
        console.log(props)
        progress();
      }

      

    }

    if(!stop && sliderValue != stopNum) {


      if(sliderValue == 100) {
        setDir(!slideDir)
        setSlider(sliderValue - 5); 
  
      }
  
       else if( sliderValue == 0) {
        setDir(!slideDir)
        setSlider(sliderValue + 5); 
  
      } else {
        if(slideDir) {
          setSlider(sliderValue + 5); 
        } else {
          setSlider(sliderValue - 5); 
    
        }
  
      }

    }
   

    
  }

  function useInterval(callback, delay) {
      const savedCallback = useRef();
    
      // Remember the latest callback.
      useEffect(() => {
        savedCallback.current = callback;
      }, [callback]);
    
      // Set up the interval.
      useEffect(() => {
        function tickFunc() {
          savedCallback.current();
        }
        if (delay !== null) {
          let id = setInterval(tickFunc, delay);
          return () => clearInterval(id);
        }
      }, [delay]);
  }

    const repeat = () => {

      setHit(-10);
      handleClose();

      vid.current = gifs[vidIndex];

      setTimeout(function() { //Start the timer
        setOpen(true);

        vid.current = stages[stageIndex]
        setMax(newMax); 
        setStopNum(-10);
        setStop(false);
        setDisabled(false);

        }, 4800)

       
    }

    const progress = () => {

      setHit(-10);
      handleClose();

      if(vidIndex < vids.length - 1) {

        vid.current = gifs[vidIndex + 1];

       
        setTimeout(function() { //Start the timer
          setOpen(true);

          setMax(newMax);
          setStopNum(-10);
          setStop(false);
          setDisabled(false);

          vid.current = stages[stageIndex + 1];
          setStageIndex(stageIndex + 1);


          if(vidIndex < vids.length - 2) {

            setIndex(vidIndex + 2);
            console.log("set")

          } 
          
           
          }, 4800)
      }

    }

    const handleSliderStop = num => {

      console.log(num);
      setStopNum(num); 
    }

    

    const handleSubmit = (e) => {

      e.preventDefault();
      if(!stop) {

        setStop(true);
        setDisabled(true);
      
        let hitValue = sliderValue;
        setHit(hitValue);
        flick.flick(token[0], hitValue);
        

      }
      
    }

    const getGradient = () => {

      if(paperRef.current) {
        let width = paperRef.current.clientWidth;
        // console.log("heysssssssss")
        let str =  "linear-gradient(to right, green 0px,  green " +
          (Math.round(width * ((maxHit - 15) / 100 ))).toString() + 
          "px, red " + 
          (Math.round(width * ((maxHit - 5) / 100 ))).toString() + 
          "px, green " + 
          (Math.round(width *((maxHit + 5) / 100 ))).toString() + 
           "px)";

        // console.log(str);
        return str;
      }

      

    }

    const PrettoSlider = withStyles({
    
      root: {
        color: '#52af77',
        height: 8,
      },
      thumb: {
        height: 24,
        width: 24,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        marginTop: -8,
        marginLeft: -12,
        '&:focus, &:hover, &$active': {
          boxShadow: 'inherit',
        },
      },
      active: {},
      valueLabel: {
        left: 'calc(-50% + 4px)',
      },
      track: {
        height: 8,
        borderRadius: 4,
        backgroundImage: getGradient()
      },
      rail: {
        height: 8,
        borderRadius: 4,
        backgroundImage: getGradient()
  
      },
    })(Slider );

   

    return (
        <div>

            <main className={gameStarted ? classes.layout: "hidden"}>
                <Paper ref = {paperRef} className={classes.paper}> 

                  <div class ="paperTitleText" >
                      Game View
                  </div>


                      <Grid container
                       alignItems="center"
                       justifyContent="center" 
                       justify = "center"
                      >

                        <Grid item style = {{"margin" : "5px"}}>
                          <img src = {vid.current} width={getIconSize(444)} height={getIconSize(294)}/>


                          <img src = {vid1} width={getIconSize(444)} height={getIconSize(294)} className= "hidden"/>
                          <img src = {vid2} width={getIconSize(444)} height={getIconSize(294)} className= "hidden"/>
                          <img src = {vid3} width={getIconSize(444)} height={getIconSize(294)} className= "hidden"/>
                          <img src = {vid4} width={getIconSize(444)} height={getIconSize(294)} className= "hidden"/>

                        </Grid>
                        

                      </Grid>
          
                      <PrettoSlider  value={sliderValue} aria-label="pretto slider" defaultValue={20} />

                      <div className={ show ? classes.layout : "hidden"}> 
                        <Grid container spacing={3}  alignItems="center"
                          justifyContent="center" 
                          justify = "center">
                              <Grid item>
                                <Button
                                  variant="contained"
                                  color="primary"
                                  disabled = {hitDisabled}
                                  onClick={(e) => handleSubmit(e)}   
                                  >
                                  Hit
                                </Button>

                              </Grid>
                        </Grid>

                      </div>

             
                </Paper>
            </main>

            <div className = {msg != "" ? "" : "hidden"}>

            <Snackbar
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                open={open}
                autoHideDuration={2000}
                onClose={handleClose}
                message= {msg}
                action={
                  <React.Fragment>

                  <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </React.Fragment>
                }
              />

            </div>
            
   
      
           
                
       

            
        </div>
        
    );

}
  

export default FlickAnimationView
