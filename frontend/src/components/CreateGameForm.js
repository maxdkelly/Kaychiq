import React from 'react'
import '../StyleSheets/Title.css';
import general from '../utils/general';
import { Link } from "react-router-dom";


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
                <form onSubmit={this.handleSubmit}>
                  <label>
                    Enter your Username:
                    <input type="text" value={this.state.username} onChange={this.handleChange} />
                  </label>
                  <input type="submit" value="Submit" />
                </form>
              );
        } else {
            return (
                <div>
                    <div className="textLARG"> Your game code is {this.state.gameCode} </div>
                    <Link to={{pathname: "/guessNumberGame",token:this.state.indToken}} className="userContainer" onClick={(e) => this.handleGuessLink(e)}>
                        <div className="textLARG">Start Guess Soju Bottle No. Game </div>       
                    </Link>

                </div>
                
              );
        }
      
    }
  }

export default CreateGameForm
