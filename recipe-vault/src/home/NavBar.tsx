import React, { Component } from "react";
import { Navbar, NavbarBrand, Button } from "reactstrap";
import {Link} from 'react-router-dom'

interface SiteBarProps {
  clearToken: () => void
  sessionToken: string
}

interface SiteBarState {

}

class SiteBar extends React.Component<SiteBarProps, SiteBarState> {
  constructor(props: SiteBarProps) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <Navbar className=".nav" color="primary" light expand="md">
          <NavbarBrand href="/">Recipe Vault</NavbarBrand>
          <Link to="/posts">
          {this.props.sessionToken && <Button color="warning">MyVault</Button>}
          </Link>
          {/* This line says "if a token exists, show this Logout button" */}
          {this.props.sessionToken && <Button color="secondary" onClick={this.props.clearToken}>Logout</Button>}
        </Navbar>
      </div>
    );
  }
}

export default SiteBar;

// class SiteBar extends Component {
//   constructor(props: string) {
//     super(props);
//     this.state = {};
//   }

//   render() {
//     return (
//       <div>
//         <Navbar color="faded" light expand="md">
//           <NavbarBrand href="/">Recipe Vault</NavbarBrand>
//         </Navbar>
//       </div>
//     );
//   }
// }

// export default SiteBar;
