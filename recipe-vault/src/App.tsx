import React, { Component } from "react";
import "./App.css";
import Auth from "./components/Auth/Auth";
import SiteBar from "./home/NavBar";
import PantrySplash from "./components/Pantry/PantrySplash";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PostSplash from "./components/Posts/PostSplash";
import AdminSplash from "./components/Admin/AdminSplash";

interface SessionTokenProps {
  
}

interface SessionTokenState {
  sessionToken: string;
  admin: true | false
}

class App extends Component<SessionTokenProps, SessionTokenState> {
  constructor(props: SessionTokenProps) {
    super(props);
    this.state = {
      sessionToken: "",
      admin: false,
    };
  }

  componentWillMount() {
    const token = localStorage.getItem("token");
    const admin = localStorage.getItem("admin");
    if (token && !this.state.sessionToken) {
      this.setState({ sessionToken: token });
    }
    
    if (admin && !this.state.admin) {
      this.setState({ admin: Boolean(admin) });
    }
  }

  setSessionState = (token: string, uId: string, admin: boolean) => {
    localStorage.setItem("userId", uId);
    localStorage.setItem("token", token);
    localStorage.setItem("admin", admin.toString());
    this.setState({ sessionToken: token, admin: admin });
  };

  clearToken = () => {
    this.setState({
      sessionToken: "",
    });
    localStorage.clear();
  };

  protectedViews = () => {
    if (this.state.sessionToken === localStorage.getItem("token")) {
      return (this.state.admin ? 
      <AdminSplash sessionToken={this.state.sessionToken}/> : 
      <PantrySplash sessionToken={this.state.sessionToken}/>)
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
