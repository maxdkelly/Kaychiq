import React from 'react'
import '../StyleSheets/Title.css';
import general from '../utils/general';
import { Link } from "react-router-dom";

import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';



class CreateGameForm extends React.Component {
    constructor(props) {

      
      super(props);

      console.log(props)
      if(props.token) {
        this.state = {username: props.token.split('_')[1], gameCreated: true, gameCode: props.token.split('_')[0], indToken:  props.token};

      } else {
        this.state = {username: '', gameCreated: false, gameCode: "", indToken: ""};

      }

      
  
      this.handleChange = this.handleChange.bind(this);
      this.handleGuessLink = this.handleGuessLink.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps(props) {
      
      if(props.token) {
        this.setState({username: props.token.split('_')[1], gameCreated: true, gameCode: props.token.split('_')[0], indToken:  props.token});
      }
    }
  
    handleGuessLink(e) {

        general.startGuessGame(this.state.indToken)
        .then(data => {
            if(!data.isValid) {
                alert(data.validMsg);
                e.preventDefault();

            }
        })
        console.log("hey");
    }
    handleChange(event) {
      this.setState({username: event.target.value});
    }
  
    handleSubmit(event) {
        event.preventDefault();
        console.log("hey");
        general.createGame(this.state.username)
        .then(data => {
            this.setState({gameCode: data.gameToken, indToken: data.individualToken});
            this.props.passToken(data.individualToken);
        })

        this.setState({gameCreated: true});    
    }


  
    render() {

        if(!this.state.gameCreated) {
            return (

              <React.Fragment  >

                    <Typography variant="h6" gutterBottom>
                    Create Game
                    </Typography>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <TextField id="standard-basic" value={this.state.username} onChange={this.handleChange} label="Username" />

                      </Grid>

                      <Grid item xs={12}>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={this.handleSubmit}   
                        >
                          Submit
                        </Button>

                      </Grid>
                    </Grid>

                    
                </React.Fragment>

              );
        } else {
            return (
              <React.Fragment  >
                <Grid container spacing={3}>

                  <Grid item xs={12}>
                    <div className="titleText">Your game code is {this.state.gameCode} </div> 
                      

                  </Grid>
                    <Grid item xs={12}>
                      <Link 
                        to={{pathname: "/guessNumberGame",token:this.state.indToken}} 
                        className="link" 
                        onClick={(e) => this.handleGuessLink(e)}
                      >
                        <Button variant="contained" color="primary" disableElevation>
                          <Typography variant="button">
                              Start Guess Bottle No. Game
                          </Typography>
                         
                        </Button>
                      </Link>

                  </Grid>
                </Grid>
              </React.Fragment>
                
              );
        }
      
    }
  }

export default CreateGameForm

{/* <Typography variant="h6" gutterBottom>
Create Game
</Typography>
<Grid container spacing={3}>
  <Grid item xs={12}>
    <TextField id="standard-basic" value={this.state.username} onChange={this.handleChange} label="Username" />

  </Grid>
</Grid> */}
