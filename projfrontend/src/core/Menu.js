import React, {Fragment} from 'react'
import { Link, withRouter } from 'react-router-dom'
import {signout, isAuthenticated} from "../auth/helper"

const currentTab = (history, path) => {
    if (history.location.pathname === path) {
        return { color : "white", border: "1px solid" }
    } 
    else {
        return { color: "white" }
    }
}

const Menu = ({history, path}) => {
    return (
        <div>
            <ul className="nav nav-tabs bg-danger">
                <li className="nav-item text-white">
                    <Link style={currentTab(history, "/")} className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item text-white">
                    <Link style={currentTab(history, "/cart")} className="nav-link" to="/cart">Cart</Link>
                </li>
                { isAuthenticated() && (
                    <li className="nav-item text-white">
                        <Link style={currentTab(history, "/user/dashboard")} className="nav-link" to="/user/dashboard">Dashboard</Link>
                    </li>
                )}
                {!isAuthenticated() && (
                    <Fragment>
                        <li className="nav-item text-white">
                            <Link style={currentTab(history, "/signup")} className="nav-link" to="/signup">Signup</Link>
                        </li>
                        <li className="nav-item text-white">
                            <Link style={currentTab(history, "/signin")} className="nav-link" to="/signin">Signin</Link>
                        </li>
                    </Fragment>
                )}
                {isAuthenticated() && (
                    <li className="nav-item text-white" 
                        onClick={() => {
                            signout(() => {
                            history.push("/");
                            });
                        }} className="nav-link text-light">
                        <span>
                            Signout
                        </span>
                    </li>
                )}
            </ul>
        </div>
    )
}

export default withRouter(Menu)
