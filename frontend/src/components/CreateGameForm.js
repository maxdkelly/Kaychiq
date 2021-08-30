import React from 'react'
import '../StyleSheets/Title.css';
import general from '../utils/general';

class CreateGameForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {username: '', gameCreated: false, gameCode: "", indToken: ""};
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
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
                <div className="textLARG"> Your game code is {this.state.gameCode} </div>
              );
        }
      
    }
  }

export default CreateGameForm
