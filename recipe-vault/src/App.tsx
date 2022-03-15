import React, { Component } from "react";
import "./App.css";
import Auth from "./components/Auth/Auth";
import SiteBar from "./home/NavBar";
import PantrySplash from "./components/Pantry/PantrySplash";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PostSplash from "./components/Posts/PostSplash";

interface SessionTokenProps {
  /* fetchPost: Function */
}

interface SessionTokenState {
  sessionToken: string;
}

class App extends Component<SessionTokenProps, SessionTokenState> {
  constructor(props: SessionTokenProps) {
    super(props);
    this.state = {
      sessionToken: "",
    };
  }

  componentWillMount() {
    const token = localStorage.getItem("token");
    if (token && !this.state.sessionToken) {
      this.setState({ sessionToken: token });
    }
  }

  setSessionState = (token: string, uId: string) => {
    localStorage.setItem("userId", uId);
    localStorage.setItem("token", token);
    this.setState({ sessionToken: token });
  };

  clearToken = () => {
    this.setState({
      sessionToken: "",
    });
    localStorage.clear();
  };

  protectedViews = () => {
    if (this.state.sessionToken === localStorage.getItem("token")) {
      return <PantrySplash sessionToken={this.state.sessionToken} /* fetchPost={this.props.fetchPost} *//>;
    } else {
      return <Auth setToken={this.setSessionState} />;
    }
  };

  render() {
    return (
      <div>
        <Router>
          <div>
            <SiteBar
              clearToken={this.clearToken}
              sessionToken={this.state.sessionToken}
            />
            {/* <Auth setToken={this.setSessionState} /> */}
            <Routes>
              <Route path="/" element={this.protectedViews()} />
              <Route path="/posts" element={<PostSplash sessionToken={this.state.sessionToken}/>}/>
            </Routes>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
