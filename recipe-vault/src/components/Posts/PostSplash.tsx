import { stringify } from "querystring";
import React from "react";
import { Button, Col, Container, Row, Table } from "reactstrap";
import PantrySplash from "../Pantry/PantrySplash";
import PostCreate from "./PostCreate";
import PostEdit from "./PostEdit";

interface PostSplashProps {
  sessionToken: string;
  /* fetchPost: Function; */
}

interface PostSplashState {
  postId: string;
  postsArray: PostItems[];
  postToUpdate: PostItems;
  updatePressed: boolean;
}

interface PostItems {
  id: string;
  title: string;
  content: string;
}

class PostSplash extends React.Component<PostSplashProps, PostSplashState> {
  constructor(props: PostSplashProps) {
    super(props);
    this.state = {
      postId: "",
      postsArray: [],
      updatePressed: false,
      postToUpdate: {} as PostItems,
    };
  }

  //! POST GET REQUEST ------------------------------------------------------------

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

  //! POST DELETE REQUEST ------------------------------------------------------------
  postDelete = (postId: string) => {
    fetch(`http://localhost:3000/posts/deletePost/${postId}`, {
      method: "DELETE",
      body: JSON.stringify({}),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.sessionToken,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        this.fetchPost();
        console.log(json);
      })
      .catch((err) => console.log(err));
  };

  //! POST EDIT REQUEST ------------------------------------------------------------
  postUpdate = (post: PostItems) => {
    console.log(this.state.postToUpdate.id);
    //TODO: Stub out the rest of the PUT request and setUpdatedPost function before adding the modal table to the MyRecipes button
    fetch(
      `http://localhost:3000/posts/editPost/${this.state.postToUpdate.id}`,
      {
        method: "PUT",
        body: JSON.stringify({
          title: post.title,
          content: post.content,
        }),
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: this.props.sessionToken,
        }),
      }
    )
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        this.setState({
          updatePressed: false,
        });
        this.fetchPost();
      });
  };

  setUpdatedPost = (post: PostItems) => {
    this.setState({
      postToUpdate: post,
      updatePressed: true,
    });
  };

  componentWillMount() {
    this.fetchPost();
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            {
              <PostCreate
                sessionToken={this.props.sessionToken}
                fetchPost={this.fetchPost}
              />
              // <PantrySplash
              //   sessionToken={this.props.sessionToken}
              //   /* fetchPost={this.fetchPost} */
              // />
            }
          </Col>
          <Col md="12">
            {this.state.updatePressed ? (
              <PostEdit
                t={this.state.updatePressed}
                update={this.postUpdate}
                posts={this.state.postToUpdate}
              />
            ) : (
              <div></div>
            )}
            <br />

            <hr />
            <Table striped>
              <thead>
                <tr>
                  <th>Meal Time</th>
                  <th>Recipe Name</th>
                </tr>
              </thead>

              <tbody>
                {this.state.postsArray.length
                  ? this.state.postsArray.map((posts, index) => (
                      <tr key={index}>
                        <th>{posts.title}</th>
                        <th>{posts.content}</th>
                        <td>
                          <Button
                            type="button"
                            name=".post-edit"
                            color="primary"
                            onClick={() => this.setUpdatedPost(posts)}
                          >
                            Edit
                          </Button>
                        </td>
                        <td>
                          <Button
                            type="button"
                            name=".post-delete"
                            color="secondary"
                            onClick={() => this.postDelete(posts.id)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))
                  : null}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default PostSplash;
