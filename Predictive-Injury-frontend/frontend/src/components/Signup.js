// auth/Signup.js

import React, { Component } from "react";
import AuthService from "./auth/auth-service";
import { Link } from "react-router-dom";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sport: "",
      league: "",
      team: "",
      staffingDivision: "",
      role: "",
      name: "",
      username: "",
      password: ""
    };
    this.service = new AuthService();
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const sport = this.state.sport;
    const league = this.state.league;
    const team = this.state.team;
    const staffingDivision = this.state.staffingDivision;
    const role = this.state.role;
    const name = this.state.name;
    const username = this.state.username;
    const password = this.state.password;
    // const img = this.state.img;

    this.service
      .signup(
        sport,
        league,
        team,
        staffingDivision,
        role,
        name,
        username,
        password
        // img
      )
      .then(theUserObject => {
        this.setState({
          sport: "",
          league: "",
          team: "",
          staffingDivision: "",
          role: "",
          name: "",
          username: "",
          password: ""
          // img: ""
        });
        this.props.setTheUserInTheAppComponent(theUserObject);
        // console.log("++++++++++theUserObject++++++++", req.body);
      })
      .catch(error => console.log(error));
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <label>Sport:</label>
          <input
            type="text"
            name="sport"
            value={this.state.sport}
            onChange={e => this.handleChange(e)}
          />
          <br />
          <label>League:</label>
          <input
            type="text"
            name="league"
            value={this.state.league}
            onChange={e => this.handleChange(e)}
          />
          <br />
          <label>Team:</label>
          <input
            type="text"
            name="team"
            value={this.state.team}
            onChange={e => this.handleChange(e)}
          />
          <br />
          <label>Staffing Division:</label>
          <input
            type="text"
            name="staffingDivision"
            value={this.state.staffingDivision}
            onChange={e => this.handleChange(e)}
          />
          <br />
          <label>Role:</label>
          <input
            type="text"
            name="role"
            value={this.state.role}
            onChange={e => this.handleChange(e)}
          />
          <br />
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={e => this.handleChange(e)}
          />
          <br />
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={this.state.username}
            onChange={e => this.handleChange(e)}
          />
          <br />
          <label>Password:</label>
          <input
            name="password"
            value={this.state.password}
            onChange={e => this.handleChange(e)}
          />
          <br />

          <input type="submit" value="Signup" />
        </form>

        <Link to={"/signup"}> Signup</Link>
      </div>
    );
  }
}

export default Signup;
