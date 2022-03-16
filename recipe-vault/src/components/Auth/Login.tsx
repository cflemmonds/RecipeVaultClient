import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

interface LoginProps {
  setToken: Function;
}

interface LoginState {
  username: string
  password: string
}

class Login extends React.Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }

  handleSubmit = (event: React.FormEvent) => {
    fetch("http://localhost:3000/user/login", {
      method: "POST",
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        this.props.setToken(data.sessionToken, data.user.id, data.user.admin);
        console.log(data);
      });
    event.preventDefault();
  };
  render() {
    return (
      <div>
        <h1>Back For Seconds?</h1>
        <h6>
          The pantry is open. We're just waiting to grant you access. Sign in.
        </h6>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="username">Username</Label>
            <Input
              id="username"
              name="username"
              placeholder="enter username"
              onChange={(e) => this.setState({username: e.target.value})}
            />
          </FormGroup>
          <FormGroup>
            <Label for="username">Password</Label>
            <Input
              id="su_password"
              name="password"
              placeholder="enter password"
              onChange={(e) => this.setState({password: e.target.value})}
            />
          </FormGroup>
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    );
  }
}

export default Login;