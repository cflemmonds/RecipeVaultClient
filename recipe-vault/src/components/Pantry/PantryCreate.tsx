import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

//! THIS COMPONENT CONTAINS THE POST REQUEST

interface PantryCreateProps {
  sessionToken: string;
  fetchPantry: Function;
}

//! THE TYPE FOR BOTH SERVINGS AND TIMETOCOOK ARE SET AS NUMBERS IN THE SERVER. FOR THE INPUT ON THE CLIENT SIDE THE MUST BE ENTERED AS STRINGS. WE WILL NEED TO FIND A WAY TO CONVERT STRINGS TO NUMBERS IN OUR FETCH.
interface PantryCreateState {
  title: string;
  meat: string;
  veggies: string;
  fruit: string;
  spices: string;
  servings: number | undefined;
  timeToCook: number | undefined;
}

class PantryCreate extends React.Component<
  PantryCreateProps,
  PantryCreateState
> {
  constructor(props: PantryCreateProps) {
    super(props);
    this.state = {
      title: "",
      meat: "",
      veggies: "",
      fruit: "",
      spices: "",
      servings: undefined,
      timeToCook: undefined,
    };
  }

  //! POST REQUEST ------------------------------------------------------------
  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    fetch("http://localhost:3000/pantry/recipeEntry", {
      method: "POST",
      body: JSON.stringify({
        title: this.state.title,
        meat: this.state.meat,
        veggies: this.state.veggies,
        fruit: this.state.fruit,
        spices: this.state.spices,
        servings: this.state.servings,
        timeToCook: this.state.timeToCook,
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.sessionToken,
      }),
    })
      .then((res) => res.json())
      .then((logData) => {
        console.log(logData);
        this.props.fetchPantry();
        //? This .setState resets the state back to nothing, so we can create a new ingredient list from a blank slate.
          this.setState({
          title: "",
          meat: "",
          veggies: "",
          fruit: "",
          spices: "",
          servings: undefined,
          timeToCook: undefined,
        });
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div>
        <h1 style={{color: "#0066FF"}}>What are we cookin' with?</h1>
        <hr />
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="title">Title</Label>
            <Input
              id="title"
              type="text"
              name="title"
              onChange={(e) => this.setState({ title: e.target.value })}
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label for="meat">Meat</Label>
            <Input
              id="meat"
              type="text"
              name="meat"
              onChange={(e) => this.setState({ meat: e.target.value })}
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label for="veggies">Veggies</Label>
            <Input
              id="veggies"
              type="text"
              name="veggies"
              onChange={(e) => this.setState({ veggies: e.target.value })}
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label for="fruit">Fruit</Label>
            <Input
              id="fruit"
              type="text"
              name="fruit"
              onChange={(e) => this.setState({ fruit: e.target.value })}
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label for="spices">Spices</Label>
            <Input
              id="spices"
              type="text"
              name="spices"
              onChange={(e) => this.setState({ spices: e.target.value })}
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label for="servings">Servings</Label>
            <Input
              id="servings"
              name="servings"
              type="number"
              onChange={(e) => this.setState({ servings: +e.target.value })}
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label for="timeToCook">Time to Cook</Label>
            <Input
              id="timeToCook"
              name="timeToCook"
              type="number"
              onChange={(e) => this.setState({ timeToCook: +e.target.value })}
            ></Input>
          </FormGroup>
          <Button type="submit" style={{backgroundColor: "#66FF73"}}>Submit</Button>
        </Form>
      </div>
    );
  }
}

export default PantryCreate;
