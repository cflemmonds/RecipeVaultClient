import React, { Component } from "react";
import "./App.css";
import Auth from "./components/Auth/Auth";
import SiteBar from "./home/NavBar";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import { BrowserRouter as Router, Route } from "react-router-dom";

interface SessionTokenProps {

}

interface SessionTokenState {
  sessionToken: string
}

class App extends Component<SessionTokenProps, SessionTokenState> {
  constructor(props: SessionTokenProps) {
    super(props);
    this.state = {
      sessionToken: '',
    };
  }

  componentWillMount() {
    const token = localStorage.getItem('token');
    if (token && !this.state.sessionToken) {
      this.setState({ sessionToken: token });
    }
  }

  setSessionState = (token: string ) => {
    localStorage.setItem("token", token);
    this.setState({ sessionToken: token });
  };

  render() {
    return (
      <div>
        <Router>
          <div>
            <SiteBar />
            <Auth setToken={this.setSessionState} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
