import React, { Component } from "react";
import { Button, Form, Grid, Icon, Header, Segment } from "semantic-ui-react";
import AuthApi from "../../api/AuthApi";
import { withHooksHOC } from "../../helpers/withHooksHOC";
import { withRouter } from "react-router-dom";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  handleSubmit = async () => {
    try {
      if (!this.state.email || !this.state.password) {
        this.props.toast.addToast(
          "You must enter both username and password. Please try again.",
          { appearance: "error" }
        );
        return;
      }
      const result = await AuthApi.login({
        email: this.state.email,
        password: this.state.password
      });
      this.props.toast.addToast(`Welcome ${result.data.user.name}`, {
        appearance: "success"
      });
      window.sessionStorage.setItem("token", result.data.token);
      this.props.history.push("/monitor");
    } catch (error) {
      this.props.toast.addToast(
        `Invalid username or password. Please try again.`,
        {
          appearance: "error"
        }
      );
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
                onClick={e => {
                  e.preventDefault();
                  this.handleSubmit();
                }}
              >
                Login
              </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

export default withHooksHOC(withRouter(LoginPage));
