import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

interface PostEditProps {
  t: boolean;
  update: Function;
  posts: {};
}

interface PostEditState {
  updatePressed: boolean;
  postToUpdate: PostItems[];
  title: string;
  content: string;
}

interface PostItems {
  title: string;
  content: string;
}

class PostEdit extends React.Component<PostEditProps, PostEditState> {
  constructor(props: PostEditProps) {
    super(props);
    this.state = {
      title: "",
      content: "",
      updatePressed: false,
      postToUpdate: [],
    };
  }

  componentWillMount() {
    this.setState({
      title: this.state.title,
      content: this.state.content,
    });
  }

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const formData = {
      title: this.state.title,
      content: this.state.content,
    };
    this.props.update(formData);
  };

  render() {
    return (
      <div>
        <Modal isOpen={true}>
          <ModalHeader>Test Vault</ModalHeader>
        {/* <button type="button" className="close" aria-label="Close">
  <span aria-hidden="true">&times;</span>
</button> */}
          <ModalBody>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Label for="meal-time">Meal Time</Label>
                <Input
                  id="meal-time"
                  type="text"
                  name="meal-time"
                  onChange={(e) => this.setState({ title: e.target.value })}
                ></Input>
              </FormGroup>
              <FormGroup>
                <Label for="recipe-name">Recipe Name</Label>
                <Input
                  id="recipe-name"
                  type="text"
                  name="recipe-name"
                  onChange={(e) => this.setState({ content: e.target.value })}
                ></Input>
              </FormGroup>
              <Button type="submit" color="primary">Submit</Button>
              <Button type="reset" color="secondary" /* onClick={} */ >Close</Button>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default PostEdit;
