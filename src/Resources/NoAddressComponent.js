import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Nav from 'react-bootstrap/Nav'
import "../index.css";
import {
    isMobile
} from "react-device-detect";

class NoAddressComponent extends Component {
    render() {

        if (isMobile) {
            return (
                <Nav className="headerForm">
                    <li>
                        <NavLink exact to="/">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/retrieve-record-mobile">Search</NavLink>
                    </li>
                    <li>
                        <NavLink to="/verify-lite-mobile">Verify Lite</NavLink>
                    </li>
                </Nav>
            )
        }
        else {
            return (
                <Nav className="headerForm">
                    {/* <li>
                        <NavLink exact to="/">Home</NavLink>
                    </li> */}
                    <li>
                        <NavLink to="/retrieve-record">Search</NavLink>
                    </li>
                    <li>
                        <NavLink to="/verify-lite">Verify Lite</NavLink>
                    </li>
                </Nav>
            )
        }
    }
}

export default NoAddressComponent; 