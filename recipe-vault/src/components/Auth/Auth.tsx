import { stringify } from "querystring";
import React from "react";
import { Container, Row, Col } from "reactstrap";
import Login from "./Login";
import Signup from "./Signup";

interface AuthProps {
    setToken: Function
}
 
interface AuthState {
  firstName: string,
  lastName: string,
  username: string,
  email: string,
  password: string
}
 
class Auth extends React.Component<AuthProps, AuthState> {
    constructor(props: AuthProps) {
        super(props);
        this.state = {
          firstName: '',
          lastName: '',
          username: '',
          email: '',
          password: ''
         };
    }
    render() { 
        return (
                <Container className="auth-container">
                  <Row>
                    <Col md="6">
                      <Signup setToken={this.props.setToken} />
                    </Col>
                    <Col md="6" className="login-col">
                      <Login setToken={this.props.setToken} />
                    </Col>
                  </Row>
                </Container>
              );
    }
}
 
export default Auth;
