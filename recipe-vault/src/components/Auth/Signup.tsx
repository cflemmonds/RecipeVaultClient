import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

interface SignupProps {
  setToken: Function;
  // handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

interface SignupState {
  firstName: string,
  lastName: string,
  username: string,
  email: string,
  password: string
}

class Signup extends React.Component<SignupProps, SignupState> {
  constructor(props: SignupProps) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
    };
  }

  // handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   this.setState({
  //     [event.target.name]: event.target.value,
  //   });
  // };

  handleSubmit = (event: React.FormEvent) => {
    fetch("http://localhost:3000/user/register", {
      method: "POST",
      body: JSON.stringify({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
      }),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        this.props.setToken(data.sessionToken);
      });
    // console.log(this.state);
    event.preventDefault();
  };

  render() {
    return (
      <div>
        <h1>Sign Up</h1>
        <h6>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facilis,
          impedit libero? Odio harum, illum numquam quae nobis similique minus
          eius consequatur eum in modi laudantium necessitatibus sit error a
          suscipit!
        </h6>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="firstName">First name</Label>
            <Input
              id="firstName"
              name="firstName"
              placeholder="enter your first name"
              onChange={(e) => this.setState({firstName: e.target.value})}
            />
          </FormGroup>
          <FormGroup>
            <Label for="lastName">Last name</Label>
            <Input
              id="lastName"
              name="lastName"
              placeholder="enter your last name"
              onChange={(e) => this.setState({lastName: e.target.value})}
            />
          </FormGroup>
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
            <Label for="email">Email</Label>
            <Input
              id="email"
              name="email"
              placeholder="enter your email address"
              onChange={(e) => this.setState({email: e.target.value})}
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

export default Signup;

// class Signup extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       firstName: "",
//       lastName: "",
//       username: "",
//       email: "",
//       password: "",
//     };
//   }

//   handleChange = (event) => {
//     this.setState({
//       [event.target.name]: event.target.value,
//     });
//   };

//   handleSubmit = (event) => {
//     fetch("http://localhost:3000/user/register", {
//       method: "POST",
//       body: JSON.stringify({ id: this.state }),
//       headers: new Headers({
//         "Content-Type": "application/json",
//       }),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         this.props.setToken(data.sessionToken);
//       });
//     // console.log(this.state);
//     event.preventDefault();
//   };

//   render() {
//     return (
//       <div>
//         <h1>Sign Up</h1>
//         <h6>
//           Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facilis,
//           impedit libero? Odio harum, illum numquam quae nobis similique minus
//           eius consequatur eum in modi laudantium necessitatibus sit error a
//           suscipit!
//         </h6>
//         <Form onSubmit={this.handleSubmit}>
//           <FormGroup>
//             <Label for="firstName">First name</Label>
//             <Input
//               id="firstName"
//               name="firstName"
//               placeholder="enter your first name"
//               onChange={this.handleChange}
//             />
//           </FormGroup>
//           <FormGroup>
//             <Label for="lastName">Last name</Label>
//             <Input
//               id="lastName"
//               name="lastName"
//               placeholder="enter your last name"
//               onChange={this.handleChange}
//             />
//           </FormGroup>
//           <FormGroup>
//             <Label for="username">Username</Label>
//             <Input
//               id="username"
//               name="username"
//               placeholder="enter username"
//               onChange={this.handleChange}
//             />
//           </FormGroup>
//           <FormGroup>
//             <Label for="email">Email</Label>
//             <Input
//               id="email"
//               name="email"
//               placeholder="enter your email address"
//               onChange={this.handleChange}
//             />
//           </FormGroup>
//           <FormGroup>
//             <Label for="username">Password</Label>
//             <Input
//               id="su_password"
//               name="password"
//               placeholder="enter password"
//               onChange={this.handleChange}
//             />
//           </FormGroup>
//           <Button type="submit">Submit</Button>
//         </Form>
//       </div>
//     );
//   }
// }

// export default Signup;
