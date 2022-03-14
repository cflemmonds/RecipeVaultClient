import React, { Component } from 'react'
import PantryCreate from './PantryCreate';
import PantryEdit from './PantryEdit';

//! THIS COMPONENT CONTAINS OUR DELETE REQUEST.

interface PantryIndexProps {
    sessionToken: string,
    fetchPantry: Function;
    pantryId: string,
}
 
interface PantryIndexState {
    
}
 
class PantryIndex extends React.Component<PantryIndexProps, PantryIndexState> {
    constructor(props: PantryIndexProps) {
        super(props);
        this.state = { 
            pantry: [],
            updatePressed: false,
            pantryToUpdate: {}
          };
    }



    render() { 
        // const pantry = this.state.pantry.length >=1 ?
        // <PantryEdit sessionToken={this.props.sessionToken} fetchPantry={this.props.fetchPantry} pantryId={this.props.pantryId}/> : <h2>Log an ingredient to see table</h2>
        return ( 
            <div>
                
                {/* <h3>History</h3>
                <hr />
                <Table striped>

                </Table> */}
            </div>
         );
    }
}
 
export default PantryIndex;