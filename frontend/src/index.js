import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter , Route, Switch, Redirect } from "react-router-dom";
// import {  browserHistory, Router, Route, IndexRoute } from 'react-router'
// import { browserHistory } from 'history'
import './index.css';
import { HomePage } from "./pages/HomePage";
import  {LobbyPage}  from "./pages/LobbyPage";
import  {CreateGamePage}  from "./pages/CreateGamePage";

import  {GuessNumberGame}  from "./pages/GuessNumberGame";
import { FlickGame } from './pages/FlickGame';
import { Blackout } from './pages/Blackout';
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  return (
    <div className="App">
        <Switch >
        <Route exact path="/" component={HomePage} />
        <Route exact path="/lobby" component={LobbyPage} />
        <Route exact path="/createGame" component={CreateGamePage} />

        <Route exact path="/guessNumberGame" component={GuessNumberGame} />
        <Route exact path="/flickGame" component={FlickGame} />
        <Route exact path="/blackout" component={Blackout} />


        <Route path="*" component={() => "404 NOT FOUND"} />
      </Switch>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>,
  rootElement
);
