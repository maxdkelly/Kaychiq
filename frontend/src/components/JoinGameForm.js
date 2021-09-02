import React from 'react'
import '../StyleSheets/Title.css';
import general from '../utils/general';

import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

class JoinGameForm extends React.Component {
    constructor(props) {
      super(props);
      
      this.state = {username: '', gameCode: "", indToken: "", gameCreated: false};
  
      this.handleUsernameChange = this.handleUsernameChange.bind(this);
      this.handleCodeChange = this.handleCodeChange.bind(this);

      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleUsernameChange(event) {
      this.setState({username: event.target.value});
    }

    handleCodeChange(event) {
        this.setState({gameCode: event.target.value});
      }

    componentWillReceiveProps(props) {
      
        if(props.token) {
          this.setState({username: props.token.split('_')[1], gameCreated: true, gameCode: props.token.split('_')[0], indToken:  props.token});
        }
    }
  
    handleSubmit(event) {
        event.preventDefault();
        general.joinGame(this.state.username, this.state.gameCode)
        .then(data => {

            if(data.isValid) {
                this.setState({gameCode: data.gameToken, indToken: data.individualToken});
                this.props.passToken(data.individualToken);
                console.log(data);
                this.setState({gameCreated: true});    

            } else {
                alert(data.validMsg)
            }
            
        })

         
    }
  
    render() {

        if(!this.state.gameCreated) {

          
            return (

              <React.Fragment  >

                <Typography variant="h6" gutterBottom>
                Join Game
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField id="standard-basic" value={this.state.username} onChange={this.handleUsernameChange} label="Username" />

                  </Grid>

                  <Grid item xs={12}>
                    <TextField id="standard-basic" value={this.state.gameCode} onChange={this.handleCodeChange} label="Game Code" />

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

                <div className="titleText"> You have joined game {this.state.gameCode}</div> 
               
              </React.Fragment> 
                
              );
        }
      
    }
  }

export default JoinGameForm
