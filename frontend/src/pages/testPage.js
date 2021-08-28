import React, { useState, Component, setState } from "react";
import "../StyleSheets/ProfilePage.css"
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import task from "../utils/task";
import HeuristicWeekly from "../components/HeuristicWeekly";
import moment from "moment";

class TestPage extends React.Component {
    render() {
        return (
        <div>
            <HeuristicWeekly user_id={0}/>
        </div>
        );
    }
}

export default TestPage;