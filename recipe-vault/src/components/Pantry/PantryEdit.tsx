import React, { Component } from "react";
import {
  Table,
  Button,
  Container,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import PantryCreate from "./PantryCreate";
import PantryIndex from "./PantryIndex";
import PantrySplash from "./PantrySplash";

//! THIS COMPONENT CONTAINS THE PUT REQUEST

interface PantryEditProps {
  t: boolean
  update: Function
  pantry: {}
}

interface PantryEditState {
  //   pantry: PantryItems[];
  updatePressed: boolean;
  pantryToUpdate: PantryItems[];
  title: string;
  meat: string;
  veggies: string;
  fruit: string;
  servings: number | undefined;
  spices: string;
  timeToCook: number | undefined;
}

interface PantryItems {
    title: string;
    meat: string;
    veggies: string;
    fruit: string;
    servings: number | undefined;
    spices: string;
    timeToCook: number | undefined;
}

class PantryEdit extends React.Component<PantryEditProps, PantryEditState> {
  constructor(props: PantryEditProps) {
    super(props);
    this.state = {
      title: "",
      meat: "",
      veggies: "",
      fruit: "",
      spices: "",
      servings: undefined,
      timeToCook: undefined,
      updatePressed: false,
      pantryToUpdate: [],
    };
  }

//   pantryUpdate = (event: React.FormEvent, pantryId: number) => {
//     fetch(`http://localhost:3000/pantry/editRecipe/${pantryId}`, {
//       method: "PUT",
//       body: JSON.stringify({
//         title: "",
//         meat: "",
//         veggies: "",
//         fruit: "",
//         spices: "",
//         servings: "",
//         timeToCook: "",
//       }),
//       headers: new Headers({
//         "Content-Type": "application/json",
//         Authorization: this.props.sessionToken,
//       }),
//     })
//       .then((res) => res.json())
//       .then((json) => {
//         console.log(json);
//         this.setState({ updatePressed: false });
//         this.props.fetchPantry();
//       });
//   };

  componentWillMount() {
    /* this.pantryUpdate; */
    this.setState({
      title: this.state.title,
      meat: this.state.meat,
      veggies: this.state.veggies,
      fruit: this.state.fruit,
      spices: this.state.spices,
      servings: this.state.servings,
      timeToCook: this.state.timeToCook,
    });
  }

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    this.props.update();
  };

/*   setUpdatedPantry = (event: React.FormEvent, pantry: []) => {
    this.setState({
      pantryToUpdate: pantry,
      updatePressed: true,
    });
  }; */

  render() {
    return (
      <div>
        <Modal isOpen={true}>
          <ModalHeader>Test</ModalHeader>
          <ModalBody>
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
                <Label for="timeToCook">timeToCook</Label>
                <Input
                  id="timeToCook"
                  name="timeToCook"
                  type="number"
                  onChange={(e) =>
                    this.setState({ timeToCook: +e.target.value })
                  }
                ></Input>
              </FormGroup>
              <Button type="submit" color="primary">Submit</Button>
            </Form>
          </ModalBody>
        </Modal>
       {/*  <PantrySplash 
        sessionToken={this.props.sessionToken}
        setUpdatedPantry={this.setUpdatedPantry}/> */}
      </div>
    );
  }
}

export default PantryEdit;
