import React, { Component } from "react";
import {
  Button,
  Form,
  Grid,
  Icon,
  Header,
  Message,
  Segment
} from "semantic-ui-react";

export default class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  handleSubmit = () => {
    const { email, password } = this.state;
    if (email === "shawn" && password === "shawn") {
      window.sessionStorage.setItem("token", "shawnshawn");
      this.props.history.push("/log");
    } else {
      this.setState({
        password: ""
      });
      this.props.history.push("/auth");
    }
  };

  render() {
    return (
      <Grid
        textAlign="center"
        style={{ height: "100vh", marginTop: "5rem" }}
        verticalAlign="top"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            <Icon name="heartbeat" /> Log-in to your account
          </Header>
          <Form size="large">
            <Segment stacked>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="E-mail address"
                value={this.state.email}
                onChange={(e, data) => this.setState({ email: data.value })}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                value={this.state.password}
                onChange={(e, data) => this.setState({ password: data.value })}
              />

              <Button
                color="teal"
                fluid
                size="large"
                onClick={() => this.handleSubmit()}
              >
                Login
              </Button>
            </Segment>
          </Form>
          <Message>1</Message>
        </Grid.Column>
      </Grid>
    );
  }
}
