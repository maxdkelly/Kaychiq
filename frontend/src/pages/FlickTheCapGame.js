import React, { useState, useEffect } from "react";

import Header from "../components/Header";
import CreateGameForm from "../components/CreateGameForm";
import LobbyView from "../components/LobbyView";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import purple from "@material-ui/core/colors/purple";
const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  layout: {
    width: "fit-content",
    maxWidth: "90%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: "1.5rem",
    width: "fit-content",
    backgroundColor: "#C4C3D0",
    borderRadius: 10,
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

export const CreateGamePage = (props) => {
  const classes = useStyles();
  const [token, setToken] = useState("");

  useEffect(() => {
    if (props.location.token) {
      setToken(props.location.token);
    }
  }, []);

  const handleToken = (token) => {
    console.log(token);
    setToken(token);
  };

  return (
    <body>
      <Header />
    </body>
  );
};
