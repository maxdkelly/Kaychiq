import React from 'react'
import '../StyleSheets/Title.css';
import general from '../utils/general';

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
                <form onSubmit={this.handleSubmit}>
                  <label>
                    Enter your Username:
                    <input type="text" value={this.state.username} onChange={this.handleUsernameChange} />
                  </label>
                  <label>
                    Enter your Game Code:
                    <input type="text" value={this.state.gameCode} onChange={this.handleCodeChange} />
                  </label>
                  <input type="submit" value="Submit" />
                </form>
              );
        } else {
            return (
                <div className="textLARG"> You have joined game {this.state.gameCode} </div>
              );
        }
      
    }
  }

export default JoinGameForm
