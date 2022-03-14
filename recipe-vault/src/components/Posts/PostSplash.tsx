import React, { Component } from "react";
import { Col, Container, Row, Table } from "reactstrap";
import PostCreate from "./PostCreate";

interface PostSplashProps {
  sessionToken: string;
}

interface PostSplashState {
  postsArray: PostItems[];
}

interface PostItems {
  title: string;
  content: string;
}

class PostSplash extends React.Component<PostSplashProps, PostSplashState> {
  constructor(props: PostSplashProps) {
    super(props);
    this.state = {
      postsArray: [],
    };
  }

  fetchPost = () => {
    fetch("http://localhost:3000/posts/myPosts", {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.sessionToken,
      }),
    })
      .then((res) => res.json())
      .then((logData) => {
        console.log(logData);
        this.setState({ postsArray: logData });
      });
  };

  render() {
    return (
      <Container>
        <Row>
          <Col md="3">
              <PostCreate sessionToken={this.props.sessionToken} fetchPost={this.fetchPost}/>
          </Col>
          <Col md="9">
          <div>
              <h3>
                <hr />
                <Table striped>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Content</th>
                        </tr>
                    </thead>

                    <tbody>
                        {/* {this.state.postsArray.length ? this.state.postsArray.map(post, index) => (
                            <tr key={index}>
                                <th>
                                </th>
                            </tr>
                        )} */}
                    </tbody>
                </Table>
              </h3>
          </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default PostSplash;
