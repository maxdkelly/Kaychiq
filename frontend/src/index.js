import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import './index.css';
import { HomePage } from "./pages/HomePage";
import  {LobbyPage}  from "./pages/LobbyPage";
import  {CreateGamePage}  from "./pages/CreateGamePage";

import  {GuessNumberGame}  from "./pages/GuessNumberGame";
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/lobby" component={LobbyPage} />
        <Route exact path="/createGame" component={CreateGamePage} />

        <Route exact path="/guessNumberGame" component={GuessNumberGame} />

        <Route path="*" component={() => "404 NOT FOUND"} />
      </Switch>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  rootElement
);
