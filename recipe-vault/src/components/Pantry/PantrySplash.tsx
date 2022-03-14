import React, { Component } from "react";
import PantryIndex from "./PantryIndex";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Table,
  Container,
  Row,
  Col,
  Button,
} from "reactstrap";
import PantryCreate from "./PantryCreate";
import PantryEdit from "./PantryEdit";

//! THIS COMPONENT CONTAINS THE GET REQUEST

interface PantrySplashProps {
  sessionToken: string;
  /* fetchPantry: Function */
  /* pantryUpdate: Function */
  /* setUpdatedPantry: Function */
}

interface PantrySplashState {
  pantryId: string;
  pantriesArray: PantryItems[];
  updatePressed: boolean;
  pantryToUpdate: {};
//   pantryUpdate: Function;
}

interface PantryItems {
  id: number;
  title: string;
  meat: string;
  veggies: string;
  fruit: string;
  spices: string;
  servings: number;
  timeToCook: number;
}

class PantrySplash extends React.Component<
  PantrySplashProps,
  PantrySplashState
> {
  constructor(props: PantrySplashProps) {
    super(props);
    this.state = {
      pantryId: "",
      pantriesArray: [], // this is the state for this component: we have an empty "pantry", or ingredient list
      // recipeBook: [] // this will contain the recipes, wereas the pantry will hold the ingredients
      updatePressed: false,
      pantryToUpdate: {},
    };
  }

  //! GET REQUEST ------------------------------------------------------------
  fetchPantry = () => {
    // building out my function to fetch current items in my pantry or recipe log
    fetch(`http://localhost:3000/pantry/myPantry`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.sessionToken,
      }),
    })
      .then((res) => res.json())
      .then((logData) => {
        console.log(logData);
        /* this.props.updatePantryArray(); */
        this.setState({ pantriesArray: logData });
        //? this displays our pantry object in the console. Now we need to get the results to display in the render.
      });
  };

  //! DELETE REQUEST ------------------------------------------------------------
  pantryDelete = (pantryId: number) => {
    fetch(`http://localhost:3000/pantry/deleteRecipe/${pantryId}`, {
      method: "DELETE",
      body: JSON.stringify({}),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.sessionToken,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        this.fetchPantry();
        console.log(json);
      })
      .catch((err) => console.log(err));
  };

  //! PUT REQUEST ------------------------------------------------------------
    pantryUpdate = (pantryId: number) => {
    fetch(`http://localhost:3000/pantry/editRecipe/${pantryId}`, {
      method: "PUT",
      body: JSON.stringify({
        title: "",
        meat: "",
        veggies: "",
        fruit: "",
        spices: "",
        servings: undefined,
        timeToCook: undefined,
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.sessionToken,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        this.setState({
         updatePressed: false
        });
        this.fetchPantry();
      });
  };

   /*  handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
       /*  this.pantryUpdate */
    

    setUpdatedPantry = (pantry: PantryItems) => {
    this.setState({
      pantryToUpdate: pantry,
      updatePressed: true,
    });
  };

  componentWillMount() {
    this.fetchPantry();
  }

  render() {
    //   const pantry = this.state.pantriesArray.length >=1 ?
    //   <PantryIndex pantry={this.state.pantry} delete={this.pantryDelete} update={this.setUpdatedPantry} /> :   <h2>
    //             Log an ingredient to see table this will be added later. Delete
    //             this once the table is displaying.
    //           </h2>
    return (
      <div>
        <Container>
          <Row>
            <Col md="3">
              <PantryCreate
                sessionToken={this.props.sessionToken}
                fetchPantry={this.fetchPantry}
              />
            </Col>
            <Col md="9">
                {/*
                 //! TERNARY FOR THE PANTRY EDIT MODAL 
                */}
              {this.state.updatePressed ? (
                <PantryEdit
                  t={this.state.updatePressed}
                  update={this.pantryUpdate}
                  pantry={this.state.pantryToUpdate}
                />
              ) : (
                <div></div>
              )}
              <h3>Ingredients List</h3>
              <hr />
              <Table striped>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Meat</th>
                    <th>Veggies</th>
                    <th>Fruit</th>
                    <th>Spices</th>
                    <th>Servings</th>
                    <th>Time to Cook</th>
                  </tr>
                </thead>

                <tbody>
                  {this.state.pantriesArray.length
                    ? this.state.pantriesArray.map((pantry, index) => (
                        <tr key={index}>
                          <th>{pantry.title}</th>
                          <th>{pantry.meat}</th>
                          <th>{pantry.veggies}</th>
                          <th>{pantry.fruit}</th>
                          <th>{pantry.spices}</th>
                          <th>{pantry.servings}</th>
                          <th>{pantry.timeToCook}</th>
                          <td>
                            <Button
                              type="button"
                              name=".pantry-edit"
                              color="primary"
                              onClick={() => this.setUpdatedPantry(pantry)} // this is not allowing us to change the state
                            >
                              Edit
                            </Button>
                            <Button
                              type="button"
                              name=".pantry-delete"
                              color="secondary"
                              onClick={() => this.pantryDelete(pantry.id)}
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))
                    : null}
                </tbody>
              </Table>
              <PantryIndex
                sessionToken={this.props.sessionToken}
                fetchPantry={this.fetchPantry}
                pantryId={this.state.pantryId}
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default PantrySplash;
