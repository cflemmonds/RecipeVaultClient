import React, { Component } from "react";
import { Navbar, NavbarBrand, Button } from "reactstrap";

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
        <Navbar color="faded" light expand="md">
          <NavbarBrand href="/">Recipe Vault</NavbarBrand>
          {/* This line says "if a token exists, show this Logout button" */}
          {this.props.sessionToken && <Button onClick={this.props.clearToken}>Logout</Button>}
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
