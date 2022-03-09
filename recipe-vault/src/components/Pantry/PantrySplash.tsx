import React, { Component } from 'react'
import PantryIndex from './PantryIndex'

interface PantrySplashProps {
    sessionToken:string 
}

interface PantrySplashState {
    
}
 
class PantrySplash extends React.Component<PantrySplashProps, PantrySplashState> {
    constructor(props: PantrySplashProps) {
        super(props);
        this.state = { 
            sessionToken: ''
          };
    }
    render() { 
        return ( 
            <div>
                <PantryIndex />
            </div>
         );
    }
}
 
export default PantrySplash;