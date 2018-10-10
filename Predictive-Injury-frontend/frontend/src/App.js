import React, { Component } from "react";
// import logo from "./logo.svg";
import "./App.css";
import Signup from "./components/Signup";
import Login from "./components/Login";
// import axios from "axios";
import AuthService from "./components/auth/auth-service";

import { Switch, Route } from "react-router-dom";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedInUser: null };
    this.service = new AuthService();
  }
  logMeIn = userObj => {
    this.setState({
      loggedInUser: userObj
    });
  };

  fetchUser() {
    if (this.state.loggedInUser === null) {
      this.service
        .loggedin()
        .then(response => {
          this.setState({
            loggedInUser: response
          });
        })
        .catch(err => {
          this.setState({
            loggedInUser: false
          });
        });
    }
  }
  render() {
    this.fetchUser();
    return (
      <div className="App">
        {/* <Navbar
          setTheUserInTheAppComponent={this.logMeIn}
          userInSession={this.state.loggedInUser}
        /> */}
        <Switch>
          <Route
            exact
            path="/"
            render={() => <Login setTheUserInTheAppComponent={this.logMeIn} />}
          />
          <Route
            exact
            path="/signup"
            render={() => <Signup setTheUserInTheAppComponent={this.logMeIn} />}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
