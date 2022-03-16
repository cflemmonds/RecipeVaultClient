import React, { Component } from "react";
import { Navbar, NavbarBrand, Button } from "reactstrap";
import { Link } from "react-router-dom";

interface SiteBarProps {
  clearToken: () => void;
  sessionToken: string;
}

interface SiteBarState {}

class SiteBar extends React.Component<SiteBarProps, SiteBarState> {
  constructor(props: SiteBarProps) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        {/* Material UI Nav AppBar styling */}
        {/* <>
          <CssBaseline />
          <AppBar position="relative">
            <Toolbar>
                <Typography variant="h6">
                      Recipe Vault
                </Typography>
            </Toolbar>
          </AppBar>
        </> */}

        {/* Reactstrap NavBar styling */}
          <Navbar className="navbar" style={{backgroundColor: "#0066FF"}}>
            <NavbarBrand href="/" style={{color: "#66FF73"}}>Recipe Vault</NavbarBrand>
            <Link to="/posts">
              {this.props.sessionToken && (
                <Button style={{backgroundColor: "#0066FF", color: "#66FF73"}}>MyVault</Button>
              )}
            </Link>
            {/* This line says "if a token exists, show this Logout button" */}
            {this.props.sessionToken && (
              <Button color="danger" onClick={this.props.clearToken}>
                Logout
              </Button>
            )}
          </Navbar>
      </div>
    );
  }
}

export default SiteBar;