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

import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';

import GuessGameRules from './GuessGameRules';


import apple from '../soju/apple.png'
import grapefruit from '../soju/grapefruit.png'
import original from '../soju/original.png'
import peach from '../soju/peach.png'
import plum from '../soju/plum.png'
import strawberry from '../soju/strawberry.png'
import watermelon from '../soju/watermelon.png'
import lychee from '../soju/lychee.png'
import chicken from '../soju/chicken.png'

import vid1w from '../flicks/vid1.webm'
import vid2w from '../flicks/vid2.webm'
import vid3w from '../flicks/vid3.webm'
import vid4w from '../flicks/vid4.webm'

import vid1 from '../flicks/vid1.mp4'
import vid2 from '../flicks/vid2.mp4'
import vid3 from '../flicks/vid3.mp4'
import vid4 from '../flicks/vid4.mp4'



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
      // width: 'fit-content',
      // maxWidth: "90%",
      // marginLeft: 'auto',
      // marginRight: 'auto',       
    },
    paper: {
      marginTop: theme.spacing(3),
      height: 'fit-content',
      width: 'fit-content',

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

  const vidRef1 = useRef(null);
  const vidRef2 = useRef(null);
  const vidRef3 = useRef(null);
  const vidRef4 = useRef(null);

  
  const paperRef = useRef(null);

  const [sliderValue, setSlider] = useState(1);
  const [slideDir, setDir] = useState(true);

  const [show1, set1] = useState(true);
  const [show2, set2] = useState(false);
  const [show3, set3] = useState(false);
  const [show4, set4] = useState(false);

  const vidShows = [set1, set2, set3, set4]
  const vidRefs = [vidRef1, vidRef2, vidRef3, vidRef4]
  const [vidIndex, setIndex] = useState(0);

  const [stage, setStage] = useState(0);
  const [tick, setTick] = useState(props.tick);

  const [stop, setStop] = useState(false);

  const [hit, setHit] = useState(0);
  const token = useState(props.token);
  const [show, setShow] = useState(props.show);
  const [currHit, setCurrHit] = useState([-1,  ""]);
  const [go, setGo] = useState(false);

  const [stopNum, setStopNum] = useState(-10);
  
  const [maxHit, setMax] = useState(70);
  const [newMax, setNewMax] = useState(70);


  const { height, width } = useWindowDimensions();
  
  const [changed, setChanged] = useState(false);
  const classes = useStyles();
    
  useEffect(() => {

    console.log(props.currHit)
   

    setTimeout(() => {
      setShow(props.show)

    }, 3900);
  },[props.show])

     
  // useEffect(() => {

   

 useEffect(() => {

  setNewMax(props.newMaxHit)
 }, [props.newMaxHit])
  
  useEffect(() => {
    console.log(props)

  
    if(! props.start) {

      handleSliderStop(props.currHit[0]);

      setCurrHit(props.currHit)
      setGo(true);

      if( props.stage != stage) {
        setChanged(true);
      }
  
      

      
      

    }

    setStage(props.stage);
    setTick(props.tick);


    

  }, [props.tick, props.stage]);

  useEffect(() => {

   

  },[]);

   

    const getIconSize = relSize => {

      return Math.max(relSize/1.7, relSize * 1.3 * width/1920 )

    }

    const progress = () => {

      if(vidIndex < vidShows.length - 1) {

        vidShows[vidIndex](false);
        vidShows[vidIndex + 1](true);
        vidRefs[vidIndex + 1].current.play()

       
        setTimeout(function() { //Start the timer

          setMax(newMax);
          if(vidIndex < vidShows.length - 2) {
            vidShows[vidIndex + 1](false);
            vidShows[vidIndex + 2](true);
            setIndex(vidIndex + 2);
            console.log("set")

          } else {
            // alert("game over")
          }
          
           
          }, 4000)
      }

    }

    useInterval(() => {
      changeSlider()
  }, 5);   

  function changeSlider() {

    if(sliderValue == stopNum && go) {

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
        setSlider(sliderValue - 1); 
  
      }
  
       else if( sliderValue == 0) {
        setDir(!slideDir)
        setSlider(sliderValue + 1); 
  
      } else {
        if(slideDir) {
          setSlider(sliderValue + 1); 
        } else {
          setSlider(sliderValue - 1); 
    
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
        function tick() {
          savedCallback.current();
        }
        if (delay !== null) {
          let id = setInterval(tick, delay);
          return () => clearInterval(id);
        }
      }, [delay]);
  }

    const repeat = () => {
      console.log(vidIndex)
      vidRefs[vidIndex].current.play()

      setTimeout(function() { //Start the timer

        console.log(newMax);
        setMax(newMax); 
        }, 4000)
     
     

    }

    const getGradient = () => {

      if(paperRef.current) {
        let width = paperRef.current.clientWidth;
        // console.log("heysssssssss")
        let str =  "linear-gradient(to right, green 0px,  green " +
          (Math.round(width * ((maxHit - 10) / 100 ))).toString() + 
          "px, red " + 
          (Math.round(width * ((maxHit) / 100 ))).toString() + 
          "px, green " + 
          (Math.round(width *((maxHit + 10) / 100 ))).toString() + 
           "px)";

        // console.log(str);
        return str;
      }

      

    }

    const handleSliderStop = num => {

      if(!stop) {
        // console.log("sssssssssssssssssssssssssddddddd")
        console.log(num);
        setStopNum(num);
        setTimeout(function() { //Start the timer
          setStopNum(-10);
          
        }, 4000)

      }
    }

    

    const handleSubmit = (e) => {
      e.preventDefault();
      if(!stop) {

        setStop(true);
        setTimeout(function() { //Start the timer
          setStop(false);
          
        }, 5000)
      
        console.log(token[0])
        flick.flick(token[0], sliderValue)
        .then(data => {

          
            if(data.stage != stage) {
              setChanged(true);
            }
            setStage(data.stage);

            handleSliderStop(sliderValue);
        })

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

            

            <main className={classes.layout}>
                <Paper ref = {paperRef} className={classes.paper}> 

                  <div class ="paperTitleText" style = {{"padding-bottom" : "10px"}}>
                      Game View
                  </div>

                    {/* <Grid container spacing={3}> */}
                      <Grid item>

                        <video playsinline ref={vidRef1} width={getIconSize(444)} height={getIconSize(294)} className= {show1 ? "" : "hidden"}>
                            <source src ={vid1w} type="video/webm" /> 
                            <source src ={vid1} type="video/mp4" /> 

                        </video>

                        <video playsinline  ref={vidRef2} width={getIconSize(444)} height={getIconSize(294)} className= {show2 ? "" : "hidden"}>
                          <source src ={vid2w} type="video/webm" /> 
                          <source src ={vid2} type="video/mp4" /> 
                        </video>

                        <video playsinline  ref={vidRef3} width={getIconSize(444)} height={getIconSize(294)} className= {show3 ? "" : "hidden"}>
                          <source src ={vid3w} type="video/webm" /> 
                          <source src ={vid3} type="video/mp4" />  
                        </video>

                        <video playsinline  ref={vidRef4} width={getIconSize(444)} height={getIconSize(294)} className= {show4 ? "" : "hidden"} >
                          <source src ={vid4w} type="video/webm" /> 
                          <source src ={vid4} type="video/mp4" /> 
                        </video>


                      </Grid>
                      {/* </Grid> */}


                    
                      <PrettoSlider  value={sliderValue} aria-label="pretto slider" defaultValue={20} />

                      <div className={ show ? classes.layout : "hidden"}> 
                        <Grid container spacing={3}  alignItems="center"
                          justifyContent="center" 
                          justify = "center">
                              <Grid item>
                                <Button
                                  variant="contained"
                                  color="primary"
                                  onClick={(e) => handleSubmit(e)}   
                                  >
                                  Hit
                                </Button>

                              </Grid>
                        </Grid>

                      </div>
                      
               
                  

                  
                 
                    
                  {/* <Button variant="contained" color="primary" style = 
                    {{"background-color": "#3D3D90", "max-width": "90%", "display" : "block",
                    "align-self":"center", 
                    "margin-bottom":"1rem",
                    "margin-left": "auto",
                    "margin-right": "auto"}} 
                    onClick = {() =>  progress()}
                  >
                    <div className = "smallText">
                      Progress
                    </div>
 
                  </Button>
                  <Button variant="contained" color="primary" style = 
                    {{"background-color": "#3D3D90", "max-width": "90%", "display" : "block",
                    "align-self":"center", 
                    "margin-bottom":"1rem",
                    "margin-left": "auto",
                    "margin-right": "auto"}} 
                    onClick = {() =>  repeat()}
                  >
                    <div className = "smallText">
                      Repeat
                    </div>
 
                  </Button> */}
                </Paper>
            </main>
            
   
      
           
                
       

            
        </div>
        
    );

}
  

export default FlickAnimationView
