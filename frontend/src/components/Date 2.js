
import React from "react";
import "../StyleSheets/Date.css"
import { Dropdown } from "react-bootstrap";
const Date = props => {
  return (
    <div className="dateContainer">
            <div>{props.date}</div>
             <div className="dateText"><b>Hours:</b></div> 
             <input className="input" onChange={props.handleChange}>
            </input>

            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                            {props.name}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    { props.contributor? 
                    props.contributor.map(contributor => {
                    return (
                        <Dropdown.Item onClick={() => this.setContributor(props.date, contributor.user_id, contributor.name)}>{contributor.name}</Dropdown.Item>
                        )
                        })
                        : <Dropdown.Item/> }
                </Dropdown.Menu>
            </Dropdown>
    </div>
  );
};
 
export default Date;