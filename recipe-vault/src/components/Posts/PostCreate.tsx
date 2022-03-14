import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

interface PostCreateProps {
  sessionToken: string;
  fetchPost: Function;
}

interface PostCreateState {
  title: string;
  content: string;
}

class PostCreate extends React.Component<PostCreateProps, PostCreateState> {
  constructor(props: PostCreateProps) {
    super(props);
    this.state = {
      title: "",
      content: "",
    };
  }
  //! POST REQUEST ------------------------------------------------------------

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    fetch("http://localhost:3000/posts/myPosts", {
      method: "POST",
      body: JSON.stringify({
        title: this.state.title,
        content: this.state.content,
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.sessionToken,
      }),
    })
      .then((res) => res.json())
      .then((logData) => {
        console.log(logData);
        this.props.fetchPost();
        this.setState({
          title: "",
          content: "",
        });
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div>
        <h3>What do you want to cook up next?</h3>
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
            <Label for="content">Content</Label>
            <Input
              id="content"
              type="text"
              name="content"
              onChange={(e) => this.setState({ content: e.target.value })}
            ></Input>
          </FormGroup>
        </Form>
        <Button type="submit">Submit</Button>
      </div>
    );
  }
}

export default PostCreate;
