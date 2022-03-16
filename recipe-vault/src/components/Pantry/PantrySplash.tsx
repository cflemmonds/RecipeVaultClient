import React from "react";
import PantryIndex from "./PantryIndex";
import {
  Table,
  Container,
  Row,
  Col,
  Button,
} from "reactstrap";
import PantryCreate from "./PantryCreate";
import PantryEdit from "./PantryEdit";
import PostCreate from "../Posts/PostCreate";

interface PantrySplashProps {
  sessionToken: string;
  /* fetchPost: Function */
}

interface PantrySplashState {
  pantryId: string;
  pantriesArray: PantryItems[]
  pantryToUpdate: UpdatedPantry;
  updatePressed: boolean;

}

interface PantryItems {
  id: number;
  title: string;
  meat: string;
  veggies: string;
  fruit: string;
  spices: string;
  servings: string;
  timeToCook: string;
}
interface UpdatedPantry {
    id: number;
    title: string;
    meat: string;
    veggies: string;
    fruit: string;
    spices: string;
    servings: string;
    timeToCook: string;
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
      pantryToUpdate: {} as UpdatedPantry,
    };
  }

  //! PANTRY GET REQUEST ------------------------------------------------------------
  fetchPantry = () => {

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
        this.setState({ pantriesArray: logData });
        //? this displays our pantry object in the console. Now we need to get the results to display in the render.
      });
  };

  //! PANTRY DELETE REQUEST ------------------------------------------------------------
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

  //! PANTRY PUT REQUEST ------------------------------------------------------------
  
  //? This issue is that the fetch is not hitting the correct ID on the table. The url it is sending to is http://localhost:3000/pantry/editRecipe/undefined. There is no endpoint for pantryId in my API. There is only id and ownerId on the table.
  pantryUpdate = (pantry: UpdatedPantry) => {
    console.log(this.state.pantryToUpdate.id)
    fetch(`http://localhost:3000/pantry/editRecipe/${this.state.pantryToUpdate.id}`, {
      method: "PUT",
      body: JSON.stringify({
        title: pantry.title,
        meat: pantry.meat,
        veggies: pantry.veggies,
        fruit: pantry.fruit,
        spices: pantry.spices,
        servings: pantry.servings,
        timeToCook: pantry.timeToCook,
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
    return (
      <div>
        <Container>
          <Row>
            <Col md="3" sm="12">
              <PantryCreate
                sessionToken={this.props.sessionToken}
                fetchPantry={this.fetchPantry}
              />
              {/* <PostCreate sessionToken={this.props.sessionToken}/> */}
            </Col>
            <Col md="9" >
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
              <br />

              <hr />
              <h3 style={{color: "#0066FF"}}>Ingredients List</h3>
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
                              style={{color: "#0066FF"}}
                              onClick={() => this.setUpdatedPantry(pantry)}
                            >
                              Edit
                            </Button>
                            <Button
                              type="button"
                              name=".pantry-delete"
                              color="warning"
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
