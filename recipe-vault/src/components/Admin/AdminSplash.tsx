import React from 'react';
import { Col, Container, Row } from 'reactstrap';

interface AdminSplashProps {
    sessionToken: string
}
 
interface AdminSplashState {
    
}
 
class AdminSplash extends React.Component<AdminSplashProps, AdminSplashState> {
    state = {   }
    render() { 
        return (  
        <div>
            <Container>
                <Row>
                    <Col md="4">
                    </Col>
                    <br />
                    <Col md="5">
                        <h3>Admin Access Granted</h3>
                    </Col>
                </Row>
            </Container>

        </div> );
    }
}
 
export default AdminSplash;