import React, { Component } from "react";
import { Navbar, NavbarBrand } from "reactstrap";

interface SiteBarProps {
  
}
 
interface SiteBarState {
  
}
 
class SiteBar extends React.Component<SiteBarProps, SiteBarState> {
  constructor(props: SiteBarProps) {
    super(props);
    this.state = {   };
  }
  render() { 
    return ( 
    <div>
         <Navbar color="faded" light expand="md">
        <NavbarBrand href="/">Recipe Vault</NavbarBrand>
          </Navbar>
         </div> );
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
